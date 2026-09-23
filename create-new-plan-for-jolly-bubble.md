# Plan — write `new-plan.md`: font & colour analysis for a 3-index rebuild

## Context

The nine `index-*.html` pages don't look like the product they advertise. The game art
(`sample/thumbnail_900 _900 /`, `sample-data/`, `sample/BG-desktop.jpeg`, `sample/lobby.png`)
is **gold-on-dark with red accents**, heavy display type, warm and saturated. The pages are
mostly **white editorial** — Bodoni/Lato/Archivo/Anton on `#f5f0e7` or `#fbfbf9`, with a cyan
`#31c4d4` or brick `#d9401f` accent that appears nowhere in any thumbnail. Screenshot proof:
`screenshots/all-pages.png` — 7 of 9 variants are light; only `index-beach.html` shares a
palette with anything shipped.

The audit also found there is no single design system to fix: **two different files named
`site.css`** with disjoint vocabularies (`--color-text-primary` vs `--ink`), three more
standalone sheets, three ~1500-line inline `<style>` blocks, five different card markup
patterns, and two competing image roots (`assets/games/` vs `sample-data/`).

**This task produces analysis only.** Deliverable is a single new file, `new-plan.md`, in the
repo root: the extracted font and colour system plus the spec for three new index pages — one
per visual family found in the art. No HTML or CSS is written; no existing file is touched.

Decisions already made by the user:
- Direction: **all three families**, one index page each.
- Scope: **analysis document only**.

---

## Deliverable

`new-plan.md` (repo root). Sections below, in this order.

### 1. Evidence

Name the source files the analysis is drawn from, so numbers can be re-checked:
`sample/thumbnail_900 _900 /*.jpg` (15 title cards, 900×900), `sample-data/*.png` (in-game
screenshots + `logo-pokerbolt.png`, `logotext.png`), `sample/BG-desktop.jpeg`,
`sample/BG-mobile.jpeg`, `sample/lobby.png`.

Method: median-cut quantisation to 6 colours per image with share-of-pixels, plus direct pixel
sampling of wordmark gradient stops and outlines. Values below are measured, not invented.

### 2. Brand constants (all three pages share these)

From `sample-data/logo-pokerbolt.png` — the wordmark is a vertical metallic ramp, "POKER" gold
and "BOLT" silver, both running light→dark top→bottom:

| Token | Value | Source |
|---|---|---|
| `--brand-gold-100` | `#F2D194` | logo, y15% |
| `--brand-gold-200` | `#EDC77D` | logo, y30% |
| `--brand-gold-400` | `#E0B96B` | logo, y45% |
| `--brand-gold-600` | `#D0A757` | logo, y60% |
| `--brand-gold-800` | `#BD923E` | logo, y75% |
| `--brand-gold-900` | `#AC802A` | logo, y90% |
| `--brand-silver-100` | `#EEEEEE` | "BOLT" |
| `--brand-silver-700` | `#727272` | "BOLT" |

Note the distinction that matters: the **logo gold is muted metallic** (`#D0A757`), the
**in-art title gold is bright saturated** (`#FFCD36`). Do not use one where the other belongs —
the logo gold reads as dull next to a thumbnail, the art gold reads as cheap next to the logo.
Rule to record: logo gold for chrome/rules/borders, art gold for display headings.

### 3. The three families

Every one of the 15 thumbnails falls into family A or B. C is the shipped client shell.

**A — Noir Gold** (9 titles: texas holdem, bandar ceme, pot limit omaha, super 10, capsa
banting, bandar baccarat, niu niu, capsa susun, ceme keliling)

Photoreal illustrated portrait, near-black bokeh background, casino light behind.

