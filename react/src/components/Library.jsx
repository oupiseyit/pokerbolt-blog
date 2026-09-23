import Img from "./Img.jsx";
import Reveal from "./Reveal.jsx";
import { SkeletonCards } from "./Skeletons.jsx";

export default function Library({ games }) {
  return (
    <section id="library" aria-labelledby="library-title">
      <div className="section-head">
        <h2 id="library-title">The library</h2>
        <p>Pick a game to jump to its tutorial. Every card links to the full rules below.</p>
      </div>

      {!games ? (
        <SkeletonCards />
      ) : (
        <ul className="game-grid swap-in">
          {games.map((game, i) => (
            <Reveal as="li" key={game.id} i={i % 6}>
              <a className="card" href={`#${game.id}`}>
                <span className="card__media">
                  <Img
                    src={game.card.image}
                    alt=""
                    sizes="(min-width: 62rem) 260px, (min-width: 48rem) 33vw, 100vw"
                  />
                  <span className="card__num">{game.num}</span>
                </span>
                <span className="card__body">
                  <h3>{game.card.title}</h3>
                  <p>{game.card.blurb}</p>
                  <span className="card__go">Read the rules</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
