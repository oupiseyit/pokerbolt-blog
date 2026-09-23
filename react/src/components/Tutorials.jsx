import GameArticle from "./GameArticle.jsx";
import { SkeletonArticles } from "./Skeletons.jsx";

export default function Tutorials({ games }) {
  return (
    <section id="tutorials" aria-labelledby="tutorials-title">
      <div className="section-head">
        <h2 id="tutorials-title">How to play</h2>
        <p>
          Each tutorial follows the same order: the deal, the turn, the scoring,
          then the table controls.
        </p>
      </div>

      {!games ? (
        <SkeletonArticles count={3} />
      ) : (
        <div className="swap-in">
          {games.map((game) => (
            <GameArticle game={game} key={game.id} />
          ))}
        </div>
      )}
    </section>
  );
}
