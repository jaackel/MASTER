import { useState } from "react";
import { Check } from "lucide-react";

interface ColData {
  id: string;
  label: string;
  gradient: string;
  isSilver?: boolean;
}

interface RowData {
  label: string;
  subtitle: string;
}

export default function MatrixTable() {
  const [activeCol, setActiveCol] = useState<string | null>("devsecops");
  const [activeRow, setActiveRow] = useState<number | null>(0); // Default to Day 0 (index 0)

  const cols: ColData[] = [
    { id: "cloudops", label: "CloudOps", gradient: "from-[#0064ff] to-[#00d8ff]" },
    { id: "gitops", label: "GitOps", gradient: "from-[#0064ff] to-[#00d8ff]" },
    { id: "dataops", label: "DataOps", gradient: "from-[#0064ff] to-[#00d8ff]" },
    { id: "devsecops", label: "DevSecOps", gradient: "from-[#0055d4] to-[#00d8ff]" },
    { id: "finops", label: "FinOps", gradient: "from-[#0064ff] to-[#00d8ff]" },
    { id: "mliaops", label: "ML / AIOps", gradient: "from-[#4b5563] to-[#9ca3af]", isSilver: true },
  ];

  const rows: RowData[] = [
    { label: "Day 0. Consultoria", subtitle: "(Planejamento)" },
    { label: "Day 1. Arquitetura", subtitle: "(Estratégia)" },
    { label: "Day 2. Implementação", subtitle: "(Serviços Profissionais)" },
    { label: "Day 3. Sustentação", subtitle: "(Serviços Gerenciados)" },
    { label: "Day 4. Monitoração", subtitle: "(MDR e SOCaaS)" },
    { label: "Day 5. Treinamentos", subtitle: "(Governança)" },
    { label: "Day 6. Modernização", subtitle: "(Melhoria Contínua)" },
  ];

  return (
    <div className="w-full py-8">
      {/* Title block */}
      <div className="text-center mb-8">
        <h4 className="text-lg font-mono font-bold tracking-wider text-neon-cyan uppercase">
          Matriz de Interoperabilidade
        </h4>
      </div>

      {/* Mobile layout: stacked cards, no horizontal scroll needed */}
      <div className="md:hidden max-w-md mx-auto px-4 space-y-3">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="rounded-lg border border-neon-cyan/20 bg-[#051c27]/40 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-3 pb-2 border-b border-neon-cyan/10">
              <span className="block text-xs font-mono font-bold text-foreground">
                {row.label}
              </span>
              <span className="block text-[10px] font-sans text-muted-foreground font-medium">
                {row.subtitle}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {cols.map((col) => (
                <div
                  key={`${rowIdx}-${col.id}-m`}
                  className="flex items-center gap-2 rounded-md border border-border/20 bg-[#051620]/40 px-2 py-1.5"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                    <Check className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.8)] stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-sans text-foreground/80 truncate">
                    {col.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/tablet layout: full grid matrix */}
      <div className="hidden md:block w-full overflow-x-auto scrollbar-thin pt-4 pb-4">
        <div className="min-w-[900px] max-w-5xl mx-auto px-4 grid grid-cols-[240px_repeat(6,1fr)] gap-y-3 gap-x-3 relative">
          
          {/* Top Left Header Cell (Spacer) */}
          <div className="h-14" />

          {/* Column Headers */}
          {cols.map((col) => {
            const isSelected = activeCol === col.id;
            
            return (
              <div
                key={col.id}
                onMouseEnter={() => {
                  setActiveCol(col.id);
                  setActiveRow(null); // Focus column, clear row focus
                }}
                className={`h-14 rounded-lg flex items-center justify-center font-sans font-bold text-sm tracking-wide transition-all duration-300 border cursor-pointer select-none relative
                  ${col.isSilver 
                    ? "bg-gradient-to-br from-[#374151] to-[#4b5563] border-white/20 text-white" 
                    : `bg-gradient-to-br ${col.gradient} border-neon-cyan/20 text-white`
                  }
                  ${isSelected ? "ring-2 ring-neon-cyan shadow-[0_0_20px_rgba(0,216,255,0.4)] scale-105 z-10" : "opacity-80 hover:opacity-100 hover:scale-102 z-0"}
                `}
              >
                {col.label}
              </div>
            );
          })}

          {/* Table Body Rows */}
          {rows.map((row, rowIdx) => {
            const isRowActive = activeRow === rowIdx;

            return (
              <div key={rowIdx} className="contents">
                
                {/* Row Header (Day X card) */}
                <div
                  onMouseEnter={() => {
                    setActiveRow(rowIdx);
                    setActiveCol(null); // Focus row, clear column focus
                  }}
                  className={`h-16 rounded-lg border border-dashed flex flex-col justify-center px-4 shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer
                    ${isRowActive 
                      ? "border-neon-cyan/50 bg-[#072432]/80 shadow-[0_0_15px_rgba(0,216,255,0.15)] scale-102" 
                      : "border-neon-cyan/30 bg-[#051c27]/40 hover:border-neon-cyan/50 hover:bg-[#072432]/60"
                    }
                  `}
                >
                  <span className="text-xs font-mono font-bold text-foreground">
                    {row.label}
                  </span>
                  <span className="text-[10px] font-sans text-muted-foreground font-medium">
                    {row.subtitle}
                  </span>
                </div>

                {/* Data Cells */}
                {cols.map((col) => {
                  const isColSelected = activeCol === col.id;
                  const isRowSelected = activeRow === rowIdx;
                  const isIntersection = isColSelected && isRowSelected;
                  const isHighlighted = isColSelected || isRowSelected;
                  
                  return (
                    <div
                      key={`${rowIdx}-${col.id}`}
                      onMouseEnter={() => {
                        setActiveCol(col.id);
                        setActiveRow(rowIdx);
                      }}
                      className={`h-16 rounded-lg border transition-all duration-300 flex items-center justify-center relative cursor-pointer
                        ${isIntersection 
                          ? "bg-[#0c394c]/85 border-neon-cyan/70 shadow-[0_0_20px_rgba(0,216,255,0.25)] scale-105 z-20" 
                          : isColSelected
                            ? "bg-[#0c2f3d]/60 border-neon-cyan/40 shadow-[inset_0_0_15px_rgba(0,216,255,0.08)] z-10"
                            : isRowSelected
                              ? "bg-[#0c2f3d]/45 border-neon-cyan/30 shadow-[inset_0_0_10px_rgba(0,216,255,0.05)] z-10"
                              : "bg-[#051620]/30 border-border/20"
                        }
                      `}
                    >
                      {/* Vertical Highlight Overlay Column effect */}
                      {isColSelected && (
                        <div className="absolute inset-x-0 -top-2 -bottom-2 border-x border-neon-cyan/20 bg-neon-blue/5 pointer-events-none -z-10 animate-fade-in" />
                      )}

                      {/* Horizontal Highlight Overlay Row effect */}
                      {isRowSelected && (
                        <div className="absolute -left-2 -right-2 inset-y-0 border-y border-neon-cyan/20 bg-neon-blue/5 pointer-events-none -z-10 animate-fade-in" />
                      )}

                      {/* Glowing Checkmark */}
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                          ${isHighlighted
                            ? isIntersection
                              ? "bg-emerald-500/30 border-emerald-300 scale-115 shadow-[0_0_22px_rgba(52,211,153,0.75)]"
                              : "bg-emerald-500/20 border-emerald-400 scale-108 shadow-[0_0_14px_rgba(52,211,153,0.45)]"
                            : "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:scale-110"
                          }
                        `}
                      >
                        <Check 
                          className={`w-5 h-5 transition-all duration-300
                            ${isHighlighted
                              ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.95)] stroke-[3.5]"
                              : "text-emerald-500/80 stroke-[2.5]"
                            }
                          `} 
                        />
                      </div>
                    </div>
                  );
                })}

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
