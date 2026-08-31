import ExperienceSection from "@/components/ExperienceSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const ExperiencePage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Experience — Santosh Kumar Verma | Developer & Editor"
        description="Work experience and community roles of Santosh Kumar Verma, including GDG Ranchi core team, freelance video editing and web development."
        path="/experience"
      />
      <div className="pt-20">
        <ExperienceSection />
      </div>
    </PageTransition>
  );
};

export default ExperiencePage;
