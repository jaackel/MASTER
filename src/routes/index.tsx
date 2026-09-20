import { useEffect, useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import Preloader from "@/components/site/Preloader";
import ConnectForm from "@/components/site/ConnectForm";
import {
  About,
  Services,
  Operation,
  Portfolio,
  Soc,
  Contact,
  Footer,
} from "@/components/site/Sections";
import ShapeGrid from "@/components/ShapeGrid";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        name: "keywords",
        content:
          "consultoria tecnologia, SOC as a service, cybersecurity, cloud, inteligência artificial, especialistas TI",
      },
    ],
  }),
});

function Index() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const targetMouse = useRef({ x: -1000, y: -1000 });
  const currentMouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Snap position immediately on first move to prevent offscreen transition
      if (targetMouse.current.x === -1000) {
        targetMouse.current = { x: e.clientX, y: e.clientY };
        currentMouse.current = { x: e.clientX, y: e.clientY };
        setMousePos({ x: e.clientX, y: e.clientY });
      } else {
        targetMouse.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // Animation frame loop to lerp cursor spotlight position
    let animId: number;
    const updatePosition = () => {
      if (targetMouse.current.x !== -1000) {
        const dx = targetMouse.current.x - currentMouse.current.x;
        const dy = targetMouse.current.y - currentMouse.current.y;
        
        // 0.07 factor creates a smooth trailing lag effect
        currentMouse.current.x += dx * 0.07;
        currentMouse.current.y += dy * 0.07;
        
        setMousePos({ x: currentMouse.current.x, y: currentMouse.current.y });
      }
      animId = requestAnimationFrame(updatePosition);
    };
    animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Sync hash #conectar to open the modal
  useEffect(() => {
    const checkHash = () => {
      setIsFormOpen(window.location.hash === "#conectar");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const handleCloseForm = () => {
    window.location.hash = "";
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30 selection:text-foreground relative overflow-hidden">
      {/* Full-screen Terminal Preloader */}
      <Preloader />

      {/* Hidden Briefing/Connect Form Overlay */}
      <ConnectForm isOpen={isFormOpen} onClose={handleCloseForm} />

      {/* Light blue cursor spotlight follower overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 216, 255, 0.075), transparent 80%)`,
        }}
      />

      <Nav />
      <main>
        <Hero />
        
        {/* Continuous interactive hexagon grid background spanning Services, Operation, Portfolio, Soc, About & Contact */}
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,black_97%,transparent)]">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <ShapeGrid
                speed={0}
                squareSize={34.64}
                direction="diagonal"
                borderColor="rgba(0,200,255,0.18)"
                hoverFillColor="rgba(0,216,255,0.5)"
                shape="hexagon"
                hoverTrailAmount={17}
              />
            </div>
          </div>
          <Services />
          <Operation />
          <Portfolio />
          <Soc />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
