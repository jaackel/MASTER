import { useEffect, useState } from "react";

const bootLines = [
  { text: "[    0.000000] Booting Linux 6.1.0-37-generic x86_64", type: "kernel" },
  { text: "         Loading modules: [core, ai, automations]...", type: "starting" },
  { text: "         Connecting to MASTER_AGENT network...", type: "starting" },
  { text: "[  OK  ] Established 256-bit secure handshake.", type: "ok" },
  { text: "[  OK  ] Interface booted. Access granted.", type: "ok" },
] as const;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), i * 400));
    });

    timers.push(setTimeout(() => setVisible(false), bootLines.length * 400 + 600));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-[0_0_30px_oklch(0.60_0.23_218/0.15)]">
        <div className="flex items-center justify-between border-b border-border/40 bg-surface/80 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground tracking-wider flex items-center gap-1.5">
              master@agent:~
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground/60 text-xs font-mono select-none">
            <span className="font-light">—</span>
            <span className="text-[10px]">☐</span>
            <span className="text-red-500/80 text-sm font-semibold">×</span>
          </div>
        </div>
        <div className="p-5 font-mono text-xs sm:text-sm flex flex-col h-full min-h-[280px]">
          <div className="space-y-1 flex-1">
            {bootLines.slice(0, shown).map((line, i) => (
              <div key={i} className="leading-relaxed animate-fade-in">
                {line.type === "ok" ? (
                  <>
                    <span className="font-bold text-neon-cyan">[  OK  ]</span>
                    <span className="text-neon-blue/90">{line.text.slice(7)}</span>
                  </>
                ) : line.type === "kernel" ? (
                  <span className="text-neon-cyan/50">{line.text}</span>
                ) : (
                  <span className="text-neon-blue/70">{line.text}</span>
                )}
              </div>
            ))}
            <span className="align-middle inline-block h-[1.1em] w-2 animate-blink bg-neon-cyan mt-1" />
          </div>
          
          <div className="mt-8 pt-4 border-t border-border/20">
            <div className="flex justify-between text-[10px] text-neon-cyan/60 mb-2 font-bold tracking-widest">
              <span>LOADING</span>
              <span>{Math.round((shown / bootLines.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-elevated overflow-hidden rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan transition-all duration-300 ease-out"
                style={{ width: `${(shown / bootLines.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
