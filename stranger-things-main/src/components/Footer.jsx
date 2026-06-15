import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__lights">
        {"FRIENDS DON'T LIE".split("").map((ch, i) => (
          <span
            key={i}
            className="footer__bulb"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <p className="footer__text">
        A non-commercial fan project. Stranger Things © Netflix.
      </p>
      <p className="footer__credit">Built with React + GSAP · {new Date().getFullYear()}</p>
    </footer>
  );
}
