import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Experience } from "@/components/home/Experience";
import { Skills } from "@/components/home/Skills";
import { GitHubSection } from "@/components/home/GitHubSection";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Skills />
      <GitHubSection />
      <Contact />
    </>
  );
}
