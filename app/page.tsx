import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Journey } from "@/components/home/Journey";
import { Capabilities } from "@/components/home/Capabilities";
import { GitHubSection } from "@/components/home/GitHubSection";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Journey />
      <Capabilities />
      <GitHubSection />
      <Contact />
    </>
  );
}
