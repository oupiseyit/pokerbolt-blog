# PokerBolt — font & colour analysis, and the three-room rebuild

## Why this exists

The nine `index-*.html` variants don't look like the product they advertise. The game art is
**gold-on-dark with red accents**, heavy display type, warm and saturated. Seven of the nine
pages are **white editorial** — Bodoni/Lato/Archivo/Anton on `#f5f0e7` or `#fbfbf9`, with a
cyan `#31c4d4` or brick `#d9401f` accent that appears in **no thumbnail anywhere**. Compare
`screenshots/all-pages.png` against `sample/thumbnail_900 _900 /` and the mismatch is the
whole story.

This document records the colour and type system actually present in the art, and specifies
the three pages built from it.

**Built:** `index-noir.html`, `index-cabana.html`, `index-spectrum.html`, `css/lobby.css`.

---

## 1. Evidence

| Source | What it gave |
|---|---|
| `sample/thumbnail_900 _900 /*.jpg` | 15 title cards, 900×900 — the wordmarks and per-title palettes |
| `sample-data/*.png` | 29 in-game captures + `logo-pokerbolt.png`, `logotext.png` |
| `sample/BG-desktop.jpeg`, `BG-mobile.jpeg` | the shipped client backdrop |
| `sample/lobby.png` | the shipped in-client lobby HUD |

Method: median-cut quantisation to 6 colours per image with share-of-pixels, plus direct
pixel sampling of wordmark gradient stops and outlines. **Every hex below was measured, not
chosen.**

---

## 2. Brand constants

From `sample-data/logo-pokerbolt.png` — a vertical metallic ramp, "POKER" gold and "BOLT"
silver, both running light→dark top to bottom:

| Token | Value | Sampled at |
|---|---|---|
| `--brand-gold-100` | `#F2D194` | y 15% |
| `--brand-gold-200` | `#EDC77D` | y 30% |
| `--brand-gold-400` | `#E0B96B` | y 45% |
| `--brand-gold-600` | `#D0A757` | y 60% |
| `--brand-gold-800` | `#BD923E` | y 75% |
| `--brand-gold-900` | `#AC802A` | y 90% |
| `--brand-silver-100` | `#EEEEEE` | "BOLT" highlight |
| `--brand-silver-700` | `#727272` | "BOLT" shadow |

**The distinction that matters:** the logo gold is **muted metallic** (`#D0A757`); the in-art
title gold is **bright saturated** (`#FFCD36`). They are not interchangeable — logo gold next
to a thumbnail reads dull, art gold next to the logo reads cheap.

> **Rule:** logo gold for chrome, rules, hairlines and borders. Art gold for display headings.

---

## 3. The three families

All 15 thumbnails fall into A or B. C is the shipped client shell.

### A — Noir Gold · 9 titles

`texas-holdem`, `bandar-ceme`, `pot-limit-omaha`, `super-10`, `capsa-banding`,
`bandar-baccarat`, `niu-niu`, `capsa-susun`, `ceme-keliling`

Photoreal illustrated portrait, near-black bokeh, casino light behind the subject.

| Role | Value | Source |
|---|---|---|
| base | `#130705` → `#1B0B09` | texas holdem, bandar baccarat (22–28% of pixels) |
| raised | `#2A150F` → `#331B16` | bandar ceme, texas holdem |
| brown mid | `#783224` / `#8F5A39` | texas holdem, bandar ceme |
| gold, title | `#F5D77E` body, `#FFF5CA` top highlight | sampled on wordmark |
| gold shadow | `#94502B` | wordmark drop-shadow |
| cream / skin | `#EDD7C0` / `#DAA288` | consistent 19–20% across all 9 |
| card red | `#B20002` | pip on texas holdem card |

Per-title accent glow — the only thing that varies: omaha `#6E2F6A` on `#231339`, super 10
`#5A1974` on `#1E0D14`, capsa banding `#601367` on `#1A0D21`. Everything else is brown/black.

