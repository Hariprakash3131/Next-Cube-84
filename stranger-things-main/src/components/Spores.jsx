import { useMemo } from "react";
import "./Spores.css";

export default function Spores({ count = 40 }) {
  const spores = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 10,
      })),
    [count]
  );

  return (
    <div className="spores" aria-hidden="true">
      {spores.map((s, i) => (
        <span
          key={i}
          className="spore"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
