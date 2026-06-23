import SectionHeader from "./SectionHeader";
import { useReveal, revealStyle } from "@/hooks/useReveal";

const skills = [
  { name: "Java", level: 90, category: "Language" },
  { name: "JavaScript", level: 85, category: "Language" },
  { name: "Python", level: 80, category: "Language" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Spring Boot", level: 75, category: "Backend" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "MySQL", level: 80, category: "Database" },
  { name: "Git", level: 85, category: "Tools" },
  { name: "REST APIs", level: 85, category: "Backend" },
  { name: "DSA", level: 80, category: "Core" },
  { name: "HTML / CSS", level: 90, category: "Frontend" },
  { name: "Adobe Premiere Pro", level: 90, category: "Creative" },
  { name: "CapCut", level: 90, category: "Creative" },
  { name: "Photoshop", level: 80, category: "Creative" },
  { name: "Canva", level: 85, category: "Creative" },
  { name: "Photography", level: 85, category: "Creative" },
  { name: "Videography", level: 85, category: "Creative" },
  { name: "Visual Storytelling", level: 85, category: "Creative" },
  { name: "Motion Graphics", level: 75, category: "Creative" },
  { name: "Social Media Mgmt", level: 85, category: "Creative" },
  { name: "AI Content Creation", level: 80, category: "Creative" },
];

const SkillsSection = () => {
  const { ref, visible } = useReveal<HTMLElement>(0.12);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Skills" title="Tools of the" italic="craft" visible={visible} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group"
              style={revealStyle(visible, index, 60)}
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-white/90 text-[15px]">{skill.name}</span>
                <span
                  className="italic text-white/50 text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {skill.level}
                </span>
              </div>
              <div className="h-px bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-white/70 transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    transitionDelay: `${index * 60 + 300}ms`,
                  }}
                />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/30">
                {skill.category}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-16 text-white/40 text-sm"
          style={revealStyle(visible, skills.length, 60)}
        >
          Also working with Express.js, DevOps basics, SQL, and more.
        </p>
      </div>
    </section>
  );
};

export default SkillsSection;
