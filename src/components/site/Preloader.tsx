import { useEffect, useState } from "react";

const bootLines = [
  { text: "[    0.000000] Booting Linux 6.1.0-37-generic x86_64", type: "kernel" },
  { text: "[    0.412891] systemd[1]: Detected virtualization kvm.", type: "kernel" },
  { text: "[    0.891203] systemd[1]: Starting Master Agent OS...", type: "kernel" },
  { text: "         Starting Initialize System State...", type: "starting" },
  { text: "[  OK  ] Initialized Secure Boot State.", type: "ok" },
  { text: "         Starting Master Agent Services...", type: "starting" },
  { text: "[  OK  ] Started SSH daemon.", type: "ok" },
  { text: "[  OK  ] Started Network Manager.", type: "ok" },
  { text: "[  OK  ] Reached target Network.", type: "ok" },
  { text: "         Starting Master Agent Core v3.2.1...", type: "starting" },
  { text: "[  OK  ] Started Master Agent Core.", type: "ok" },
  { text: "[  OK  ] Access granted.", type: "ok" },
] as const;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), i * 150));
    });

    timers.push(setTimeout(() => setVisible(false), bootLines.length * 150 + 500));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] font-mono text-sm p-8 pt-[12vh]">
      <div className="max-w-3xl space-y-0.5">
        {bootLines.slice(0, shown).map((line, i) => (
          <div key={i} className="leading-6 animate-fade-in">
            {line.type === "ok" ? (
              <>
                <span className="text-green-400 font-bold">[  OK  ]</span>
                <span className="text-gray-200">{line.text.slice(7)}</span>
              </>
            ) : line.type === "kernel" ? (
              <span className="text-gray-500">{line.text}</span>
            ) : (
              <span className="text-gray-300">{line.text}</span>
            )}
          </div>
        ))}
        <span className="inline-block w-2 h-[1.1em] bg-gray-300 align-middle animate-blink" />
      </div>
    </div>
  );
}
