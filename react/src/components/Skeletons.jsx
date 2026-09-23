const lines = (n) =>
  Array.from({ length: n }, (_, i) => <span className="sk sk--line" key={i} />);

export function SkeletonCards({ count = 15 }) {
  return (
    <ul className="game-grid sk-region" aria-busy="true" aria-label="Loading the game library">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <div className="sk-card">
            <span className="sk sk--media" />
            <span className="sk sk--title" />
            {lines(2)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SkeletonThumbs({ count = 15 }) {
  return (
    <ul aria-busy="true" aria-label="Loading the game index">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <span className="sk sk--thumb" />
        </li>
      ))}
    </ul>
  );
}

export function SkeletonTable({ rows = 8, cols = 4 }) {
  return (
    <div className="sk-region" aria-busy="true" aria-label="Loading the table">
      {Array.from({ length: rows }, (_, r) => (
        <div className="sk-tags" key={r}>
          {Array.from({ length: cols }, (_, c) => (
            <span className="sk sk--line" style={{ flex: 1 }} key={c} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonArticles({ count = 3 }) {
  return (
    <div aria-busy="true" aria-label="Loading the tutorials">
      {Array.from({ length: count }, (_, i) => (
        <div className="sk-article" key={i}>
          <div className="sk-article__head">
            <span className="sk sk-article__num" />
            <div style={{ flex: 1 }}>
              <span className="sk sk--title" />
              {lines(3)}
              <div className="sk-tags">
                <span className="sk sk--pill" />
                <span className="sk sk--pill" />
                <span className="sk sk--pill" />
              </div>
            </div>
          </div>
          <div className="sk-article__body">
            <div>{lines(6)}</div>
            <div>{lines(6)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
