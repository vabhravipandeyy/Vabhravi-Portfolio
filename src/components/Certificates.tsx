import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { certificates } from "../data";
import { ArrowUpRight, Award, Trophy, Bookmark, Sparkles, Terminal } from "lucide-react";
import DancingText from "./DancingText";

export default function Certificates() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Track vertical scroll progress of the target container to hijack the slide direction
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // Calculate maximum left-ward travel distance dynamically so it never over-scrolls or under-scrolls
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(Math.max(0, trackWidth - viewportWidth));
      }
    };

    calculateRange();
    const timer = setTimeout(calculateRange, 150);

    window.addEventListener("resize", calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateRange);
    };
  }, []);

  // Map scroll progress (0 to 1) to horizontal translation (0 to -scrollRange in px)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section 
      ref={targetRef} 
      id="certificates" 
      className="relative h-[300vh] bg-[#030611]/40 overflow-visible"
    >
      {/* Sticky viewport frame that locks active user scrolling in place */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-transparent">
        
        {/* Ambient high-tech neon matrix background grids & light sparks */}
        <div className="absolute inset-0 tech-dot-grid opacity-[0.08] pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[35vw] h-[35vw] rounded-full bg-blue-900/5 glow-spot pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#FF4B00]/3 glow-spot pointer-events-none" />
        
      {/* Massive editorial background word "Awards" */}
      <div className="absolute top-[5%] sm:top-[8%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Awards
        </h2>
      </div>

        {/* Dynamic & High-Impact Section Header - Placed strategically above the carousel */}
        <div className="relative z-10 px-[6vw] md:px-[10vw] mb-12 sm:mb-16 text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.3em] uppercase font-bold flex flex-wrap items-center gap-2.5">
              05 / HONORS & RECOGNITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mt-3">
              <DancingText text="Distinguished" />{" "}
              <DancingText text="Accolades" className="italic text-[#FF4B00] font-normal" delayOffset={13} hoverColor="#white" />
              <DancingText text="." delayOffset={22} />
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-sm font-light leading-relaxed">
            A curated registry of academic honors, competitive hackathon victories, and professional fellowships. Hardened through direct competition.
          </p>
        </div>

        {/* Horizontal scrollable row wrapper */}
        <div className="relative w-full overflow-visible z-10">
          <motion.div 
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 sm:gap-8 px-[6vw] md:px-[10vw] w-max items-center"
          >
            {certificates.map((cert, idx) => {
              // Custom category abbreviation initials, matching icons, and dynamic premium color themes
              const getBadgeMeta = (badgeText: string) => {
                const lower = badgeText.toLowerCase();
                if (lower.includes("winner")) return { tag: "WIN", icon: Trophy, color: "#EAB308", borderGlow: "rgba(234,179,8,0.15)" };
                if (lower.includes("runner")) return { tag: "RUN", icon: Award, color: "#14B8A6", borderGlow: "rgba(20,184,166,0.15)" };
                if (lower.includes("idea")) return { tag: "IDE", icon: Sparkles, color: "#D946EF", borderGlow: "rgba(217,70,239,0.15)" };
                if (lower.includes("fellow")) return { tag: "FEL", icon: Bookmark, color: "#F43F5E", borderGlow: "rgba(244,63,94,0.15)" };
                if (lower.includes("intern")) return { tag: "INT", icon: Terminal, color: "#3B82F6", borderGlow: "rgba(59,130,246,0.15)" };
                if (lower.includes("acad")) return { tag: "ACA", icon: Award, color: "#6366F1", borderGlow: "rgba(99,102,241,0.15)" };
                if (lower.includes("leader")) return { tag: "LEA", icon: Bookmark, color: "#10B981", borderGlow: "rgba(16,185,129,0.15)" };
                return { tag: "CER", icon: Terminal, color: "#FF4B00", borderGlow: "rgba(255,75,0,0.15)" };
              };

              const meta = getBadgeMeta(cert.badgeText);
              const BadgeIcon = meta.icon;

              return (
                <motion.div
                  key={cert.id}
                  className="w-[280px] sm:w-[320px] md:w-[350px] h-[280px] sm:h-[300px] bg-gradient-to-br from-[#0e0f17] via-[#08090d] to-[#040508] rounded-[24px] border border-zinc-800/40 flex flex-col justify-between p-6 transition-all duration-500 group select-none text-left shrink-0 relative overflow-hidden"
                  whileHover={{ 
                    y: -6,
                    borderColor: `${meta.color}40`,
                    boxShadow: `0 20px 40px ${meta.borderGlow}`
                  }}
                >
                  {/* Premium Top Highlight line that ignites on hover */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent transition-all duration-700" 
                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${meta.color}cc, transparent)` }}
                  />

                  {/* High-impact background neon mist on hover */}
                  <div 
                    className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                    style={{ backgroundColor: `${meta.color}0a` }}
                  />

                  {/* Symmetrical watermarked background identifier (bleeding typography) */}
                  <div className="absolute -bottom-8 -right-8 font-serif text-[100px] sm:text-[120px] font-black text-white/[0.015] leading-none select-none pointer-events-none group-hover:text-white/[0.025] transition-all duration-500">
                    {cert.year.match(/\d{4}/)?.[0] || "0" + (idx + 1)}
                  </div>

                  {/* Top Row: Category Header & Premium Pill Year Label */}
                  <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 relative z-10">
                    <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 font-extrabold tracking-widest uppercase group-hover:text-zinc-200 transition-colors duration-300 truncate max-w-[180px] sm:max-w-[220px]">
                      {cert.issuer}
                    </span>
                    <span 
                      className="font-mono text-[9px] sm:text-[10px] font-black tracking-wider border px-2.5 py-0.5 rounded-full uppercase"
                      style={{ 
                        color: meta.color, 
                        borderColor: `${meta.color}30`,
                        backgroundColor: `${meta.color}08`
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Middle Content Section (Icon, Badge, Title, Description) */}
                  <div className="flex flex-col gap-2.5 relative z-10 my-auto py-2">
                    {/* Badge / Category Pill */}
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex items-center gap-1.5 border px-2.5 py-0.5 rounded-md font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
                        style={{ 
                          color: meta.color, 
                          borderColor: `${meta.color}25`,
                          backgroundColor: `${meta.color}08`
                        }}
                      >
                        <BadgeIcon className="w-2.5 h-2.5" />
                        {cert.badgeText}
                      </div>
                    </div>

                    {/* Title & Arrow */}
                    <div className="flex items-start justify-between gap-3 mt-1">
                      <h3 className="font-serif text-base sm:text-lg font-normal text-zinc-100 leading-snug group-hover:text-white transition-colors duration-500 line-clamp-2">
                        {cert.title}
                      </h3>
                      {cert.credentialUrl && (
                        <button 
                          onClick={() => window.open(cert.credentialUrl, "_blank", "noopener,noreferrer")}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all shadow-sm hover:rotate-45"
                          style={{ 
                            color: meta.color, 
                            borderColor: `${meta.color}30`,
                            backgroundColor: `${meta.color}05`
                          }}
                          title="View Credential"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-sans text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors duration-300">
                      {cert.description}
                    </p>
                  </div>

                  {/* Bottom Row: Verification Info */}
                  <div className="flex flex-col gap-2 relative z-10">
                    <div className="border-t border-zinc-900/60 pt-3 flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-zinc-500 font-bold tracking-wider">
                      <span className="group-hover:text-zinc-300 transition-colors duration-300">
                        SECURE LOG // ID_0{idx+1}
                      </span>
                      <span className="text-emerald-500/80 tracking-widest font-black uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        VERIFIED_✓
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Minimal indicator tracking scroll progress below the track */}
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-48 h-[3px] bg-white/5 rounded-full overflow-hidden select-none pointer-events-none">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FF4B00] via-[#FF4B00] to-blue-500 rounded-full animate-pulse"
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: "left"
            }}
          />
        </div>

      </div>
    </section>
  );
}