**Wordmark form:** heavy condensed uppercase sans, flat gold fill, dark-brown offset shadow,
tight tracking, two centred lines, no outline.

### B — Cartoon Gold · 6 titles

`blackjack`, `speed-baccarat`, `tongits-go`, `samgong`, `domino-classic`, `callbreak-quick`

Bright cartoon scene — tropical beach, night city, wooden deck.

| Role | Value | Source |
|---|---|---|
| gold top | `#FEF78C` | blackjack wordmark, top edge |
| gold mid | `#FFEA75` | blackjack wordmark |
| gold low | `#FFCD36` → `#FEBA33` | blackjack wordmark, bottom |
| outline red | `#C4293B` | speed baccarat bg / blackjack stroke |
| hot red | `#C91D22` / `#BB3C32` | speed baccarat, domino classic |
| cream | `#FBF4C7` / `#FDF5D2` | blackjack 20%, callbreak 14% |
| teal | `#AEC6C4` / `#5D9886` | blackjack, callbreak |
| warm brown | `#612D20` / `#5C2325` | blackjack 25%, callbreak 24% |
| orange | `#F59D41` / `#DF4F1D` | samgong, tongits go |

**Wordmark form:** rounded bold, vertical gold gradient, **thick red outline plus a thin white
inner stroke**, soft drop shadow, title case — not all-caps.

### C — Beach / client shell

`BG-desktop.jpeg`, `BG-mobile.jpeg`, `lobby.png`. Sky `#478DFD`, mid sky `#5CC2DF`, sea
`#3BB1B5`, sand `#F2B571` (deeper `#E3B279`), wood `#7B2E1A` / `#9B533D`, gold HUD on wood.

---

## 4. Type

### Substitutes

| Use | Art reference | Substitute | Notes |
|---|---|---|---|
| Family A display | "TEXAS HOLDEM", "BANDAR CEME" | **Archivo Black** | uppercase, `letter-spacing: -0.01em` |
| Family B display | "Blackjack", "Tongits Go" | **Titan One** | proven in `css/beach.css` |
| Logo / chrome | POKERBOLT wordmark | **Saira 800**, or the PNG | squarish geometric; the PNG is exact |
| Body | in-game HUD | **Barlow** 400/500/600 | already loaded by 5 pages |
| Numeric | jackpots, chip stacks, seats | **Barlow Condensed** 600 | always `tabular-nums` |

### Per-page stacks

Each page gets one display voice, and each traces to a real artifact in this repo:

| Page | Display | Support | Body | Why |
|---|---|---|---|---|
| `index-noir.html` | Archivo Black, uppercase, `-0.01em` | Barlow Condensed 600, `.18em` | Barlow 400/500 | closest to the family-A wordmarks |
| `index-cabana.html` | Titan One | Baloo 2 800 | Baloo 2 500/600 | exactly the family-B outline lettering |
| `index-spectrum.html` | Saira 800 | Saira Condensed 600 | Barlow 400 | the POKERBOLT logo's own letterform |

**Hard rules:** no Inter, no Roboto, no `system-ui` as a display face. Numerals always
`font-variant-numeric: tabular-nums` — seat counts and jackpots jitter otherwise. Display
sizes use `clamp()`, line-height `1`, negative tracking. Body never below 15px or above 68ch.

### The two recipes

```css
/* Family A — flat gold + hard shadow */
.gold-flat { color: #F5D77E; text-shadow: 0 3px 0 #94502B, 0 6px 12px rgb(0 0 0 / .6); }

/* Family B — gold gradient fill + red outline, native, no SVG */
.gold-outline {
  background: linear-gradient(180deg, #FEF78C 0%, #FFEA75 45%, #FFCD36 72%, #FEBA33 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 6px #C4293B; paint-order: stroke fill;
  filter: drop-shadow(0 4px 0 #8E1B28);
}
```

