import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const BOLTS = [
  "M 320 0 L 295 180 L 315 180 L 275 420 L 300 420 L 250 650",
  "M 680 20 L 710 200 L 688 200 L 730 440 L 705 440 L 750 680",
  "M 500 0 L 480 120 L 500 120 L 455 320",
  "M 200 50 L 185 230 L 205 230 L 170 460",
  "M 820 0 L 845 160 L 822 160 L 860 380",
];

export default function Hero() {
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const riftRef     = useRef(null);
  const fogRef      = useRef(null);
  const fireRef     = useRef(null);
  const boltRefs    = useRef([]);

  useEffect(() => {
    gsap.to(riftRef.current,  { opacity:0.85, scale:1.04, duration:3.5, yoyo:true, repeat:-1, ease:"sine.inOut", transformOrigin:"50% 50%" });
    gsap.to(fireRef.current,  { opacity:0.9,  scaleY:1.08, duration:2.2, yoyo:true, repeat:-1, ease:"sine.inOut", transformOrigin:"50% 100%" });
    gsap.to(fogRef.current,   { x:"3%", duration:18, yoyo:true, repeat:-1, ease:"sine.inOut" });
    boltRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.timeline({ repeat:-1, repeatDelay:3 + i * 1.3 })
        .set(el, { opacity:0 })
        .to(el,  { opacity:1,   duration:0.05 })
        .to(el,  { opacity:0,   duration:0.05 })
        .to(el,  { opacity:0.7, duration:0.04 })
        .to(el,  { opacity:0,   duration:0.12 })
        .to(el,  { opacity:0.4, duration:0.04 })
        .to(el,  { opacity:0,   duration:0.08 });
    });

    return () => gsap.killTweensOf([riftRef.current, fireRef.current, fogRef.current]);
  }, []);

  return (
    <section className="fb-section">
      <div className="fb-scene">
        <div className="fb-sky" />

        <div ref={riftRef} className="fb-rift-wrap">
          <svg className="fb-rift-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="riftGlow" cx="50%" cy="48%" r="38%">
                <stop offset="0%"   stopColor="#ff2200" stopOpacity="0.9" />
                <stop offset="30%"  stopColor="#cc0000" stopOpacity="0.7" />
                <stop offset="60%"  stopColor="#550000" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0"   />
              </radialGradient>
              <radialGradient id="voidGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#0a0005" stopOpacity="1" />
                <stop offset="55%"  stopColor="#1a0010" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0"   />
              </radialGradient>
              <linearGradient id="vecnaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#1a0015" stopOpacity="0.95" />
                <stop offset="50%"  stopColor="#0d000a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0"    />
              </linearGradient>
              <filter id="vecnaGlow"><feGaussianBlur stdDeviation="6" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
              <filter id="riftBlur"><feGaussianBlur stdDeviation="3"/></filter>
              <filter id="boltGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="500" cy="310" rx="380" ry="260" fill="url(#riftGlow)" />
            <path d="M 430 80 C 410 120, 370 140, 360 200 C 340 280, 350 320, 330 380 C 310 440, 290 460, 310 520 C 330 570, 370 560, 390 600 L 500 620 L 610 600 C 630 560, 670 570, 690 520 C 710 460, 690 440, 670 380 C 650 320, 660 280, 640 200 C 630 140, 590 120, 570 80 Z" fill="url(#voidGrad)" opacity="0.95"/>
            <path d="M 430 80 C 410 120, 370 140, 360 200 C 340 280, 350 320, 330 380 C 310 440, 290 460, 310 520 C 330 570, 370 560, 390 600 L 500 620 L 610 600 C 630 560, 670 570, 690 520 C 710 460, 690 440, 670 380 C 650 320, 660 280, 640 200 C 630 140, 590 120, 570 80 Z" fill="none" stroke="#ff3300" strokeWidth="8" opacity="0.7" filter="url(#riftBlur)"/>
            <g filter="url(#vecnaGlow)" opacity="0.92">
              <path d="M 500 150 C 480 155, 460 170, 455 195 C 448 225, 450 255, 445 285 C 438 320, 430 340, 435 370 C 438 390, 450 400, 465 410 C 475 418, 490 422, 500 422 C 510 422, 525 418, 535 410 C 550 400, 562 390, 565 370 C 570 340, 562 320, 555 285 C 550 255, 552 225, 545 195 C 540 170, 520 155, 500 150 Z" fill="url(#vecnaGrad)"/>
              <path d="M 488 150 C 484 140, 480 128, 482 115 C 484 98, 492 85, 500 80 C 508 85, 516 98, 518 115 C 520 128, 516 140, 512 150 Z" fill="#0d000a" opacity="0.9"/>
              <ellipse cx="500" cy="72" rx="28" ry="36" fill="#0d000a" opacity="0.9"/>
              <path d="M 480 48 L 472 20 L 484 45" fill="#1a0015" opacity="0.85"/>
              <path d="M 490 42 L 486 12 L 496 40" fill="#1a0015" opacity="0.85"/>
              <path d="M 500 40 L 500 8  L 506 38" fill="#1a0015" opacity="0.85"/>
              <path d="M 510 42 L 514 12 L 504 40" fill="#1a0015" opacity="0.85"/>
              <path d="M 520 48 L 528 20 L 516 45" fill="#1a0015" opacity="0.85"/>
              <ellipse cx="490" cy="68" rx="5" ry="6" fill="#ff1100" opacity="0.7"/>
              <ellipse cx="510" cy="68" rx="5" ry="6" fill="#ff1100" opacity="0.7"/>
              <path d="M 455 200 C 435 195, 405 185, 375 175 C 345 165, 310 160, 280 170 C 265 175, 252 185, 248 200 C 244 215, 252 228, 265 230 C 250 240, 238 255, 242 270 C 246 285, 262 290, 278 285 C 265 295, 258 310, 265 322 C 272 334, 288 336, 302 330 L 320 315 L 338 325 L 355 305 L 340 300 L 360 280 C 390 268, 420 258, 445 250 Z" fill="url(#vecnaGrad)"/>
              <path d="M 545 200 C 565 195, 595 185, 625 175 C 655 165, 690 160, 720 170 C 735 175, 748 185, 752 200 C 756 215, 748 228, 735 230 C 750 240, 762 255, 758 270 C 754 285, 738 290, 722 285 C 735 295, 742 310, 735 322 C 728 334, 712 336, 698 330 L 680 315 L 662 325 L 645 305 L 660 300 L 640 280 C 610 268, 580 258, 555 250 Z" fill="url(#vecnaGrad)"/>
              <path d="M 470 420 C 460 460, 440 500, 430 540 C 422 570, 425 590, 420 620" stroke="#1a0015" strokeWidth="6" fill="none" opacity="0.75" strokeLinecap="round"/>
              <path d="M 485 422 C 478 465, 472 510, 468 555 C 465 580, 466 600, 462 630" stroke="#1a0015" strokeWidth="5" fill="none" opacity="0.65" strokeLinecap="round"/>
              <path d="M 500 422 C 498 468, 496 515, 494 560 C 492 585, 492 605, 490 635" stroke="#1a0015" strokeWidth="7" fill="none" opacity="0.7" strokeLinecap="round"/>
              <path d="M 515 422 C 522 465, 528 510, 532 555 C 535 580, 534 600, 538 630" stroke="#1a0015" strokeWidth="5" fill="none" opacity="0.65" strokeLinecap="round"/>
              <path d="M 530 420 C 540 460, 560 500, 570 540 C 578 570, 575 590, 580 620" stroke="#1a0015" strokeWidth="6" fill="none" opacity="0.75" strokeLinecap="round"/>
            </g>
            <path d="M 488 150 C 484 140, 480 128, 482 115 C 484 98, 492 85, 500 80 C 508 85, 516 98, 518 115 C 520 128, 516 140, 512 150" fill="none" stroke="#ff2200" strokeWidth="1.5" opacity="0.6"/>
            {BOLTS.map((d, i) => (
              <g key={i} ref={el => (boltRefs.current[i] = el)} opacity="0">
                <path d={d} stroke="#ff4400" strokeWidth="8"  fill="none" opacity="0.4" strokeLinecap="round" filter="url(#boltGlow)"/>
                <path d={d} stroke="#ffcc88" strokeWidth="2"  fill="none" opacity="1"   strokeLinecap="round"/>
              </g>
            ))}
          </svg>
        </div>

        <div className="fb-clouds" />

        <svg className="fb-vines" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet">
          <defs><filter id="vineBlur"><feGaussianBlur stdDeviation="1.5"/></filter></defs>
          <path d="M 0 280 C 60 260, 100 240, 150 200 C 200 158, 210 130, 260 120 C 300 112, 330 125, 360 145 C 390 165, 400 185, 440 190" stroke="#1a0d00" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9"/>
          <path d="M 0 300 C 80 270, 140 250, 200 220 C 260 190, 280 165, 320 155" stroke="#0d0700" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.95"/>
          <path d="M 1200 285 C 1140 262, 1095 238, 1040 198 C 985 158, 970 128, 920 118 C 880 110, 848 123, 818 143 C 788 163, 775 182, 738 188" stroke="#1a0d00" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9"/>
          <path d="M 1200 300 C 1115 272, 1055 248, 995 218 C 935 188, 912 163, 872 153" stroke="#0d0700" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.95"/>
          <path d="M 350 300 C 380 275, 410 255, 430 230 C 450 205, 455 185, 470 170" stroke="#150a00" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8"/>
          <path d="M 850 300 C 818 272, 790 252, 768 228 C 746 204, 740 184, 726 168" stroke="#150a00" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8"/>
          <ellipse cx="260" cy="120" rx="18" ry="10" fill="#1a0d00" opacity="0.85" transform="rotate(-20,260,120)"/>
          <ellipse cx="920" cy="118" rx="18" ry="10" fill="#1a0d00" opacity="0.85" transform="rotate(20,920,118)"/>
        </svg>

        <div ref={fogRef}  className="fb-fog"  />
        <div ref={fireRef} className="fb-fire" />

        <div className="fb-spores" aria-hidden="true">
          {Array.from({ length: 45 }).map((_, i) => (
            <span key={i} className="fb-spore" style={{
              left:`${(i * 29 + 5) % 100}%`,
              width:`${1 + (i % 4)}px`, height:`${1 + (i % 4)}px`,
              animationDuration:`${8 + (i % 9) * 1.3}s`,
              animationDelay:`${(i * 0.28) % 10}s`,
              opacity: 0.4 + (i % 5) * 0.1,
            }}/>
          ))}
        </div>

        <div className="fb-vignette" />
        <div className="fb-ground" />

        <div ref={titleRef} className="fb-title-wrap">
          <div className="fb-title-bg" />
          <h1 className="fb-title">STRANGER THINGS</h1>
          <p ref={subtitleRef} className="fb-subtitle">The Final Battle — Hawkins, 1986</p>
        </div>
      </div>
    </section>
  );
}
