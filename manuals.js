// ══════════════════════════════════════════
// MANUAL VALUES — edit these while on the road
// ══════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  manuals.js — edit this file from the road
//  Loaded in <head> of index.html and donate.html before other scripts.
// ══════════════════════════════════════════════════════════════

// ── DONATIONS ──
const SEK = 0;
const EUR = 0;
const DONATION_TOTAL = Math.round(SEK + (EUR * 11));  // SEK total (EUR*11 ≈ conversion)
const DONATION_GOAL  = 50000;                          // SEK goal

// ── LIVE TRACKING ──
// Set LIVE_TRACKING to true and update LIVE_URL when actively tracking
const LIVE_TRACKING = false;
const LIVE_URL      = 'https://www.strava.com/athletes/33737566';

// ── ROUTE PROGRESS ──
// CURRENT_LOC: a number 0–100 for how far along the route you are.
// Update this each day. The dot at that position lights up as "current".
const CURRENT_LOC = 0;

// LOC_POINTS: the marked dots on the bar, each with a position (0–100) and a label.
// Labels appear below the dot in small caps. Leave label as '' to show dot only.
const LOC_POINTS = [
  { pos:  10, label: 'Sardinia' },
  { pos:  33, label: 'Sicily' },
  { pos:  45, label: 'Calabria' },
  { pos:  48, label: 'Puglia' },
  { pos:  88, label: 'Umbria' },
  { pos:  92, label: 'Veneto' },
];

// ── WORD OF THE DAY ──
// Displayed as a strip between the map and blog sections on the homepage.
// Leave WORD empty ('') to hide the strip entirely.
const WORD    = '';        // e.g. 'Magari'
const MEANING = '';        // e.g. 'Maybe, perhaps, if only — the most Italian word'

// ── NOTE FROM THE ROAD ──
// A short dispatch shown at the top of the blog/journal page.
// Leave NOTE empty ('') to hide it.
const NOTE      = '';      // e.g. 'Day 12 — somewhere in Calabria. The climbs here are serious.'
const NOTE_DATE = '';      // e.g. '22 May'


// Utforska betalningssätt: Paypal och Revolut fixat. Behöver koppla konton bara...
// Automatisera journal: Markdown plus bilder kan uppladdas via webben github

// Skapa blogginlägg


// Skapa klistermärken med QR
// Skapa visitkort?
// Se till att jag har all utrustning som krävs
// Tidning
// Social media exponering
//