| Role | Value | Source |
|---|---|---|
| base | `#130705` → `#1B0B09` | texas holdem, bandar baccarat (22–28% of pixels) |
| raised | `#2A150F` → `#331B16` | bandar ceme, texas holdem |
| brown mid | `#783224` / `#8F5A39` | texas holdem, bandar ceme |
| gold (title) | `#F5D77E` body, `#FFF5CA` top highlight | sampled on wordmark |
| gold shadow | `#94502B` | wordmark drop-shadow, texas holdem |
| cream/skin | `#EDD7C0` / `#DAA288` | consistent 19–20% across all 9 |
| card red | `#B20002` | pip on texas holdem card |

Per-title accent glow (the only thing that varies): omaha `#6E2F6A` on `#231339`, super 10
`#5A1974` on `#1E0D14`, capsa banting `#601367` on `#1A0D21`. Everything else is brown/black.

Wordmark form: **heavy condensed uppercase sans**, flat gold fill, dark-brown offset shadow,
tight tracking, two centred lines, no outline.

**B — Cartoon Gold** (6 titles: blackjack, speed baccarat, tongits go, samgong, domino
classic, callbreak quick)

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

Wordmark form: **rounded bold**, vertical gold gradient, **thick red outline + thin white
inner stroke**, soft drop shadow, title case (not all-caps).

**C — Beach / Client shell** (`BG-desktop.jpeg`, `BG-mobile.jpeg`, `lobby.png`)

The real in-client lobby. Sky `#478DFD`, mid sky `#5CC2DF`, sea `#3BB1B5`, sand `#F2B571`
(deeper `#E3B279`), wood `#7B2E1A` / `#9B533D`, HUD gold on wood.

### 4. Type

The art uses three distinct letterform categories. Record a Google Fonts substitute for each
plus the CSS technique, so the pages reproduce the effect without shipping images.

| Use | Art reference | Substitute | Notes |
|---|---|---|---|
| Family A display | "TEXAS HOLDEM", "BANDAR CEME" | **Archivo Black**, fallback Montserrat 900 | uppercase, `letter-spacing: -0.01em` |
| Family B display | "Blackjack", "Tongits Go" | **Titan One**, fallback Baloo 2 800 | already proven in `css/beach.css` |
| Logo / chrome | POKERBOLT wordmark | **Saira ExtraBold** or the PNG | squarish geometric; the PNG is available and exact |
| Body | in-game HUD | **Barlow** 400/500/600 | already loaded by 5 pages, keep it |
| Numeric / tabular | jackpot counters, chip stacks | **Barlow Condensed** 600 | tabular-nums |

Two CSS recipes to write into the doc verbatim:

```css
/* Family A: flat gold + hard shadow */
.title-a { color: #F5D77E; text-shadow: 0 3px 0 #94502B, 0 6px 12px rgb(0 0 0 / .6); }

/* Family B: gold gradient fill + red outline (native, no SVG) */
.title-b {
  background: linear-gradient(180deg, #FEF78C 0%, #FFEA75 45%, #FFCD36 72%, #FEBA33 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 6px #C4293B; paint-order: stroke fill;
  filter: drop-shadow(0 4px 0 #8E1B28);
}
```

`paint-order: stroke fill` is what puts the stroke *behind* the fill — without it the outline
eats the letterform. This is the whole trick; note it explicitly.

**Per-page stacks.** Each page gets one display voice, and each traces to a real artifact in
this repo rather than being picked for taste:

| Page | Display | Support | Body | Why |
|---|---|---|---|---|
| `index-noir.html` | **Archivo Black**, uppercase, `-0.01em` | Barlow Condensed 600, `.18em` tracking, for micro-labels | Barlow 400/500 | closest match to the family-A wordmarks |
| `index-cabana.html` | **Titan One** | Baloo 2 800 for subheads | Baloo 2 500/600 | exactly the family-B outline lettering |
| `index-spectrum.html` | **Saira** 800 | Saira Condensed 600 | Barlow 400 | squarish geometric — it is the POKERBOLT logo's own letterform |