`paint-order: stroke fill` is the whole trick — it puts the stroke *behind* the fill. Drop it
and the outline eats the letterform, silently, leaving solid red.

---

## 5. The three rooms

Deliberately far apart. Three variations on one dark theme would read as indecision; three
committed rooms sharing a logo, a gold ramp and a block order read as a brand.

| Page | The room | Commitment |
|---|---|---|
| `index-noir.html` | **Back room, 2am.** Luxury/refined. | One gold, one red, vast negative space. Restraint is the effect. |
| `index-cabana.html` | **Midday, no shoes.** Playful maximalism. | Thick outlines, bounce easing, saturated everything. The opposite page, on purpose. |
| `index-spectrum.html` | **Fifteen lit doorways.** Industrial. | Near-monochrome; the per-title `--accent` is the only colour on screen. |

Switched by `data-room` on `<html>`. All three share `css/lobby.css`.

---

## 6. Layout — the six blocks

```
① BACKDROP   BG-desktop.jpeg fixed behind everything, BG-mobile.jpeg <768px
② CHIP RAIL  five CSS-drawn casino chips, sticky
③ ICON GRID  4 columns, grouped, group name as a vertical sticky rail
④ MOBILE     single iPhone, two-column split with the copy
⑤ DUO        two iPhones, in the hero, bleeding off the right edge
⑥ DESKTOP    iMac, full-bleed, escaping the shell
```

### ① Backdrop

`position: fixed` + `z-index: -1`, not `background-attachment: fixed`, which janks on iOS.
Cabana shows it at full strength; noir and spectrum sit it under a scrim **and a blur** —
`blur(6px) saturate(.45) brightness(.55)` for noir, `blur(10px) saturate(.15) brightness(.4)`
for spectrum. Unblurred, the palm trees compete with the game art; blurred, the same file
becomes atmosphere. One token apart, and it is what makes three pages one family.

Atmosphere on top of the scrim, all CSS, no extra requests: a two-stop radial spotlight
(`rgb(255 205 54 / .10)` from above, `rgb(196 41 59 / .08)` from the right) and a 5%
`feTurbulence` grain as a data-URI. Cabana drops the grain and swaps the blooms for a single
warm sun-glare at `12% 8%`.

> **Debt:** the two JPEGs are **2.4 MB and 677 KB**. They need re-encoding to WebP
> (target ≤400 KB / ≤120 KB) before this goes anywhere near mobile data.

### ② The signature — a chip rail, not a nav bar

Block ② is a **casino chip tray**: five CSS-drawn chips, each in its group's accent, count
engraved in the face. No images, no icon font.

```css
.chip {
  --c: #C4293B;
  width: 3.25rem; aspect-ratio: 1; border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #120A07 0 46%, transparent 46%),
    repeating-conic-gradient(from 9deg, #FDF5D2 0 12deg, var(--c) 12deg 45deg);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--c) 70%, #000), 0 6px 14px -6px #000;
  transition: translate .25s cubic-bezier(.34,1.56,.64,1);
}
.chip:hover, .chip[aria-current="true"] { translate: 0 -6px; }
```

Chips overlap by `-0.75rem` so they read as a stack, and an `IntersectionObserver` lifts the
one whose group is in view. Cabana gets a wood-plank tray behind it; spectrum strips the dash
pattern down to flat accent discs. Same component, three costumes.

### Section rules — engraved, not bordered

Nothing uses `border-top: 1px solid`. Sections are divided by a gold hairline that fades at
both ends and carries a pip at its centre, like a chip-tray divider:

```css
.rule { height: 1px; position: relative;
  background: linear-gradient(90deg, transparent, #BD923E 18%, #E0B96B 50%, #BD923E 82%, transparent); }
.rule::after { content: "◆"; position: absolute; inset: 50% auto auto 50%;
  translate: -50% -50%; padding-inline: .6rem; font-size: .55rem;
  color: #E0B96B; background: var(--ink); }
```

