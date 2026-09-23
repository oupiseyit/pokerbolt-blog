# Pokerbolt game library — React

`index-main.html` rebuilt as a React app, plus scroll animation and loading
skeletons. Same stylesheet, same markup classes, same copy.

```sh
npm install
npm run dev              # http://localhost:5173
npm run build            # -> ../app/, which is the live Pages folder
npm run preview          # serves the build on :4317
node smoke.mjs           # headless-Chrome check, needs preview running
npm run images           # regenerate public/img/ after artwork changes
```

`DESIGN-REVIEW.md` is the look-and-feel audit this app's fixes came out of, including
what was deliberately left alone.

## Deploying

Pages serves this repo's `main` branch from `/` on the legacy build type, so a
committed folder is a live URL. `npm run build` writes straight into `../app/`
(`base: "./"`, so every asset path is relative and works from a subfolder):

```sh
npm run build
git add -A app react && git commit -m "…" && git push
```

→ https://oupiseyit.github.io/pokerbolt-blog/app/

The build output is committed. Pages has no build step on this repo, so there is
nowhere else for it to come from. Give it a minute after the push, and hard-reload
(Cmd+Shift+R) — Pages sends `cache-control: max-age=600`.

## Layout

| Path | What |
| --- | --- |
| `src/data/games.js`, `tables.js` | Game content and both tables, extracted from the original HTML |
| `src/data/images.js` | Generated image manifest — widths and intrinsic size |
| `src/components/` | One component per section of the page |
| `src/hooks/` | Theme, scroll spy, scroll reveal, async data load |
| `src/styles/index-main.css` | Copy of `../css/index-main.css` + the three fixes in `DESIGN-REVIEW.md` |
| `src/styles/app.css` | The new layer: skeletons, reveal, image fade |
| `scripts/images.mjs` | Builds `public/img/` from the originals at the repo root |
| `public/img/` | Committed WebP derivatives — the only images this app serves |

## Images

`npm run images` reads the originals at the repo root and writes WebP at
`[160, 320, 640, 1280]`, each ladder clamped to the source's real width, plus the
manifest `Img.jsx` reads. It needs `cwebp` and ImageMagick
(`brew install webp imagemagick`), which is why it is a manual step and the output
is committed — `npm run build` has to work on a checkout without them.

The data files keep their original paths (`"sample-data/01-poker.png"`); those are
manifest keys now, not URLs. To add artwork: drop it in the source folder, run
`npm run images`, reference the original path.

This is what took `dist` from 51 MB to 4.7 MB.

## Animation

The original stylesheet already carries the page-load and scroll-timeline
animation; `app.css` adds what the static page had no way to do:

- **Scroll reveal** — `<Reveal>` adds `.is-in` the first time a block crosses
  into view, staggered by `--i`.
- **Image fade** — every `<Img>` holds a shimmer in its box until the file
  decodes, then cross-fades the picture in.
- **Skeleton → content** — `.swap-in` fades each section in when its data lands.

All of it sits inside `prefers-reduced-motion: no-preference`, so a reader who
asks for less motion gets the content with no movement at all.

## Skeletons

`useGames()` loads the content as a separate chunk, so the skeletons cover a
real async boundary rather than an artificial delay. Each section renders its
own shape — cards, index thumbnails, table rows, article blocks — sized to
match the real thing so nothing jumps on swap. One `aria-busy` per region, not
per block, so a screen reader hears "loading" once.

## Known gap

The back-to-top control is a `<button>` here, not an `<a href="#top">`: the
masthead is `position: sticky`, so the browser reads that anchor as already in
view and refuses to scroll. Same reason the static page needed a click handler.
