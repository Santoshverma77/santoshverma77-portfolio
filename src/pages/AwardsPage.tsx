import PageTransition from "@/components/PageTransition";
import { Trophy, Calendar, Building2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
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
    color: "primary",
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
    color: "secondary",
  },
  {
    title: "Second Prize – State-Level Gyan Vigyan Mela",
    issuer: "Vidya Vikas Samiti, Jharkhand",
    date: "Oct 2018",
    category: "Science Fair",
    description: "Secured Second Prize at the State-Level Science Exhibition.",
    fullDescription: "Secured Second Prize at the State-Level Gyan Vigyan Mela (Science Exhibition) organized by Vidya Vikas Samiti, Jharkhand. Represented Saraswati Shishu Vidya Mandir, Barkagaon (Hazaribagh district) and demonstrated scientific understanding, creativity, and presentation skills at the prantiya (state) level. This achievement reflects early aptitude in science, innovation, and competitive academic environments.",
    icon: "🥈",
    color: "accent",
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
          {/* Background effects */}
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="container mx-auto px-6">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-16 h-1 bg-gradient-fire" />
              <h1 className="font-naruto text-5xl md:text-6xl text-gradient-fire">
                ACHIEVEMENTS
              </h1>
              <Trophy className="w-10 h-10 text-secondary" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-lg mb-12 max-w-2xl"
            >
              Recognition and awards earned through dedication, innovation, and community contribution.
            </motion.p>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-fire text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Awards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAwards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  layout
                  className="group"
                >
                  <div 
                    className={`card-scroll rounded-2xl p-6 border transition-all duration-500 cursor-pointer h-full ${
                      expandedId === index 
                        ? "border-primary shadow-xl shadow-primary/10" 
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => setExpandedId(expandedId === index ? null : index)}
                  >
                    {/* Icon & Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {award.icon}
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full border ${
                        award.color === "primary" 
                          ? "bg-primary/10 text-primary border-primary/30"
                          : award.color === "secondary"
                          ? "bg-secondary/10 text-secondary border-secondary/30"
                          : "bg-accent/10 text-accent border-accent/30"
                      }`}>
                        {award.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-naruto text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      {award.title}
                    </h3>

                    {/* Issuer & Date */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="w-4 h-4 text-secondary" />
                        {award.issuer}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {award.date}
                      </div>
                    </div>

                    {/* Prize if exists */}
                    {award.prize && (
                      <div className="mb-4 inline-block bg-gradient-fire text-primary-foreground px-4 py-2 rounded-lg font-bold">
                        Prize: {award.prize}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {expandedId === index ? award.fullDescription : award.description}
                    </p>

                    {/* Expand indicator */}
                    <div className="mt-4 text-xs text-primary flex items-center gap-1">
                      {expandedId === index ? "Click to collapse" : "Click to read more"}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: "3+", label: "Major Awards", icon: "🏆" },
                { value: "₹25K+", label: "Prize Money", icon: "💰" },
                { value: "60+", label: "Teams Competed Against", icon: "👥" },
                { value: "1st", label: "Hackathon Rank", icon: "🥇" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="card-scroll rounded-xl p-6 border border-primary/20 text-center group hover:border-primary/40 transition-all duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="font-naruto text-3xl text-gradient-fire mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Journey Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-20 text-center"
            >
              <div className="card-scroll rounded-2xl p-8 border border-secondary/20 max-w-3xl mx-auto">
                <p className="text-xl text-muted-foreground italic">
                  "Hard work is worthless for those that don't believe in themselves."
                </p>
                <p className="text-primary mt-4 font-naruto">— Naruto Uzumaki</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AwardsPage;
