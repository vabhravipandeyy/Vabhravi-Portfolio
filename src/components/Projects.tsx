import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "../data";
import DancingText from "./DancingText";
import { 
  Github, 
  ExternalLink, 
  Check, 
  Activity, 
  ShieldAlert, 
  BookOpen, 
  Calendar, 
  Award, 
  Terminal, 
  ArrowUpRight 
} from "lucide-react";
import gstriskCard from "../../assets/Projects/gstrisk_card.png";
import clinsightPatients from "../../assets/Projects/clinsight_patients.png";
import clinsightBg from "../../assets/Projects/clinsight_bg.jpg";
import reviaImage from "../../assets/Projects/revia.png";
import threatshieldBg from "../../assets/Projects/threatshield_bg.png";
import threatshieldCard from "../../assets/Projects/threatshield_card.png";
import intellilibBg from "../../assets/Projects/intellilib_bg.png";
import intellilibCard from "../../assets/Projects/intellilib_card.png";
import eventopsBg from "../../assets/Projects/eventops_bg.png";
import eventopsCard from "../../assets/Projects/eventops_card.png";
import nptelCard from "../../assets/Projects/nptel_card.png";

// Curated immersive visual content for each project to match the luxury editorial showcase
const projectVisuals: Record<string, {
  bgImage: string;
  cardImage: string;
  sector: string;
  accentIcon: any;
  cardTitle: string;
  cardSubtitle: string;
  contentClassName?: string;
  imageClassName?: string;
}> = {
  "proj-1": {
    bgImage: gstriskCard,
    cardImage: gstriskCard,
    sector: "Tax Fraud Intelligence",
    accentIcon: ShieldAlert,
    cardTitle: "Surveillance Console",
    cardSubtitle: "GST RISK MANAGER CONSOLE",
    contentClassName: "bg-slate-950 p-1 sm:p-2",
    imageClassName: "object-cover object-top rounded-xl border border-slate-800/80 shadow-2xl brightness-100 contrast-100 saturate-100"
  },
  "proj-2": {
    bgImage: clinsightBg,
    cardImage: clinsightPatients,
    sector: "Clinical RAG System",
    accentIcon: Activity,
    cardTitle: "Multi-Agent Intelligence",
    cardSubtitle: "PRE-CONSULTATION BRIEFS"
  },
  "proj-3": {
    bgImage: reviaImage,
    cardImage: reviaImage,
    sector: "AI Companion Platform",
    accentIcon: Activity,
    cardTitle: "Persona Engine",
    cardSubtitle: "REVIA CONVERSATION CORE",
    contentClassName: "bg-white p-2 sm:p-3",
    imageClassName: "object-contain object-center rounded-xl border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.08)] brightness-100 contrast-100 saturate-100"
  },
  "proj-4": {
    bgImage: intellilibBg,
    cardImage: intellilibCard,
    sector: "IT Asset Management",
    accentIcon: BookOpen,
    cardTitle: "Hardware Lifecycle",
    cardSubtitle: "INVENTRACK ASSET CORES"
  },
  "proj-5": {
    bgImage: eventopsBg,
    cardImage: eventopsCard,
    sector: "Fintech Platforms",
    accentIcon: Calendar,
    cardTitle: "Razorpay Ingestion",
    cardSubtitle: "EVENTOPS TRANSACTION"
  },
  "proj-6": {
    bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    cardImage: nptelCard,
    sector: "Digital Education",
    accentIcon: Award,
    cardTitle: "8-Week Quiz Engine",
    cardSubtitle: "NPTEL CONV ECONOMICS"
  },
  "proj-7": {
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
    sector: "Cyber War-Games",
    accentIcon: Terminal,
    cardTitle: "Capture The Flag",
    cardSubtitle: "CRYPTOCLASH CTF TRACKS"
  }
};

// Rich entry spring variants for opposite side sliding
const itemVariantsLeft = {
  hidden: { opacity: 0, x: -100, rotate: -2 },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
      mass: 0.9
    }
  }
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 100, rotate: 2 },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
      mass: 0.9
    }
  }
};

