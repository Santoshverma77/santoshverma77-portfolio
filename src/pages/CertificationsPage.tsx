import CertificationsSection from "@/components/CertificationsSection";
import PageTransition from "@/components/PageTransition";

const CertificationsPage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <CertificationsSection showAllByDefault />
      </div>
    </PageTransition>
  );
};

export default CertificationsPage;
