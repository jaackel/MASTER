import { useMemo } from "react";

export default function Singularidade() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, () => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        return {
          left,
          top,
          duration: 7 + Math.random() * 7,
          delay: Math.random() * 5,
          tx: (0.5 - left / 100) * 566,
          ty: (0.5 - top / 100) * 566,
        };
      }),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
      <div className="sg-stage">
        <div className="sg-stars">
          {stars.map((s, i) => (
            <div
              key={i}
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                ["--transform" as string]: `translate(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
