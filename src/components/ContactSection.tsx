import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import RasenganLoader from "./RasenganLoader";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent successfully! I'll get back to you soon. 🍃");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/Santoshverma77",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/santoshverma77",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    { 
      name: "Email", 
      url: "mailto:santoshskv2005@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="w-16 h-1 bg-gradient-fire" />
          <h2 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
            CONTACT
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="card-scroll rounded-2xl p-8">
              <h3 className="font-naruto text-2xl text-foreground mb-6">
                Send a Message 🍃
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background/50 border-primary/20 focus:border-primary min-h-[150px]"
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-fire hover:opacity-90 font-naruto text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <RasenganLoader size="sm" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-naruto text-2xl text-foreground mb-4">
                  Let's Connect! 🤝
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it's collaborating on tech projects, discussing photography techniques, 
                  or working on community initiatives, I'm always excited to connect!
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <span className="text-primary font-semibold">📧 Email:</span>{" "}
                  <a href="mailto:santoshskv2005@gmail.com" className="hover:text-primary transition-colors">
                    santoshskv2005@gmail.com
                  </a>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-xl bg-card border border-primary/20 hover:border-primary transition-all duration-300 hover:scale-110"
                  >
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      {link.icon}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </a>
                ))}
              </div>

              {/* Decorative Quote */}
              <div className="card-scroll rounded-xl p-6 mt-8">
                <p className="font-naruto text-lg text-primary italic">
                  "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!"
                </p>
                <p className="text-muted-foreground text-sm mt-2">— Naruto Uzumaki</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-20 pt-8 border-t border-border/50 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-muted-foreground">
            © 2024 <span className="text-primary">Santosh Kumar Verma</span>. Built with passion.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            "Believe it! 信じろ!" 🍥
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
