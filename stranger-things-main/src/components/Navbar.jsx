import { useState, useEffect } from "react";
import "./Navbar.css";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Upside Down", href: "#portal" },
  { label: "Heroes", href: "#characters" },
  { label: "Creatures", href: "#creatures" },
  { label: "Hawkins", href: "#hawkins" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <a href="#hero" className="navbar__logo">
        STRANGER<span>THINGS</span>
      </a>

      <button
        className="navbar__burger"
        onClick={() => setOpen((o) => !o)}
        aria-label="menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`navbar__links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
