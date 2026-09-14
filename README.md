# PokerBolt — Game Display

Static HTML/CSS mockups of the PokerBolt game lobby: five layout variants of the
same 15-game catalogue, plus one game detail page. No build step — open any
`.html` file in a browser, or `python3 -m http.server` from this directory.

## Pages

| File | Title | Stylesheet |
|---|---|---|
| `index.html` | Game Lobby (baseline) | `css/site.css` |
| `index-beach.html` | The Beach | `css/beach.css` |
| `index-mosaic.html` | The Wall | `css/mosaic.css` + `site.css` |
| `index-rail.html` | The Index | `css/rail.css` + `site.css` |
| `index-studio.html` | Game Portfolio | `css/studio.css` |
| `texas-holdem.html` | How to play Texas Hold'em | `css/site.css` |

## Layout

- `css/site.css` — shared base; the other stylesheets are per-variant.
- `assets/games/` — 15 game thumbnails used by the pages.
- `assets/screens/` — in-game screenshots.
- `sample/` — source reference images (not linked by the pages).
