import ResumeSection from "@/components/ResumeSection";
import PageTransition from "@/components/PageTransition";

const ResumePage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <ResumeSection />
      </div>
    </PageTransition>
  );
};

export default ResumePage;
