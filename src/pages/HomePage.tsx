import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import PageTransition from "@/components/PageTransition";

const HomePage = () => {
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </PageTransition>
  );
};

export default HomePage;
