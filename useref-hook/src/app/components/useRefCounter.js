'use client'

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stackItems = [
  ["React 18", "Component architecture"],
  ["Vite 5", "Blazing fast dev/build"],
  ["GSAP 3 + ScrollTrigger", "All scroll-driven and timeline animations"],
  ["Lenis", "Smooth inertia scrolling"],
  ["CSS Mask API", "Cursor reveal effect in Upside Down page"],
  ["IntersectionObserver", "Horror letter reveal trigger"],
  ["requestAnimationFrame", "Lerp-based cursor tracking"],
];

export default function Counter() {
  const countRef = useRef(0);
  const cursorRef = useRef(null);
  const heroRef = useRef(null);
  const revealRef = useRef(null);
  const sectionRefs = useRef([]);
  const [count, setCount] = useState(0);
  const [lettersVisible, setLettersVisible] = useState(false);

  function increaseCount() {
    countRef.current++;
    setCount(countRef.current);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let lenisFrame;

    function lenisRaf(time) {
      lenis.raf(time);
      lenisFrame = requestAnimationFrame(lenisRaf);
    }

    lenisFrame = requestAnimationFrame(lenisRaf);

    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      sectionRefs.current.forEach((section) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { y: 90, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom 38%",
              scrub: 0.7,
            },
          }
        );
      });
    }, heroRef);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let cursorFrame;

    function handlePointerMove(event) {
      target.x = event.clientX;
      target.y = event.clientY;
    }

    function animateCursor() {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.setProperty("--mask-x", `${current.x}px`);
        cursorRef.current.style.setProperty("--mask-y", `${current.y}px`);
      }

      cursorFrame = requestAnimationFrame(animateCursor);
    }

    window.addEventListener("pointermove", handlePointerMove);
    cursorFrame = requestAnimationFrame(animateCursor);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLettersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => {
      cancelAnimationFrame(lenisFrame);
      cancelAnimationFrame(cursorFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08080c] text-white">
      <section
        ref={heroRef}
        className="relative grid min-h-screen place-items-center px-6 py-20"
      >
        <div
          ref={cursorRef}
          className="pointer-events-none fixed inset-0 z-0 bg-[url('/next.svg')] bg-center bg-no-repeat opacity-40"
          style={{
            "--mask-x": "50vw",
            "--mask-y": "50vh",
            WebkitMaskImage:
              "radial-gradient(circle 150px at var(--mask-x) var(--mask-y), black 0%, transparent 72%)",
            maskImage:
              "radial-gradient(circle 150px at var(--mask-x) var(--mask-y), black 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 w-full max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-red-400">
            Upside Down Scroll Lab
          </p>

          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
            React component architecture with cinematic scroll motion.
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={increaseCount}
              className="rounded-lg bg-red-600 px-6 py-4 text-xl font-bold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
            >
              Add + {count}
            </button>

            <span className="text-sm text-zinc-400">
              Count is stored with useRef, then painted with state.
            </span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-5 px-6 pb-28">
        {stackItems.map(([title, description], index) => (
          <article
            key={title}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="flex  flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-zinc-300">{description}</p>
            </div>
          </article>
        ))}
      </section>

      <section
        ref={revealRef}
        className="relative z-10 grid min-h-screen place-items-center px-6 py-24"
      >
        <h2 className="max-w-5xl text-center text-5xl font-black uppercase leading-tight text-red-500 md:text-8xl">
          {"horror letter reveal".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`inline-block transition duration-700 ${
                lettersVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm"
              }`}
              style={{ transitionDelay: `${index * 45}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h2>
      </section>
    </main>
  );
}
