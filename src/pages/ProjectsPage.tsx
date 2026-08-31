import ProjectsSection from "@/components/ProjectsSection";
import PageTransition from "@/components/PageTransition";

const ProjectsPage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <ProjectsSection />
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
