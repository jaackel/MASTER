import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import {
  About,
  Services,
  Operation,
  Portfolio,
  Soc,
  Differentials,
  Contact,
  Footer,
} from "@/components/site/Sections";

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30 selection:text-foreground relative overflow-hidden">
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
        <Services />
        <Operation />
        <Portfolio />
        <Soc />
        <Differentials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
