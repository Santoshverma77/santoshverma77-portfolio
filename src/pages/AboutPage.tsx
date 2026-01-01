import AboutSection from "@/components/AboutSection";
import PageTransition from "@/components/PageTransition";

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <AboutSection />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
