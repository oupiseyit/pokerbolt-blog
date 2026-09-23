import { useState } from "react";
import manifest from "../data/images.js";

// `src` is the original path — "sample-data/01-poker.png" — which is a key
// into the generated manifest, not a URL. The data files keep their original
// strings; the widths and the intrinsic size come from scripts/images.mjs.
const url = (src, w) => `img/${src.replace(/\.\w+$/, "")}-${w}.webp`;

// A shimmer holds the image's box until the file decodes, then cross-fades
// out. onError clears it too — a broken image should not shimmer forever.
export default function Img({ src, sizes = "100vw", skeleton = "sk--media", shellClass = "", ...img }) {
  const [loaded, setLoaded] = useState(false);
  const done = () => setLoaded(true);
  const { w, h, widths } = manifest[src];

  return (
    <span className={`img-shell ${shellClass} ${loaded ? "is-loaded" : ""}`}>
      <span className={`sk ${skeleton}`} aria-hidden="true" />
      <img
        loading="lazy"
        decoding="async"
        src={url(src, widths.at(-1))}
        srcSet={widths.map((width) => `${url(src, width)} ${width}w`).join(", ")}
        sizes={sizes}
        // The original ratio, so the box is reserved before the file lands.
        width={w}
        height={h}
        onLoad={done}
        onError={done}
        {...img}
      />
    </span>
  );
}
