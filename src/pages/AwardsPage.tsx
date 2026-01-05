import PageTransition from "@/components/PageTransition";
import { Trophy, Calendar, Building2, Sparkles, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const awards = [
  {
    title: "Logistic Legend Award – DevFest Ranchi 2025",
    issuer: "Google Developer Groups (GDG) Ranchi",
    date: "Oct 2025",
    category: "Leadership",
    description: "Awarded for exceptional contribution to event logistics and operations at DevFest Ranchi 2025.",
    fullDescription: "Awarded the Logistic Legend Award at DevFest Ranchi 2025 by Google Developer Groups (GDG) Ranchi in recognition of exceptional contribution to event logistics and operations. Played a key role in planning, coordination, and smooth execution of a large-scale developer conference, ensuring seamless participant experience and operational efficiency. This recognition highlights leadership, responsibility, teamwork, and execution skills in a high-impact community-driven tech event.",
    icon: "🏆",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    glowColor: "rgba(255,193,7,0.4)",
  },
  {
    title: "Winner – HACKED 3.0 Hackathon (1st Prize)",
    issuer: "BML Munjal University (BMU)",
    date: "Mar 2025",
    category: "Hackathon",
    prize: "₹25,000",
    description: "Secured 1st Prize at HACKED 3.0, a 36-hour national-level hackathon.",
    fullDescription: "Secured 1st Prize at HACKED 3.0, a 36-hour national-level hackathon held at BML Munjal University, Gurgaon, as part of the 67th Milestone – Hero's Challenge 2025. Competed against 60+ teams and won a cash prize of ₹25,000 for building an innovative and impactful tech solution under strict time constraints. Demonstrated strong skills in problem-solving, teamwork, system design, and rapid prototyping.",
    icon: "🥇",
    gradient: "from-primary via-orange-500 to-yellow-500",
    glowColor: "rgba(255,107,0,0.4)",
  },
  {
    title: "Second Prize – State-Level Gyan Vigyan Mela",
    issuer: "Vidya Vikas Samiti, Jharkhand",
    date: "Oct 2018",
    category: "Science Fair",
    description: "Secured Second Prize at the State-Level Science Exhibition.",
    fullDescription: "Secured Second Prize at the State-Level Gyan Vigyan Mela (Science Exhibition) organized by Vidya Vikas Samiti, Jharkhand. Represented Saraswati Shishu Vidya Mandir, Barkagaon (Hazaribagh district) and demonstrated scientific understanding, creativity, and presentation skills at the prantiya (state) level. This achievement reflects early aptitude in science, innovation, and competitive academic environments.",
    icon: "🥈",
    gradient: "from-slate-400 via-gray-300 to-slate-500",
    glowColor: "rgba(148,163,184,0.4)",
  },
];

const categories = ["All", "Leadership", "Hackathon", "Science Fair"];

const AwardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredAwards = selectedCategory === "All" 
    ? awards 
    : awards.filter(a => a.category === selectedCategory);

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <section className="relative py-20 overflow-hidden">
          {/* Animated chakra background */}
          <motion.div 
            className="absolute right-0 top-0 w-[600px] h-[600px] bg-gradient-to-br from-secondary/10 to-primary/5 rounded-full blur-[150px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full blur-[120px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          />

          {/* Floating sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 15}%`,
              }}
            >
              <Star className="w-4 h-4 text-primary/60" />
            </motion.div>
          ))}

          <div className="container mx-auto px-6">
            {/* Section Title with epic entrance */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.div 
                className="w-16 h-1 bg-gradient-fire"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <h1 className="font-naruto text-5xl md:text-7xl text-gradient-fire">
                ACHIEVEMENTS
              </h1>
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-12 h-12 text-secondary" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-xl mb-12 max-w-2xl flex items-center gap-3"
            >
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              Recognition earned through dedication, innovation, and the will of fire!
            </motion.p>

            {/* Category Filter with ninja style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden ${
                    selectedCategory === category
                      ? "bg-gradient-fire text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-primary/20"
                  }`}
                >
                  {selectedCategory === category && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Awards Grid with epic cards */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredAwards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 50, rotateY: -30 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    layout
                    className="group perspective-1000"
                  >
                    <motion.div 
                      className="relative card-scroll rounded-3xl p-8 border-2 border-primary/20 h-full overflow-hidden cursor-pointer"
                      onClick={() => setExpandedId(expandedId === index ? null : index)}
                      whileHover={{ 
                        scale: 1.03,
                        borderColor: "rgba(255,107,0,0.5)",
                      }}
                      animate={expandedId === index ? {
                        boxShadow: `0 0 40px ${award.glowColor}`
                      } : {
                        boxShadow: "0 0 0px transparent"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${award.gradient} opacity-0 group-hover:opacity-10`}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Spinning chakra ring behind icon */}
                      <div className="relative mb-6">
                        <motion.div
                          className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                          className="text-7xl relative z-10 inline-block"
                          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {award.icon}
                        </motion.div>
                      </div>

                      {/* Category badge */}
                      <motion.span 
                        className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Sparkles className="w-3 h-3" />
                        {award.category}
                      </motion.span>

                      {/* Title */}
                      <h3 className="font-naruto text-xl text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                        {award.title}
                      </h3>

                      {/* Issuer & Date */}
                      <div className="space-y-3 mb-5">
                        <motion.div 
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                          whileHover={{ x: 5 }}
                        >
                          <Building2 className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>{award.issuer}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                          whileHover={{ x: 5 }}
                        >
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{award.date}</span>
                        </motion.div>
                      </div>

                      {/* Prize badge */}
                      {award.prize && (
                        <motion.div 
                          className="mb-5"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: [0.9, 1.05, 1] }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                        >
                          <span className="inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-lg shadow-lg shadow-primary/30">
                            <Trophy className="w-5 h-5" />
                            Prize: {award.prize}
                          </span>
                        </motion.div>
                      )}

                      {/* Description with expand animation */}
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={expandedId === index ? "full" : "short"}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {expandedId === index ? award.fullDescription : award.description}
                        </motion.p>
                      </AnimatePresence>

                      {/* Expand indicator */}
                      <motion.div 
                        className="mt-5 text-sm text-primary font-semibold flex items-center gap-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {expandedId === index ? "↑ Click to collapse" : "↓ Click to read more"}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Stats Section with epic counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-24"
            >
              <motion.h2 
                className="font-naruto text-3xl text-center text-gradient-fire mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                BY THE NUMBERS
              </motion.h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "3+", label: "Major Awards", icon: "🏆", delay: 0 },
                  { value: "₹25K+", label: "Prize Money", icon: "💰", delay: 0.1 },
                  { value: "60+", label: "Teams Competed", icon: "👥", delay: 0.2 },
                  { value: "1st", label: "Hackathon Rank", icon: "🥇", delay: 0.3 },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.8 + stat.delay,
                      type: "spring"
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(255,107,0,0.2)"
                    }}
                    className="card-scroll rounded-2xl p-8 border-2 border-primary/20 text-center group cursor-default"
                  >
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="font-naruto text-4xl md:text-5xl text-gradient-fire mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Inspirational Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, type: "spring" }}
              className="mt-24 text-center"
            >
              <div className="card-scroll rounded-3xl p-12 border-2 border-secondary/30 max-w-4xl mx-auto relative overflow-hidden">
                {/* Animated background shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Quote marks */}
                <span className="absolute top-4 left-6 text-8xl text-primary/10 font-serif">"</span>
                <span className="absolute bottom-4 right-6 text-8xl text-primary/10 font-serif">"</span>
                
                <motion.p 
                  className="text-2xl md:text-3xl text-muted-foreground italic relative z-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.7 }}
                >
                  Hard work is worthless for those that don't believe in themselves.
                </motion.p>
                <motion.p 
                  className="text-primary mt-6 font-naruto text-xl relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.9 }}
                >
                  — Naruto Uzumaki
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AwardsPage;