Hard rules to record: **no Inter, no Roboto, no system-ui as a display face.** Numerals are
always `font-variant-numeric: tabular-nums` (seat counts, jackpots, chip faces jitter
otherwise). Display sizes use `clamp()` and are set in `1` line-height with negative tracking;
body never goes below 15px or above 68 characters.

### 5. The three pages

| File | Family | Shell | Card treatment |
|---|---|---|---|
| `index-noir.html` | A | `#130705` base, `#2A150F` panels, logo gold hairlines | full-bleed art, gold caption plate, red "LIVE" pip |
| `index-cabana.html` | B | `BG-desktop.jpeg` fixed, `BG-mobile.jpeg` under 768px | wood-plank frame, gold+red-outline name |
| `index-spectrum.html` | A shell, per-title accent | `#0B0705` constant; each card sets `--accent` from its own thumbnail | dark card, accent glow ring, accent-tinted scrim |

All three read the **same 15 images from `assets/games/`** (already kebab-cased and 900×900)
and the **logo from `sample-data/logo-pokerbolt.png`**. Record the per-title `--accent` table
for `index-spectrum.html` using the family-A/B values in §3.

### 6. Page layout — the six blocks, in order

All three pages run the **same block sequence**; only the tokens from §2–§4 change. Record
the sequence once, then note the per-page deltas.

Before the blocks, record the three things that stop this being a stack of centred boxes.

#### 6.0 Aesthetic position — one sentence each, then hold it

| Page | The room | Commitment |
|---|---|---|
| `index-noir.html` | **Back room, 2am.** Luxury/refined. | One gold, one red, vast negative space, editorial rhythm. Restraint is the effect — if two things are competing for attention, delete one. |
| `index-cabana.html` | **Midday, no shoes.** Playful/toy-like maximalism. | Thick outlines, bounce easing, saturated everything, nothing subtle. The opposite page, on purpose. |
| `index-spectrum.html` | **Fifteen lit doorways.** Industrial/utilitarian. | Near-monochrome shell, ruled grid, the per-title `--accent` is the *only* colour on screen. Systematic, not decorative. |

These are deliberately far apart. Three variations on one dark theme would read as indecision;
three committed rooms sharing a logo, a gold ramp and a block order read as a brand.

#### 6.1 The signature — a chip rail, not a nav bar

The one element someone remembers. Block ② is not pills or tabs: it is a **casino chip tray**,
five CSS-drawn chips, each in its group's accent, count engraved in the face. No images, no
icon font.

```css
.chip {
  --c: #C4293B;                     /* per-group accent */
  width: 3.25rem; aspect-ratio: 1; border-radius: 50%;
  display: grid; place-items: center;
  font: 600 .9rem/1 "Barlow Condensed"; font-variant-numeric: tabular-nums;
  color: var(--brand-gold-200);
  background:
    radial-gradient(circle at 50% 50%, #120A07 0 46%, transparent 46%),
    repeating-conic-gradient(from 9deg, #FDF5D2 0 12deg, var(--c) 12deg 45deg);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--c) 70%, #000),
              0 6px 14px -6px #000;
  transition: translate .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
}
.chip:hover, .chip[aria-current="true"] { translate: 0 -6px; box-shadow: inset 0 0 0 2px var(--c), 0 12px 22px -8px #000; }
```

Sticky at `top: 0`, chips overlap by `-0.75rem` margin so they read as a stack, and the
active one lifts out of the tray. On `index-cabana.html` the same markup gets a wood-plank
tray behind it; on `index-spectrum.html` the chips lose the dash pattern and become flat
accent discs — same component, three costumes.

#### 6.2 Section rules — engraved, not borders

Nothing on any of the three pages uses `border-top: 1px solid`. Sections are divided by a
gold hairline that fades at both ends and carries a pip at its centre, like a chip-tray divider:

