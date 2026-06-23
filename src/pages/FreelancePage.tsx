import FreelanceSection from "@/components/FreelanceSection";
import ServicesSection from "@/components/ServicesSection";
import PageTransition from "@/components/PageTransition";

const FreelancePage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <FreelanceSection />
        <ServicesSection />
      </div>
    </PageTransition>
  );
};

export default FreelancePage;
