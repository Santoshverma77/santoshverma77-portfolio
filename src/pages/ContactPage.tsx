import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="pt-20">
        <ContactSection />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
