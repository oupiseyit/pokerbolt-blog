import { THEMES, useTheme } from "../hooks/useTheme.js";

const NAV = [
  ["#library", "Games"],
  ["#tutorials", "How to play"],
  ["#devices", "Play anywhere"],
  ["#compare", "Compare"],
  ["#hand-ranking", "Hand ranking"],
];

function Sun() {
  return (
    <svg
      className="theme-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.2v2.1M12 19.7v2.1M4.1 4.1l1.5 1.5M18.4 18.4l1.5 1.5M2.2 12h2.1M19.7 12h2.1M4.1 19.9l1.5-1.5M18.4 5.6l1.5-1.5" />
    </svg>
  );
}

function Moon() {
  return (
    <svg className="theme-toggle__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.3 14.9A8.6 8.6 0 0 1 9.1 3.7a8.6 8.6 0 1 0 11.2 11.2Z" />
    </svg>
  );
}

export default function Masthead() {
  const { current, isDark, setTheme } = useTheme();

  return (
    <header className="masthead" id="top">
      <div className="shell masthead__inner">
        <p className="masthead__brand">
          {/* Raw <img>, not <Img>: it renders ~21px tall, so 320 covers 2x and
              a 4 KB wordmark does not want a shimmer. */}
          <img
            className="brand-mark"
            src="img/sample-data/logo-pokerbolt-320.webp"
            alt="Pokerbolt"
            width="3559"
            height="538"
            decoding="async"
          />
        </p>

        <nav className="nav-primary" aria-label="Primary">
          <ul>
            {NAV.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* The icon reports the theme in use, not the next one. */}
        <button
          className="btn theme-toggle"
          type="button"
          popoverTarget="theme-menu"
          aria-label={`Theme: ${current}. Change it`}
        >
          {isDark ? <Moon /> : <Sun />}
        </button>

        <div className="theme-menu" id="theme-menu" popover="auto">
          <p className="theme-menu__title" id="theme-menu-title">Theme</p>
          <div role="group" aria-labelledby="theme-menu-title">
            {THEMES.map(({ id, label }) => (
              <button
                key={id}
                className="theme-menu__item"
                type="button"
                aria-pressed={current === id}
                popoverTarget="theme-menu"
                popoverTargetAction="hide"
                onClick={() => setTheme(id)}
              >
                <span className="theme-menu__swatch" data-theme={id} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
