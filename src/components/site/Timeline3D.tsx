import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import Singularidade from "./Singularidade";
import LaserFlow from "./LaserFlow";

interface Milestone {
  year: string;
  partner: string;
  desc: string;
  logoType: "bee-ibm" | "amd" | "ibm-partner" | "hpe" | "dell" | "jitterbit" | "cisp";
  x: number; // 3D X coordinate
  y: number; // 3D Y coordinate
  z: number; // 3D Z coordinate
}

function PartnerLogo({ logoType }: { logoType: Milestone["logoType"] }) {
  switch (logoType) {
    case "bee-ibm":
      return <img src="/logoibm.jpg" alt="Bee / IBM" className="h-11 w-auto object-contain mix-blend-screen" />;
    case "amd":
      return <img src="/AMD-Logo.svg" alt="AMD" className="h-9 w-auto object-contain" />;
    case "ibm-partner":
      return <img src="/IBM-Business-Partner.png" alt="IBM Business Partner" className="h-10 w-auto object-contain" />;
    case "hpe":
      return <img src="/HPE-Logo.png" alt="Hewlett Packard Enterprise" className="h-14 w-auto object-contain" />;
    case "dell":
      return <img src="/DELL-Logo.png" alt="Dell Technologies Partner Program" className="h-16 w-auto object-contain" />;
    case "jitterbit":
      return <img src="/Jitterbit-Logo.png" alt="Jitterbit" className="h-6 w-auto object-contain" />;
    case "cisp":
      return <img src="/CISP-Logo.png" alt="CISP <1>" className="h-7 w-auto object-contain" />;
  }
}

