import ResumeSection from "@/components/ResumeSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const ResumePage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Resume — Santosh Kumar Verma | Download PDF"
        description="Download Santosh Kumar Verma's resumes: Full-Stack Developer and Video Editing tracks, with skills, projects and experience."
        path="/resume"
      />
      <div className="pt-20">
        <ResumeSection />
      </div>
    </PageTransition>
  );
};

export default ResumePage;
