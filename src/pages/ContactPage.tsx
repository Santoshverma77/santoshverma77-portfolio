import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";
import PageSEO from "@/components/PageSEO";

const ContactPage = () => {
  return (
    <PageTransition>
      <PageSEO
        title="Contact Santosh Kumar Verma — Hire for Web & Video"
        description="Get in touch with Santosh Kumar Verma for full-stack development, video editing and creative collaborations."
        path="/contact"
      />
      <div className="pt-20">
        <ContactSection />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
