import PageTransition from "@/components/PageTransition";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users, Sparkles } from "lucide-react";
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
    chakraColor: "from-primary to-orange-500",
  },
  {
    institution: "S.M. Arya Public School",
    degree: "CLASS 12th, Mathematics and Computer Science",
    period: "May 2021 - Jun 2023",
    location: "Delhi",
    activities: ["Cricket", "Chess", "Atal Tinkering Lab Project"],
    description: "Completed senior secondary education with a focus on Mathematics and Computer Science, actively participating in extracurricular activities and innovation projects.",
    icon: "📚",
    chakraColor: "from-secondary to-blue-500",
  },
  {
    institution: "Saraswati Shishu Vidya Mandir",
    degree: "Class 8-10",
    period: "Mar 2018 - Mar 2021",
    location: "Giridih, Jharkhand",
    grade: "A",
    description: "Built a strong academic foundation with excellent grades, developing early interest in science and technology.",
    icon: "🏫",
    chakraColor: "from-accent to-green-500",
  },
];

const achievements = [
  { text: "Enrolled in Apna College's Sigma 7.0 for Java & DSA", icon: "⚡" },
  { text: "Enrolled in Harkirat Singh's Cohort 1.0 for MERN Stack", icon: "🚀" },
  { text: "Core Team Member at GDG Ranchi", icon: "🌟" },
  { text: "Google Student Ambassador", icon: "🎯" },
  { text: "Multiple hackathon winner", icon: "🏆" },
];

const EducationPage = () => {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="relative py-20 overflow-hidden">
          {/* Animated background chakra effects */}
          <div className="absolute left-1/4 top-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}

          <div className="container mx-auto px-6">
            {/* Section Title with jutsu animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex items-center gap-4 mb-16"
            >
              <motion.div 
                className="w-16 h-1 bg-gradient-fire"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <h1 className="font-naruto text-5xl md:text-7xl text-gradient-fire">
                EDUCATION
              </h1>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap className="w-12 h-12 text-primary" />
              </motion.div>
            </motion.div>

            {/* Ninja scroll subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16 max-w-2xl"
            >
              <p className="text-xl text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                My journey of learning and growth - from village to IIT Madras
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Animated vertical chakra line */}
              <motion.div 
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent" />
                <motion.div
                  className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"
                  animate={{ y: ["0%", "500%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`relative flex items-start gap-8 mb-20 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Animated timeline dot with chakra effect */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${edu.chakraColor} flex items-center justify-center text-4xl shadow-lg`}
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(255,107,0,0.3)",
                          "0 0 40px rgba(255,107,0,0.5)",
                          "0 0 20px rgba(255,107,0,0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {edu.icon}
                    </motion.div>
                    {/* Spinning ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Content card with ninja scroll effect */}
                  <div className={`ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-20" : "md:pl-20"}`}>
                    <motion.div 
                      className="relative card-scroll rounded-2xl p-8 border-2 border-primary/30 group overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgba(255,107,0,0.6)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background glow on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${edu.chakraColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Header */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <motion.h3 
                            className="font-naruto text-2xl text-foreground group-hover:text-primary transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            {edu.institution}
                          </motion.h3>
                        </div>

                        {edu.current && (
                          <motion.span 
                            className="inline-flex items-center gap-2 text-sm bg-primary/20 text-primary px-4 py-1.5 rounded-full mb-4"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Currently Pursuing
                          </motion.span>
                        )}

                        {/* Degree */}
                        <p className="text-lg text-secondary font-bold mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          {edu.degree}
                        </p>

                        {/* Meta info with icons */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                          <motion.div 
                            className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,107,0,0.1)" }}
                          >
                            <Calendar className="w-4 h-4 text-primary" />
                            {edu.period}
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,180,255,0.1)" }}
                          >
                            <MapPin className="w-4 h-4 text-secondary" />
                            {edu.location}
                          </motion.div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground mb-5 leading-relaxed">
                          {edu.description}
                        </p>

                        {/* Skills with stagger animation */}
                        {edu.skills && (
                          <div className="mb-5">
                            <div className="flex items-center gap-2 text-sm text-primary mb-3 font-semibold">
                              <Sparkles className="w-4 h-4" />
                              Skills Acquired
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {edu.skills.map((skill, skillIndex) => (
                                <motion.span
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1.5 + index * 0.3 + skillIndex * 0.1 }}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  className="text-sm bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/30 cursor-default"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activities */}
                        {edu.activities && (
                          <div className="mb-5">
                            <div className="flex items-center gap-2 text-sm text-secondary mb-3 font-semibold">
                              <Users className="w-4 h-4" />
                              Activities & Societies
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {edu.activities.map((activity, actIndex) => (
                                <motion.span
                                  key={activity}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1.5 + index * 0.3 + actIndex * 0.1 }}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  className="text-sm bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/30 cursor-default"
                                >
                                  {activity}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Grade */}
                        {edu.grade && (
                          <motion.div 
                            className="flex items-center gap-3 bg-accent/10 p-3 rounded-xl border border-accent/30"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Award className="w-6 h-6 text-accent" />
                            <span className="text-muted-foreground">Final Grade:</span>
                            <span className="text-2xl font-bold text-accent">{edu.grade}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continuous Learning Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="mt-24"
            >
              <motion.h2 
                className="font-naruto text-4xl text-gradient-fire mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                CONTINUOUS LEARNING
              </motion.h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 2.4 + index * 0.15,
                      type: "spring"
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(255,107,0,0.2)"
                    }}
                    className="card-scroll rounded-xl p-5 border border-primary/20 flex items-center gap-4 cursor-default group"
                  >
                    <motion.span 
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {achievement.icon}
                    </motion.span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {achievement.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Inspirational Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 }}
              className="mt-20 text-center"
            >
              <div className="card-scroll rounded-2xl p-10 border-2 border-secondary/30 max-w-3xl mx-auto relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-2xl text-muted-foreground italic relative z-10">
                  "A dropout will beat a genius through hard work."
                </p>
                <p className="text-primary mt-4 font-naruto text-lg relative z-10">— Rock Lee</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default EducationPage;