The pip's `background` must match the page ink, or it reads as a floating diamond instead of
a break in the line. Cheapest possible detail; it is what makes the page look drawn rather
than assembled.

### ③ Groups and the 4-column grid

Groups come from the `c-cat` column already in `index-studio.html`, with the one-member
categories merged so nothing orphans:

| Group | n | Titles | Chip |
|---|---|---|---|
| Poker | 2 | `texas-holdem`, `pot-limit-omaha` | `#C4293B` |
| Table & Baccarat | 3 | `blackjack`, `speed-baccarat`, `bandar-baccarat` | `#AEC6C4` |
| Card | 5 | `samgong`, `niu-niu`, `super-10`, `capsa-susun`, `capsa-banding` | `#F59D41` |
| Domino | 3 | `bandar-ceme`, `ceme-keliling`, `domino-classic` | `#A76D49` |
| Rummy & Trick | 2 | `tongits-go`, `callbreak-quick` | `#5D9886` |

2 + 3 + 5 + 3 + 2 = 15.

The group name is **not** a heading above the grid — it's a vertical sticky rail in the left
gutter, so the four columns get full width and the eye runs horizontally across the art:

```css
.group { display: grid; grid-template-columns: 3.5rem 1fr; }
.group__label { writing-mode: vertical-rl; rotate: 180deg; position: sticky; top: 6rem; }
@media (max-width: 900px) { .group__label { writing-mode: horizontal-tb; rotate: none; position: static; } }

.icons { display: grid; grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) { .icons { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .icons { grid-template-columns: repeat(2, 1fr); } }
```

Fixed 4 columns, not `auto-fill` — the groups are sized to it. Tiles are `aspect-ratio: 1`
and images carry `width="900" height="900"`, so nothing reflows on load.

**Images come from `assets/games/*.jpg`**, which are the same 15 files as
`sample/thumbnail_900 _900 /` already renamed to kebab-case. Identical pixels; the original
folder and filenames contain spaces, so every `src` would otherwise need `%20` escaping.
Recorded here so the swap is a decision, not an accident.

**Tile treatment.** The art is already loud, so the frame stays quiet: a gold hairline inset
via `box-shadow`, a name plate that slides up from the bottom edge on hover, and one flourish
— a light sheen that rakes across the art like a chip catching table light.

```css
.tile::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(105deg, transparent 38%, rgb(255 246 221 / .38) 46%, transparent 54%);
  translate: -120% 0; transition: translate .7s cubic-bezier(.22,.68,.36,1);
}
.tile:hover::after { translate: 120% 0; }
```

The name plate only appearing on hover is deliberate — **every thumbnail already has its title
baked into the art**, so a permanent caption would be saying it twice.

Cabana swaps the hairline for a carved wood-plank frame and the sheen for a bounce on `scale`.
Spectrum drops the sheen and dims every tile to `saturate(.12) brightness(.5)`, lighting only
the hovered one with a 2px `--accent` ring and an accent-tinted glow — the doorway metaphor,
and it only works if the unlit doors are genuinely dark.

### ④⑤⑥ Devices

The pure-CSS device frames in the root `site.css` (lines 495–700: `.imac`, `.iphone`,
`.device-duo`, `.device__screen`) were lifted and retokenised rather than rewritten.

| Block | Frame | Image | Size |
|---|---|---|---|
| ④ mobile | `.iphone` single | `sample-data/01-poker04.png` | 330×717 |
| ⑤ duo | `.device-duo` → 2 × `.iphone` | `01-poker03.png` + `01-poker05.png` | 407×848, 440×956 |
| ⑥ desktop | `.imac`, chin holds `logo-pokerbolt.png` | `sample-data/12-blackjack01.png` | 1920×935 |

> **Constraint:** there is **no portrait screenshot of any game but Hold'em** — verified across
> all 29 files in `sample-data/`; only `01-poker03/04/05` are taller than wide. ④ and ⑤ can
> only ever show Hold'em until someone captures more.