// Elegant staggered text lift animations
const textLiftVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll transforms for smooth premium line reveals
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.35, 0.5], [0, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.35], [45, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.32, 0.52, 0.68], [0, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.32, 0.52], [45, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.48, 0.68, 0.84], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.68], [45, 0]);

  // Extract the four-digit year for the classic top-right date indicator
  const getYear = (dateStr: string) => {
    const match = dateStr.match(/\d{4}/);
    return match ? match[0] : "2025";
  };

  const handleGithubClick = (projTitle: string) => {
    const proj = projects.find(p => p.title === projTitle);
    const url = proj?.github || "https://github.com/vabhravipandeyy";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLiveClick = (projTitle: string) => {
    const proj = projects.find(p => p.title === projTitle);
    const url = proj?.live || "https://github.com/vabhravipandeyy";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section id="projects" className="relative px-4 sm:px-8 py-24 bg-[#030712]/40 border-t border-white/5 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 tech-dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-[#FF4B00]/3 glow-spot" />
      <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vw] rounded-full bg-blue-900/3 glow-spot" />

      {/* Massive editorial background word "Deployments" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Deployments
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.25em] uppercase font-semibold">
              03 / PRODUCT DEPLOYMENTS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight mt-2">
              <DancingText text="Engineering Excellence." />
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-md text-left font-light leading-relaxed">
            A curated showcase of architectural precision in digital interfaces, combining the robustness of full-stack engineering with deep neural capabilities.
          </p>
        </div>


        {/* Projects Split-Screen List */}
        <div className="flex flex-col gap-24 sm:gap-36">
          {projects.map((proj, idx) => {
            const displayNum = String(idx + 1).padStart(2, "0");
            const isEven = idx % 2 === 0;
            const visual = projectVisuals[proj.id] || projectVisuals["proj-1"];
            const ProjectIcon = visual.accentIcon;
            const dateYear = getYear(proj.date);

            return (
              <motion.div
                key={proj.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-white/5 pb-24 last:border-0 last:pb-0 text-left overflow-hidden"
              >
                
                {/* Visual Column: Slides from Left if Even, from Right if Odd */}
                <motion.div 
                  variants={isEven ? itemVariantsLeft : itemVariantsRight}
                  className={`lg:col-span-6 w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="group/browser relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/40 border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[#FF4B00]/5">
                    
                    {/* Browser Header Bar */}
                    <div className="h-10 border-b border-white/5 bg-slate-900/60 flex items-center px-4 justify-between select-none">
                      {/* Window Controls */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      
                      {/* Address Bar */}
                      <div className="flex-1 max-w-[200px] sm:max-w-xs mx-auto h-6 rounded bg-slate-950/60 border border-white/5 flex items-center justify-center px-3">
                        <span className="font-mono text-[10px] text-gray-500 tracking-wider truncate">
                          {proj.title.toLowerCase().replace(/\s+/g, "")}.ai
                        </span>
                      </div>
                      
                      {/* Right action indicator */}
                      <button 
                        onClick={() => handleLiveClick(proj.title)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                        title="Open Live Preview"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {/* Browser Content / Screenshot Screen */}
                    <div className={`relative w-full h-[calc(100%-2.5rem)] overflow-hidden bg-slate-900 ${visual.contentClassName || ""}`}>
                      <img 
                        src={visual.cardImage} 
                        alt={`${proj.title} Showcase`} 
                        className={`w-full h-full ${visual.imageClassName || "object-cover object-top brightness-[0.82] contrast-[1.05] saturate-[0.95]"} group-hover/browser:brightness-95 group-hover/browser:scale-102 transition-all duration-1000 ease-out`}
                        referrerPolicy="no-referrer"
                      />
                      {/* Subtle Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                  </div>
                </motion.div>

                {/* Details Column: Slides from Right if Even, from Left if Odd */}
                <motion.div 
                  variants={isEven ? itemVariantsRight : itemVariantsLeft}
                  className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}
                >
                  
                  {/* Category and Year Header Row */}
                  <motion.div 
                    variants={textLiftVariants}
                    className="flex items-center justify-between border-b border-white/5 pb-4 mb-6"
                  >
                    <span className="font-mono text-[10px] tracking-widest font-bold text-[#FF4B00] uppercase bg-[#FF4B00]/5 border border-[#FF4B00]/10 px-2.5 py-1 rounded select-none">
                      {proj.category.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                      — {dateYear}
                    </span>
                  </motion.div>

                  {/* Big Serif Title */}
                  <motion.h3 
                    variants={textLiftVariants}
                    className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-none mb-2 hover:text-[#FF4B00] transition-colors"
                  >
                    {proj.title}
                  </motion.h3>

                  {/* Subtitle description */}
                  <motion.p 
                    variants={textLiftVariants}
                    className="font-mono text-xs sm:text-sm text-blue-400 tracking-widest font-semibold uppercase mb-6"
                  >
                    {proj.subtitle}
                  </motion.p>

                  {/* Main Description */}
                  <motion.p 
                    variants={textLiftVariants}
                    className="font-sans text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6"
                  >
                    {proj.description}
                  </motion.p>

                  {/* High-Impact Stat Badges */}
                  <motion.div 
                    variants={textLiftVariants}
                    className="grid grid-cols-3 gap-2 border-y border-white/5 py-6 my-6 bg-white/[0.01]"
                  >
                    {proj.achievements.map((ach) => (
                      <div key={ach.label} className="flex flex-col text-left px-2 border-r border-white/5 last:border-0">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {ach.value}
                        </span>
                        <span className="font-mono text-[8px] sm:text-[9px] text-[#FF4B00] uppercase tracking-wider mt-1 font-medium">
                          {ach.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Core Capabilities */}
                  <motion.div variants={textLiftVariants} className="mb-8">
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-3.5 select-none">
                      // Core System Capabilities
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {proj.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-3">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tech Stack Chips */}
                  <motion.div 
                    variants={textLiftVariants}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] tracking-wider text-gray-400 bg-white/[0.02] border border-white/5 hover:border-white/20 px-3 py-1.5 transition-colors uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Buttons */}
                  <motion.div 
                    variants={textLiftVariants}
                    className="flex flex-col sm:flex-row items-center gap-4"
                  >
                    <button 
                      id={`github-btn-${proj.id}`}
                      onClick={() => handleGithubClick(proj.title)}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 font-mono text-[10px] tracking-widest text-white py-3 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GITHUB CODEBASE
                    </button>
                    <button 
                      id={`live-btn-${proj.id}`}
                      onClick={() => handleLiveClick(proj.title)}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-transparent bg-[#FF4B00] hover:bg-[#FF4B00]/90 text-white font-mono text-[10px] tracking-widest font-bold py-3 rounded-lg transition-all shadow-lg shadow-[#FF4B00]/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LIVE DEPLOYMENT
                    </button>
                  </motion.div>

                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Callout */}
        <motion.div 
          className="mt-24 text-center border-t border-white/5 pt-16 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-sans text-sm sm:text-base text-gray-400 font-light">
            Want to see more of my work, source repositories, or open-source contributions?
          </p>
          <button 
            id="view-all-repos-btn"
            onClick={() => window.open("https://github.com/vabhravipandeyy", "_blank", "noopener,noreferrer")}
            className="group flex items-center gap-2.5 border border-white/20 hover:border-[#FF4B00] hover:text-[#FF4B00] font-mono text-xs tracking-widest px-8 py-3.5 transition-colors text-white cursor-pointer"
          >
            VIEW ALL REPOSITORIES
            <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
        </motion.div>

      </div>
    </section>

    {/* Cinematic Full-Page Quote Section - Inspired by Image 1 with Scroll-Reveal Dynamics */}
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#060814] via-[#03050c] to-[#0a0d1a] py-32 px-6 select-none shadow-[0_0_50px_rgba(3,5,12,0.8)]"
    >
          {/* High-tech micro-texture */}
          <div className="absolute inset-0 tech-dot-grid opacity-25 pointer-events-none" />
          
          {/* soft ambient glowing nodes */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#FF4B00]/[0.035] blur-3xl pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.025] blur-3xl pointer-events-none" />
          
          {/* Concentric circles background matching Image 1 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const size = (i + 1) * 90; // incremental size
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#FF4B00]/8"
                  style={{
                    width: size,
                    height: size,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 40 + i * 15,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              );
            })}
            
            {/* Outer large radial glow spot */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-[#FF4B00]/4 glow-spot" />
          </div>

          {/* Glowing central indicator dot as seen in Image 1 */}
          <div className="absolute top-[37%] left-[61.5%] sm:left-[61.8%] w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF4B00] shadow-[0_0_15px_#FF4B00] animate-pulse z-10" />

          {/* Quote text in the center with progressive multi-line scroll-reveal */}
          <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-8">
            <span className="font-mono text-xs sm:text-sm text-gray-500 tracking-[0.4em] uppercase font-bold">
              THE PHILOSOPHICAL THROUGH-LINE
            </span>
            <div className="flex flex-col gap-6 sm:gap-8 font-serif text-3xl sm:text-5xl lg:text-7xl text-white font-light tracking-tight leading-[1.2] max-w-4xl">
              <motion.p 
                style={{ opacity: opacity1, y: y1 }}
                className="transition-all duration-300"
              >
                We carve intelligence into <span className="text-[#FF4B00] font-medium select-none">cold silicon</span>,
              </motion.p>
              <motion.p 
                style={{ opacity: opacity2, y: y2 }}
                className="transition-all duration-300"
              >
                weaving <span className="italic text-[#FF4B00] font-medium select-none">sight, reasoning</span> & physical agency
              </motion.p>
              <motion.p 
                style={{ opacity: opacity3, y: y3 }}
                className="transition-all duration-300"
              >
                into systems that master the <span className="text-[#FF4B00] font-medium select-none">physical world</span>.
              </motion.p>
            </div>
          </div>
        </div>
      </>
    );
}
