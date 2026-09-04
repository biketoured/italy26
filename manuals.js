// ══════════════════════════════════════════
// MANUAL VALUES — edit these while on the road
// ══════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  manuals.js — edit this file from the road
//  Loaded in <head> of index.html and donate.html before other scripts.
// ══════════════════════════════════════════════════════════════

// ── DONATIONS ──
const SEK = 28087;
const DONATION_TOTAL = Math.round(SEK);  // SEK total (EUR*11 ≈ conversion)
const DONATION_GOAL  = 25000;                          // SEK goal

// ── LIVE TRACKING ──
// Set LIVE_TRACKING to true and update LIVE_URL when actively tracking
const LIVE_TRACKING = false;
const LIVE_URL      = '';

// ── ROUTE PROGRESS ──
// CURRENT_LOC: a number 0–100 for how far along the route you are.
// Update this each day. The dot at that position lights up as "current".
const CURRENT_LOC = 100;
// LOC_POINTS: the marked dots on the bar, each with a position (0–100) and a label.
// Labels appear below the dot in small caps. Leave label as '' to show dot only.
const LOC_POINTS = [
  { pos:  2,  label: 'Liguria' },
  { pos:  12, label: 'Corsica' },
  { pos:  20, label: 'Sardinia' },
  { pos:  32, label: 'Sicilia' },
  { pos:  43, label: 'Calabria' },
  { pos:  56, label: 'Puglia' },
  { pos:  68, label: 'Campania' },
  { pos:  77, label: 'Abruzzo' },
  { pos:  89, label: 'Umbria' },
  { pos:  97, label: 'Toscana' },
  { pos:  100,label: 'Home' },
];

// ── WORD OF THE DAY ──
// Leave WORD empty ('') to hide the strip entirely.
const WORD    = 'Mancare (Verb)';
const MEANING = 'In Italian, they dont say I miss you, but instead they say mi manchi: You are missing to me. I think it is interesting how it changes perspective.';

// ── NOTE FROM THE ROAD ──
// Leave NOTE empty ('') to hide it.
const NOTE      = 'Finally home! What a journey!! I am so grateful that (almost) everything went my way, and for so many nice moments and meetings.';
const NOTE_DATE = '21 june';
