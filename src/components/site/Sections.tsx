import { useCallback, useEffect, useRef, useState } from "react";
import {
  Cloud,
  Target,
  Users,
  Zap,
  Trophy,
  Network,
  Headphones,
  Gauge,
  Lock,
  Layers,
  Activity,
  AlertTriangle,
  ServerCog,
  Mail,
  ArrowRight,
} from "lucide-react";
import MatrixTable from "./MatrixTable";
import ShapeGrid from "@/components/ShapeGrid";

/* ─────────── SECTION HEADER ─────────── */
function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl mb-16">
      <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-[0.25em] text-neon-cyan">
        <span className="w-8 h-px bg-neon-cyan" />
        {eyebrow}
      </div>
      <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>
      {desc && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}

import Timeline3D from "./Timeline3D";

/* ─────────── ABOUT ─────────── */
export function About() {
  const pillars = [
    { icon: Network, label: "Rede", value: "Especialistas conectados" },
    { icon: Lock, label: "Sigilo", value: "Operação confidencial" },
    { icon: Layers, label: "Escala", value: "Sob demanda" },
  ];
  return (
    <section id="sobre" className="relative py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="// SOBRE"
              title={
                <>
                  A <span className="text-gradient-neon">Master Agent</span>
                </>
              }
              desc="Somos uma agência de provedores de serviços em TI que orquestra a interoperabilidade como um Hub de confiança. Empoderada por mais de 25 anos conectando fabricantes, parceiros e clientes e promovendo a interdependência entre as partes envolvidas."
            />
            <div className="flex flex-wrap gap-3 mt-4">
              {["Cloud", "Cyber", "SOC", "IA", "Dados", "DevSec"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-md border border-border/60 bg-surface/50 text-xs font-mono text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className="glass-panel rounded-lg p-6 flex items-center gap-5 hover:border-neon-cyan/40 transition-all group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-neon-blue/20 to-neon-cyan/10 border border-neon-blue/30 flex items-center justify-center group-hover:shadow-[0_0_20px_oklch(0.72_0.2_240/0.4)] transition-shadow">
                  <Icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <div className="text-xs font-mono tracking-widest text-muted-foreground">
                    {label.toUpperCase()}
                  </div>
                  <div className="text-lg font-medium">{value}</div>
                </div>
                <div className="ml-auto text-xs font-mono text-neon-cyan/60">0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Curved Perspective Timeline */}
        <Timeline3D />
      </div>
    </section>
  );
}

/* ─────────── SERVICES ─────────── */
const centerNode = { id: "matriz-master", labelLines: ["Matriz", "Master Agent"] };

const hubNodes = [
  { id: "svc-cloud", labelLines: ["Infraestrutura", "& Cloud"] },
  { id: "svc-cyber", labelLines: ["Cyber", "Security"] },
  { id: "svc-soc", labelLines: ["SOC as a", "Service"] },
  { id: "svc-ia", labelLines: ["Inteligência", "Artificial"] },
  { id: "svc-dev", labelLines: ["Desenvolvimento", "de Software"] },
  { id: "svc-dados", labelLines: ["Dados &", "Automação"] },
  { id: "svc-ti", labelLines: ["Serviços", "recorrentes", "de TI"] },
  { id: "svc-projetos", labelLines: ["Projetos", "técnicos", "especializados"] },
];

// Desktop/tablet: a true honeycomb — centerNode touched by a ring of 6 services,
// plus the remaining 2 services nested into the outer corners as a second ring,
// so every cell interlocks with its neighbors (units are multiples of colGap / rowGap).
const RING1_OFFSETS = [
  { dcx: 1, dcy: 0 }, // right
  { dcx: 0.5, dcy: -1 }, // upper-right
  { dcx: -0.5, dcy: -1 }, // upper-left
  { dcx: -1, dcy: 0 }, // left
  { dcx: -0.5, dcy: 1 }, // lower-left
  { dcx: 0.5, dcy: 1 }, // lower-right
];
const RING2_OFFSETS = [
  { dcx: 1.5, dcy: 1 }, // lower-right, nested between "right" & "lower-right"
  { dcx: -1.5, dcy: -1 }, // upper-left, nested between "left" & "upper-left"
];

function JourneyCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pointy-top hexagon geometry: R = center-to-vertex radius.
  const R = isMobile ? 72 : 100;
  const hexW = (Math.sqrt(3) / 2) * R; // half-width
  const colGap = hexW * 2; // horizontal distance between hex centers in the same row
  const rowGap = R * 1.5; // vertical distance between row centers

  const positions = isMobile
    ? [centerNode, ...hubNodes].map((node, i) => ({
        ...node,
        cx: 0,
        cy: i * (2 * R + 18),
        isCenter: node.id === centerNode.id,
      }))
    : [
        { ...centerNode, cx: 0, cy: 0, isCenter: true },
        ...RING1_OFFSETS.map((offset, i) => ({
          ...hubNodes[i],
          cx: offset.dcx * colGap,
          cy: offset.dcy * rowGap,
          isCenter: false,
        })),
        ...RING2_OFFSETS.map((offset, i) => ({
          ...hubNodes[6 + i],
          cx: offset.dcx * colGap,
          cy: offset.dcy * rowGap,
          isCenter: false,
        })),
      ];

  const cxs = positions.map((p) => p.cx);
  const cys = positions.map((p) => p.cy);
  const PADDING = 24;
  const STAGE_W = Math.max(...cxs) - Math.min(...cxs) + hexW * 2 + PADDING * 2;
  const STAGE_H = Math.max(...cys) - Math.min(...cys) + R * 2 + PADDING * 2;
  const originX = PADDING + hexW - Math.min(...cxs);
  const originY = PADDING + R - Math.min(...cys);

  const updateScale = useCallback(() => {
    if (!wrapRef.current) return;
    setScale(Math.min(1, wrapRef.current.clientWidth / STAGE_W));
  }, [STAGE_W]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  return (
    <div className="py-24 w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Uma arquitetura resiliente. Protegemos cada fluxo de dados e ponta de infraestrutura. Do
            processamento na nuvem à IA, a segurança interliga todo o seu ecossistema técnico.
          </p>
        </div>
      </div>

      {/* Stage Wrapper */}
      <div ref={wrapRef} className="w-full overflow-hidden flex justify-center py-10">
        <div
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            marginBottom: STAGE_H * scale - STAGE_H,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <img
              src="/journey/grid-background.svg"
              alt=""
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Isometric Hexagon Cluster (pointy-top, interlocking rows) */}
          <svg width={STAGE_W} height={STAGE_H} className="absolute inset-0 overflow-visible">
            <defs>
              <radialGradient id="jc-cellGrad" cx="50%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#0e2a3a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#040f16" stopOpacity="0.92" />
              </radialGradient>
              <radialGradient id="jc-centerCellGrad" cx="50%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#0b3f5c" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#062338" stopOpacity="0.97" />
              </radialGradient>
              <filter id="jc-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {positions.map((node) => {
              const cx = originX + node.cx;
              const cy = originY + node.cy;
              const isHovered = hoveredId === node.id;

              const points = [
                [cx, cy - R],
                [cx + hexW, cy - R / 2],
                [cx + hexW, cy + R / 2],
                [cx, cy + R],
                [cx - hexW, cy + R / 2],
                [cx - hexW, cy - R / 2],
              ]
                .map(([x, y]) => `${x},${y}`)
                .join(" ");

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <polygon
                    points={points}
                    fill={node.isCenter ? "url(#jc-centerCellGrad)" : "url(#jc-cellGrad)"}
                  />
                  <polygon
                    points={points}
                    fill="none"
                    stroke="var(--neon-cyan)"
                    strokeWidth={node.isCenter ? 2.5 : isHovered ? 2 : 1.5}
                    opacity={node.isCenter ? 1 : isHovered ? 1 : 0.7}
                    filter="url(#jc-glow)"
                    className="transition-all duration-300"
                  />

                  {/* Label */}
                  <g className="pointer-events-none select-none">
                    {node.labelLines.map((text, idx) => {
                      const totalLines = node.labelLines.length;
                      const yOffset = (idx - (totalLines - 1) / 2) * 16;
                      return (
                        <text
                          key={idx}
                          x={cx}
                          y={cy + yOffset + 4}
                          textAnchor="middle"
                          className={
                            node.isCenter
                              ? "font-sans font-extrabold text-[14px] fill-white tracking-wide"
                              : "font-sans font-semibold text-[12px] fill-white"
                          }
                          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
                        >
                          {text}
                        </text>
                      );
                    })}
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative isolate pt-12">
      {/* Animated hexagon grid background */}
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(0,100,255,0.35)"
          hoverFillColor="rgba(0,216,255,0.5)"
          shape="hexagon"
          hoverTrailAmount={17}
        />
      </div>

      {/* Full-width journey carousel rendered first */}
      <JourneyCarousel />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <SectionHeader
          eyebrow="// ARQUITETURA DE SOLUÇÕES"
          title={
            <>
              Serviços da <span className="text-gradient-neon">central</span>
            </>
          }
          desc="Cada módulo é um vetor de execução — ativado sob demanda por agentes verificados na sua stack e no seu contexto."
        />
      </div>
    </section>
  );
}

