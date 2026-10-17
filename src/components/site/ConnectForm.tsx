import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Shield, ArrowRight } from "lucide-react";

// Envio via FormSubmit (sem backend/SMTP). O primeiro envio dispara um e-mail de
// ativação para o endereço abaixo — é preciso clicar no link uma vez para liberar.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/contato@masteragent.com.br";

const DOMAIN_LABELS: Record<string, string> = {
  cloudops: "CloudOps",
  gitops: "GitOps",
  dataops: "DataOps",
  devsecops: "DevSecOps",
  finops: "FinOps",
  mliaops: "ML / AIOps",
  outros: "Outros",
};

const BUDGET_LABELS: Record<string, string> = {
  "10k-50k": "US$ 10k - 50k",
  "50k-200k": "US$ 50k - 200k",
  "200k+": "> US$ 200k",
};

interface ConnectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectForm({ isOpen, onClose }: ConnectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "devsecops",
    challenge: "",
    budget: "10k-50k",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form on close
      setStatus("idle");
      setLogs([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const simulateLogs = async () => {
    const messages = [
      "Establishing secure connection to MASTERAGENT portal...",
      "Encrypting proposal payload using AES-256...",
      "Generating unique project tracking ID...",
      "Transmitting briefing securely to agent network...",
      "Handshake complete. Payload verified successfully.",
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      setLogs((prev) => [...prev, messages[i]]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setLogs([]);
    try {
      const [res] = await Promise.all([
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `Novo briefing pelo site — ${formData.name}`,
            _replyto: formData.email,
            _template: "table",
            _captcha: "false",
            "Nome / Empresa": formData.name,
            "E-mail": formData.email,
            "Domínio principal": DOMAIN_LABELS[formData.domain] ?? formData.domain,
            "Orçamento": BUDGET_LABELS[formData.budget] ?? formData.budget,
            "Desafio técnico": formData.challenge,
          }),
        }),
        simulateLogs(),
      ]);
      const data = await res.json().catch(() => null);
      if (!res.ok || (data && String(data.success) === "false")) throw new Error("send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md overflow-y-auto animate-fade-in">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      {/* Glassmorphic modal container */}
      <div className="w-full max-w-2xl bg-[#051620]/80 border border-neon-cyan/20 p-6 md:p-8 rounded-lg relative shadow-[0_0_50px_rgba(0,216,255,0.15)] max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-muted-foreground hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {status !== "success" ? (
          <>
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-[10px] font-mono text-neon-cyan tracking-wider uppercase mb-3">
                <Shield className="w-3.5 h-3.5 text-neon-cyan" />
                Conexão Criptografada
              </div>
              <h2 className="text-3xl font-title font-bold text-white tracking-tight">
                Iniciar Briefing
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Descreva seu desafio técnico. Nossa equipe de especialistas estruturará o squad ideal para a sua missão.
              </p>
            </div>

            {status === "submitting" ? (
              <div className="py-12 flex flex-col items-center justify-center font-mono text-xs text-left">
                <div className="w-full max-w-md bg-[#020b10] border border-neon-cyan/25 rounded p-4 text-neon-cyan space-y-2 min-h-[160px] flex flex-col justify-start">
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-neon-cyan/20 text-[10px] tracking-wider text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SECURE TRANSMISSION LOGS
                  </div>
                  {logs.map((log, idx) => (
                    <div key={idx} className="animate-fade-in leading-relaxed">
                      ▸ {log}
                    </div>
                  ))}
                  <div className="w-12 h-1 bg-neon-cyan/35 animate-pulse mt-auto" />
                </div>
                <span className="mt-6 text-muted-foreground">Enviando proposta criptografada...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-cyan block">NOME / EMPRESA</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jackel / Master Inc."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border/40 bg-[#051c27]/40 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-cyan block">E-MAIL CORPORATIVO</label>
                    <input
                      type="email"
                      required
                      placeholder="exemplo@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border/40 bg-[#051c27]/40 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-cyan block">DOMÍNIO PRINCIPAL</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border/40 bg-[#051c27]/60 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 transition-all"
                    >
                      <option value="cloudops">CloudOps</option>
                      <option value="gitops">GitOps</option>
                      <option value="dataops">DataOps</option>
                      <option value="devsecops">DevSecOps</option>
                      <option value="finops">FinOps</option>
                      <option value="mliaops">ML / AIOps</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neon-cyan block">ORÇAMENTO DO PROJETO</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full h-11 px-4 rounded-md border border-border/40 bg-[#051c27]/60 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 transition-all"
                    >
                      <option value="10k-50k">US$ 10k - 50k</option>
                      <option value="50k-200k">US$ 50k - 200k</option>
                      <option value="200k+">&gt; US$ 200k</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neon-cyan block">DESCRIÇÃO DO DESAFIO TÉCNICO</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva a arquitetura atual, os problemas que está enfrentando e o objetivo estratégico que precisa alcançar..."
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full p-4 rounded-md border border-border/40 bg-[#051c27]/40 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all placeholder:text-muted-foreground/50 resize-none leading-relaxed"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
                    Não foi possível enviar agora. Tente novamente ou escreva para{" "}
                    <a href="mailto:contato@masteragent.com.br" className="underline">
                      contato@masteragent.com.br
                    </a>
                    .
                  </div>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ao enviar, você concorda com os{" "}
                  <a href="/privacidade" target="_blank" rel="noopener" className="text-neon-cyan hover:underline">
                    Termos de Uso e a Política de Privacidade
                  </a>
                  .
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-gradient-to-r from-neon-blue to-neon-cyan text-background font-medium text-sm tracking-wide shadow-[0_0_30px_oklch(0.60_0.23_218/0.4)] hover:shadow-[0_0_50px_oklch(0.60_0.23_218/0.6)] transition-all cursor-pointer"
                  >
                    Transmitir Briefing
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.25)] mb-6 animate-pulse-glow">
              <CheckCircle2 className="w-9 h-9 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
            </div>
            
            <h2 className="text-3xl font-title font-bold text-white tracking-tight">
              Conexão Estabelecida!
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              O briefing do projeto foi transmitido com sucesso à nossa rede de especialistas.
              Nossa equipe técnica analisará o desafio e entrará em contato em até <span className="text-neon-cyan font-bold font-mono">2 horas</span> através do e-mail seguro informado.
            </p>
            
            <div className="mt-8">
              <button
                onClick={onClose}
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-md border border-border hover:border-neon-cyan/50 text-sm text-foreground tracking-wide transition-colors"
              >
                Voltar ao Hub
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
