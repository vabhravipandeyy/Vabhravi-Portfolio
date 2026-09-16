import { useState } from "react";
import { motion } from "motion/react";
import { experiences } from "../data";
import { Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import DancingText from "./DancingText";

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="relative px-4 sm:px-8 py-20 bg-gray-950/80 border-t border-white/5 overflow-hidden">
      {/* Decorative blueprint grids */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#FF4B00]/5 glow-spot" />

      {/* Massive editorial background word "Journey" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Journey
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.25em] uppercase font-semibold">
              02 / PROFESSIONAL JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              <DancingText text="The Path." />
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-sm text-left md:text-right">
            // High-impact internship deployments, technical leadership, and engineering milestones.
          </p>
        </div>

        {/* Timeline Path Stack */}
        <div className="relative mt-8">
          
          {/* Vertical central path line */}
          <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-[1px] bg-white/10" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {experiences.map((exp, idx) => {
              const displayNum = String(idx + 1).padStart(2, "0");
              const isHovered = hoveredIdx === idx;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-12 sm:pl-28 grid grid-cols-1 lg:grid-cols-12 gap-6 group cursor-default py-4 transition-all duration-300"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 80,
                    damping: 16,
                    mass: 0.8,
                    delay: idx * 0.08
                  }}
                >
                  {/* Cyber Hover Card Backdrop */}
                  <div className="absolute -inset-y-2 left-6 sm:left-20 -inset-x-3 sm:-right-4 bg-white/[0.01] border border-transparent group-hover:border-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none -z-10 shadow-inner group-hover:translate-x-1" />

                  {/* Absolute Timeline Node Indicator */}
                  <div className="absolute left-4 sm:left-12 -translate-x-1/2 top-7 flex items-center justify-center">
                    {/* Ring background with advanced glowing effect */}
                    <motion.div 
                      className="w-4.5 h-4.5 rounded-full border border-white/30 bg-[#03050c] flex items-center justify-center z-20"
                      animate={{ 
                        borderColor: isHovered ? "#FF4B00" : "rgba(255, 255, 255, 0.3)",
                        scale: isHovered ? 1.25 : 1,
                        boxShadow: isHovered ? "0 0 12px rgba(255, 75, 0, 0.6)" : "none"
                      }}
                    >
                      {/* Inner dot */}
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-white"
                        animate={{ backgroundColor: isHovered ? "#FF4B00" : "#ffffff" }}
                      />
                    </motion.div>
                  </div>

                  {/* Absolute Large Step Number on Left Column */}
                  <div className="absolute left-1 sm:left-4 top-4 text-left hidden sm:block">
                    <motion.span 
                      className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold select-none"
                      animate={{ 
                        color: isHovered ? "#FF4B00" : "rgba(255, 255, 255, 0.15)",
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {displayNum}
                    </motion.span>
                  </div>

                  {/* Timeline Card - Left/Middle Span */}
                  <div className="lg:col-span-8 text-left transition-transform duration-300 group-hover:translate-x-1">
                    {/* Mobile Only serialized step number */}
                    <div className="flex items-center gap-2 sm:hidden mb-2">
                      <span className="font-serif text-lg font-bold text-[#FF4B00]">{displayNum}</span>
                      <div className="h-[1px] w-6 bg-white/10" />
                      <span className="font-mono text-[10px] text-gray-500 uppercase">{exp.category}</span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2.5 mb-2.5">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight transition-colors group-hover:text-[#FF4B00]">
                        {exp.title}
                      </h3>
                      <span className="text-gray-400 font-mono text-xs sm:text-sm font-light">
                        @ {exp.company}
                      </span>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed font-light mb-5">
                      {exp.description}
                    </p>

                    {/* Key Achievements list */}
                    <div className="flex flex-col gap-2.5 mt-2">
                      <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black">// key_milestones</p>
                      {exp.achievements.map((ach, achIdx) => (
                        <div key={achIdx} className="flex items-start gap-2.5 text-left group/ach">
                          <span className="font-mono text-[#FF4B00] text-[10px] font-black shrink-0 mt-0.5 select-none transition-transform group-hover/ach:translate-x-0.5">
                            &gt;
                          </span>
                          <span className="font-sans text-xs sm:text-sm text-gray-300 font-light leading-relaxed group-hover/ach:text-white transition-colors duration-200">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata & Dates - Right Column */}
                  <div className="lg:col-span-4 flex flex-col lg:items-end justify-start text-left lg:text-right pt-4 font-mono text-[10px] text-gray-500 gap-3">
                    {/* Date range badge with premium status light */}
                    <div className="flex items-center lg:justify-end gap-2 text-white bg-white/[0.02] border border-zinc-800 group-hover:border-[#FF4B00]/30 px-3 py-1.5 rounded-lg w-fit transition-colors duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] animate-pulse" />
                      <span className="font-mono text-[10px] font-black tracking-wider">
                        {exp.dateRange.toUpperCase()}
                      </span>
                    </div>

                    {/* Telemetry info block */}
                    <div className="flex flex-col lg:items-end gap-1.5 mt-1 text-[11px]">
                      <div className="flex items-center lg:justify-end gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        <span>{exp.location}</span>
                      </div>

                      <div className="mt-1 hidden lg:block">
                        <span className="bg-white/[0.02] border border-white/5 group-hover:border-[#FF4B00]/10 text-zinc-500 group-hover:text-[#FF4B00] px-2.5 py-1 text-[9px] tracking-widest uppercase rounded transition-colors duration-300">
                          {exp.category}
                        </span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