export default function Timeline3D() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const milestones: Milestone[] = useMemo(() => [
    {
      year: "2001",
      partner: "Bee / IBM",
      desc: "Operação comercial de Servidores x86, para mercado SMB, Indústrias e Telecom.",
      logoType: "bee-ibm",
      x: -480,
      y: 10,
      z: 40,
    },
    {
      year: "2004",
      partner: "AMD",
      desc: "Distribuição de Processadores para América Latina, FOB Miami.",
      logoType: "amd",
      x: -320,
      y: -2,
      z: 15,
    },
    {
      year: "2009",
      partner: "IBM Partner",
      desc: "Distribuição de Storages e Servidores RISC (IBM Power) para Indústria Privada e Governo.",
      logoType: "ibm-partner",
      x: -160,
      y: -10,
      z: -5,
    },
    {
      year: "2017",
      partner: "HPE",
      desc: "High Performance Computing (HPC) para ciências biológicas, química teórica e física computacional.",
      logoType: "hpe",
      x: 0,
      y: -12,
      z: -10,
    },
    {
      year: "2018",
      partner: "Dell Tech",
      desc: "Distribuição de Servidores e Switches para mercado SMB interno.",
      logoType: "dell",
      x: 160,
      y: -10,
      z: -5,
    },
    {
      year: "2022",
      partner: "Jitterbit",
      desc: "Desenvolvimento e distribuição de canais em Middleware (Gateway de API) para América Latina.",
      logoType: "jitterbit",
      x: 320,
      y: -2,
      z: 15,
    },
    {
      year: "2024",
      partner: "CISP",
      desc: "Provedora e Delivery de serviços especializados em Inteligência Artificial.",
      logoType: "cisp",
      x: 480,
      y: 10,
      z: 40,
    },
  ], []);

  // 3D Perspective Projection Matrix parameters
  const viewWidth = 1200;
  const viewHeight = 350;
  const cx = viewWidth / 2;
  const cy = viewHeight / 2 + 45;

  // Angles for isometric/perspective camera tilt
  const rotX = 14 * (Math.PI / 180); // tilt down (flatter tilt to avoid vertical overlaps)
  const rotY = -2 * (Math.PI / 180); // almost horizontal angle

  // Projection formula
  const project = (x: number, y: number, z: number) => {
    // Y-rotation
    const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);

    // X-rotation
    const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

    // Perspective depth divisor
    const fov = 420;
    const scale = fov / (fov + z2);

    return {
      x: cx + x1 * scale,
      y: cy + y2 * scale,
      scale: scale,
    };
  };

  // Generate intermediate points along the 3D curve for a smooth timeline line
  const curvePath = useMemo(() => {
    const steps = 60;
    const curvePoints: { x: number; y: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const pct = i / steps;
      // Interpolate coordinates matching the milestones' curve arc
      const x = -480 + pct * 960;
      
      // Calculate Y coordinate (gentle arch peaking in the center)
      const theta = pct * Math.PI;
      const y = 10 - Math.sin(theta) * 22;
      
      // Calculate Z coordinate (shallow depth bend)
      const z = 40 - Math.sin(theta) * 50;

      const proj = project(x, y, z);
      curvePoints.push({ x: proj.x, y: proj.y });
    }

    return `M ${curvePoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")}`;
  }, []);

  // Compute final projected position for each milestone, incorporating hover lift
  const projectedMilestones = useMemo(() => {
    return milestones.map((m, idx) => {
      const isHovered = hoveredIdx === idx;
      // Lift the point vertically if hovered (subtler lift to avoid hitting top bounds)
      const liftY = isHovered ? -15 : 0;
      const proj = project(m.x, m.y + liftY, m.z);

      return {
        ...m,
        px: proj.x,
        py: proj.y,
        scale: proj.scale,
      };
    });
  }, [milestones, hoveredIdx]);

  return (
    <div className="w-full bg-[#03131c]/25 border border-neon-cyan/15 rounded-xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden mt-16 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <Singularidade />

      {/* Title */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neon-cyan block mb-1">
            ▸ LEGADO E ATUAÇÃO
          </span>
          <h4 className="text-lg sm:text-xl font-title font-bold text-white">A História e interdependência da Master Agent</h4>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground bg-neon-cyan/5 px-3 py-1.5 rounded border border-neon-cyan/20 shrink-0">
          <Info className="w-3.5 h-3.5 text-neon-cyan" />
          <span>Conheça nossa história</span>
        </div>
      </div>

      {/* Mobile / tablet: vertical list — the 1200px 3D stage cannot shrink legibly */}
      <ol className="lg:hidden relative z-10 flex flex-col gap-3 border-l border-neon-cyan/25 pl-5">
        {milestones.map((m) => (
          <li key={m.year} className="relative">
            <span className="absolute -left-[27px] top-4 w-2.5 h-2.5 rounded-full bg-[#020c12] border-2 border-neon-cyan" />
            <div className="bg-[#051a25]/90 border border-neon-cyan/25 rounded-lg p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-neon-cyan shrink-0">{m.year}</span>
                <div className="flex items-center justify-center h-9 min-w-0">
                  <PartnerLogo logoType={m.logoType} />
                </div>
              </div>
              <h5 className="mt-2.5 text-sm font-sans font-bold text-white">Parceria {m.partner}</h5>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: projected 3D stage */}
      <div className="hidden lg:block relative z-10 w-full">
        <div className="mx-auto relative aspect-[1200/380]">
          <svg
            viewBox="0 0 1200 380"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="neonTimelineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Gradients */}
              <linearGradient id="timelineLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0064ff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#00c8ff" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#00c8ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0064ff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Projected 3D curved line */}
            <path
              d={curvePath}
              fill="none"
              stroke="url(#timelineLineGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            
            {/* Glowing neon halo */}
            <path
              d={curvePath}
              fill="none"
              stroke="#00c8ff"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.15"
              filter="url(#neonTimelineGlow)"
            />

            {/* Glowing animated particles sliding along the curve */}
            <path d={curvePath} fill="none" id="flowPath" className="hidden" />
            <circle r="4" fill="#00c8ff" filter="url(#neonTimelineGlow)">
              <animateMotion dur="7s" repeatCount="indefinite" path={curvePath} />
            </circle>
            <circle r="3" fill="#ffffff" opacity="0.8">
              <animateMotion dur="7s" repeatCount="indefinite" path={curvePath} begin="2.5s" />
            </circle>
            <circle r="3.5" fill="#0064ff" filter="url(#neonTimelineGlow)">
              <animateMotion dur="7s" repeatCount="indefinite" path={curvePath} begin="4.5s" />
            </circle>

            {/* Milestones rendering */}
            {projectedMilestones.map((m, idx) => {
              const isHovered = hoveredIdx === idx;
              
              // Shadow ellipse under the dot
              const shadowY = m.py + 10 * m.scale;
              const shadowRx = 10 * m.scale;
              const shadowRy = 3.5 * m.scale;

              return (
                <g key={m.year}>
                  {/* Floor Shadow */}
                  <ellipse
                    cx={m.px}
                    cy={shadowY}
                    rx={shadowRx}
                    ry={shadowRy}
                    fill="rgba(0, 200, 255, 0.18)"
                    filter="url(#neonTimelineGlow)"
                    opacity={isHovered ? 0.7 : 0.3}
                  />

                  {/* Vertical Connection dotted line (perspective height anchor) */}
                  <line
                    x1={m.px}
                    y1={m.py}
                    x2={m.px}
                    y2={shadowY}
                    stroke="var(--neon-cyan)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    opacity={isHovered ? 0.8 : 0.3}
                  />

                  {/* Projected timeline node check dot */}
                  <circle
                    cx={m.px}
                    cy={m.py}
                    r={6 * m.scale}
                    fill={isHovered ? "var(--neon-cyan)" : "#020c12"}
                    stroke="var(--neon-cyan)"
                    strokeWidth={2 * m.scale}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    filter={isHovered ? "url(#neonTimelineGlow)" : undefined}
                  />
                  {isHovered && (
                    <circle
                      cx={m.px}
                      cy={m.py}
                      r={12 * m.scale}
                      fill="none"
                      stroke="var(--neon-cyan)"
                      strokeWidth="1.5"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Embed HTML using foreignObject for rendering high-fidelity interactive badges inside SVG */}
                  <foreignObject
                    x={m.px - 75}
                    y={m.py - 110}
                    width="150"
                    height="110"
                    className="overflow-visible pointer-events-auto"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div
                      style={{
                        transform: `scale(${m.scale * 1.12})`,
                        transformOrigin: "bottom center",
                      }}
                      className={`w-full bg-[#051a25]/90 border p-2.5 rounded-lg flex flex-col items-center justify-between h-[96px] select-none transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.4)]
                        ${isHovered 
                          ? "border-neon-cyan/80 bg-[#072535] shadow-[0_0_20px_rgba(0,216,255,0.25)] -translate-y-1.5" 
                          : "border-neon-cyan/25 hover:border-neon-cyan/50"
                        }
                      `}
                    >
                      {/* Year badge */}
                      <span className={`text-[10px] font-mono font-bold tracking-wider transition-colors duration-300
                        ${isHovered ? "text-neon-cyan" : "text-muted-foreground/80"}
                      `}>
                        {m.year}
                      </span>

                      {/* Partner Logo visual representations */}
                      <div className="flex items-center justify-center h-10 w-full mt-1.5">
                        <PartnerLogo logoType={m.logoType} />
                      </div>

                      {/* Dot pointer index */}
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40 mt-1" />
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Dynamic Floating detail card tooltip (under timeline) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#051c27]/95 border border-neon-cyan/30 rounded-lg p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 min-h-[92px] flex items-start gap-4">
            {hoveredIdx !== null ? (
              <>
                <div className="w-10 h-10 rounded bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center font-mono font-bold text-neon-cyan shrink-0 text-sm">
                  {projectedMilestones[hoveredIdx].year}
                </div>
                <div>
                  <h5 className="text-sm font-sans font-bold text-white leading-none mb-1">
                    Parceria {projectedMilestones[hoveredIdx].partner}
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {projectedMilestones[hoveredIdx].desc}
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full flex items-center justify-center text-xs text-muted-foreground/60 py-4 font-mono">
                ▸ SELECIONE UM MARCO TEMPORAL PARA VISUALIZAR OS DETALHES
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
