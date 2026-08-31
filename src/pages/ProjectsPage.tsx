import ProjectsSection from "@/components/ProjectsSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const ProjectsPage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Projects by Santosh Kumar Verma — Web & Video Work"
        description="Web development and video editing projects by Santosh Kumar Verma, including live client sites like panditstudio.in and 0xstudio.in."
        path="/projects"
      />
      <div className="pt-20">
        <ProjectsSection />
      </div>
    </PageTransition>
  );
};

export default ProjectsPage;
