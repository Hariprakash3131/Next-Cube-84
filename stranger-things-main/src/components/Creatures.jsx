import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { creatures } from "../data/content";
import "./Creatures.css";

gsap.registerPlugin(ScrollTrigger);

export default function Creatures() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".creature-card", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: "#creatures", start: "top 70%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="creatures" className="creatures">
      <h2 className="section-title creatures__title">CREATURES OF THE UPSIDE DOWN</h2>
      <div className="creatures__grid">
        {creatures.map((m) => (
          <div key={m.name} className="creature-card">
            <div className="creature-card__inner">
              <div className="creature-card__front">
                {m.img && <img src={m.img} alt={m.name} className="creature-card__img" />}
                <h3>{m.name}</h3>
                <span className={`threat threat--${m.threat.toLowerCase()}`}>
                  Threat: {m.threat}
                </span>
              </div>
              <div className="creature-card__back">
                <p>{m.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
