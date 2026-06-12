// ══════════════════════════════════════════
// MANUAL VALUES — edit these while on the road
// ══════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
//  manuals.js — edit this file from the road
//  Loaded in <head> of index.html and donate.html before other scripts.
// ══════════════════════════════════════════════════════════════

// ── DONATIONS ──
const SEK = 17367;
const EUR = 0;
const DONATION_TOTAL = Math.round(SEK + (EUR * 11));  // SEK total (EUR*11 ≈ conversion)
const DONATION_GOAL  = 40000;                          // SEK goal

// ── LIVE TRACKING ──
// Set LIVE_TRACKING to true and update LIVE_URL when actively tracking
const LIVE_TRACKING = true;
const LIVE_URL      = 'https://gar.mn/xd4VJ4GeJ';

// ── ROUTE PROGRESS ──
// CURRENT_LOC: a number 0–100 for how far along the route you are.
// Update this each day. The dot at that position lights up as "current".
const CURRENT_LOC = 75;
// LOC_POINTS: the marked dots on the bar, each with a position (0–100) and a label.
// Labels appear below the dot in small caps. Leave label as '' to show dot only.
const LOC_POINTS = [
  { pos:  2, label: 'Liguria' },
  { pos:  12, label: 'Corsica' },
  { pos:  19, label: 'Sardinia' },
  { pos:  28, label: 'Sicily' },
  { pos:  40, label: 'Calabria' },
  { pos:  50, label: 'Apulia' },
  { pos:  63, label: 'Naples' },
  { pos:  72, label: 'Abruzzo' },
  { pos:  82, label: 'Umbria' },
  { pos:  93, label: 'Veneto' },
  { pos:  100, label: 'End' },
];

// ── WORD OF THE DAY ──
// Leave WORD empty ('') to hide the strip entirely.
const WORD    = 'Confetti';
const MEANING = 'Confectionery. Betyder alltså inte konfetti utan det betyder konfektyr. Konfetti på italienska är Coriandoli.🎉';

// ── NOTE FROM THE ROAD ──
// Leave NOTE empty ('') to hide it.
const NOTE      = 'Today Ill try to reach Blockhaus, a famous climb from Giro dItalia. I have been bad at updating the blog lately because lack of time.';
const NOTE_DATE = '12 june';


// Utforska betalningssätt: Paypal och Revolut fixat. Behöver koppla konton bara...
// Automatisera journal: Markdown plus bilder kan uppladdas via webben github

// Skapa blogginlägg


// Skapa klistermärken med QR
// Skapa visitkort?
// Se till att jag har all utrustning som krävs
// Tidning
// Social media exponering
//
