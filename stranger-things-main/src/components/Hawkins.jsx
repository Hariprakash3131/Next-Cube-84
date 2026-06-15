import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations } from "../data/content";
import "./Hawkins.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hawkins() {
  const layerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hawkins",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".loc-card", {
        opacity: 0,
        x: -60,
        stagger: 0.15,
        scrollTrigger: { trigger: "#hawkins", start: "top 65%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hawkins" className="hawkins">
      <div ref={layerRef} className="hawkins__bg" />
      <h2 className="section-title hawkins__title">HAWKINS, INDIANA</h2>
      <div className="hawkins__grid">
        {locations.map((l) => (
          <div key={l.name} className="loc-card">
            <h3>{l.name}</h3>
            <p>{l.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
