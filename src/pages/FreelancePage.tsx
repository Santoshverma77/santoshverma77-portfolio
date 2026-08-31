import FreelanceSection from "@/components/FreelanceSection";
import ServicesSection from "@/components/ServicesSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const FreelancePage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Freelance Video & Creative Work — Santosh Kumar Verma"
        description="Hire Santosh Kumar Verma for video editing, reels, photography, brand content and social media creative work."
        path="/freelance"
      />
      <div className="pt-20">
        <FreelanceSection />
        <ServicesSection />
      </div>
    </PageTransition>
  );
};

export default FreelancePage;
