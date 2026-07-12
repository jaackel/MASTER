import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#operacao", label: "Operação" },
  { href: "#soc", label: "SOC" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "mt-4 w-[calc(100%-3rem)] max-w-4xl h-14 px-5 rounded-lg glass-panel border border-border/50 shadow-[0_8px_32px_oklch(0_0_0/0.5)] backdrop-blur-xl"
            : "mt-0 w-full max-w-7xl h-16 px-6 rounded-none bg-transparent border-transparent shadow-none"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center shadow-[0_0_20px_oklch(0.72_0.2_240/0.4)]">
            <Terminal className="w-4 h-4 text-background" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-wide">MASTER AGENT</span>
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em]">
              // SECURE HUB
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium tracking-wide border border-neon-blue/40 text-neon-cyan hover:bg-neon-blue/10 hover:shadow-[0_0_20px_oklch(0.72_0.2_240/0.3)] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
            CONECTAR
          </a>
        </div>
      </div>
    </header>
  );
}
