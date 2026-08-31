import ExperienceSection from "@/components/ExperienceSection";
import PageTransition from "@/components/PageTransition";

const ExperiencePage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <ExperienceSection />
      </div>
    </PageTransition>
  );
};

export default ExperiencePage;
