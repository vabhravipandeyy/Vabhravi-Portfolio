import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data";
import { Download, ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";

const letterVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: [0, -8, 0],
    transition: {
      opacity: { duration: 0.7, delay: 0.2 + i * 0.035 },
      y: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        delay: 0.5 + i * 0.1,
      }
    }
  }),
  hover: {
    y: -20,
    scale: 1.3,
    rotate: [0, -15, 15, -10, 10, 0],
    color: "#FF4B00",
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [showStatusMsg, setShowStatusMsg] = useState(false);
  const [coords, setCoords] = useState({ x: 80.224, y: 12.984 });

  // Dynamically cycle coordinate telemetry in Chennai bounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: Number((80.224 + (Math.random() - 0.5) * 0.008).toFixed(4)),
        y: Number((12.984 + (Math.random() - 0.5) * 0.008).toFixed(4)),
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    window.open(personalInfo.resumeUrl, "_blank");
    setShowStatusMsg(true);
    setTimeout(() => setShowStatusMsg(false), 4000);
  };

  const nameLetters = Array.from("VABHRAVI PANDEY");

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-center px-4 sm:px-8 pt-24 pb-16 overflow-hidden bg-transparent text-white">
      
      {/* 1. IMMERSIVE ANIMATED TOPOGRAPHIC & GEOSPATIAL VECTOR BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        
        {/* Subtle engineering coordinate grid */}
        <div className="absolute inset-0 tech-dot-grid opacity-[0.08] scale-100" />
        
        {/* Topographic organic curves background (Inspired by beautiful reference map contours) */}
        <div className="absolute inset-0 opacity-[0.22] mix-blend-screen transition-all duration-1000">
          <svg 
            viewBox="0 0 1000 1000" 
            className="absolute w-[180%] lg:w-[120%] h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-800" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.75"
          >
            {/* Topographic Elevation Layer 1 */}
            <motion.path 
              d="M100,250 C250,220 320,120 500,180 C680,240 750,380 900,320 C1050,260 1100,420 1200,500" 
              className="text-[#FF4B00]/15"
              animate={{ 
                d: [
                  "M100,250 C250,220 320,120 500,180 C680,240 750,380 900,320 C1050,260 1100,420 1200,500",
                  "M100,260 C240,200 340,140 480,200 C690,260 730,360 920,300 C1040,280 1120,400 1200,490",
                  "M100,250 C250,220 320,120 500,180 C680,240 750,380 900,320 C1050,260 1100,420 1200,500"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            />

            {/* Topographic Elevation Layer 2 */}
            <motion.path 
              d="M-50,450 C120,400 280,500 450,420 C620,340 700,550 880,480 C1060,410 1120,580 1250,620" 
              className="text-zinc-700/30"
              animate={{ 
                d: [
                  "M-50,450 C120,400 280,500 450,420 C620,340 700,550 880,480 C1060,410 1120,580 1250,620",
                  "M-50,430 C130,420 270,480 460,440 C610,360 720,530 860,500 C1070,390 1110,600 1250,610",
                  "M-50,450 C120,400 280,500 450,420 C620,340 700,550 880,480 C1060,410 1120,580 1250,620"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            />

            {/* Topographic Elevation Layer 3 */}
            <motion.path 
              d="M50,700 C180,620 310,750 520,680 C730,610 820,780 980,720 C1140,660 1180,820 1300,850" 
              className="text-[#FF4B00]/10"
              animate={{ 
                d: [
                  "M50,700 C180,620 310,750 520,680 C730,610 820,780 980,720 C1140,660 1180,820 1300,850",
                  "M50,715 C170,640 320,730 510,700 C740,590 840,760 970,740 C1150,640 1170,840 1300,840",
                  "M50,700 C180,620 310,750 520,680 C730,610 820,780 980,720 C1140,660 1180,820 1300,850"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
            />

            {/* Highly Stylized Concentric Nested Contour Ridges (Visual Center of Gravity) */}
            <g className="opacity-[0.4] animate-pulse">
              <path d="M450,420 C400,380 480,310 520,350 C560,390 500,460 450,420 Z" className="text-zinc-800" strokeWidth="0.5" />
              <path d="M430,410 C380,360 500,290 540,330 C580,370 480,460 430,410 Z" className="text-zinc-700/50" strokeWidth="0.5" />
              <path d="M410,400 C360,340 520,270 560,310 C600,350 460,460 410,400 Z" className="text-zinc-800" strokeWidth="0.5" />
            </g>

            {/* Topographic Index Elevation Indicator Ring */}
            <circle cx="500" cy="400" r="180" strokeDasharray="3 9" className="text-[#FF4B00]/10" />
            <circle cx="500" cy="400" r="320" strokeDasharray="5 15" className="text-zinc-800" />
          </svg>
        </div>

        {/* 2. EXACT REF PORTRAIT ORANGE INDICATOR DOT (Highly polished minimalist accent) */}
        {/* Styled exact pulsing orange sphere floating precisely on a topographic junction */}
        <div className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            className="w-4.5 h-4.5 rounded-full bg-[#FF4B00] relative flex items-center justify-center shadow-[0_0_20px_rgba(255,75,0,0.8)]"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            {/* Outer telemetry ring */}
            <span className="absolute w-12 h-12 rounded-full border border-[#FF4B00]/30 animate-ping opacity-75" />
            <span className="absolute w-20 h-20 rounded-full border border-zinc-700/20 animate-spin-slow" style={{ borderStyle: "dashed" }} />
          </motion.div>
        </div>

        {/* Engineering Radar scan sector lines */}
        <div className="absolute bottom-1/4 left-1/12 w-[35vw] h-[35vw] rounded-full bg-[#FF4B00]/[0.02] blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/12 w-[35vw] h-[35vw] rounded-full bg-blue-500/[0.015] blur-[100px] pointer-events-none" />

        {/* Interactive realtime laser scanning sweep bar */}
        <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF4B00]/30 to-transparent animate-laser-sweep pointer-events-none" />

        {/* Vector coordinate indicators */}
        <div className="absolute top-28 left-12 font-mono text-[9px] text-zinc-600 tracking-widest hidden xl:block">
          COORD_GRID: [LAT {coords.y} // LNG {coords.x}]
        </div>
        <div className="absolute top-28 right-12 font-mono text-[9px] text-zinc-600 tracking-widest hidden xl:block">
          STATUS: SYS_ONLINE // RADAR_ACTIVE
        </div>
      </div>

      {/* Decorative architectural vertical framing vectors */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block" />

      {/* 2. MAIN CONTENT HERO CONTAINER */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 flex-grow py-12">
        
        {/* Left Column: Typography, Credentials & Callouts */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Status availability beacon */}
          <motion.div 
            className="inline-flex items-center gap-2.5 bg-[#FF4B00]/10 border border-[#FF4B00]/25 rounded-full px-4 py-1.5 w-fit mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#FF4B00] font-black uppercase">
              ACTIVE_TRANSMISSION // SYSTEM_READY
            </span>
          </motion.div>

          {/* Humble intro token */}
          <motion.p 
            className="font-mono text-xs tracking-[0.35em] text-zinc-500 uppercase mb-3 pl-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            SYS_ENG_IDENTIFICATION
          </motion.p>

          {/* Staggered text entrance for name */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-5 overflow-hidden flex flex-wrap select-none">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={char === " " ? "mr-4 inline-block" : "transition-colors duration-200 cursor-default inline-block"}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Roles stack with beautiful tech borders */}
          <motion.div 
            className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.15em] text-[#FF4B00] bg-[#FF4B00]/5 border border-[#FF4B00]/20 px-3.5 py-1.5 rounded-lg">
              AI / ML ENGINEER
            </span>
            <div className="hidden sm:block h-1.5 w-1.5 rounded-full bg-zinc-800" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.15em] text-blue-400 bg-blue-500/5 border border-blue-500/10 px-3.5 py-1.5 rounded-lg">
              FULL STACK DEVELOPER
            </span>
          </motion.div>

          {/* Core high fidelity editorial biography description */}
          <motion.p 
            className="font-sans text-sm sm:text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-xl mb-12 pl-0.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Building intelligent AI & ML systems, scalable full-stack applications, and cloud-powered solutions on AWS using <span className="text-white font-medium">React.js</span>, <span className="text-white font-medium">Node.js</span>, and <span className="text-white font-medium">Python</span>. Turning data into decisions, one model at a time.
          </motion.p>

          {/* Interaction Trigger Actions */}
          <motion.div 
            className="flex flex-wrap gap-4 items-center pl-0.5 relative"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.button
              onClick={handleDownloadResume}
              className="group flex items-center gap-2.5 bg-white text-gray-950 font-mono text-xs tracking-widest font-black px-7 py-4.5 border border-transparent transition-all duration-300 rounded-xl hover:bg-transparent hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              DOWNLOAD RESUME
              <Download className="w-4 h-4 transition-transform group-hover:translate-y-[2px]" />
            </motion.button>

            <motion.button
              onClick={onExploreClick}
              className="group flex items-center gap-2.5 bg-transparent text-white font-mono text-xs tracking-widest font-black px-7 py-4.5 border border-white/20 transition-all duration-300 rounded-xl hover:border-[#FF4B00] hover:text-[#FF4B00]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              EXPLORE WORK
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-[2px]" />
            </motion.button>

            {/* Social Icons Container */}
            <div className="flex items-center gap-3 sm:ml-4 mt-2 sm:mt-0">
              {/* Divider line */}
              <div className="hidden sm:block w-[1px] h-8 bg-white/10 mx-2" />

              {/* LinkedIn Button */}
              <motion.a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 flex items-center justify-center text-zinc-400 hover:text-[#0077b5] transition-all duration-300 relative group/soc"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="absolute -top-10 scale-0 group-hover/soc:scale-100 transition-all duration-200 bg-black/80 border border-white/10 text-[9px] font-mono tracking-widest px-2 py-1 rounded text-white whitespace-nowrap">
                  LINKEDIN
                </span>
              </motion.a>

              {/* GitHub Button */}
              <motion.a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 relative group/soc"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span className="absolute -top-10 scale-0 group-hover/soc:scale-100 transition-all duration-200 bg-black/80 border border-white/10 text-[9px] font-mono tracking-widest px-2 py-1 rounded text-white whitespace-nowrap">
                  GITHUB
                </span>
              </motion.a>

              {/* LeetCode Button */}
              <motion.a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FFA116]/50 hover:bg-[#FFA116]/5 flex items-center justify-center text-zinc-400 hover:text-[#FFA116] transition-all duration-300 relative group/soc"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.37a1.256 1.256 0 0 1 0-1.747l4.51-4.37c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.451.466 1.18 0 1.631l-1.85 1.792c-.233.225-.605.225-.838 0l-.854-.827a.584.584 0 0 1 0-.815l.812-.787c.105-.101.105-.266 0-.368l-.488-.473a.755.755 0 0 0-1.018 0l-2.023 1.96a1.256 1.256 0 0 0 0 1.747l2.023 1.96c.466.451 1.211.451 1.677 0l1.85-1.792c.466-.451 1.211-.451 1.677 0zM10.748 4.39a1.211 1.211 0 0 1 1.63 0l3.05 2.956c.45.437.45 1.144 0 1.58l-3.05 2.957a1.211 1.211 0 0 1-1.63 0L7.698 8.926c-.45-.436-.45-1.143 0-1.58l3.05-2.956z" />
                </svg>
                <span className="absolute -top-10 scale-0 group-hover/soc:scale-100 transition-all duration-200 bg-black/80 border border-white/10 text-[9px] font-mono tracking-widest px-2 py-1 rounded text-white whitespace-nowrap">
                  LEETCODE
                </span>
              </motion.a>
            </div>

            {/* Custom interactive download popup confirmation banner */}
            <AnimatePresence>
              {showStatusMsg && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-0 bg-[#FF4B00] text-white font-mono text-[9px] font-black tracking-wider px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 z-20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  SYS_RESUME_DELEGATED // ACCESS_GRANTED_PDF
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: High-tech visual viewport/radar screen */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div 
            className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl bg-zinc-950/40 border border-white/[0.08] p-5 overflow-hidden flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -4, borderColor: "rgba(255, 75, 0, 0.2)" }}
          >
            {/* Interactive radar plotting grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
              <svg className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="0.5">
                <defs>
                  <pattern id="radarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#radarGrid)" />
              </svg>
            </div>

            {/* Micro layout design symbols */}
            <div className="absolute top-2.5 left-2.5 font-mono text-[8px] text-zinc-600 z-10">+ [01_RADAR_NODE]</div>
            <div className="absolute top-2.5 right-2.5 font-mono text-[8px] text-zinc-600 z-10">[76_REF] +</div>
            <div className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-zinc-600 z-10">+ [AIML_LOCK]</div>
            <div className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-zinc-600 z-10">+</div>

            <div className="h-full flex flex-col justify-between relative z-10">
              {/* Telemetry feed status bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF4B00] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest text-zinc-200">PORTRAIT_FEED // VERIFIED</span>
                </div>
                <span className="font-mono text-[8px] text-zinc-500">LATENCY: 12ms</span>
              </div>

              {/* Holographic grayscale image with scrolling scanning laser */}
              <div className="my-3.5 relative flex-grow rounded border border-white/5 bg-black/60 overflow-hidden group">
                {/* Rolling scanning laser bar */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-[#FF4B00]/60 shadow-lg shadow-[#FF4B00]/40 animate-scan z-20" />
                
                {/* Grayscale styled portrait of Vabhravi */}
                <img 
                  src={personalInfo.avatarUrl} 
                  alt="Vabhravi Pandey Portrait" 
                  className="w-full h-full object-contain object-center grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Subtitle focal bracket crosshairs around border */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none z-10" />
                
                {/* Subtle HUD tag in corner, clear of face */}
                <div className="absolute bottom-3 left-3 bg-black/75 border border-[#FF4B00]/40 px-2 py-0.5 rounded pointer-events-none z-20 backdrop-blur-sm">
                  <span className="text-[#FF4B00] text-[8px] font-mono tracking-wider font-bold">
                    FACIAL_ID // VERIFIED 99.8%
                  </span>
                </div>
              </div>

              {/* Status info details at bottom of viewport card */}
              <div className="border-t border-white/10 pt-2.5 flex items-center justify-between font-mono text-[9px]">
                <div className="flex flex-col text-left">
                  <span className="text-zinc-500 text-[8px] uppercase">OBJECT_CLASS</span>
                  <span className="text-zinc-200">AI_ML_ENGINEER</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-zinc-500 text-[8px] uppercase">LOC_COORDS</span>
                  <span className="text-[#FF4B00] font-black">DEHRADUN, IN</span>
                </div>
              </div>
            </div>

            {/* Absolute radial back-glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF4B00]/10 rounded-full blur-2xl pointer-events-none z-0" />
          </motion.div>
        </div>
      </div>

      {/* CSS-in-JS animated keyframes to handle continuous high-end mapping/laser motion */}
      <style>{`
        @keyframes drift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(0%); }
          50% { transform: translateY(100%); }
        }
        @keyframes sweep {
          0% { transform: translateY(0%); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .tech-dot-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .animate-scan {
          animation: scan 6s ease-in-out infinite;
        }
        .animate-laser-sweep {
          animation: sweep 12s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 90s linear infinite;
        }
      `}</style>
    </section>
  );
}
