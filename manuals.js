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
const LIVE_TRACKING = true;
const LIVE_URL      = 'https://www.strava.com/athletes/33737566';

// ── ROUTE PROGRESS ──
// CURRENT_LOC: a number 0–100 for how far along the route you are.
// Update this each day. The dot at that position lights up as "current".
const CURRENT_LOC = 3;

// LOC_POINTS: the marked dots on the bar, each with a position (0–100) and a label.
// Labels appear below the dot in small caps. Leave label as '' to show dot only.
const LOC_POINTS = [
  { pos:  0, label: 'Nice' },
  { pos:  2, label: 'Liguria' },
  { pos:  9, label: 'Sardinia' },
  { pos:  18, label: 'Sicily' },
  { pos:  26, label: 'Calabria' },
  { pos:  38, label: 'Apulia' },
  { pos:  48, label: 'Naples' },
  { pos:  59, label: 'Abruzzo' },
  { pos:  70, label: 'Umbria' },
  { pos:  78, label: 'Veneto' },
  { pos:  83, label: 'Dolomiti' },
  { pos:  94, label: 'TBD' },
  { pos:  100, label: 'End' },
];

// ── WORD OF THE DAY ──
// Leave WORD empty ('') to hide the strip entirely.
const WORD    = 'Magari';        // e.g. 'Magari'
const MEANING = 'Maybe, perhaps, if only. Carefully optimistic and thoughtful';        // e.g. 'Maybe, perhaps, if only — the most Italian word'

// ── NOTE FROM THE ROAD ──
// Leave NOTE empty ('') to hide it.
const NOTE      = 'Ten days until departure. Feeling surprisingly calm';      // e.g. 'Day 12 — somewhere in Calabria. The climbs here are serious.'
const NOTE_DATE = '29 april';      // e.g. '22 May'


// Utforska betalningssätt: Paypal och Revolut fixat. Behöver koppla konton bara...
// Automatisera journal: Markdown plus bilder kan uppladdas via webben github

// Skapa blogginlägg


// Skapa klistermärken med QR
// Skapa visitkort?
// Se till att jag har all utrustning som krävs
// Tidning
// Social media exponering
//