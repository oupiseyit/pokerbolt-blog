import { useReveal } from "../hooks/useReveal.js";

// Wraps a block so it rises into place the first time it is scrolled to.
// `i` staggers siblings; the delay is read off --i in app.css.
export default function Reveal({ as: Tag = "div", i = 0, className = "", style, children, ...rest }) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll ${className}`.trim()}
      style={{ "--i": i, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
