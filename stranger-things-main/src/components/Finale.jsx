import { useEffect, useRef } from "react";
import "./Finale.css";

const TITLE = "THE UPSIDE DOWN";

export default function Finale() {
  const sectionRef = useRef(null);
  const revealRef  = useRef(null);
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const lettersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const reveal  = revealRef.current;

    // ── cursor reveal ──
    const onMove  = (e) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onEnter = () => reveal.classList.add("active");
    const onLeave = () => reveal.classList.remove("active");

    const tick = () => {
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.1;
      reveal.style.setProperty("--x", `${currentRef.current.x}px`);
      reveal.style.setProperty("--y", `${currentRef.current.y}px`);
      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    // ── horror letter reveal on scroll into view ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        lettersRef.current.forEach((el, i) => {
          if (!el) return;
          const delay = i * 45;
          setTimeout(() => el.classList.add("glitch"), delay);
          setTimeout(() => {
            el.classList.remove("glitch");
            el.classList.add("revealed");
          }, delay + 300);
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="finale" className="finale" ref={sectionRef}>
      <div className="finale__base" />
      <div className="finale__cover" ref={revealRef} />

      <div className="finale__content">
        <p className="finale__hint">move your cursor to experience</p>
        <h2 className="finale__title">
          {TITLE.split("").map((ch, i) => (
            <span
              key={i}
              ref={el => (lettersRef.current[i] = el)}
              className="finale__letter"
              style={{ "--i": i }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
