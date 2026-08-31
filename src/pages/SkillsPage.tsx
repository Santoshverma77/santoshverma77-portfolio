import SkillsSection from "@/components/SkillsSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const SkillsPage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Skills — Santosh Kumar Verma | Full-Stack & Creative"
        description="Technical and creative skills of Santosh Kumar Verma: React, Node.js, Java, Python, Premiere Pro, motion graphics and more."
        path="/skills"
      />
      <div className="pt-20">
        <SkillsSection />
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
