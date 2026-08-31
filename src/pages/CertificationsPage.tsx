import CertificationsSection from "@/components/CertificationsSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const CertificationsPage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Certifications — Santosh Kumar Verma"
        description="27+ certifications earned by Santosh Kumar Verma across full-stack development, data science, AI and creative tools."
        path="/certifications"
      />
      <div className="pt-20">
        <CertificationsSection showAllByDefault />
      </div>
    </PageTransition>
  );
};

export default CertificationsPage;
