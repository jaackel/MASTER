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
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30 selection:text-foreground">
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
