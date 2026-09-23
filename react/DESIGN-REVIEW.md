# Design review — Pokerbolt game library

A read on the look and feel of `index-main.html` and its React port, written for whoever picks
this up next. Every number below was measured, not estimated: contrast with the WCAG relative
luminance formula, computed styles read out of headless Chrome, image weights off disk.

## The short version

**The design was never the problem. It was not reaching the browser.**

The stylesheet is careful work — a 13-layer token system, five themes sharing seven semantic
roles, correct `@supports` / `@starting-style` / `transition-behavior: allow-discrete` usage, a
native popover with no JS state, scroll-driven animations that deliberately use `translate`
instead of `transform` so they can't clobber the `transform`-based hover states, and a
reduced-motion policy that is belt-and-braces (every decorative animation is gated behind
`no-preference` *and* there is a global `!important` kill switch).

Four defects were erasing most of that. All four are now fixed in `react/`. The static
`index-main.html` and `css/index-main.css` still carry all four.

---

## Fixed

### 1. None of the three declared fonts were ever loaded

`css/index-main.css` lines 15–17 declare:

```css
--font-family-stack:   Barlow, "Helvetica Neue", Helvetica, sans-serif;
--font-family-display: "Archivo Black", "Arial Black", Impact, sans-serif;
--font-family-cond:    "Barlow Condensed", Barlow, sans-serif;
```

`index.html` loaded **Lato**, which appears nowhere in the 1974-line stylesheet. There was no
`@font-face` and no `@import`. So body text rendered in Helvetica, every display heading in
Arial Black, and every numeral in the default sans.

It compounded. Layer 12 (line ~1909) sets `font-weight: 400` on the display headings, and the
comment explains why: Archivo Black ships one weight, so leaving 900 would make the browser
synthesise a fake bold. Correct reasoning — for a font that loads. With the family missing, that
rule *strips* weight from the fallback. On macOS and Windows, Arial Black rescues it (a
one-weight family still selects its only face at 400). On Android, ChromeOS and most Linux there
is no Arial Black and no Impact, so every headline on the page rendered at regular 400.

The condensed face was worse, everywhere: `Barlow Condensed, Barlow, sans-serif` all missing
falls to generic sans, which *does* have 600 and 300 — so `.card__num`, `.game__num` and
`.hero__meta dd` really did render at 600 instead of 900 on every platform.

**Fix:** one line in `react/index.html` — load Archivo Black + Barlow 400/700 + Barlow Condensed
300/600, drop Lato. No CSS change; the weight overrides were right all along.

### 2. Every structural border was invisible

`css/index-main.css` line 71:

```css
--color-border: var(--color-surface-raised);
```

A *surface fill* was being used as a *line colour*. Measured on the dark theme: `#2a150f` on a
card's `#1b0d0a` is **1.09:1**; on the page's `#130705` it is **1.14:1**.

That token draws the border on `.card`, `.card__body`, `.game`, `.steps li`, `.facts`,
`.shots img`, `.table-scroll`, every `th` and `td`, `.section-head`, `.hero`, `.devices` and
`.site-footer`. The cards had no visible edge until you hovered them. Every table was a floating
block of text.

Meanwhile `--color-rule` (the accent at 28%) *is* visible and carries the masthead, the ticker,
the tag pills and the device bezels — so the page had two line colours with a ~5× visibility gap
split across it with no discernible logic.

**Fix:** one line —

```css
--color-border: color-mix(in srgb, var(--color-text-primary) 42%, transparent);
```

Translucent rather than opaque, because the same declaration has to sit on `surface-muted`
(cards), on `surface-base` (section rules) and on a screenshot (`.shots img`). Mixed toward
`text-primary` rather than `text-secondary` to keep the existing grammar: `--color-rule` is the
accent-tinted line, `--color-border` is the neutral structural one.

It re-derives across all six themes from that one declaration — `:root` matches `<html>`
unconditionally, the theme blocks override only the primitives it references, and `color-mix()`
resolves at computed-value time. Measured in the browser after the change:

| theme | `.card` | rules on page |
|---|---|---|
| dark | **2.93** | 2.59 |
| light | **2.95** | 2.15 |

