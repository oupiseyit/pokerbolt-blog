/* Smoke check: drives the built page in headless Chrome and asserts the parts
   that are not obvious from reading the source — that the skeletons appear and
   then clear, that every game/table row renders, that no image 404s, and that
   the back-to-top button, theme menu and scroll spy still work.

   Usage:  npm run build && npm run preview &   then   node smoke.mjs
   Needs Chrome on the default macOS path; override with CHROME=/path/to/chrome. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2] || "http://localhost:4317/";
const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9444;

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "smoke-"))}`,
  "--no-first-run",
]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let tab;
  for (let i = 0; i < 20 && !tab; i++) {
    await wait(300);
    tab = await fetch(
      `http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(URL_)}`,
      { method: "PUT" }
    )
      .then((r) => r.json())
      .catch(() => null);
  }
  assert.ok(tab, "chrome did not come up");

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  const pending = new Map();
  const errors = [];
  let id = 0;

  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) {
      pending.get(d.id)(d);
      pending.delete(d.id);
    }
    if (d.method === "Runtime.exceptionThrown") {
      errors.push(d.params.exceptionDetails.text);
    }
  };
  await new Promise((r) => (ws.onopen = r));

  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const evalx = async (expression) =>
    (
      await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      })
    ).result?.result?.value;

  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 2000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await wait(300);
  const skeletons = await evalx(`document.querySelectorAll(".sk").length`);
  assert.ok(skeletons > 10, `expected skeletons on first paint, saw ${skeletons}`);

  await wait(3500);
  const page = JSON.parse(
    await evalx(`(() => {
      const n = (s) => document.querySelectorAll(s).length;
      return JSON.stringify({
        cards: n(".card"),
        articles: n("article.game"),
        thumbs: n(".toc a img"),
        compareRows: n("#compare tbody tr"),
        rankRows: n("#hand-ranking tbody tr"),
        shots: n(".shots img"),
        busy: n('[aria-busy="true"]'),
        // An image that actually failed, not one that is lazily deferred or
        // still decoding -- complete-without-naturalWidth is true for both,
        // which made this flaky on a slow server.
        broken: performance
          .getEntriesByType("resource")
          .filter((r) => r.initiatorType === "img" && r.responseStatus >= 400)
          .map((r) => r.name),
      });
    })()`)
  );

  assert.deepEqual(errors, [], "page threw");
  assert.equal(page.cards, 15);
  assert.equal(page.articles, 15);
  assert.equal(page.thumbs, 15);
  assert.equal(page.compareRows, 11);
  assert.equal(page.rankRows, 10);
  assert.equal(page.shots, 25);
  assert.equal(page.busy, 0, "skeletons never cleared");
  assert.deepEqual(page.broken, [], "broken images");

  // The stylesheet names three families that were declared but never loaded,
  // so every headline was rendering in Arial Black or the system sans. This
  // needs the network — offline it fails, which is the right signal.
  const fonts = JSON.parse(
    await evalx(`(async () => { await document.fonts.ready; return JSON.stringify({
      archivo: document.fonts.check("400 40px 'Archivo Black'"),
      barlow: document.fonts.check("400 15px Barlow"),
      barlowBold: document.fonts.check("700 15px Barlow"),
      cond300: document.fonts.check("300 40px 'Barlow Condensed'"),
      cond600: document.fonts.check("600 40px 'Barlow Condensed'"),
    }); })()`)
  );
  assert.ok(
    Object.values(fonts).every(Boolean),
    `fonts did not load: ${JSON.stringify(fonts)}`
  );

  // --color-border used to be a surface fill, which measured 1.09:1. The point
  // of the assertion is that the token re-derives per theme, so it runs twice.
  const channels = (s) => {
    const n = s.match(/[\d.]+/g).map(Number);
    return s.startsWith("color(")
      ? [...n.slice(0, 3).map((v) => v * 255), n[3] ?? 1]
      : [n[0], n[1], n[2], n[3] ?? 1];
  };
  const luminance = (c) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const ratio = (a, b) =>
    (Math.max(luminance(a), luminance(b)) + 0.05) /
    (Math.min(luminance(a), luminance(b)) + 0.05);
  const over = (fg, bg) => fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));

  const borders = {};
  for (const name of ["dark", "light"]) {
    await evalx(`document.documentElement.dataset.theme = ${JSON.stringify(name)}`);
    const probe = JSON.parse(
      await evalx(`(() => {
        const read = (sel, side) => {
          const el = document.querySelector(sel);
          const cs = getComputedStyle(el);
          let bg = cs.backgroundColor, p = el;
          while (bg === "rgba(0, 0, 0, 0)" && (p = p.parentElement)) bg = getComputedStyle(p).backgroundColor;
          return [cs[side], bg];
        };
        return JSON.stringify({
          card: read(".card", "borderTopColor"),
          head: read(".section-head", "borderBottomColor"),
          table: read(".table-scroll", "borderTopColor"),
          cell: read("#compare tbody td", "borderBottomColor"),
        });
      })()`)
    );
    for (const [where, [line, bg]] of Object.entries(probe)) {
      const r = ratio(over(channels(line), channels(bg)), channels(bg));
      borders[`${name}.${where}`] = Number(r.toFixed(2));
      assert.ok(r >= 1.9, `${name} ${where} hairline only ${r.toFixed(2)}:1`);
    }
  }
  await evalx(`delete document.documentElement.dataset.theme`);

  // .game__num lost a specificity contest to .game__head p and rendered at
  // 15px in the 90px column reserved for it.
  const nums = JSON.parse(
    await evalx(`(() => {
      const all = [...document.querySelectorAll(".game__num")].map((el) => {
        const cs = getComputedStyle(el);
        return [cs.fontSize, cs.marginTop, cs.marginBottom, cs.fontFamily.split(",")[0].replace(/"/g, "")];
      });
      const intro = getComputedStyle(document.querySelector(".game__head > div > p"));
      return JSON.stringify({ all, introSize: intro.fontSize, introMax: intro.maxWidth });
    })()`)
  );
  assert.equal(nums.all.length, 15);
  for (const [size, marginTop, marginBottom, family] of nums.all) {
    assert.equal(size, "40px", "numeral is still matching .game__head p");
    assert.equal(marginTop, "0px", "the UA margin came back on .game__num");
    assert.equal(marginBottom, "0px");
    assert.equal(family, "Barlow Condensed", "condensed face not applied to the numeral");
  }
  assert.equal(nums.introSize, "15px", "the intro paragraph lost its rule");
  assert.notEqual(nums.introMax, "none", "the intro paragraph lost its 62ch measure");

  // 40 MB of PNGs, served raw at every size.
  const media = JSON.parse(
    await evalx(`(() => {
      // currentSrc is empty on a lazy image that never entered the viewport,
      // which is the point of lazy — only judge the ones that did load.
      const list = [...document.images].filter((i) => i.currentSrc);
      return JSON.stringify({
        fetched: list.length,
        nonWebp: list.filter((i) => !/\\.webp(\\?|$)/.test(i.currentSrc)).map((i) => i.currentSrc),
        noDims: list.filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length,
        // Only images that actually have a ladder to choose from — the two
        // wordmarks are a single fixed file sized for 3x on purpose.
        oversize: list
          .filter((i) => i.srcset && i.naturalWidth > i.getBoundingClientRect().width * 3 + 1)
          .map((i) => [i.currentSrc.split("/").pop(), i.naturalWidth, Math.round(i.getBoundingClientRect().width)]),
        hero: [...document.querySelectorAll(".hero__art img")].every(
          (i) => i.loading === "eager" && i.fetchPriority === "high"
        ),
        bytes: performance
          .getEntriesByType("resource")
          .filter((r) => r.initiatorType === "img")
          .reduce((a, r) => a + (r.encodedBodySize || 0), 0),
      });
    })()`)
  );
  assert.ok(media.fetched > 20, `only ${media.fetched} images loaded`);
  assert.deepEqual(media.nonWebp, [], "something is still serving an original");
  assert.equal(media.noDims, 0, "an <img> is missing width/height — CLS");
  assert.deepEqual(media.oversize, [], "srcset picked a rung over 3x the render size");
  assert.ok(media.hero, "hero art is not eager/high-priority");
  assert.ok(media.bytes < 1_500_000, `image bytes ${(media.bytes / 1e6).toFixed(1)} MB`);

  const top = JSON.parse(
    await evalx(`(() => { window.scrollTo(0, 6000); return new Promise((res) =>
      setTimeout(() => {
        const b = document.querySelector(".to-top");
        const before = window.scrollY;
        const visible = getComputedStyle(b).visibility;
        b.click();
        setTimeout(() => res(JSON.stringify({ visible, before, after: window.scrollY })), 1500);
      }, 800)); })()`)
  );
  assert.equal(top.visible, "visible", "back-to-top stayed hidden");
  assert.ok(top.before > 1000 && top.after < 50, `back-to-top did not scroll: ${JSON.stringify(top)}`);

  const theme = JSON.parse(
    await evalx(`(() => { document.querySelectorAll(".theme-menu__item")[3].click();
      return new Promise((res) => setTimeout(() => res(JSON.stringify({
        theme: document.documentElement.dataset.theme,
        stored: localStorage.getItem("pokerbolt-theme"),
      })), 300)); })()`)
  );
  assert.equal(theme.theme, "ember");
  assert.equal(theme.stored, "ember");

  const spy = await evalx(`(() => { document.querySelector('a[href="#niu-niu"]').click();
    return new Promise((res) => setTimeout(() => res(
      document.querySelector(".toc a[aria-current]")?.getAttribute("href")
    ), 1500)); })()`);
  assert.ok(spy, "scroll spy marked nothing");

  console.log("smoke ok", {
    skeletons,
    ...page,
    top,
    theme,
    spy,
    fonts,
    borders,
    numeral: nums.all[0],
    images: { bytes: media.bytes, count: media.nonWebp.length === 0 ? "all webp" : "mixed" },
  });
} finally {
  chrome.kill();
}
