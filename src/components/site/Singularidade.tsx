import { useMemo } from "react";

/**
 * Buraco negro.
 *
 * Topologia: uma ROSCA continua de luz em volta do vazio escuro, que se
 * alarga em asas horizontais. Nao sao arcos finos nascendo de pontas
 * distantes — isso produzia formato de amendoa/olho.
 *
 * Medidas relativas a RD = raio do vazio.
 */

const RD = 130;            // raio do vazio escuro
const RO = RD * 1.57;      // raio externo do brilho -> 204
const WING = RD * 3.66;    // meia-largura das asas -> 476
const WING_T = RO - RD;    // espessura da asa junto a rosca -> 74
const WING_TIP = WING_T * 0.19;

/** Asa horizontal: grossa junto a rosca, afinando ate a ponta. */
function wing() {
  const t = WING_T / 2;
  const e = WING_TIP / 2;
  return [
    `M ${-WING},${-e}`,
    `C ${-WING * 0.46},${-t * 0.86} ${-WING * 0.2},${-t} 0,${-t}`,
    `C ${WING * 0.2},${-t} ${WING * 0.46},${-t * 0.86} ${WING},${-e}`,
    `L ${WING},${e}`,
    `C ${WING * 0.46},${t * 0.86} ${WING * 0.2},${t} 0,${t}`,
    `C ${-WING * 0.2},${t} ${-WING * 0.46},${t * 0.86} ${-WING},${e}`,
    "Z",
  ].join(" ");
}

const WING_PATH = wing();

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
        <svg
          className="sg-svg"
          viewBox="-560 -260 1120 520"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* A rosca: escuro ate RD, incandescente logo depois, apagando para fora */}
            <radialGradient id="sgTorus">
              <stop offset="0" stopColor="#000000" stopOpacity="1" />
              <stop offset={`${(RD / RO) * 0.93}`} stopColor="#000000" stopOpacity="1" />
              <stop offset={`${RD / RO}`} stopColor="#9fd4ff" stopOpacity="0.55" />
              <stop offset={`${(RD / RO) * 1.06}`} stopColor="#eaf6ff" stopOpacity="0.95" />
              <stop offset={`${(RD / RO) * 1.13}`} stopColor="#ffffff" stopOpacity="1" />
              <stop offset={`${(RD / RO) * 1.26}`} stopColor="#8ec9ff" stopOpacity="0.72" />
              <stop offset="0.9" stopColor="#2a6fc0" stopOpacity="0.22" />
              <stop offset="1" stopColor="#0a1f3d" stopOpacity="0" />
            </radialGradient>

            {/* Doppler: o lado que vem em direcao a camera e mais brilhante */}
            <linearGradient id="sgWing" gradientUnits="userSpaceOnUse" x1={-WING} x2={WING}>
              <stop offset="0" stopColor="#0a1f3d" stopOpacity="0" />
              <stop offset="0.12" stopColor="#3f8ede" stopOpacity="0.5" />
              <stop offset="0.28" stopColor="#bfe0ff" stopOpacity="0.95" />
              <stop offset="0.42" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="0.58" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="0.72" stopColor="#9fd4ff" stopOpacity="0.72" />
              <stop offset="0.88" stopColor="#2a6fc0" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0a1f3d" stopOpacity="0" />
            </linearGradient>

            <filter id="sgWingBloom" x="-20%" y="-260%" width="140%" height="620%">
              <feGaussianBlur stdDeviation="13" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="sgTorusBloom" x="-45%" y="-45%" width="190%" height="190%">
              <feGaussianBlur stdDeviation="10" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* asas primeiro: a rosca as cobre onde cruzam o vazio */}
          <g filter="url(#sgWingBloom)">
            <path d={WING_PATH} fill="url(#sgWing)" opacity={0.62} />
            <path
              d={WING_PATH}
              fill="url(#sgWing)"
              transform="scale(1, 0.42)"
              opacity={0.95}
            />
            <path
              d={WING_PATH}
              fill="#ffffff"
              transform="scale(1, 0.13)"
              opacity={0.9}
            />
          </g>

          {/* a rosca */}
          <circle cx="0" cy="0" r={RO} fill="url(#sgTorus)" filter="url(#sgTorusBloom)" />

        </svg>

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

        <div className="sg-rings">
          {[326, 245, 168].map((rad, ring) => (
            <div key={ring}>
              <div className="sg-ring">
                {Array.from({ length: 8 }, (_, dot) => (
                  <div
                    key={dot}
                    className="sg-dot"
                    style={{
                      ["--a" as string]: `${dot * 45}deg`,
                      ["--r" as string]: `${rad}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
