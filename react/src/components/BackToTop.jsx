import { useEffect, useState } from "react";

// A <button>, not an anchor: #top sits on the sticky masthead, which is
// pinned to the viewport top whenever you have scrolled, so the browser reads
// that anchor as already in view and refuses to move. behavior is left at its
// default so the html rule -- and the reduced-motion override -- decide
// whether it animates.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting)
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={`btn to-top ${visible ? "is-visible" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19.5V4.8M5.2 11.6 12 4.8l6.8 6.8" />
      </svg>
    </button>
  );
}
