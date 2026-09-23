# PokerBolt — Game Display

Live: https://oupiseyit.github.io/pokerbolt-blog/

Static HTML/CSS mockups of the PokerBolt game lobby: twelve layout variants of the
same 15-game catalogue, plus one game detail page. The three newest — Noir, Cabana
and Spectrum — are built from the colour and type system in `new-plan.md`, extracted
from the game art itself. No build step — open any
`.html` file in a browser, or `python3 -m http.server` from this directory.

## Pages

**Built from the art** (see `new-plan.md`)

- Noir — back room, 2am — https://oupiseyit.github.io/pokerbolt-blog/index-noir.html
- Cabana — midday, no shoes — https://oupiseyit.github.io/pokerbolt-blog/index-cabana.html
- Spectrum — fifteen lit doorways — https://oupiseyit.github.io/pokerbolt-blog/index-spectrum.html

**Earlier studies**

- Game Lobby (baseline) — https://oupiseyit.github.io/pokerbolt-blog/index.html
- Night Shift — https://oupiseyit.github.io/pokerbolt-blog/index-arcade.html
- The Beach — https://oupiseyit.github.io/pokerbolt-blog/index-beach.html
- The Gilded Rail — https://oupiseyit.github.io/pokerbolt-blog/index-deco.html
- Game Library & How to Play (retuned onto the art palette) — https://oupiseyit.github.io/pokerbolt-blog/index-main.html
- The Wall — https://oupiseyit.github.io/pokerbolt-blog/index-mosaic.html
- The Press Room — https://oupiseyit.github.io/pokerbolt-blog/index-press.html
- The Index — https://oupiseyit.github.io/pokerbolt-blog/index-rail.html
- Game Portfolio — https://oupiseyit.github.io/pokerbolt-blog/index-studio.html
- How to play Texas Hold'em — https://oupiseyit.github.io/pokerbolt-blog/texas-holdem.html

## Layout

- `new-plan.md` — font and colour analysis; the source of truth for the three new rooms.
- `css/` — one stylesheet per page, named after it (`index-main.css`, `noir.css`, …); no
  shared sheets, so editing one page never touches another.
- `assets/games/` — 15 game thumbnails used by the pages.
- `assets/screens/` — in-game screenshots.
- `css/index-main.css` — `index-main.html` only; retuned onto the `new-plan.md`
  palette and type (Layer 1 tokens + Layer 12 display type). Five themes, all WCAG AA.
- `sample/` — backdrops (`BG-desktop.jpeg`, `BG-mobile.jpeg`), the client lobby capture,
  and `thumbnail_900 _900 /`, the un-renamed originals of `assets/games/`.
- `sample-data/` — in-game captures and the logo. Linked by the three new rooms and by
  `index-main`, `index-arcade`, `index-deco`, `index-press`.
