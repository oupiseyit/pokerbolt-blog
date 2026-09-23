import Img from "./Img.jsx";
import Reveal from "./Reveal.jsx";

// Step bodies and a few <dd>s carry inline <em>/<a> markup from the source
// page. It is authored content, not user input, so it goes in as HTML.
const html = (s) => ({ dangerouslySetInnerHTML: { __html: s } });

export default function GameArticle({ game }) {
  const heading = `t${game.num}`;

  return (
    <article className="game" id={game.id} aria-labelledby={heading}>
      <Reveal className="game__head">
        <p className="game__num">{game.num}</p>
        <div>
          <h2 id={heading}>{game.title}</h2>
          <p>{game.intro}</p>
          <ul className="tags">
            {game.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="game__body">
        <ol className="steps">
          {game.steps.map((step, i) => (
            <Reveal as="li" key={step.title} i={i}>
              <strong>{step.title}</strong>
              <span {...html(step.body)} />
            </Reveal>
          ))}
        </ol>

        <Reveal as="aside" className="facts" i={1}>
          <h3 className="facts__title">{game.factsTitle}</h3>
          <dl>
            {game.facts.map(([term, value]) => (
              <div key={term} style={{ display: "contents" }}>
                <dt>{term}</dt>
                <dd {...html(value)} />
              </div>
            ))}
          </dl>
          <p className="note">
            <b>{game.note.title}</b>
            {` ${game.note.body}`}
          </p>
        </Reveal>
      </div>

      {game.shots.length > 0 && (
        <ul className="shots">
          {game.shots.map((shot, i) => (
            <Reveal as="li" key={shot.src} i={i}>
              <figure>
                <Img
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(min-width: 62rem) 280px, (min-width: 48rem) 45vw, 100vw"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      )}
    </article>
  );
}
