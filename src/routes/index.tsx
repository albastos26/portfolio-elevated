import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero3D } from "@/components/portfolio/Hero3D";
import { NotreUnivers } from "@/components/portfolio/NotreUnivers";
import { NosValeurs } from "@/components/portfolio/NosValeurs";
import { Activites } from "@/components/portfolio/Activites";
import { ImmersiveScrollGallery } from "@/components/portfolio/ImmersiveScrollGallery";
import { Galerie } from "@/components/portfolio/Galerie";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-cream">
      <Navbar />
      <Hero3D />
      <NotreUnivers />
      <NosValeurs />
      <Activites />
      <ImmersiveScrollGallery />
      <Galerie />
      <Contact />
      <Footer />
    </main>
  );
}
