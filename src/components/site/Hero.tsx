import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Radio } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const lines = [
  { prompt: "master@agent:~$", text: "init secure_channel --encrypted" },
  { prompt: "[OK]", text: "handshake established · 256-bit" },
  { prompt: "master@agent:~$", text: "deploy specialist --domain=cyber" },
  { prompt: "[OK]", text: "agent online · standing by" },
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
    <section id="top" className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-hero">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon-cyan animate-float-particle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-xs font-mono text-neon-cyan mb-8">
            <Radio className="w-3 h-3 animate-pulse-glow" />
            <span className="tracking-wider">CANAL SEGURO · ACESSO RESTRITO</span>
          </div>

          <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]">
            Master
            <br />
            <span className="text-gradient-neon">Agent</span>
            <span className="text-neon-cyan animate-blink ml-2">_</span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            O hub estratégico que conecta empresas aos melhores{" "}
            <span className="text-foreground">especialistas em tecnologia</span>. Agentes sob
            demanda para acelerar sua operação digital.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-gradient-to-r from-neon-blue to-neon-cyan text-background font-medium text-sm tracking-wide shadow-[0_0_30px_oklch(0.72_0.2_240/0.4)] hover:shadow-[0_0_50px_oklch(0.72_0.2_240/0.6)] transition-all"
            >
              Conheça nossas soluções
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#soc"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border hover:border-neon-cyan/50 text-sm tracking-wide transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              SOC as a Service
            </a>
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
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-surface/60">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-neon-blue/70" />
              </div>
              <span className="ml-3 text-[11px] font-mono text-muted-foreground tracking-wider">
                secure_shell — master@agent — 80×24
              </span>
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
          <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-neon-blue/20 via-transparent to-neon-cyan/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
