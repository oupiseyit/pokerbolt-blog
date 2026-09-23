import { useCallback, useEffect, useState } from "react";

const KEY = "pokerbolt-theme";
export const THEMES = [
  { id: "dark", label: "Midnight" },
  { id: "light", label: "Daylight" },
  { id: "felt", label: "Felt" },
  { id: "ember", label: "Ember" },
  { id: "paper", label: "Paper" },
];
const DARK = new Set(["dark", "felt", "ember"]);

// System preference by default, overridden by an explicit choice that is
// remembered per browser. index.html applies the stored value before first
// paint; this only keeps it in sync from here on.
export function useTheme() {
  const [theme, set] = useState(
    () => document.documentElement.dataset.theme || null
  );
  const [systemLight, setSystemLight] = useState(
    () => window.matchMedia("(prefers-color-scheme: light)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => setSystemLight(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const setTheme = useCallback((next) => {
    document.documentElement.dataset.theme = next;
    set(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just won't survive a reload.
    }
  }, []);

  const current = theme || (systemLight ? "light" : "dark");
  return { theme, current, isDark: DARK.has(current), setTheme };
}
