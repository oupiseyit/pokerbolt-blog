import { SkeletonTable } from "./Skeletons.jsx";

export default function CompareTable({ rows }) {
  return (
    <section id="compare" aria-labelledby="compare-title">
      <div className="section-head">
        <h2 id="compare-title">At a glance</h2>
        <p>Seats, deal size and who you are actually playing against.</p>
      </div>
      <div className="table-scroll">
        {!rows ? (
          <SkeletonTable rows={11} cols={4} />
        ) : (
          <table className="swap-in">
            <caption>Table shape by game</caption>
            <thead>
              <tr>
                <th scope="col">Game</th>
                <th scope="col">Seats</th>
                <th scope="col">You are dealt</th>
                <th scope="col">You play against</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <a href={`#${row.id}`}>{row.game}</a>
                  </th>
                  <td>{row.seats}</td>
                  <td>{row.dealt}</td>
                  <td>{row.against}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
