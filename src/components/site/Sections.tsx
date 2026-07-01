import {
  Cloud,
  ShieldCheck,
  Eye,
  Cpu,
  Code2,
  Database,
  Wrench,
  Rocket,
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

/* ─────────── ABOUT ─────────── */
export function About() {
  const pillars = [
    { icon: Network, label: "Rede", value: "Especialistas conectados" },
    { icon: Lock, label: "Sigilo", value: "Operação confidencial" },
    { icon: Layers, label: "Escala", value: "Sob demanda" },
  ];
  return (
    <section id="sobre" className="relative py-32 border-t border-border/40">
      <div className="absolute inset-0 bg-tech-grid opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeader
            eyebrow="// SOBRE"
            title={
              <>
                Uma agência que opera
                <br />
                <span className="text-gradient-neon">nos bastidores</span>.
              </>
            }
            desc="A Master Agent é o hub estratégico que conecta empresas a especialistas técnicos e comerciais. Uma rede inteligente pronta para resolver desafios complexos de tecnologia — com discrição executiva e execução cirúrgica."
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
    </section>
  );
}

/* ─────────── SERVICES ─────────── */
const services = [
  {
    icon: Cloud,
    code: "SVC.01",
    title: "Infraestrutura & Cloud",
    desc: "Arquitetura, migração e operação em ambientes AWS, Azure e GCP.",
  },
  {
    icon: ShieldCheck,
    code: "SVC.02",
    title: "CyberSecurity",
    desc: "Proteção ofensiva e defensiva, hardening, compliance e resposta a incidentes.",
  },
  {
    icon: Eye,
    code: "SVC.03",
    title: "SOC as a Service",
    desc: "Monitoramento 24/7, detecção avançada e resposta a ameaças em tempo real.",
  },
  {
    icon: Cpu,
    code: "SVC.04",
    title: "Inteligência Artificial",
    desc: "Modelos preditivos, LLMs corporativos e automação cognitiva sob demanda.",
  },
  {
    icon: Code2,
    code: "SVC.05",
    title: "Desenvolvimento de Software",
    desc: "Aplicações web, mobile e sistemas críticos com engenharia sênior.",
  },
  {
    icon: Database,
    code: "SVC.06",
    title: "Dados & Automação",
    desc: "Data platforms, pipelines, BI executivo e automação de processos.",
  },
  {
    icon: Wrench,
    code: "SVC.07",
    title: "Serviços recorrentes de TI",
    desc: "Sustentação, N2/N3, gestão de ambiente e AMS especializado.",
  },
  {
    icon: Rocket,
    code: "SVC.08",
    title: "Projetos técnicos especializados",
    desc: "Squads sob medida para desafios técnicos de alta complexidade.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// MÓDULOS OPERACIONAIS"
          title={
            <>
              Serviços da <span className="text-gradient-neon">central</span>
            </>
          }
          desc="Cada módulo é um vetor de execução — ativado sob demanda por agentes verificados na sua stack e no seu contexto."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, code, title, desc }) => (
            <div
              key={code}
              className="group relative glass-panel rounded-lg p-6 hover:border-neon-cyan/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.72_0.2_240/0.2)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-md border border-border/60 bg-surface/60 flex items-center justify-center group-hover:border-neon-cyan/60 group-hover:text-neon-cyan transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground">
                  {code}
                </span>
              </div>
              <h3 className="text-base font-medium leading-tight mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[10px] font-mono">
                <span className="text-neon-cyan/70">● ONLINE</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
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
    <section id="operacao" className="relative py-32 border-t border-border/40 overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-25" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// OPERAÇÃO"
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
    <section id="portfolio" className="relative py-32 border-t border-border/40">
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
  const feed = [
    {
      t: "03:14:22",
      tag: "INFO",
      msg: "Baseline reconhecido · perímetro estável",
      tone: "text-neon-cyan",
    },
    {
      t: "03:14:47",
      tag: "WARN",
      msg: "Tentativa de acesso incomum · IP bloqueado",
      tone: "text-amber-400",
    },
    {
      t: "03:15:02",
      tag: "OK",
      msg: "Playbook executado · agente atribuído",
      tone: "text-neon-cyan",
    },
    {
      t: "03:15:31",
      tag: "INFO",
      msg: "Correlação SIEM · sem impacto operacional",
      tone: "text-neon-cyan",
    },
  ];

  const metrics = [
    { icon: Activity, label: "Eventos/dia", value: "12.4M" },
    { icon: AlertTriangle, label: "Ameaças contidas", value: "1.847" },
    { icon: Gauge, label: "MTTR", value: "< 8min" },
    { icon: ServerCog, label: "Fontes integradas", value: "180+" },
  ];

  return (
    <section id="soc" className="relative py-32 border-t border-border/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/[0.04] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-tech-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow="// SOC AS A SERVICE"
            title={
              <>
                Central de <span className="text-gradient-neon">operações</span> de segurança.
              </>
            }
            desc="Monitoramento contínuo com correlação SIEM, threat intelligence e resposta orquestrada — operada por analistas seniores da rede Master Agent."
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

        <div className="glass-panel rounded-lg overflow-hidden scanline shadow-[var(--shadow-panel)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-surface/60">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
              <span className="text-neon-cyan">SIEM · LIVE</span>
              <span className="text-muted-foreground">/ sector-04 / node-17</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">SEV.MONITOR</span>
          </div>
          <div className="p-6 font-mono text-xs space-y-2">
            {feed.map((e) => (
              <div
                key={e.t}
                className="grid grid-cols-[80px_60px_1fr] gap-3 py-1.5 border-b border-border/20 last:border-0"
              >
                <span className="text-muted-foreground">{e.t}</span>
                <span className={`${e.tone} font-semibold`}>[{e.tag}]</span>
                <span className="text-foreground/80">{e.msg}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-border/40 grid grid-cols-3 gap-4 text-[10px] font-mono">
            <div>
              <div className="text-muted-foreground">CPU</div>
              <div className="mt-1 h-1 rounded bg-border overflow-hidden">
                <div className="h-full w-[42%] bg-gradient-to-r from-neon-blue to-neon-cyan" />
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">NETWORK</div>
              <div className="mt-1 h-1 rounded bg-border overflow-hidden">
                <div className="h-full w-[71%] bg-gradient-to-r from-neon-blue to-neon-cyan" />
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">THREATS</div>
              <div className="mt-1 h-1 rounded bg-border overflow-hidden">
                <div className="h-full w-[18%] bg-gradient-to-r from-amber-400 to-neon-cyan" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── DIFFERENTIALS ─────────── */
export function Differentials() {
  const items = [
    {
      icon: Network,
      title: "Rede especializada",
      desc: "Curadoria rigorosa de agentes com histórico comprovado por domínio.",
    },
    {
      icon: Headphones,
      title: "Atendimento estratégico",
      desc: "Interlocução sênior alinhada ao negócio, não apenas ao ticket.",
    },
    {
      icon: Zap,
      title: "Agilidade operacional",
      desc: "Ativação rápida de squads com o skill exato para cada missão.",
    },
    {
      icon: Lock,
      title: "Confidencialidade",
      desc: "Protocolo de sigilo desde o primeiro contato até o handover.",
    },
    {
      icon: Layers,
      title: "Escalabilidade",
      desc: "Da POC ao ambiente corporativo, com governança preparada.",
    },
  ];
  return (
    <section className="relative py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="// DIFERENCIAIS"
          title={
            <>
              Por que a <span className="text-gradient-neon">Master Agent</span>
            </>
          }
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`glass-panel rounded-lg p-6 hover:border-neon-cyan/40 transition-all ${
                i === 0
                  ? "lg:row-span-2 lg:col-span-2 bg-gradient-to-br from-neon-blue/[0.06] to-transparent"
                  : ""
              }`}
            >
              <Icon className={`text-neon-cyan mb-4 ${i === 0 ? "w-8 h-8" : "w-6 h-6"}`} />
              <h3 className={`font-medium mb-2 ${i === 0 ? "text-2xl" : "text-base"}`}>{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CONTACT ─────────── */
export function Contact() {
  return (
    <section id="contato" className="relative py-32 border-t border-border/40 overflow-hidden">
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
            href="mailto:contato@masteragent.com.br"
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
    <footer className="relative border-t border-border/40 py-10">
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
