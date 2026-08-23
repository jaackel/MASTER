import { useState, useMemo } from "react";
import { ShieldCheck, Info } from "lucide-react";

interface Milestone {
  year: string;
  partner: string;
  desc: string;
  logoType: "bee-ibm" | "amd" | "ibm-partner" | "hpe" | "dell" | "jitterbit" | "cisp";
  x: number; // 3D X coordinate
  y: number; // 3D Y coordinate
  z: number; // 3D Z coordinate
}

const STARFIELD_SIZE = 566; // ver bar.md
const RING_RADII = [326, 245, 168];

export default function Timeline3D() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Estrelas sugadas: cada uma nasce numa posição aleatória e translada
  // exatamente até o centro do container.
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
          tx: (0.5 - left / 100) * STARFIELD_SIZE,
          ty: (0.5 - top / 100) * STARFIELD_SIZE,
        };
      }),
    [],
  );

  const milestones: Milestone[] = useMemo(() => [
    {
      year: "2001",
      partner: "Bee / IBM",
      desc: "Fundação e estruturação de canais de distribuição de TI.",
      logoType: "bee-ibm",
      x: -480,
      y: 10,
      z: 40,
    },
    {
      year: "2004",
      partner: "AMD",
      desc: "Distribuição e consolidação do programa de parcerias AMD.",
      logoType: "amd",
      x: -320,
      y: -2,
      z: 15,
    },
    {
      year: "2009",
      partner: "IBM Partner",
      desc: "Homologação oficial como IBM Business Partner no mercado nacional.",
      logoType: "ibm-partner",
      x: -160,
      y: -10,
      z: -5,
    },
    {
      year: "2017",
      partner: "HPE",
      desc: "Integração e arquitetura de sistemas com a Hewlett Packard Enterprise.",
      logoType: "hpe",
      x: 0,
      y: -12,
      z: -10,
    },
    {
      year: "2018",
      partner: "Dell Tech",
      desc: "Credenciamento no Dell Technologies Partner Program.",
      logoType: "dell",
      x: 160,
      y: -10,
      z: -5,
    },
    {
      year: "2022",
      partner: "Jitterbit",
      desc: "Alocação e orquestração de APIs e integrações Jitterbit.",
      logoType: "jitterbit",
      x: 320,
      y: -2,
      z: 15,
    },
    {
      year: "2024",
      partner: "CISP",
      desc: "Homologação corporativa e obtenção da chancela CISP <1>.",
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
      {/* Buraco negro — ver bar.md */}
      <div className="absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
        <div className="bh-stage">
          {/* atras: o disco curvado pela lente */}
          <div className="bh-lens" />
          <div className="bh-lens-inner" />
          {/* a esfera oclui o meio do anel */}
          <div className="bh-sphere" />
          <div className="bh-photon" />
          {/* na frente: o disco visto de perfil */}
          <div className="bh-streak" />
          <div className="bh-streak-hot" />

          <div className="bh-stars">
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

          <div className="bh-rings">
            {RING_RADII.map((r, ring) => (
              <div key={ring}>
                <div className="bh-ring">
                  {Array.from({ length: 8 }, (_, dot) => (
                    <div
                      key={dot}
                      className="bh-dot"
                      style={{
                        ["--a" as string]: `${dot * 45}deg`,
                        ["--r" as string]: `${r}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neon-cyan block mb-1">
            ▸ PORTFOLIO HISTÓRICO
          </span>
          <h4 className="text-xl font-title font-bold text-white">Linha do Tempo de Interdependência</h4>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground bg-neon-cyan/5 px-3 py-1.5 rounded border border-neon-cyan/20">
          <Info className="w-3.5 h-3.5 text-neon-cyan" />
          <span>Passe o mouse sobre os marcos</span>
        </div>
      </div>

      {/* SVG Stage */}
      <div className="relative z-10 w-full overflow-x-auto scrollbar-none">
        <div className="min-w-[1200px] mx-auto relative h-[380px]">
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
                        {m.logoType === "bee-ibm" && (
                          <div className="flex items-center gap-1">
                            {/* Tiny bee SVG */}
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="5" fill="#facc15" stroke="#000" strokeWidth="1" />
                              <path d="M12 7v10M10 7v10M14 7v10" stroke="#000" strokeWidth="1" />
                              <path d="M7 10c-2-2 1-4 3-2M17 10c2-2-1-4-3-2" stroke="#22c55e" strokeWidth="1" fill="#4ade80" fillOpacity="0.4" />
                            </svg>
                            <span className="text-[9px] font-mono text-[#0064ff] font-bold tracking-tighter">IBM</span>
                          </div>
                        )}

                        {m.logoType === "amd" && (
                          <div className="flex items-center justify-center bg-black border border-emerald-500/30 px-2 py-0.5 rounded gap-1.5">
                            <span className="text-[10px] font-bold text-white tracking-tighter">AMD</span>
                            {/* AMD arrow */}
                            <svg className="w-2.5 h-2.5 fill-emerald-400" viewBox="0 0 24 24">
                              <path d="M0 24h12l12-12H12L0 24z" />
                            </svg>
                          </div>
                        )}

                        {m.logoType === "ibm-partner" && (
                          <div className="flex flex-col items-center">
                            <span className="text-[9px] font-bold text-white tracking-wider border-b border-[#0064ff] pb-0.5 leading-none">IBM Partner</span>
                            <span className="text-[6px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">Business</span>
                          </div>
                        )}

                        {m.logoType === "hpe" && (
                          <div className="flex items-center gap-1">
                            {/* HPE green hollow rect */}
                            <div className="w-8 h-3.5 border-2 border-[#00b074] rounded-sm shrink-0" />
                            <span className="text-[7px] font-mono font-bold text-white tracking-tighter uppercase leading-none">HPE</span>
                          </div>
                        )}

                        {m.logoType === "dell" && (
                          <div className="flex items-center gap-1.5 bg-[#002f50]/20 border border-[#007dbd]/40 px-1.5 py-0.5 rounded-md">
                            <div className="w-4 h-4 rounded-full border border-[#007dbd] flex items-center justify-center text-[7px] font-bold text-white font-sans shrink-0">D</div>
                            <span className="text-[7.5px] font-sans font-bold text-white tracking-tighter">DELL Tech</span>
                          </div>
                        )}

                        {m.logoType === "jitterbit" && (
                          <div className="flex items-center gap-1">
                            {/* Jitterbit violet star */}
                            <svg className="w-3.5 h-3.5 fill-[#8a3ffc]" viewBox="0 0 24 24">
                              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                            </svg>
                            <span className="text-[8.5px] font-sans font-semibold text-white tracking-tighter">Jitterbit</span>
                          </div>
                        )}

                        {m.logoType === "cisp" && (
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-neon-blue shrink-0" />
                            <span className="text-[8px] font-mono font-bold text-white bg-neon-blue/20 px-1 py-0.5 rounded border border-neon-blue/40">CISP &lt;1&gt;</span>
                          </div>
                        )}
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
