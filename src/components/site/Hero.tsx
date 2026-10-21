import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Radio, DollarSign } from "lucide-react";
import ElectricBorder from "./ElectricBorder";
import Antigravity from "./Antigravity";

const lines = [
  { prompt: "master@agent:~$", text: "init secure_channel --encrypted" },
  { prompt: "[OK]", text: "handshake established Â· 256-bit" },
  { prompt: "master@agent:~$", text: "deploy specialist --domain=cyber" },
  { prompt: "[OK]", text: "agent online Â· standing by" },
];

export function Hero() {
  const [typed, setTyped] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const target = lines[lineIdx].text;
    if (current.length < target.length) {
      const t = setTimeout(() => setCurrent(target.slice(0, current.length + 1)), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped((p) => [...p, target]);
      setCurrent("");
      setLineIdx((i) => i + 1);
    }, 500);
    return () => clearTimeout(t);
  }, [current, lineIdx]);

  return (
    <section id="top" className="relative pt-32 lg:pt-40 pb-14 lg:pb-20 overflow-hidden">
      {/* Backdrop sits below the shared hexagon grid (-z-10) rendered in routes/index.tsx */}
      <div className="absolute inset-0 -z-20 bg-hero" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/80 via-background/50 to-background/50" />

      {/* Interactive Antigravity background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Antigravity
          count={120}
          magnetRadius={15}
          ringRadius={12}
          waveSpeed={0.02}
          waveAmplitude={0.1}
          particleSize={0.6}
          lerpSpeed={0.01}
          color="#00c8ff"
          autoAnimate
          particleVariance={0.2}
          rotationSpeed={0}
          depthFactor={1.2}
          pulseSpeed={0.1}
          particleShape="box"
          fieldStrength={10}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_0.9fr_0.9fr] gap-8 lg:gap-10 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-xs font-mono text-neon-cyan mb-8">
            <Radio className="w-3 h-3 animate-pulse-glow" />
            <span className="tracking-wider">CANAL SEGURO · ACESSO RESTRITO</span>
          </div>

          <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            Master
            <br />
            <span className="text-[#00c8ff]">Agent</span>
            <span className="text-[#00c8ff] animate-blink ml-2">_</span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Uma agência de provedores de serviços de TI que opera como Hub especializado em{" "}
            <span className="text-foreground">serviços profissionais</span> e{" "}
            <span className="text-foreground">serviços gerenciados</span>.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4">
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-gradient-to-r from-neon-blue to-neon-cyan text-background font-medium text-sm tracking-wide shadow-[0_0_30px_oklch(0.60_0.23_218/0.4)] hover:shadow-[0_0_50px_oklch(0.60_0.23_218/0.6)] transition-all"
            >
              Conheça nossas soluções
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#finops"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border hover:border-neon-cyan/50 text-sm tracking-wide transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                FinOps
              </a>
              <a
                href="#soc"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border hover:border-neon-cyan/50 text-sm tracking-wide transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                SOC as a Service
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-xs font-mono text-muted-foreground">
            <div>
              <div className="text-neon-cyan text-lg font-semibold">120+</div>
              AGENTES ATIVOS
            </div>
            <div>
              <div className="text-neon-cyan text-lg font-semibold">24/7</div>
              MONITORAMENTO
            </div>
            <div>
              <div className="text-neon-cyan text-lg font-semibold">99.98%</div>
              SLA OPERACIONAL
            </div>
          </div>
        </div>

        {/* Terminal panel */}
        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-panel rounded-lg overflow-hidden shadow-[var(--shadow-panel)] scanline">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-surface/80">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted-foreground tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-neon-cyan/80 inline-block" />
                  master@agent:~
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground/60 text-xs font-mono select-none">
                <button className="hover:text-foreground transition-colors font-light" aria-label="Minimize">—</button>
                <button className="hover:text-foreground transition-colors text-[10px]" aria-label="Maximize">☐</button>
                <button className="text-red-500 hover:text-red-400 transition-colors text-sm font-semibold" aria-label="Close">×</button>
              </div>
            </div>
            <div className="p-6 font-mono text-sm min-h-[320px] leading-relaxed">
              {typed.map((t, i) => (
                <div key={i} className="mb-1.5">
                  <span
                    className={
                      lines[i].prompt.startsWith("[") ? "text-neon-cyan" : "text-neon-blue"
                    }
                  >
                    {lines[i].prompt}
                  </span>{" "}
                  <span className="text-foreground/80">{t}</span>
                </div>
              ))}
              {lineIdx < lines.length && (
                <div>
                  <span
                    className={
                      lines[lineIdx].prompt.startsWith("[") ? "text-neon-cyan" : "text-neon-blue"
                    }
                  >
                    {lines[lineIdx].prompt}
                  </span>{" "}
                  <span className="text-foreground/80">{current}</span>
                  <span className="text-neon-cyan animate-blink">█</span>
                </div>
              )}
              {lineIdx >= lines.length && (
                <div className="mt-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>threat_level</span>
                    <span className="text-neon-cyan">◉ NOMINAL</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>uptime</span>
                    <span className="text-neon-cyan">1247d 04:22:19</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>active_missions</span>
                    <span className="text-neon-cyan">42</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Ambient glow */}
          <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-neon-blue/20 via-transparent to-neon-cyan/10 blur-3xl pointer-events-none" />
        </div>

        {/* Futuristic Illustration column */}
        <div className="hidden lg:flex relative items-center justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-neon-blue/10 via-transparent to-neon-cyan/20 blur-2xl pointer-events-none" />
            <img src="/cloud-ops.png" alt="Cloud Ops" className="relative w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
