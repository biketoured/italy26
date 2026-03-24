import os
import json
import requests
from datetime import datetime

CLIENT_ID     = os.environ['STRAVA_CLIENT_ID']
CLIENT_SECRET = os.environ['STRAVA_CLIENT_SECRET']
REFRESH_TOKEN = os.environ['STRAVA_REFRESH_TOKEN']

REPO_ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_FILE = os.path.join(REPO_ROOT, 'strava', 'routes.json')

# ── STEP 1: Get a fresh access token ──────────────────────────
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

# ── STEP 2: Fetch all saved routes from Strava ────────────────
def fetch_routes(access_token):
    headers = {'Authorization': f'Bearer {access_token}'}
    all_routes = []
    page = 1

    while True:
        response = requests.get(
            'https://www.strava.com/api/v3/athlete/routes',
            headers=headers,
            params={
                'per_page': 200,
                'page':     page
            }
        )
        response.raise_for_status()
        batch = response.json()
        if not batch:
            break
        all_routes.extend(batch)
        print(f"Fetched page {page}: {len(batch)} routes")
        page += 1

    print(f"Total routes fetched: {len(all_routes)}")
    return all_routes

# ── STEP 3: Filter to Italy26 routes only ─────────────────────────
# Keeps only routes whose name contains "Italy26" (case-insensitive)
def filter_routes(routes):
    filtered = [r for r in routes if 'Italy' in r.get('name', '').upper()]
    print(f"Filtered to {len(filtered)} Italy26 routes")
    return filtered

# ── STEP 4: Extract fields we need ────────────────────────────
def process_routes(routes):
    processed = []
    for r in routes:
        processed.append({
            'id':           r['id'],
            'name':         r['name'],
            'distance':     round(r['distance'] / 1000, 1),       # metres → km
            'elevation':    round(r['elevation_gain']),            # metres
            'estimated_moving_time': r.get('estimated_moving_time', 0),  # seconds
            'polyline':     r.get('map', {}).get('summary_polyline', ''),
            # ── Manual fields — fill these in the JSON file ──
            # 'days':       1,
            # 'region':     'Liguria',
            # 'notes':      'Coastal stretch from Nice to Genova',
            # 'difficulty': 'Hard',
        })
    # Sort by name so AIT-1, AIT-2 etc. stay in order
    processed.sort(key=lambda r: r['name'])
    return processed

# ── STEP 5: Save ──────────────────────────────────────────────
def save(routes):
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(routes, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(routes)} routes to {OUTPUT_FILE}")

# ── MAIN ──────────────────────────────────────────────────────
if __name__ == '__main__':
    access_token = get_access_token()
    all_routes   = fetch_routes(access_token)
    ait_routes   = filter_routes(all_routes)
    processed    = process_routes(ait_routes)
    save(processed)
    print("Done!")