```css
.rule { height: 1px; position: relative;
  background: linear-gradient(90deg, transparent, var(--brand-gold-800) 18%,
              var(--brand-gold-400) 50%, var(--brand-gold-800) 82%, transparent); }
.rule::after { content: "◆"; position: absolute; inset: 50% auto auto 50%;
  translate: -50% -50%; padding-inline: .6rem; font-size: .55rem;
  color: var(--brand-gold-400); background: var(--ink); }
```

Used between every block. It is the cheapest possible detail and it is what makes the page
look drawn rather than assembled.

#### 6.3 Block by block

```
╔══════════════════════════════════════════════════════════════╗
║ ① BACKDROP  BG-desktop.jpeg, position:fixed, z-index:-1      ║ full bleed, under everything
║             BG-mobile.jpeg <768px · grain overlay on top     ║
║                                                              ║
║   ▓▓ POKERBOLT            games  guides  play  ☾              ║  header floats, no bar
║                                                              ║
║   FIFTEEN TABLES                          ┌──┐┌──┐           ║  hero type flush left,
║   ONE FLOOR                               │▓▓││▓▓│ ⑤ DUO     ║  duo bleeds off right
║   ─────────────────────                   │  ││  │  rotated  ║  edge, overlaps the rule
║   15 titles · 2–9 seats                   └──┘└──┘ −6°/+4°   ║
║ ─────────────────────── ◆ ──────────────────────────────────  ║  engraved rule
║                                                              ║
║        ( ● )( ● )( ● )( ● )( ● )   ← ② CHIP RAIL, sticky     ║  5 chips, overlapped,
║          2    3    5    3    2                                ║  active one lifts
║ ─────────────────────── ◆ ──────────────────────────────────  ║
║  ┌───┐                                                       ║
║  │ P │  [img] [img]                        ③ ICON GRID       ║  group name = vertical
║  │ O │                                     4 columns         ║  rail in left gutter,
║  │ K │                                     sticky label      ║  sticky, rotated 180°
║  │ E │                                                       ║
║  │ R │                                                       ║
║  └───┘                                                       ║
║ ─────────────────────── ◆ ──────────────────────────────────  ║
║  ┌───┐                                                       ║
║  │CAR│  [img] [img] [img] [img]                              ║  fills one row of 4,
║  │ D │  [img]                                                ║  orphan sits left
║  └───┘                                                       ║
║ ─────────────────────── ◆ ──────────────────────────────────  ║
║                                                              ║
║           ┌────┐         ④ MOBILE — single iPhone,           ║  off-centre, 2-col split
║   copy →  │ ▓▓ │            copy on the left, device right   ║  with the caption
║           └────┘                                             ║
║ ══════════════════════════════════════════════════════════   ║  ⑥ breaks the shell:
║ ▓▓▓▓▓▓▓▓▓▓  iMac, full-bleed edge to edge  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ║  100vw, no container
║ ══════════════════════════════════════════════════════════   ║
╚══════════════════════════════════════════════════════════════╝
```

Three grid-breaking moves, so the page is not a column of centred cards: the **duo bleeds off
the right edge** and crosses the hero's closing rule; the **group name is a vertical sticky
rail** in the left gutter rather than a heading above the grid; and the **iMac block is
`100vw` full-bleed**, escaping the shell entirely. Everything else is disciplined and aligned
— the breaks only read as intentional because the rest holds the line.

**① Backdrop — `sample/BG-desktop.jpeg`**

```css
body::before {
  content: ""; position: fixed; inset: 0; z-index: -1;
  background: url("sample/BG-desktop.jpeg") center / cover no-repeat;
}
@media (max-width: 767px) { body::before { background-image: url("sample/BG-mobile.jpeg"); } }
```

`position: fixed` + `-1` rather than `background-attachment: fixed`, which janks on iOS.
The two JPEGs are 2.4 MB and 677 KB — record that they need re-encoding to WebP (target
≤400 KB / ≤120 KB) before this ships, or the page is unusable on mobile data.

