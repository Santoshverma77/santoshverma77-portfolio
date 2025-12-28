import { useEffect, useRef, useState } from "react";

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Feb 2023",
    link: "https://www.credly.com/badges/aws-certified-solutions-architect-associate",
    icon: "☁️",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    date: "Jan 2023",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    icon: "💠",
  },
  {
    name: "Google Cloud Certified - Professional Architect",
    issuer: "Google",
    date: "June 2023",
    link: "https://cloud.google.com/certification/cloud-architect",
    icon: "🌐",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "Oct 2022",
    link: "https://www.credly.com/badges/hashicorp-certified-terraform-associate",
    icon: "🔧",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Aug 2023",
    link: "https://www.credly.com/badges/certified-kubernetes-administrator-cka",
    icon: "⚙️",
  },
  {
    name: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    date: "2022",
    link: "https://education.oracle.com/oracle-cloud-infrastructure-foundations/PEXAM",
    icon: "🔴",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "2021",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    icon: "📘",
  },
  {
    name: "Aviatrix Certified Engineer - Multi-Cloud Network",
    issuer: "Aviatrix",
    date: "2022",
    link: "https://www.credly.com/badges/aviatrix-certified-engineer-multi-cloud-network",
    icon: "🛩️",
  },
  {
    name: "Scrum Master Certified (SMC)",
    issuer: "Scrum Alliance",
    date: "2022",
    link: "#",
    icon: "🔄",
  },
  {
    name: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    date: "2021",
    link: "https://www.redhat.com/en/services/certification/rhcsa",
    icon: "🎩",
  },
];

const CertificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute right-0 bottom-0 w-1/2 h-[600px] bg-gradient-to-tl from-accent/10 to-transparent blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            CERTIFICATIONS
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group card-scroll rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] hover:glow-fire ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {cert.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
