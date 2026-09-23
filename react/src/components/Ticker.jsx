import { Fragment } from "react";

// Two passes of the same list so the -50% marquee loops without a seam.
export default function Ticker({ games }) {
  if (!games) return null;
  const names = games.map((g) => g.card.title);

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...names, ...names].map((name, i) => (
          <Fragment key={i}>
            <span>{name}</span>
            <i aria-hidden="true">✦</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