Per page: `index-cabana.html` shows it at full strength; `index-noir.html` and
`index-spectrum.html` sit it under a `rgb(19 7 5 / .88)` scrim so the dark shell reads —
same image, one token apart. This is what makes three pages one family.

**Atmosphere, not a flat colour.** The scrim alone gives a dead grey page. Three layers go
on top of it, all CSS, no extra requests:

```css
/* spotlight — the floor is lit from above, behind the grid */
.floor { background:
  radial-gradient(120% 60% at 50% -10%, rgb(255 205 54 / .10), transparent 60%),
  radial-gradient(80% 50% at 85% 30%, rgb(196 41 59 / .08), transparent 65%); }

/* film grain — 5%, fixed, pointer-events:none, above content, below nothing */
body::after { content: ""; position: fixed; inset: 0; z-index: 2;
  pointer-events: none; opacity: .05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
```

`css/site.css` already has `--bloom-a/-b/-c` and `--grain-c` doing exactly this — lift the
idea from there rather than inventing new names. On `index-cabana.html` the grain comes off
and the blooms become a single warm sun-glare at `12% 8%`; on `index-spectrum.html` the
blooms are removed entirely and the spotlight follows the hovered card instead.

**② Group rail — the five groups**

Groups are taken from the `c-cat` column already in `index-studio.html`, with the
one-member categories merged so nothing orphans:

| Group | n | Titles (`assets/games/` slug) |
|---|---|---|
| Poker | 2 | `texas-holdem`, `pot-limit-omaha` |
| Table & Baccarat | 3 | `blackjack`, `speed-baccarat`, `bandar-baccarat` |
| Card | 5 | `samgong`, `niu-niu`, `super-10`, `capsa-susun`, `capsa-banding` |
| Domino | 3 | `bandar-ceme`, `ceme-keliling`, `domino-classic` |
| Rummy & Trick | 2 | `tongits-go`, `callbreak-quick` |

Sticky chip row, `position: sticky; top: 0`, each chip an in-page anchor to its `<section>`.
Count badge on each chip. 2+3+5+3+2 = 15.

**③ Icon grid — 4 columns, grouped**

One `<section>` per group. The group name is **not** a heading above the grid — it is a
vertical sticky rail in the left gutter, so the four columns get the full width and the eye
runs horizontally across the art instead of stopping on a label:

```css
.group { display: grid; grid-template-columns: 3.5rem 1fr; gap: clamp(1rem, 3vw, 2.5rem); }
.group__label {
  writing-mode: vertical-rl; rotate: 180deg;
  font: 400 clamp(1.1rem, 2.4vw, 1.75rem)/1 "Archivo Black", system-ui;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--brand-gold-600); align-self: start;
  position: sticky; top: 6rem;                 /* tracks its own group as you scroll */
}
@media (max-width: 900px) {
  .group { grid-template-columns: 1fr; }
  .group__label { writing-mode: horizontal-tb; rotate: none; position: static; }
}

.icons { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(.75rem, 2vw, 1.5rem); }
@media (max-width: 900px) { .icons { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .icons { grid-template-columns: repeat(2, 1fr); } }
```

Fixed 4 columns (not `auto-fill`) because the user asked for 4 and the groups are sized to
it — Card fills one row of 4 plus one orphan, everything else is a short row. Tiles are
`aspect-ratio: 1` and images carry `width="900" height="900"` so nothing reflows on load.

**Tile treatment.** The art is already loud; the frame must not compete. Square, 4px gold
hairline inset via `box-shadow`, name on a gold plate that slides up from the bottom edge on
hover, and a **light sheen that rakes across the art** — the one flourish, and it earns its
place because it reads as a chip or a card catching table light:

