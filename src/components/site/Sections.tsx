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
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import MatrixTable from "./MatrixTable";
import ShapeGrid from "@/components/ShapeGrid";

/* ─────────── SECTION HEADER ─────────── */
function SectionHeader({
  eyebrow,
  title,
  desc,
  mb = "mb-16",
  maxW = "max-w-2xl",
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  mb?: string;
  maxW?: string;
}) {
  return (
    <div className={`${maxW} ${mb}`}>
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
    { icon: Network, label: "Rede", value: "Especialistas dedicados e compartilhados" },
    { icon: Lock, label: "Sigilo e confidencialidade", value: "Operação Segura" },
    { icon: Layers, label: "Escala e atendimento", value: "Sob demanda" },
  ];
  return (
    <section id="sobre" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="// SOBRE"
              title={
                <>
                  Somos a<br />
                  <span className="text-gradient-neon">Master Agent</span>
                  <span className="text-neon-cyan animate-blink ml-2">_</span>
                </>
              }
              desc="Somos uma agência de provedores de serviços em TI que orquestra a interoperabilidade como um Hub de confiança. Empoderada por mais de 25 anos conectando fabricantes, parceiros e clientes e promovendo a interdependência entre as partes envolvidas."
            />
            <div className="flex flex-wrap gap-3 mt-4">
              {["FinOps", "CyberSec", "Data", "Cloud", "AI"].map((t) => (
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
const servicesData = [
  {
    id: "SVC.01",
    title: "GitOps",
    desc: "Infraestrutura como código, versionamento declarativo de ambientes e automação contínua de deploys.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a4 4 0 0 0-4-4H9" />
        <path d="M6 9v6" />
      </svg>
    )
  },
  {
    id: "SVC.02",
    title: "DevSecOps",
    desc: "Segurança integrada no ciclo de vida de desenvolvimento, compliance de código automatizado e hardening.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    id: "SVC.03",
    title: "CloudOps",
    desc: "Orquestração multi-cloud, sustentação de infraestruturas híbridas, alta disponibilidade e monitoramento.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    )
  },
  {
    id: "SVC.04",
    title: "FinOps",
    desc: "Gestão financeira de ambientes cloud, análise de desperdícios, alocação de custos e otimização sob demanda.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: "SVC.05",
    title: "DataOps",
    desc: "Engenharia de dados escalável, pipelines ETL robustos, governança analítica e automação de fluxos de dados.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    )
  },
  {
    id: "SVC.06",
    title: "ML / AIOps",
    desc: "Operacionalização de modelos de Machine Learning, provisionamento de LLMs corporativos e automação cognitiva.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 20v2" />
        <path d="M12 2v2" />
        <path d="M17 20v2" />
        <path d="M17 2v2" />
        <path d="M2 12h2" />
        <path d="M2 17h2" />
        <path d="M2 7h2" />
        <path d="M20 12h2" />
        <path d="M20 17h2" />
        <path d="M20 7h2" />
        <path d="M7 20v2" />
        <path d="M7 2v2" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    )
  }
];

function JourneyCarousel() {
  return (
    <div className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-16 animate-fade-up">
        <SectionHeader
          eyebrow="// SERVIÇOS"
          title={
            <>
              Soluções<br />
              <span className="text-gradient-neon">Especializadas</span>
            </>
          }
          desc="Equipes dedicadas para soluções em temas específicos da sua operação de TI."
          maxW="max-w-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="group relative glass-panel rounded-lg p-6 hover:border-neon-cyan/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.72_0.2_240/0.2)] animate-fade-up"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-md border border-border/60 bg-surface/60 flex items-center justify-center group-hover:border-neon-cyan/60 group-hover:text-neon-cyan transition-colors">
                  {svc.icon}
                </div>
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground">
                  {svc.id}
                </span>
              </div>
              <h3 className="text-base font-medium leading-tight mb-2">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neon-cyan/70">● ONLINE</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative isolate scroll-mt-24 py-14 lg:py-20">
      {/* Full-width journey carousel rendered first */}
      <JourneyCarousel />
    </section>
  );
}

/* ─────────── HOW IT WORKS ─────────── */
const missions = [
  {
    step: "01",
    icon: Target,
    phase: "MISSÃO",
    title: "Diagnósticos claros e assertivos",
    desc: "Imersão no seu ambiente para mapear gargalos, riscos e prioridades, com um plano de ação objetivo.",
  },
  {
    step: "02",
    icon: Users,
    phase: "SELEÇÃO",
    title: "Equipes e agentes especializados",
    desc: "Montamos o time ideal para o seu desafio, com especialistas certificados em cada tecnologia.",
  },
  {
    step: "03",
    icon: Zap,
    phase: "EXECUÇÃO",
    title: "Entrega garantida e continuidade nos negócios",
    desc: "SLAs definidos, governança sênior e transparência total para manter sua operação sempre de pé.",
  },
  {
    step: "04",
    icon: Trophy,
    phase: "RESULTADO",
    title: "Melhoria contínua da eficiência operacional",
    desc: "Indicadores acompanhados de perto e ajustes constantes para reduzir custos e ganhar desempenho.",
  },
];

export function Operation() {
  return (
    <section id="operacao" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// OPERAÇÃO"
          title={
            <>
              Matriz de<br />
              <span className="text-gradient-neon">Interoperabilidade</span>
            </>
          }
          mb="mb-0"
        />
      </div>

      {/* Matrix Panel Container — same width as the Timeline (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <MatrixTable />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* 4-phase cards methodology at the end */}
        <div className="mt-28 lg:mt-40">
          <SectionHeader
            eyebrow="// METODOLOGIA"
            title={
              <>
                Resultado do
                <br />
                <span className="text-gradient-neon">Contínuo</span>
              </>
            }
            desc="Garantia de continuidade nos negócios, melhoria da eficiência operacional e sucesso no crescimento."
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
    <section id="portfolio" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// OPERAÇÕES REALIZADAS"
          title={
            <>
              Rede de<br />
              <span className="text-gradient-neon">confiança</span>
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

/* ─────────── FINOPS ─────────── */
export function FinOps() {
  const metrics = [
    { icon: TrendingDown, label: "Redução média", value: "até 35%" },
    { icon: PiggyBank, label: "Desperdício mapeado", value: "100%" },
    { icon: Gauge, label: "Visibilidade", value: "Tempo real" },
    { icon: Cloud, label: "Clouds suportadas", value: "AWS · Azure · GCP" },
  ];

  const costs = [
    { service: "Compute", before: 92, after: 61 },
    { service: "Storage", before: 74, after: 48 },
    { service: "Database", before: 66, after: 47 },
    { service: "Network", before: 41, after: 30 },
    { service: "Licenças", before: 58, after: 35 },
  ];

  return (
    <section id="finops" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1fr] gap-12 items-center lg:items-end">
        <div>
          <SectionHeader
            eyebrow="// FINOPS — EFICIÊNCIA FINANCEIRA CLOUD"
            title={
              <div className="flex flex-col gap-3">
                <span>
                  Cloud sob<br />
                  <span className="text-gradient-neon">controle</span> financeiro
                </span>
                <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  OTIMIZAÇÃO CONTÍNUA
                </span>
              </div>
            }
            desc="Visibilidade total dos custos de nuvem, análise de desperdícios, alocação por área e otimização contínua — conduzido por especialistas FinOps da rede Master Agent."
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
              <span className="text-neon-cyan">COST OPTIMIZATION</span>
              <span className="text-muted-foreground">/ billing-01</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">FINOPS.LIVE_FEED</span>
          </div>

          {/* Cost breakdown: before vs after optimization */}
          <div className="p-6 font-mono text-xs">
            <div className="flex items-center justify-between mb-5 text-[10px] tracking-wider text-muted-foreground">
              <span>CUSTO MENSAL POR SERVIÇO</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-muted-foreground/40" /> ANTES
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-neon-cyan" /> DEPOIS
                </span>
              </span>
            </div>
            <div className="space-y-4">
              {costs.map((c) => (
                <div key={c.service}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-foreground/80">{c.service}</span>
                    <span className="text-emerald-400">
                      -{Math.round((1 - c.after / c.before) * 100)}%
                    </span>
                  </div>
                  <div className="relative h-2.5 rounded-sm bg-surface/60 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-muted-foreground/30"
                      style={{ width: `${c.before}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-cyan shadow-[0_0_10px_rgba(0,216,255,0.5)] transition-all duration-700 group-hover:brightness-125"
                      style={{ width: `${c.after}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 flex justify-between text-muted-foreground">
              <span>savings_status</span>
              <span className="text-neon-cyan">◉ OTIMIZANDO</span>
            </div>
          </div>
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
    <section id="soc" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1fr] gap-12 items-center lg:items-end">
        <div>
          <SectionHeader
            eyebrow="// SOC AS A SERVICE — OPERAÇÃO 24/7"
            title={
              <div className="flex flex-col gap-3">
                <span>
                  Central de<br />
                  <span className="text-gradient-neon">operações</span> 24/7
                </span>
                <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ATIVO 24/7/365
                </span>
              </div>
            }
            desc="Operação de Segurança ininterrupta, 24/7/365 que atua com SIEM e ITSM próprios. Equipe técnica altamente especializada e certificada ISO/IEC 27001."
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
          <div className="relative overflow-hidden aspect-[4/3] w-full">
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
    <section id="contato" className="relative scroll-mt-24 py-14 lg:py-20">
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-xs font-mono text-neon-cyan mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
          CANAL ABERTO · RESPOSTA EM 24H
        </div>

        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
          Encontre um agente de
          <br />
          <span className="text-gradient-neon">serviços em tecnologia.</span>
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

        <div className="mt-16 grid lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          {[
            { label: "CANAL", value: "contato@masteragent.com.br", href: "mailto:contato@masteragent.com.br" },
            { label: "OPERAÇÃO", value: "Operação de Segurança Cibernética 24/7 América Latina" },
            { label: "PROTOCOLO", value: "Eficiência Financeira e Operacional" },
          ].map((item) => (
            <div key={item.label} className="glass-panel rounded-md p-5 min-w-0">
              <div className="text-[10px] font-mono tracking-widest text-neon-cyan">
                {item.label}
              </div>
              <div className="mt-1.5 text-sm leading-snug [overflow-wrap:anywhere]">
                {"href" in item ? (
                  <a href={item.href} className="hover:text-neon-cyan transition-colors">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
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
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 tracking-wider">
          <a href="mailto:contato@masteragent.com.br" className="hover:text-neon-cyan transition-colors">
            contato@masteragent.com.br
          </a>
          <a href="/privacidade" className="hover:text-neon-cyan transition-colors">
            Termos de Uso e Privacidade
          </a>
          <span>v2.6.1 · build.stable · zone.br</span>
        </div>
      </div>
    </footer>
  );
}
