import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portal.css";

gsap.registerPlugin(ScrollTrigger);

export default function Portal() {
  const ring = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ring.current,
        { scale: 0.3, rotate: 0 },
        {
          scale: 1.4,
          rotate: 180,
          ease: "none",
          scrollTrigger: {
            trigger: "#portal",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.from(text.current, {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: "#portal",
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="portal" className="portal">
      <div ref={ring} className="portal__ring">
        <div className="portal__ring-inner" />
        <div className="portal__ring-inner portal__ring-inner--2" />
      </div>
      <h2 ref={text} className="portal__text">
        ENTERING THE<br />UPSIDE DOWN
      </h2>
    </section>
  );
}