```css
.tile { position: relative; overflow: hidden; aspect-ratio: 1; isolation: isolate;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--brand-gold-800) 55%, transparent);
  transition: scale .35s cubic-bezier(.22,.68,.36,1), box-shadow .35s; }
.tile:hover { scale: 1.03; box-shadow: inset 0 0 0 1px var(--brand-gold-400),
                                       0 18px 40px -18px rgb(0 0 0 / .8); }
.tile::after {                                   /* the sheen */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(105deg, transparent 38%, rgb(255 246 221 / .38) 46%, transparent 54%);
  translate: -120% 0; transition: translate .7s cubic-bezier(.22,.68,.36,1); }
.tile:hover::after { translate: 120% 0; }
```

Per page: `index-cabana.html` swaps the hairline for a carved wood plank frame and the sheen
for a `cubic-bezier(.34,1.56,.64,1)` bounce on `scale`; `index-spectrum.html` drops the sheen
and lights a 2px `--accent` ring plus an accent-tinted `drop-shadow` — the doorway metaphor.

Source images: **`assets/games/*.jpg`**, which are the same 15 files as
`sample/thumbnail_900 _900 /` already renamed to kebab-case. Record why: the original folder
name and filenames contain spaces, so every `src` would need `%20` escaping — same pixels,
avoidable breakage. Flag this explicitly so the swap is a decision, not an accident.

**④ Mobile · ⑤ iPhone duo · ⑥ Desktop — reuse the existing CSS mockups**

`site.css` (root copy) already contains pure-CSS device frames — no new chrome to build:
`.device` / `.device__screen` (529–578), `.imac` / `.imac__body` / `.imac__screen` /
`.imac__chin` / `.imac__stand` (579–625), `.iphone` / `.iphone__screen` / `.iphone__island`
(626–677), `.device-duo` (678–700, with a ≤`1666` breakpoint). Markup pattern is at
[index-main.html:176-250](index-main.html#L176-L250). Lift those rule blocks into the new
shared sheet; do not rewrite them.

Screenshot mapping — **only three portrait captures exist in the repo, all Texas Hold'em**:

| Block | Frame | Image | Size |
|---|---|---|---|
| ④ mobile | `.iphone` single | `sample-data/01-poker04.png` | 330×717 |
| ⑤ duo | `.device-duo` → 2 × `.iphone` | `01-poker03.png` + `01-poker05.png` | 407×848, 440×956 |
| ⑥ desktop | `.imac`, chin holds `logo-pokerbolt.png` | `sample-data/12-blackjack01.png` | 1920×935 |

Record the constraint plainly: **there is no portrait screenshot of any game but Hold'em**
(verified across all 29 files in `sample-data/`), so ④ and ⑤ can only ever show Hold'em
until someone captures more. Use `12-blackjack01.png` for ⑥ rather than `01-poker.png` —
index-main uses the latter, but it is 728×344 and visibly soft at iMac width, while fifteen
1920×935 captures are sitting unused.

Captions: "iPhone 18 · action buttons under your hand" / "iPhone duo · portrait client" /
"iMac · full table view" — the wording already on `index-main.html`, kept so the pages agree.

**Composition — do not centre all three.** `index-main.html` stacks them as three centred
figures and the page goes limp in the middle. Instead:

- **⑤ duo** lives in the *hero*, not in a section of its own: absolutely positioned, bleeding
  past the right edge (`margin-right: calc(var(--gutter) * -1)`), the two phones rotated
  `-6deg` and `+4deg` with `translate: 0 1.5rem` on the second so they overlap. It crosses the
  hero's closing `.rule`. This is the first thing above the fold and it is doing the selling.
- **④ mobile** is a two-column split — copy left, single phone right, `align-items: end` so the
  phone's bottom edge lands on the baseline of the last line of copy. Not centred.
- **⑥ desktop** is full-bleed `width: 100vw; margin-inline: calc(50% - 50vw)`, the iMac
  oversized and cropped at the bottom so the stand runs off the page. The chin keeps
  `logo-pokerbolt.png` — brand sign-off at the end of the scroll.

All three frames get a slow idle float so the page is never fully still:
`@keyframes drift { 50% { translate: 0 -8px } }` at `9s ease-in-out infinite`, offset per
device so they never sync.

#### 6.4 Motion budget

One orchestrated page load beats scattered micro-interactions. The budget for the whole page:

1. **Load** — header and hero type rise and fade (`opacity`/`translate`, 500ms, 60ms stagger).
2. **Tiles** — staggered diagonal sweep as each group scrolls in, via `animation-delay:
   calc(var(--i) * 55ms)` with `--i` set inline on each `<li>`. `index.html` already uses this
   exact `style="--i:0"` pattern — reuse it.
3. **Hover** — tile scale + sheen (above), chip lift.
4. **Idle** — device drift only.

Nothing else moves. Animate only `opacity`, `translate`, `scale`, `rotate` and `filter` — no
`top`/`left`/`width`, no layout thrash. And gate the lot:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
                           transition-duration: .01ms !important; }
}
```

The reveal must use `animation: … both` with the end state as the default, so a reader with
reduced motion or a failed script sees the finished page, never a blank one.

### 7. Known debt

Record what the audit turned up so the rebuild doesn't inherit it:
- two files named `site.css`, disjoint token vocabularies
- `assets/games/` vs `sample-data/` split across pages — new pages use `assets/` only
- `index-main.html` links `href="sample/index.html"`, which does not exist
- README line 28 claims `sample-data/` is unlinked; four pages depend on it
- no `--shadow-*` or radius token exists anywhere; shadows are inline literals

### 8. What this document does not do

State plainly that the nine existing pages are left untouched, and that `new-plan.md` is the
input to a later build, not the build itself.

---

## Files

- **Create:** `new-plan.md` (repo root) — the only file written.
- **Read for reference, do not modify:** `site.css` (device mockup rules, lines 495–700),
  `index-studio.html` (the `c-cat` grouping), `css/site.css`, `css/beach.css`,
  `css/studio.css`, `README.md`, `screenshots/all-pages.png`.

## Verification

1. `new-plan.md` exists at the repo root and `git status` shows it as the only new tracked file.
2. Every hex in the doc traces to a source image named in §1 — spot-check three by re-running
   the sampler on `sample/thumbnail_900 _900 /blackjack.jpg` and confirming `#FEF78C` /
   `#FFCD36` / `#C4293B` appear.