Against 1.09 / 1.14 before.

**On 3:1, honestly:** none of these are held to WCAG 1.4.11, which covers what is needed to
identify *components and their states*. A card is identified by its artwork, title and fill; its
border is decoration, and the hover/focus state swaps `border-color` to `--color-text-secondary`
at high contrast, which is where 1.4.11 would actually bite. The one border that *would* have
been a state indicator — `.toc a`'s left rule at line 777 — is dead code, overwritten at line
1951. Reaching 3:1 on all six themes needs about 65%, which reads as a drawn outline rather than
a hairline. That is a redesign, and this pass was explicitly not one.

### 3. The fifteen section numerals rendered at 15px instead of 40px

```css
.game__num   { font-size: var(--font-size-3xl); ... }   /* line 1086, (0,1,0) */
.game__head p { ... font-size: var(--font-size-md); }   /* line 1105, (0,1,1) */
```

`.game__num` is a `<p>` and a direct child of `.game__head`, so `.game__head p` matched it and
won on both specificity and source order. All fifteen numerals rendered at 15px — inside a grid
column that reserves 90px for them (line 1080), with a 62ch max-width and a 13px bottom margin
they were never meant to have. An `enter-slide` scroll animation at line 1821 was animating a
numeral nobody could see.

**Fix:** two lines. Scope the over-broad selector to `.game__head > div > p`, and add
`margin: 0` to `.game__num`.

The second line is not optional. **There is no `p { margin: 0 }` reset in this sheet** — only
`box-sizing` is universal, and the `margin: 0` at line 213 is on `body`. `.game__head p` was the
only thing zeroing the UA's `margin: 1em 0`; stop matching the numeral and it gains `1em` of a
40px font = **40px of top margin**, on a grid item, which does not collapse margins.

Rejected alternatives: raising the numeral's specificity (`.game__head .game__num`) would need to
re-declare `margin` *and* `max-width` to undo the intro rule — a bigger diff that leaves the
over-broad selector in place for the next person. Changing the JSX to a `<span>` is one word, but
dodges the defect rather than fixing it.

### 4. 40 MB of PNGs

`sample-data/` is 39.8 MB across 29 PNGs; eighteen are around 1920×935 at 1.2–2.6 MB each. The
built `react/dist` was **51 MB** — Vite followed the `public/` symlinks and copied every original,
including three that nothing references.

The library cards render at ~250 CSS px and were downloading 2.2 MB files. The hero — the LCP
element — pulled **2.1 MB** for two 214px-wide phone screens.

**Fix:** `scripts/images.mjs` generates WebP derivatives into `public/img/` at
`[160, 320, 640, 1280]`, each ladder clamped to the source's real width, with a manifest at
`src/data/images.js`. `Img.jsx` reads widths and intrinsic size from that manifest, so
`src/data/games.js` keeps its original path strings unchanged — they are manifest keys now, not
URLs. The two `public/` symlinks are gone.

- **`dist`: 51 MB → 4.7 MB.** Images actually transferred on a full desktop load: **417 KB.**
- No `<picture>`, no PNG fallback: WebP (Safari 14, 2020) is three years *older* than the
  `color-mix()` this stylesheet already cannot render without.
- No 1920 rung — nothing on this page renders above ~780 CSS px.
- `assets/games` is capped at 320, since those thumbnails render at ~80 CSS px. That one number
  is most of the saving.
- The derivatives are **committed**, and `npm run images` is a manual step. `cwebp` is a Homebrew
  binary; wiring it into `npm run build` would break any other checkout.

Two things found along the way and fixed with it:

- The iMac mockup was fed `sample-data/01-poker.png`, which is only **728×344**, behind a ~780
  CSS px `object-fit: cover` screen. `assets/screens/holdem-table.jpg` (2436×1125) was sitting in
  the repo referenced by nothing. It is now the iMac source.
- `sample-data/13-callbreak01.png` and `13-callbreak02.png` are **byte-identical** (same md5), so
  Call Break shows the same screenshot twice under two different captions. Not fixed — it needs a
  new screenshot, not code.

---

## Not fixed — on the record

