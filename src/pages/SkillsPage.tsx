import SkillsSection from "@/components/SkillsSection";
import PageTransition from "@/components/PageTransition";

const SkillsPage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <SkillsSection />
      </div>
    </PageTransition>
  );
};

export default SkillsPage;
