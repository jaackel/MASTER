import { useEffect, useState } from "react";

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
        <a
          href="/"
          onClick={(e) => {
            // Back to the hero without leaving a #hash in the URL
            e.preventDefault();
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-[60px] h-[60px] flex items-center justify-center relative">
            <img 
              src="/logo.png" 
              alt="Master Agent Logo" 
              className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,216,255,0.4)] group-hover:scale-105 transition-all duration-500 ${
                scrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`} 
              draggable={false}
            />
            <img 
              src="/logo-blue.png" 
              alt="Master Agent Logo Blue" 
              className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,216,255,0.4)] group-hover:scale-105 transition-all duration-500 ${
                scrolled ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
              }`} 
              draggable={false}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-title tracking-wide">
              <span className="text-white font-bold">MASTER</span>
              <span className={`font-extrabold transition-colors duration-500 ${scrolled ? "text-white" : "text-[#00c8ff]"}`}>AGENT_</span>
            </span>
            <span className="text-[8px] font-mono text-muted-foreground tracking-[0.15em] mt-0.5">
              // SERVICE PROVIDER HUB
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-500 relative group ${
                scrolled ? "text-white hover:text-[#00c8ff]" : "text-[#00c8ff] hover:text-white"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#conectar"
            className="hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium tracking-wide border border-[#00c8ff]/40 text-[#00c8ff] hover:bg-[#00c8ff]/10 hover:shadow-[0_0_20px_oklch(0.72_0.2_240/0.3)] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse-glow" />
            CONECTAR
          </a>
        </div>
      </div>
    </header>
  );
}
