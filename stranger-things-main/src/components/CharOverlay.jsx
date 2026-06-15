import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAST = [
  { id:"eleven", img:"/nobg/eleven.png",          left:50, imgH:90, z:20 },
  { id:"mike",   img:"/nobg/mike wheeler.png",    left:40, imgH:78, z:14 },
  { id:"will",   img:"/nobg/will buyers.png",     left:62, imgH:76, z:13 },
  { id:"steve",  img:"/nobg/steve harington.png", left:25, imgH:76, z:16 },
  { id:"nancy",  img:"/nobg/nancy.png",           left:16, imgH:65, z:10 },
  { id:"dustin", img:"/nobg/dustin.png",          left:33, imgH:64, z:12 },
  { id:"lucas",  img:"/nobg/Lucas.png",           left:74, imgH:67, z:11 },
  { id:"max",    img:"/nobg/max mayfield.png",    left:84, imgH:65, z:10 },
];

const FADE_START = 0.95;

export default function CharOverlay() {
  const charRefs = useRef({});

  useEffect(() => {
    const imgs    = Object.values(charRefs.current).map(el => el?.querySelector("img")).filter(Boolean);
    const pending = imgs.filter(img => !img.complete);

    const build = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ── 1. Hero formation (fixed viewport coords) ──────────────────
      const heroFormation = {};
      CAST.forEach(c => {
        const el    = charRefs.current[c.id];
        const imgEl = el?.querySelector("img");
        if (!el || !imgEl) return;
        const h = vh * (c.imgH / 100);
        const w = imgEl.naturalWidth && imgEl.naturalHeight
          ? imgEl.naturalWidth * (h / imgEl.naturalHeight)
          : h * 0.45;
        heroFormation[c.id] = { x: vw * (c.left / 100) - w / 2, y: vh - h, w, h };
        gsap.set(el, { x: heroFormation[c.id].x, y: heroFormation[c.id].y, width: w, height: h, opacity: 1, zIndex: c.z });
      });

      // ── 2. Pin hero FIRST so the spacer is inserted before measuring ─
      const heroEl = document.querySelector(".fb-section");
      const heroH  = heroEl ? heroEl.offsetHeight : vh;

      ScrollTrigger.create({
        trigger: ".fb-section",
        start:   "top top",
        end:     `+=${heroH}`,
        pin:     true,
      });

      // Flush ScrollTrigger so the pin spacer DOM change is committed
      ScrollTrigger.refresh();

      // ── 3. Measure card slots AFTER pin spacer is inserted ──────────
      // ScrollTrigger.refresh() shifts cards down by heroH in the document.
      // getBoundingClientRect() at scroll=0 now returns the correct docTop.
      const cardSlots = {};
      CAST.forEach(c => {
        const slot = document.querySelector(`[data-char-id="${c.id}"] .char-card__slot`);
        if (!slot) { console.warn(`[CharOverlay] no slot for ${c.id}`); return; }
        const r = slot.getBoundingClientRect();
        cardSlots[c.id] = {
          docLeft: r.left + window.scrollX,
          docTop:  r.top  + window.scrollY,
          w: r.width,
          h: r.height,
        };
        console.log(`[CharOverlay] ${c.id} slot docTop=${cardSlots[c.id].docTop.toFixed(0)}`);
      });

      // ── 4. Fixed destinations ───────────────────────────────────────
      // scrollRange = scrollY at which all slots are visible (~60vh).
      let scrollRange = heroH;
      CAST.forEach(c => {
        if (!cardSlots[c.id]) return;
        const needed = cardSlots[c.id].docTop - vh * 0.6 + cardSlots[c.id].h / 2;
        if (needed > scrollRange) scrollRange = needed;
      });
      console.log(`[CharOverlay] heroH=${heroH} scrollRange=${scrollRange.toFixed(0)}`);

      const destinations = {};
      CAST.forEach(c => {
        const slot = cardSlots[c.id];
        if (!slot) return;
        // At scrollY=scrollRange, slot viewport top = slot.docTop - scrollRange
        destinations[c.id] = { x: slot.docLeft, y: slot.docTop - scrollRange, w: slot.w, h: slot.h };
        console.log(`[CharOverlay] ${c.id} dest x=${destinations[c.id].x.toFixed(0)} y=${destinations[c.id].y.toFixed(0)}`);
      });

      // ── 5. Card images start hidden ─────────────────────────────────
      const cardImgs = {};
      CAST.forEach(c => {
        cardImgs[c.id] = document.querySelector(`[data-char-id="${c.id}"] .char-card__img`);
        if (cardImgs[c.id]) gsap.set(cardImgs[c.id], { opacity: 0 });
      });

      // ── 6. Per-frame driver via gsap.ticker ─────────────────────────
      // Lenis runs lenis.raf() on gsap.ticker. We add our ticker AFTER
      // useSmoothScroll registers Lenis, so we always read window.scrollY
      // after Lenis has updated it for this frame.
      const tick = () => {
        const lenisScroll = window.scrollY;
        const rawProgress = Math.max(0, Math.min(1, lenisScroll / scrollRange));

        CAST.forEach(c => {
          const el   = charRefs.current[c.id];
          const from = heroFormation[c.id];
          const dest = destinations[c.id];
          if (!el || !from || !dest) return;

          let charX, charY, charW, charH, charOpacity;

          if (rawProgress < FADE_START) {
            const p = rawProgress / FADE_START; // 0→1 over flight phase
            charX = from.x + (dest.x - from.x) * p;
            charY = from.y + (dest.y - from.y) * p;
            charW = from.w + (dest.w - from.w) * p;
            charH = from.h + (dest.h - from.h) * p;
            charOpacity = 1;
            if (cardImgs[c.id]) gsap.set(cardImgs[c.id], { opacity: 0 });
          } else {
            const fadeP = (rawProgress - FADE_START) / (1 - FADE_START);
            charX = dest.x; charY = dest.y; charW = dest.w; charH = dest.h;
            charOpacity = 1 - fadeP;
            if (cardImgs[c.id]) gsap.set(cardImgs[c.id], { opacity: fadeP });
          }

          gsap.set(el, { x: charX, y: charY, width: charW, height: charH, opacity: charOpacity });
        });
      };

      gsap.ticker.add(tick);
      tick(); // run once immediately

      return () => gsap.ticker.remove(tick);
    };

    let cleanup = () => {};
    const run = () => {
      if (pending.length === 0) {
        cleanup = build() || (() => {});
      } else {
        let n = 0;
        pending.forEach(img => {
          const done = () => { if (++n === pending.length) { cleanup = build() || (() => {}); } };
          img.addEventListener("load",  done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      }
    };
    // One rAF to let React finish painting before measuring
    const raf = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(raf);
      cleanup();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="char-overlay" aria-hidden="true">
      {CAST.map(c => (
        <div
          key={c.id}
          ref={el => (charRefs.current[c.id] = el)}
          className="char-overlay__char"
        >
          <img src={c.img} alt={c.id} draggable={false} />
        </div>
      ))}
    </div>
  );
}
