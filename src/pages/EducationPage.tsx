import PageTransition from "@/components/PageTransition";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    institution: "Indian Institute of Technology, Madras",
    degree: "Bachelor of Science - BS, Data Science & AI",
    period: "Aug 2025 - Present",
    location: "Chennai, Tamil Nadu (Online)",
    skills: ["Data Science", "Computational Thinking", "Machine Learning", "Statistics"],
    description: "Pursuing a rigorous program in Data Science and Artificial Intelligence from one of India's premier institutions, focusing on computational thinking and data-driven problem solving.",
    current: true,
    icon: "🎓",
  },
  {
    institution: "S.M. Arya Public School",
    degree: "CLASS 12th, Mathematics and Computer Science",
    period: "May 2021 - Jun 2023",
    location: "Delhi",
    activities: ["Cricket", "Chess", "Atal Tinkering Lab Project"],
    description: "Completed senior secondary education with a focus on Mathematics and Computer Science, actively participating in extracurricular activities and innovation projects.",
    icon: "📚",
  },
  {
    institution: "Saraswati Shishu Vidya Mandir",
    degree: "Class 8-10",
    period: "Mar 2018 - Mar 2021",
    location: "Giridih, Jharkhand",
    grade: "A",
    description: "Built a strong academic foundation with excellent grades, developing early interest in science and technology.",
    icon: "🏫",
  },
];

const achievements = [
  "Enrolled in Apna College's Sigma 7.0 for Java & DSA",
  "Enrolled in Harkirat Singh's Cohort 4.0 for MERN Stack",
  "Core Team Member at GDG Ranchi",
  "Google Student Ambassador",
  "Multiple hackathon winner",
];

const EducationPage = () => {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="relative py-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />

          <div className="container mx-auto px-6">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="w-16 h-1 bg-gradient-fire" />
              <h1 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
                EDUCATION
              </h1>
              <GraduationCap className="w-10 h-10 text-primary" />
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-start gap-8 mb-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center text-3xl z-10">
                    {edu.icon}
                  </div>

                  {/* Content card */}
                  <div className={`ml-24 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <div className="card-scroll rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-naruto text-xl text-foreground group-hover:text-primary transition-colors">
                            {edu.institution}
                          </h3>
                          {edu.current && (
                            <span className="inline-block text-xs bg-primary/20 text-primary px-3 py-1 rounded-full mt-2 animate-pulse">
                              Currently Pursuing
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Degree */}
                      <p className="text-lg text-secondary font-semibold mb-3">
                        {edu.degree}
                      </p>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-secondary" />
                          {edu.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {edu.description}
                      </p>

                      {/* Skills */}
                      {edu.skills && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-primary mb-2">
                            <BookOpen className="w-4 h-4" />
                            Skills
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Activities */}
                      {edu.activities && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-secondary mb-2">
                            <Users className="w-4 h-4" />
                            Activities
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.activities.map((activity) => (
                              <span
                                key={activity}
                                className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grade */}
                      {edu.grade && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-accent" />
                          <span className="text-sm text-muted-foreground">Grade:</span>
                          <span className="text-accent font-bold">{edu.grade}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Learning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-20"
            >
              <h2 className="font-naruto text-3xl text-gradient-fire mb-8 text-center">
                CONTINUOUS LEARNING
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    className="card-scroll rounded-xl p-4 border border-accent/20 hover:border-accent/40 transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="text-2xl">⚡</span>
                    <span className="text-muted-foreground">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default EducationPage;
