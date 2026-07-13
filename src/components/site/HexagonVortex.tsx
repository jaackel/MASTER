import { useEffect, useState, useMemo } from "react";

export default function HexagonVortex() {
  const [rotation, setRotation] = useState(0);

  // Slowly rotate the vortex in the background
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setRotation((r) => (r + 0.03) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const numRings = 18;
  const numSegments = 28; // Number of vertices per ring

  // Outer center of the vortex (where the outer rings are centered)
  const cx = 350;
  const cy = 300;

  // Generate the hexagonal grid paths
  const paths = useMemo(() => {
    const grid: { x: number; y: number }[][] = [];

    // 1. Calculate all vertices
    for (let i = 0; i < numRings; i++) {
      const ringPoints: { x: number; y: number }[] = [];
      
      // Radii expand exponentially/quadratically to create 3D depth
      const t = i / (numRings - 1);
      const r = Math.pow(t, 2.2) * 550 + 12;
      const rx = r * 1.5; // Stretch horizontally for screen aspect ratio
      const ry = r;

      // Shift smaller rings left/bottom to simulate looking down the tunnel at an angle
      const ringCx = cx - Math.pow(1 - t, 2) * 200;
      const ringCy = cy + Math.pow(1 - t, 2) * 100;

      // Offset angle on alternating rings to create the zig-zag hexagon pattern
      const angleOffset = i % 2 === 0 ? 0 : Math.PI / numSegments;

      for (let j = 0; j < numSegments; j++) {
        const theta = (j / numSegments) * 2 * Math.PI + angleOffset;
        const x = ringCx + rx * Math.cos(theta);
        const y = ringCy + ry * Math.sin(theta);
        ringPoints.push({ x, y });
      }
      grid.push(ringPoints);
    }

    const segments: { d: string; opacity: number; strokeWidth: number }[] = [];

    // 2. Draw lines to form the hexagonal mesh
    for (let i = 0; i < numRings; i++) {
      // Calculate opacity and stroke width based on ring index (closer = thinner/darker)
      const t = i / (numRings - 1);
      const opacity = 0.05 + Math.pow(t, 1.5) * 0.45;
      const strokeWidth = 0.5 + t * 1.2;

      for (let j = 0; j < numSegments; j++) {
        const nextJ = (j + 1) % numSegments;

        // Alternating ring segments to form hexagons
        const shouldDrawRingSegment = i % 2 === 0 ? j % 2 === 0 : j % 2 === 1;

        if (shouldDrawRingSegment) {
          const p1 = grid[i][j];
          const p2 = grid[i][nextJ];
          segments.push({
            d: `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
            opacity,
            strokeWidth,
          });
        }

        // Connectors to the next ring
        if (i < numRings - 1) {
          const p1 = grid[i][j];
          const p2 = grid[i + 1][j];
          segments.push({
            d: `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
            opacity,
            strokeWidth,
          });
        }
      }
    }

    return segments;
  }, [numRings, numSegments]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `rotate(${rotation.toFixed(2)}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
        }}
      >
        <g filter="url(#glow)">
          {paths.map((p, idx) => (
            <path
              key={idx}
              d={p.d}
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth={p.strokeWidth}
              opacity={p.opacity}
              strokeLinecap="round"
            />
          ))}
        </g>
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0064ff" />
            <stop offset="50%" stopColor="#00d8ff" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