/* ─────────── HOW IT WORKS ─────────── */
const missions = [
  {
    step: "01",
    icon: Target,
    phase: "MISSÃO",
    title: "Entendimento do desafio",
    desc: "Briefing técnico, contexto do negócio e mapeamento do objetivo estratégico.",
  },
  {
    step: "02",
    icon: Users,
    phase: "SELEÇÃO",
    title: "Agentes adequados",
    desc: "Ativamos os especialistas certos da rede para o domínio, stack e maturidade.",
  },
  {
    step: "03",
    icon: Zap,
    phase: "EXECUÇÃO",
    title: "Entrega técnica",
    desc: "Operação orquestrada, acompanhamento sênior e visibilidade em tempo real.",
  },
  {
    step: "04",
    icon: Trophy,
    phase: "RESULTADO",
    title: "Evolução contínua",
    desc: "Governança de longo prazo, iteração e ganho tecnológico sustentável.",
  },
];

export function Operation() {
  return (
    <section id="operacao" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-25" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// OPERAÇÃO"
          title={
            <>
              Matriz de <span className="text-gradient-neon">Interoperabilidade</span>
            </>
          }
          desc="Nível de entrega e sustentação de processos em diferentes níveis de maturidade operacional."
        />

        <MatrixTable />

        {/* 4-phase cards methodology at the end */}
        <div className="mt-28 border-t border-neon-cyan/10 pt-20">
          <SectionHeader
            eyebrow="// METODOLOGIA"
            title={
              <>
                Do briefing
                <br />
                ao <span className="text-gradient-neon">resultado</span>.
              </>
            }
            desc="Uma operação em quatro fases, executada por agentes verificados sob protocolo de sigilo."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {missions.map(({ step, icon: Icon, phase, title, desc }, i) => (
              <div key={step} className="relative">
                <div className="glass-panel rounded-lg p-6 h-full relative">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-mono font-light text-neon-blue/30">{step}</span>
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-neon-blue/20 to-transparent border border-neon-blue/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] text-neon-cyan mb-2">
                    ▸ {phase}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                {i < missions.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-neon-blue/60 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── PORTFOLIO ─────────── */
export function Portfolio() {
  const cases = [
    {
      sector: "FINANCEIRO",
      op: "OP-2311",
      desc: "Modernização de core bancário com migração cloud-native.",
    },
    {
      sector: "SAÚDE",
      op: "OP-2402",
      desc: "Plataforma de IA para triagem clínica e conformidade LGPD.",
    },
    { sector: "INDÚSTRIA", op: "OP-2418", desc: "SOC dedicado para infraestrutura OT/IT crítica." },
    {
      sector: "VAREJO",
      op: "OP-2503",
      desc: "Data platform e automação de supply chain omnichannel.",
    },
    {
      sector: "ENERGIA",
      op: "OP-2517",
      desc: "Hardening e detecção de ameaças em ambiente distribuído.",
    },
    {
      sector: "GOV / PÚBLICO",
      op: "OP-2601",
      desc: "Squad de desenvolvimento seguro para sistema estruturante.",
    },
  ];

  return (
    <section id="portfolio" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// OPERAÇÕES REALIZADAS"
          title={
            <>
              Rede de <span className="text-gradient-neon">confiança</span>
            </>
          }
          desc="Um recorte das missões executadas pela rede — identidades preservadas por protocolo."
        />

        <div className="glass-panel rounded-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-[100px_180px_1fr_120px] gap-6 px-6 py-3 border-b border-border/40 text-[10px] font-mono tracking-wider text-muted-foreground bg-surface/60">
            <span>ID</span>
            <span>SETOR</span>
            <span>DESCRIÇÃO</span>
            <span className="text-right">STATUS</span>
          </div>
          {cases.map((c) => (
            <div
              key={c.op}
              className="grid md:grid-cols-[100px_180px_1fr_120px] gap-3 md:gap-6 px-6 py-5 border-b border-border/30 last:border-0 hover:bg-neon-blue/5 transition-colors group"
            >
              <span className="font-mono text-xs text-neon-cyan">{c.op}</span>
              <span className="text-sm font-medium tracking-wide">{c.sector}</span>
              <span className="text-sm text-muted-foreground">{c.desc}</span>
              <span className="md:text-right text-[10px] font-mono text-neon-cyan flex md:justify-end items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
                CONCLUÍDA
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── SOC ─────────── */
export function Soc() {
  const metrics = [
    { icon: Activity, label: "Eventos/dia", value: "12.4M" },
    { icon: AlertTriangle, label: "Ameaças contidas", value: "1.847" },
    { icon: Gauge, label: "MTTR", value: "< 8min" },
    { icon: ServerCog, label: "Fontes integradas", value: "180+" },
  ];

  return (
    <section id="soc" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/[0.04] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-tech-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow="// SOC AS A SERVICE — OPERAÇÃO 24/7"
            title={
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span>Central de <span className="text-gradient-neon">operações</span> 24/7</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ATIVO 24/7/365
                </span>
              </div>
            }
            desc="Monitoramento ininterrupto 24/7/365 com correlação SIEM, threat intelligence e resposta orquestrada a incidentes em tempo real — operado por analistas seniores da rede Master Agent."
          />
          <div className="grid grid-cols-2 gap-3">
            {metrics.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-panel rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-mono tracking-wider">
                  <Icon className="w-3.5 h-3.5" /> {label.toUpperCase()}
                </div>
                <div className="mt-2 text-2xl font-semibold text-neon-cyan">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl border border-neon-cyan/20 bg-[#051c27]/40 shadow-[0_0_30px_rgba(0,216,255,0.15)] transition-all duration-500 hover:border-neon-cyan/50 hover:shadow-[0_0_50px_rgba(0,216,255,0.3)] hover:-translate-y-1 hover:scale-[1.02]">
          {/* Scanline overlay for cyber effect */}
          <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-10" />
          
          {/* Header monitor bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-surface/60">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
              <span className="text-neon-cyan">CENTRAL OPERATIONS ROOM</span>
              <span className="text-muted-foreground">/ monitor-01</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">SOC.SECURE_FEED</span>
          </div>
          
          {/* Image Container with Zoom effect */}
          <div className="relative overflow-hidden aspect-[16/10] w-full">
            <img
              src="/soc-room.jpg"
              alt="SOC Security Control Room"
              className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-110"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─────────── CONTACT ─────────── */
export function Contact() {
  return (
    <section id="contato" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-80" />
      <div className="absolute inset-0 bg-tech-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-xs font-mono text-neon-cyan mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
          CANAL ABERTO · RESPOSTA EM 24H
        </div>

        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
          Precisa de um
          <br />
          <span className="text-gradient-neon">agente tecnológico?</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Descreva o desafio. Ativamos o especialista certo — com sigilo executivo e execução
          sênior.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#conectar"
            className="group inline-flex items-center gap-2 h-12 px-8 rounded-md bg-gradient-to-r from-neon-blue to-neon-cyan text-background font-medium text-sm tracking-wide shadow-[0_0_40px_oklch(0.72_0.2_240/0.5)] hover:shadow-[0_0_60px_oklch(0.72_0.2_240/0.7)] transition-all"
          >
            <Mail className="w-4 h-4" />
            Entrar em contato
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          {[
            { label: "CANAL", value: "contato@masteragent.com.br" },
            { label: "OPERAÇÃO", value: "24/7 · Global" },
            { label: "PROTOCOLO", value: "NDA por padrão" },
          ].map((item) => (
            <div key={item.label} className="glass-panel rounded-md p-4">
              <div className="text-[10px] font-mono tracking-widest text-neon-cyan">
                {item.label}
              </div>
              <div className="mt-1 text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
export function Footer() {
  return (
    <footer className="relative py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
          <span>MASTER AGENT © {new Date().getFullYear()} · SECURE HUB</span>
        </div>
        <div className="tracking-wider">v2.6.1 · build.stable · zone.br</div>
      </div>
    </footer>
  );
}
