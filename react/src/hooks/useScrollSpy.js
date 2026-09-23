import { useEffect, useState } from "react";

// Marks whichever game section is crossing the middle of the viewport. The
// band is a tenth of the viewport tall, so only one section is ever active.
export function useScrollSpy(selector, deps) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [selector, deps]);

  return active;
}