3. Paste the CSS recipes into a scratch HTML file, load Archivo Black and Titan One, and check
   the three that fail silently rather than loudly:
   - §4 Family B heading renders gold-with-red-outline, not solid red — it collapses to solid
     if `paint-order` is dropped.
   - §6.1 chip renders as a dashed-edge disc with a dark face, not a solid circle — the
     `repeating-conic-gradient` needs the `from 9deg` or the dashes land on the axis.
   - §6.2 rule shows a pip sitting *on* the line with the line broken behind it — the pip's
     `background` must match the page ink or it reads as a floating diamond.
4. All 15 titles are accounted for twice over, two different ways: §3 splits them 9 (family A)
   + 6 (family B); §6② splits them 2+3+5+3+2 by group. Both must total 15, matching
   `ls assets/games | wc -l`.
5. Every image path named in §6 resolves — `sample/BG-desktop.jpeg`, `sample/BG-mobile.jpeg`,
   `sample-data/01-poker03.png`, `01-poker04.png`, `01-poker05.png`,
   `sample-data/12-blackjack01.png`, `sample-data/logo-pokerbolt.png`. Confirm with
   `ls` on each; a typo here is a broken mockup in all three pages.
6. Re-confirm the portrait constraint before writing it as fact:
   `python3 -c "from PIL import Image;import glob;print([p for p in glob.glob('sample-data/*.png') if Image.open(p).size[1]>Image.open(p).size[0]])"`
   must return exactly the three `01-poker*` files.
