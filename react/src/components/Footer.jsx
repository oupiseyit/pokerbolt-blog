const LINKS = [
  ["#library", "Games"],
  ["#tutorials", "How to play"],
  ["#devices", "Play anywhere"],
  ["#compare", "Compare"],
  ["#hand-ranking", "Hand ranking"],
  ["sample/index.html", "Developer docs"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <nav className="nav-secondary" aria-label="Footer">
          <ul>
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              <a href="#responsible" aria-disabled="true">Responsible play (offline)</a>
            </li>
          </ul>
        </nav>
        <p>Play responsibly. 18+ only.</p>
      </div>
    </footer>
  );
}
