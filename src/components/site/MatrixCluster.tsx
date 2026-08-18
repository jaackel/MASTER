import { useMemo, useState } from "react";

interface HexNode {
  id: string;
  label: string[];
  gx: number; // grid x
  gy: number; // grid y
  type: "active-center" | "active-node" | "silver-node" | "dec-node";
}

export default function MatrixCluster() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = useMemo<HexNode[]>(() => [
    // Center
    {
      id: "center",
      label: ["Matrix", "MASTERAGENT", "InterOps"],
      gx: 0,
      gy: 0,
      type: "active-center",
    },
    // Inner Ring
    {
      id: "devsecops",
      label: ["DevSecOps"],
      gx: 0,
      gy: -1,
      type: "active-node",
    },
    {
      id: "finops",
      label: ["FinOps"],
      gx: 1,
      gy: -0.5,
      type: "active-node",
    },
    {
      id: "mliaops",
      label: ["ML / IAOps"],
      gx: 1,
      gy: 0.5,
      type: "silver-node",
    },
    {
      id: "cloudops",
      label: ["CloudOps"],
      gx: 0,
      gy: 1,
      type: "active-node",
    },
    {
      id: "gitops",
      label: ["GitOps"],
      gx: -1,
      gy: 0.5,
      type: "active-node",
    },
    {
      id: "dataops",
      label: ["DataOps"],
      gx: -1,
      gy: -0.5,
      type: "active-node",
    },
    // Decorative
    {
      id: "dec-top-left",
      label: [],
      gx: -1,
      gy: -1.5,
      type: "dec-node",
    },
    {
      id: "dec-far-left",
      label: [],
      gx: -2,
      gy: 0,
      type: "dec-node",
    },
    {
      id: "dec-far-right",
      label: [],
      gx: 2,
      gy: 0,
      type: "dec-node",
    },
    {
      id: "dec-bottom-right",
      label: [],
      gx: 1,
      gy: 1.5,
      type: "dec-node",
    },
  ], []);

  // Grid dimensions
  const stageWidth = 1000;
  const stageHeight = 650;
  const cx = stageWidth / 2;
  const cy = stageHeight / 2;
  
  const size = 80; // Hexagon radius
  const dx = 1.55 * size; // Horizontal gap
  const dy = size * Math.sqrt(3); // Vertical gap

  return (
    <div className="relative w-full overflow-hidden bg-background py-16">
      {/* Visual connection to the top network diagram */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-border/30 to-neon-cyan/20" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-[10px] font-mono tracking-widest text-neon-cyan uppercase mb-3">
            // INTEROPERABILIDADE INTEGRADA
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Integração <span className="text-gradient-neon">Multicloud</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            A infraestrutura de execução unificada que coordena dados, segurança e operações de ponta a ponta.
          </p>
        </div>

        {/* SVG Container Stage */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[1000/650] rounded-xl border border-border/30 bg-[#04121a]/30 p-2 shadow-[0_0_50px_rgba(0,100,255,0.05)] backdrop-blur-sm">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${stageWidth} ${stageHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for gradients and filters */}
            <defs>
              {/* Active Blue-Cyan Gradients */}
              <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0055d4" />
                <stop offset="50%" stopColor="#0088f5" />
                <stop offset="100%" stopColor="#00d8ff" />
              </linearGradient>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f527a" />
                <stop offset="100%" stopColor="#128cb5" />
              </linearGradient>
              
              {/* Silver-Gray Gradients */}
              <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b525f" />
                <stop offset="100%" stopColor="#647d8f" />
              </linearGradient>
              <linearGradient id="decGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#071b24" />
                <stop offset="100%" stopColor="#0d2430" />
              </linearGradient>

              {/* Glowing Filters */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting lines behind the hexagons */}
            <g opacity="0.15">
              {nodes.map((node) => {
                if (node.id === "center") return null;
                const nodeX = cx + node.gx * dx;
                const nodeY = cy + node.gy * dy;
                return (
                  <line
                    key={`line-${node.id}`}
                    x1={cx}
                    y1={cy}
                    x2={nodeX}
                    y2={nodeY}
                    stroke="var(--neon-cyan)"
                    strokeWidth="2"
                    strokeDasharray={node.type === "dec-node" ? "4,4" : undefined}
                  />
                );
              })}
            </g>

            {/* Render 3D Hexagons */}
            {nodes.map((node) => {
              const nodeX = cx + node.gx * dx;
              const nodeY = cy + node.gy * dy;
              
              const isHovered = hoveredNode === node.id;
              
              // 3D parameters
              const thick = 14; // side wall thickness
              const liftY = isHovered ? -8 : 0; // vertical lift on hover
              const currentY = nodeY + liftY;

              // Calculate top face hexagon vertices
              const r = size;
              const h = r * Math.sqrt(3) / 2;
              const p1 = { x: nodeX - r/2, y: currentY - h };
              const p2 = { x: nodeX + r/2, y: currentY - h };
              const p3 = { x: nodeX + r, y: currentY };
              const p4 = { x: nodeX + r/2, y: currentY + h };
              const p5 = { x: nodeX - r/2, y: currentY + h };
              const p6 = { x: nodeX - r, y: currentY };

              const topPoints = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y} ${p5.x},${p5.y} ${p6.x},${p6.y}`;

              // Calculate visible side walls (bottom walls)
              // Wall 1 (p5 -> p6)
              const w1Points = `${p5.x},${p5.y} ${p6.x},${p6.y} ${p6.x},${p6.y + thick} ${p5.x},${p5.y + thick}`;
              // Wall 2 (p4 -> p5)
              const w2Points = `${p4.x},${p4.y} ${p5.x},${p5.y} ${p5.x},${p5.y + thick} ${p4.x},${p4.y + thick}`;
              // Wall 3 (p3 -> p4)
              const w3Points = `${p3.x},${p3.y} ${p4.x},${p4.y} ${p4.x},${p4.y + thick} ${p3.x},${p3.y + thick}`;

              // Colors based on type
              let fillTop = "url(#nodeGrad)";
              let fillWallDark = "#03131c";
              let fillWallLight = "#052230";
              let strokeColor = "rgba(14,165,233,0.3)";
              let textColor = "text-white";

              if (node.type === "active-center") {
                fillTop = "url(#centerGrad)";
                fillWallDark = "#002d6b";
                fillWallLight = "#0047a8";
                strokeColor = "var(--neon-cyan)";
              } else if (node.type === "silver-node") {
                fillTop = "url(#silverGrad)";
                fillWallDark = "#1e2c34";
                fillWallLight = "#2a3d48";
                strokeColor = "rgba(200, 220, 230, 0.4)";
              } else if (node.type === "dec-node") {
                fillTop = "url(#decGrad)";
                fillWallDark = "#020a0f";
                fillWallLight = "#03121a";
                strokeColor = "rgba(255, 255, 255, 0.08)";
              }

              const isInteractive = node.type !== "dec-node";

              return (
                <g
                  key={node.id}
                  className={`${isInteractive ? "cursor-pointer" : "pointer-events-none"} transition-all duration-300`}
                  onMouseEnter={() => isInteractive && setHoveredNode(node.id)}
                  onMouseLeave={() => isInteractive && setHoveredNode(null)}
                >
                  {/* Outer glow ring around active elements */}
                  {node.type === "active-center" && (
                    <polygon
                      points={topPoints}
                      fill="none"
                      stroke="var(--neon-cyan)"
                      strokeWidth="3"
                      opacity="0.25"
                      filter="url(#neonGlow)"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* 3D Side Walls */}
                  <polygon points={w1Points} fill={fillWallDark} stroke={strokeColor} strokeWidth="0.5" />
                  <polygon points={w2Points} fill={fillWallLight} stroke={strokeColor} strokeWidth="0.5" />
                  <polygon points={w3Points} fill={fillWallDark} stroke={strokeColor} strokeWidth="0.5" />

                  {/* Top Face */}
                  <polygon
                    points={topPoints}
                    fill={fillTop}
                    stroke={isHovered ? "var(--neon-cyan)" : strokeColor}
                    strokeWidth={isHovered ? "2" : "1"}
                    filter={isHovered && node.type !== "dec-node" ? "url(#neonGlow)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Label Text */}
                  {node.label.length > 0 && (
                    <g className="pointer-events-none select-none">
                      {node.label.map((text, idx) => {
                        const totalLines = node.label.length;
                        // Align lines vertically centered
                        const yOffset = (idx - (totalLines - 1) / 2) * 18;

                        let textClass = "font-sans font-semibold text-[13px] fill-white text-center";
                        if (node.type === "active-center") {
                          if (idx === 1) {
                            textClass = "font-sans font-extrabold text-[15px] fill-white tracking-wider";
                          } else if (idx === 2) {
                            textClass = "font-sans font-bold text-[13px] fill-[#00f0ff] tracking-wide";
                          } else {
                            textClass = "font-sans text-[11px] fill-white/80 font-medium";
                          }
                        }

                        return (
                          <text
                            key={idx}
                            x={nodeX}
                            y={currentY + yOffset + 4}
                            textAnchor="middle"
                            className={textClass}
                            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                          >
                            {text}
                          </text>
                        );
                      })}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
