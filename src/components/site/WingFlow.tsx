import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDirection; // 1.0 for right (left wing), -1.0 for left (right wing)

  // Simple noise function
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float f = 0.0, amp = 0.5;
    for(int i = 0; i < 4; i++) { f += amp * noise(p); p *= 2.0; amp *= 0.5; }
    return f;
  }

  void main() {
    // Flow UVs based on direction
    vec2 uv = vUv;
    
    // Stretch vertically so it looks like horizontal streaks (adjusted for thicker height)
    vec2 st = vec2(uv.x * 5.0, uv.y * 10.0);
    
    // Move time
    float t = uTime * 1.5 * uDirection;
    
    // Create flowing noise
    float n1 = fbm(st + vec2(-t, 0.0));
    float n2 = fbm(st * 2.0 + vec2(-t * 1.5, t * 0.2));
    
    float fluid = fbm(st + vec2(-t * 2.0 + n1 - n2, 0.0));
    
    // Glow color (cyan/blue)
    vec3 color = mix(vec3(0.02, 0.1, 0.3), vec3(0.6, 0.9, 1.0), fluid);
    
    // --- STARS / PARTICLES ---
    // Create a grid for stars
    vec2 starUv = uv * vec2(80.0, 10.0); 
    // Make stars flow inwards slightly faster than the fluid
    starUv.x += uTime * 3.0 * uDirection;
    
    vec2 gridId = floor(starUv);
    vec2 gridUv = fract(starUv) - 0.5;
    
    // Give each grid cell a random value
    float h = hash(gridId);
    
    // Shift the star center randomly within the cell
    gridUv += vec2(hash(gridId + 7.3) - 0.5, hash(gridId + 11.7) - 0.5) * 0.6;
    
    float star = 0.0;
    // Only spawn a star if the hash is very high (sparse stars)
    if (h > 0.92) {
       float d = length(gridUv);
       // Tiny bright dot
       star = smoothstep(0.12, 0.0, d);
       // Twinkle
       star *= 0.5 + 0.5 * sin(uTime * 4.0 + h * 100.0);
       // Make some stars cyan, some white
       color += mix(vec3(0.5, 1.0, 1.0), vec3(1.0, 1.0, 1.0), hash(gridId + 3.0)) * star * 1.5;
    }
    
    // Fade out at vertical edges
    float edge = sin(uv.y * 3.14159);
    
    // Fade out horizontally based on direction (fade at tail)
    float horizEdge = uDirection > 0.0 ? uv.x : (1.0 - uv.x);
    horizEdge = smoothstep(0.0, 0.3, horizEdge); // Fade in smoothly from far edge
    
    gl_FragColor = vec4(color, pow(fluid, 1.5) * pow(edge, 1.2) * horizEdge * 1.5);
  }
`;

export default function WingFlow({ direction }: { direction: 1 | -1 }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const renderer = new Renderer({ alpha: true, antialias: false });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uDirection: { value: direction }
      },
      transparent: true
    });
    const mesh = new Mesh(gl, { geometry, program });

    let animationId: number;
    const update = (t: number) => {
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(update);
    };
    animationId = requestAnimationFrame(update);

    const resize = () => {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [direction]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
