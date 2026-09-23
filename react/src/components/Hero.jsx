import Img from "./Img.jsx";

const META = [
  ["Games", "15"],
  ["Card titles", "11"],
  ["Domino titles", "04"],
  ["Read time", "2m"],
];

const DUO = [
  ["sample-data/01-poker03.png", "Pokerbolt poker table on an iPhone, portrait layout"],
  ["sample-data/01-poker05.png", "A second Pokerbolt table showing the betting controls"],
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Fifteen titles · One client</p>
        <h1 id="hero-title">
          <span className="mask"><span className="line">The table</span></span>
          <span className="mask"><em className="line">is open</em></span>
        </h1>
        <p className="lede">
          Every game shipped in the Pokerbolt client, documented the same way:
          what you are dealt, whose turn it is, how a hand is scored, and what
          the buttons on the table actually do. Read a tutorial end to end in
          about two minutes, then sit down.
        </p>
        <dl className="hero__meta">
          {META.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero__art">
        <div className="device-duo device">
          {DUO.map(([src, alt]) => (
            <div className="iphone" key={src}>
              <span className="iphone__island" aria-hidden="true" />
              <div className="device__screen iphone__screen">
                {/* The LCP element — it gets to jump the lazy queue. */}
                <Img
                  src={src}
                  alt={alt}
                  sizes="224px"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="device-caption">iPhone duo · portrait client</p>
      </div>
    </section>
  );
}
