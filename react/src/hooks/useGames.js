import { useEffect, useState } from "react";

// The library is a separate chunk, so the first paint ships the shell and the
// game data streams in behind it — which is what the skeletons cover.
export function useGames() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let live = true;
    Promise.all([import("../data/games.js"), import("../data/tables.js")]).then(
      ([g, t]) => {
        if (live) setData({ games: g.games, ...t });
      }
    );
    return () => {
      live = false;
    };
  }, []);

  return data;
}
