import AboutSection from "@/components/AboutSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const AboutPage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="About Santosh Kumar Verma — Developer, Editor & Creator"
        description="Who is Santosh Kumar Verma? Full-stack developer, video editor and content creator from India, studying BS Data Science at IIT Madras."
        path="/about"
      />
      <div className="pt-20">
        <AboutSection />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
