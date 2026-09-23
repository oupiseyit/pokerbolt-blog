import { SkeletonTable } from "./Skeletons.jsx";

export default function HandRanking({ rows }) {
  return (
    <section id="hand-ranking" aria-labelledby="hand-ranking-title">
      <div className="section-head">
        <h2 id="hand-ranking-title">Poker hand ranking</h2>
        <p>
          Used by Texas Hold'em, Omaha, and the five-card shapes in both Capsa
          games. Strongest first.
        </p>
      </div>
      <div className="table-scroll">
        {!rows ? (
          <SkeletonTable rows={10} cols={3} />
        ) : (
          <table className="swap-in">
            <caption>Five-card hands, strongest to weakest</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hand</th>
                <th scope="col">What it is</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([rank, hand, what]) => (
                <tr key={rank}>
                  <th scope="row">{rank}</th>
                  <td>{hand}</td>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="cta">
        <h2>Ready to sit down?</h2>
        <p>
          Pick a game from the library and read its tutorial, or take the
          integration guide instead if you are building against the platform
          rather than playing on it.
        </p>
        <a className="btn btn--primary" href="#library">Browse the games</a>
        <a className="btn" href="#">Integration guide</a>
      </div>
    </section>
  );
}
