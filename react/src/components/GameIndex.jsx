import { useEffect, useRef } from "react";
import Img from "./Img.jsx";
import { SkeletonThumbs } from "./Skeletons.jsx";
import { useScrollSpy } from "../hooks/useScrollSpy.js";

export default function GameIndex({ games }) {
  const active = useScrollSpy(".game", games);
  const list = useRef(null);

  // Keep the active entry visible, but only when the index is its own scroll
  // container — otherwise this would move the page.
  useEffect(() => {
    const el = list.current;
    if (!el || !active) return;
    const link = el.querySelector(`a[href="#${active}"]`);
    if (link && el.scrollHeight > el.clientHeight) {
      link.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  return (
    <aside className="sidebar" ref={list}>
      <nav className="toc" aria-label="Game index">
        <h2>Game index</h2>
        {!games ? (
          <SkeletonThumbs />
        ) : (
          <ul className="swap-in">
            {games.map((game) => (
              <li key={game.id}>
                <a
                  href={`#${game.id}`}
                  aria-current={active === game.id ? "true" : undefined}
                >
                  <Img
                    src={game.thumb}
                    alt={game.thumbAlt}
                    sizes="80px"
                    skeleton="sk--thumb"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
