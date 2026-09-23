import Img from "./Img.jsx";
import Reveal from "./Reveal.jsx";

export default function Devices() {
  return (
    <section className="devices" id="devices" aria-labelledby="devices-title">
      <Reveal className="devices__intro">
        <h2 id="devices-title">Play anywhere</h2>
        <p>
          The same fifteen games, the same tables and the same balance on every
          screen. The desktop client gives you the full felt; the phone client
          stacks the seats into a portrait layout without hiding a single
          control.
        </p>
      </Reveal>

      <Reveal as="figure" className="device" i={1}>
        <div className="imac">
          <div className="imac__body">
            <div className="device__screen imac__screen">
              {/* 2436x1125. The sample-data shot of the same table is only
                  728x344, which is soft behind a ~780px iMac screen. */}
              <Img
                src="assets/screens/holdem-table.jpg"
                alt="Pokerbolt Texas Hold'em table on an iMac, nine seats around the felt"
                sizes="(min-width: 62rem) 780px, 100vw"
              />
            </div>
            <p className="imac__chin">
              <img
                className="brand-mark brand-mark--chin"
                src="img/sample-data/logo-pokerbolt-320.webp"
                alt=""
                width="3559"
                height="538"
                loading="lazy"
                decoding="async"
              />
            </p>
          </div>
          <div className="imac__stand" aria-hidden="true" />
        </div>
        <figcaption>iMac · Texas Hold'em, full table view</figcaption>
      </Reveal>

      <Reveal as="figure" className="device" i={2}>
        <div className="iphone">
          <span className="iphone__island" aria-hidden="true" />
          <div className="device__screen iphone__screen">
            <Img
              src="sample-data/01-poker04.png"
              alt="Pokerbolt poker table on an iPhone 18 with the action buttons under the hand"
              sizes="224px"
            />
          </div>
        </div>
        <figcaption>iPhone 18 · action buttons under your hand</figcaption>
      </Reveal>
    </section>
  );
}