These change how the page looks, and this pass was scoped to keep the current direction.

**The type scale is not a scale.** 13 / 14 / 15 / 18 / 20 / 36 / 40 px. Step ratios: 1.077,
1.071, 1.200, 1.111, **1.800**, 1.111. The three small sizes are visually indistinguishable —
three tokens doing one job — and then there is a 1.8× cliff from 20 to 36 with nothing between.
In practice the page is two sizes, 13px and 15px, with occasional 36px. Everything is in `px`, so
none of it responds to the reader's root-font preference.

**The heading hierarchy is inverted.** `.section-head h2` — "The library", "How to play", "At a
glance" — renders at **13px, uppercase, muted**. The `h3` card titles directly underneath render
at **18px, bright**. The game `h2`s render at 36px. Someone scanning the page finds no
section-level anchor at all.

**Spacing is a unit, not a scale.** `--space-1` through `--space-8` are 5 / 9 / 10 / 13 / 15 / 20
/ 21 / 30 — deltas of +4, +1, +3, +2, +5, +1, +9. Two pairs are 1px apart. And `--space-8` is used
51 times, multiplied by sixteen distinct arbitrary factors (×1.18, ×1.45, ×2.2, ×2.4, ×3.4…). A
scale you multiply by 1.18 is a unit.

**There is one breakpoint.** Four of the five structural `@media` queries fire at 62rem (992px) —
hero, devices, layout and article body all snap from one column to two simultaneously. The entire
768–992px band has no layout: a 900px iPad gets a single column with 62ch measures floating in it
and the 352px thumbnail strip stacked above the content.

**Zero `box-shadow` in 1974 lines.** Nothing on the page has elevation — not the sticky masthead,
not the cards, not the popover, not the iMac and iPhone mockups, which are hardware and read as
paper cutouts without one. No `border-radius` on any content surface either; every card, table,
panel, note, tag and button is a hard rectangle. The atmosphere that does exist is at the page
level — the fixed hairline grid plus the gold radial bloom on `body` is the best idea in the file
— and on the device mockups. Everything between those two scales is flat fill on flat fill.

**Dead code.** The table of contents is built twice: lines 769–810 make a vertical bordered list
with a numeric `<b>`, then lines 1946–1960 rebuild it as a 4-across image grid. Three rules
target `<b>` elements that do not exist in the TOC, and two hover/current states paint on a
zero-padding box. Separately, `@media (pointer: coarse)` at line 1731 re-applies
`padding-block` to `.toc a`, which breaks the flush art grid on exactly the touch devices it was
written to help. And `[data-theme="light"]` never nulls `--title-shadow`, despite the comment at
line 42 saying light themes do — so the explicit light theme paints a dark-brown hard offset and
a black blur under a 76px near-black headline on white.

**Accessibility, in the React port.** `<main>` opens *after* `<Hero>` and `<Devices>` in
`App.jsx`, so those two sections belong to no landmark and the skip link jumps the reader past
the `<h1>`. The fifteen game titles are `<h2>`, siblings of the `<h2>` section that contains
them, so the outline is flat. `aria-busy` is set on skeleton containers that are not live
regions, so neither the busy state nor its completion is ever announced.

---

## Verifying it stayed fixed

`smoke.mjs` drives the built page in headless Chrome and asserts each fix:

```sh
npm run images          # regenerate derivatives (needs cwebp + imagemagick)
npm run build
npm run preview &
node smoke.mjs
```

- **Fonts** — `document.fonts.check()` for all five faces. Needs network access to
  `fonts.gstatic.com`; offline it fails, which is the correct signal.
- **Borders** — reads each border's composited colour against its real backdrop and computes the
  ratio, under `dark` *and* `light`, to prove the token re-derives per theme. Fails under 1.9.
- **Numerals** — all fifteen at 40px, zero margin, in Barlow Condensed, and the intro paragraph
  still at 15px with its measure intact, so the scoping didn't overshoot.
- **Images** — everything fetched is `.webp`, no `<img>` missing `width`/`height`, no srcset rung
  more than 3× its render size, hero art `eager` + `fetchpriority=high`, total image bytes under
  1.5 MB.
