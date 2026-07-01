import { useEffect, useState } from "react";
import { Terminal, Moon, Sun } from "lucide-react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#operacao", label: "Operação" },
  { href: "#soc", label: "SOC" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center shadow-[0_0_20px_oklch(0.72_0.2_240/0.4)]">
              <Terminal className="w-4 h-4 text-background" strokeWidth={2.5} />
            </div>
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
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="w-9 h-9 rounded-md border border-border/60 flex items-center justify-center hover:border-neon-cyan/60 hover:text-neon-cyan transition-colors"
          >
            {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
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
