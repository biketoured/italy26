import os
import json
import requests
from datetime import datetime

CLIENT_ID     = os.environ['STRAVA_CLIENT_ID']
CLIENT_SECRET = os.environ['STRAVA_CLIENT_SECRET']
REFRESH_TOKEN = os.environ['STRAVA_REFRESH_TOKEN']

TRIP_START_TIMESTAMP = int(datetime(2024, 8, 16).timestamp())
TRIP_END_TIMESTAMP = int(datetime(2026,6, 30).timestamp())

# Absolute path — works regardless of where script is called from
REPO_ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_FILE = os.path.join(REPO_ROOT, 'strava', 'activities2.json')

# ── STEP 1: Get a fresh access token ───────────────────────────
# Strava access tokens expire after 6 hours.
# We use the refresh token to get a new one each time.
def get_access_token():
    response = requests.post(
        'https://www.strava.com/oauth/token',
        data={
            'client_id':     CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'refresh_token': REFRESH_TOKEN,
            'grant_type':    'refresh_token'
        }
    )
    response.raise_for_status()
    token_data = response.json()
    print(f"Got access token, expires at {token_data['expires_at']}")
    return token_data['access_token']

# ── STEP 2: Fetch activities from Strava ───────────────────────
def fetch_activities(access_token):
    headers = {'Authorization': f'Bearer {access_token}'}
    all_activities = []
    page = 1

    while True:
        response = requests.get(
            'https://www.strava.com/api/v3/athlete/activities',
            headers=headers,
            params={
                'after':    TRIP_START_TIMESTAMP,  # only after May 10
                'before':   TRIP_END_TIMESTAMP,
                'per_page': 100,                    # max per page
                'page':     page
            }
        )
        response.raise_for_status()
        batch = response.json()

        if not batch:
            break  # no more activities

        all_activities.extend(batch)
        print(f"Fetched page {page}: {len(batch)} activities")
        page += 1

    print(f"Total activities fetched: {len(all_activities)}")
    return all_activities

# ── STEP 3: Load existing saved activities ─────────────────────
def load_existing():
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r') as f:
            return json.load(f)
    return []

# ── STEP 4: Merge new activities with existing ones ────────────
# Only adds activities we haven't saved yet — avoids duplicates
# Only keeps cycling activities (road, gravel, virtual, etc.)
ACCEPTED_TYPES = {
    'Ride',
    'GravelRide',
    'MountainBikeRide',
}

def merge_activities(existing, new_activities):
    existing_ids = {a['id'] for a in existing}
    added = 0

    for activity in new_activities:
        if activity['id'] not in existing_ids:
            # Skip non-cycling activities
            sport_type = activity.get('sport_type', activity.get('type', ''))
            if sport_type not in ACCEPTED_TYPES:
                continue
            # Skip activities with no GPS/polyline data (e.g. indoor rides without location)
            if not activity.get('map', {}).get('summary_polyline', ''):
                continue
            # Extract only the fields we need — keeps file small
            existing.append({
                'id':         activity['id'],
                'name':       activity['name'],
                'type':       activity.get('sport_type', activity.get('type', 'Ride')),
                'date':       activity['start_date_local'],
                'distance':   round(activity['distance'] / 1000, 1),      # metres → km
                'elevation':  round(activity['total_elevation_gain']),     # metres
                'moving_time': activity['moving_time'],                    # seconds
                'polyline':   activity.get('map', {}).get('summary_polyline', ''),
                'avg_speed':  round(activity.get('average_speed', 0) * 3.6, 1),    # m/s → km/h
                'avg_hr':     round(activity.get('average_heartrate', None),1),              # bpm, None if no HR monitor
                'hearbeats':  round(activity.get('average_heartrate', None) * activity['moving_time']*60), #total amount of hearbeats
            })
            existing_ids.add(activity['id'])
            added += 1

    print(f"Added {added} new activities")
    # Sort by date, newest first
    existing.sort(key=lambda a: a['date'], reverse=True)
    return existing

# ── STEP 5: Save to JSON file ──────────────────────────────────
def save(activities):
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(activities, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(activities)} activities to {OUTPUT_FILE}")

# ── MAIN ───────────────────────────────────────────────────────
if __name__ == '__main__':
    access_token = get_access_token()
    new_activities = fetch_activities(access_token)
    existing = load_existing()
    merged = merge_activities(existing, new_activities)
    save(merged)
    print("Done!")