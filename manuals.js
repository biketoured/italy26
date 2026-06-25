// ══════════════════════════════════════════
// MANUAL VALUES — edit these while on the road
// ══════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  manuals.js — edit this file from the road
//  Loaded in <head> of index.html and donate.html before other scripts.
// ══════════════════════════════════════════════════════════════

// ── DONATIONS ──
const SEK = 21967;
const EUR = 0;
const DONATION_TOTAL = Math.round(SEK + (EUR * 11));  // SEK total (EUR*11 ≈ conversion)
const DONATION_GOAL  = 25000;                          // SEK goal

// ── LIVE TRACKING ──
// Set LIVE_TRACKING to true and update LIVE_URL when actively tracking
const LIVE_TRACKING = false;
const LIVE_URL      = 'https://gar.mn/49OVG9R7k';

// ── ROUTE PROGRESS ──
// CURRENT_LOC: a number 0–100 for how far along the route you are.
// Update this each day. The dot at that position lights up as "current".
const CURRENT_LOC = 100;
// LOC_POINTS: the marked dots on the bar, each with a position (0–100) and a label.
// Labels appear below the dot in small caps. Leave label as '' to show dot only.
const LOC_POINTS = [
  { pos:  2, label: 'Liguria' },
  { pos:  12, label: 'Corsica' },
  { pos:  20, label: 'Sardinia' },
  { pos:  32, label: 'Sicily' },
  { pos:  47, label: 'Calabria' },
  { pos:  60, label: 'Apulia' },
  { pos:  70, label: 'Campania' },
  { pos:  78, label: 'Abruzzo' },
  { pos:  90, label: 'Umbria' },
  { pos:  100, label: 'Firenze' },
];

// ── WORD OF THE DAY ──
// Leave WORD empty ('') to hide the strip entirely.
const WORD    = 'Mancare (Verb)';
const MEANING = 'In Italian, they dont say I miss you, but instead they say mi manchi: You are missing to me. I think it is interesting how it changes perspective.';

// ── NOTE FROM THE ROAD ──
// Leave NOTE empty ('') to hide it.
const NOTE      = 'Finally home! What a journey!! I Will create a blog post for every day when I have time.';
const NOTE_DATE = '21 june';


// Utforska betalningssätt: Paypal och Revolut fixat. Behöver koppla konton bara...
// Automatisera journal: Markdown plus bilder kan uppladdas via webben github

// Skapa blogginlägg


// Skapa klistermärken med QR
// Skapa visitkort?
// Se till att jag har all utrustning som krävs
// Tidning
// Social media exponering
//