⑥ uses `12-blackjack01.png` rather than `01-poker.png`. `index-main.html` uses the latter, but
it is 728×344 and visibly soft at iMac width, while fifteen 1920×935 captures sit unused.

**Composition — the three grid-breaking moves.** `index-main.html` stacks its devices as three
centred figures and the page goes limp in the middle. Instead: the **duo bleeds off the right
edge** in the hero and crosses the closing rule; ④ is a **two-column split**, copy left, phone
right, `align-items: end`; ⑥ is **`100vw` full-bleed**, the stand cropped by the fold. The
breaks only read as intentional because everything else holds the line.

All frames get a 9s idle `drift`, offset per device so they never sync.

### Motion budget

One orchestrated load beats scattered micro-interactions. The whole page allows:

1. **Load** — header and hero type rise and fade, 550ms, 60ms stagger.
2. **Tiles** — staggered sweep per group, `animation-delay: calc(var(--i) * 55ms)`, reusing the
   inline `style="--i:0"` pattern already in `index.html`.
3. **Hover** — tile scale + sheen, chip lift.
4. **Idle** — device drift.

Nothing else moves. Only `opacity`, `translate`, `scale`, `rotate`, `filter` — no `top`/`left`/
`width`, no layout thrash. Reveals use `animation: … both` with the end state as the default,
so a reader with reduced motion or a failed script sees the finished page, never a blank one.
`prefers-reduced-motion: reduce` collapses every duration to `0.01ms`.

---

## 7. Known debt

Found during the audit, **not** fixed by this work:

- Two different files named `site.css` with disjoint token vocabularies (`--color-text-primary`
  vs `--ink`). The root copy serves exactly one page.
- `assets/games/` vs `sample-data/` — five of the old pages migrated, four did not.
- `index-main.html` links `href="sample/index.html"`, which does not exist.
- `README.md` claimed `sample-data/` is unlinked; four pages depend on it. **Corrected.**
- No `--shadow-*` or radius token exists in any of the old sheets; both are inline literals
  ranging 1px–999px.
- `BG-desktop.jpeg` / `BG-mobile.jpeg` need WebP re-encoding (see §6 ①).
- `index-arcade/deco/press` are 1400–1700-line single-file documents whose `<style>` blocks
  should be extracted to `css/*.css` per the README's own stated convention.

## 8. Scope

The three new rooms are additive and share one new stylesheet. Nothing was deleted.

**`index-main.html` was retuned onto this system afterwards.** It is the only page loading the
root `site.css`, and that sheet keeps all its raw hex in one Layer 1 block — so the whole page
moved on a token swap plus one new rule block (Layer 12, the display letterforms), with no
change to its 2045 lines of markup beyond the Google Fonts link.

Its five themes kept their names and were re-mapped onto measured palettes:

| Theme | Now | Source |
|---|---|---|
| `dark` (default) | Noir Gold, family A | §3A |
| `light` | Cabana cream, family B | §3B |
| `felt` | the Tongits Go table, olive under brass | `sample-data/15-tongits-go01.png` |
| `ember` | the Speed Baccarat room, plum-red under gold | `Speed Baccarat.jpg` |
| `paper` | the Blackjack card stock, cream with rust ink | `blackjack.jpg` |

Six colours were then nudged off their measured values to hold WCAG 2.2 AA — the measured
hues fail as *text* on their own surfaces even though they are correct as *art*:
felt inverse `#82885B`→`#AFB77A` (was 2.60:1, an outright fail), cabana secondary
`#C4293B`→`#A32231`, cabana inverse `#8A5433`→`#7A4A2D`, paper secondary `#BB3C32`→`#AA372D`,
paper inverse `#8F5A39`→`#855335`, ember inverse `#C86F55`→`#DF7C5F`. Weakest pairing per
theme now: dark 4.98, light 4.55, felt 4.56, ember 4.56, paper 4.58.

The other eight `index-*.html` variants are **untouched**.
