# adventure

Edvard Appelberg's bikepacking site. Vanilla HTML/CSS/JS, no build step,
hosted on GitHub Pages at <https://biketoured.github.io/italy26>.

| Page | What it is |
| --- | --- |
| `index.html` | General homepage: hero, trip totals, about, journeys, donate, links |
| `italy2026.html` | Italy 2026 trip page, 4,270 km over 40 days (this was the old `index.html`) |
| `sweden2024.html` | Sweden and Lofoten 2024, 3,518 km over 32 days |
| `wherenext.html` | Five candidate journeys for 2027-2028, nothing decided |
| `donate.html` | Hjärnfonden collection, still open after the ride |
| `route.html` · `scenicroads.html` · `contact.html` · `blog/` | Route map, scenic roads, contact, journal |

Trip figures live in `manuals.js` (`TRIPS`); the homepage reads them and sums
them, so no distance or day count is hardcoded. Nav, footer, language switching
and the scrollbar are shared from `static/js/main.js`.

Read `CONTEXT.md` before making changes: it documents the architecture, the
per-page conventions and the rules that are easy to break.
