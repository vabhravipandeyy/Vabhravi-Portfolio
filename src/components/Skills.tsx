import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import DancingText from "./DancingText";

interface CoreWeapon {
  id: string;
  num: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  bgCode: string[]; // High-tech background code snippets
}

const coreWeapons: CoreWeapon[] = [
  {
    id: "weapon-perception",
    num: "01",
    title: "Neural Vision & Perception Engines",
    tag: "PERCEPTION LABS",
    description: "Engineering real-time deep learning pipelines with custom YOLO models, PyTorch classification networks, and sub-millisecond OpenCV video inference telemetry that can see and perceive the physical world with absolute fidelity.",
    stack: ["YOLOv8 & PyTorch", "Deep CNNs", "Real-Time OpenCV", "Frame Extraction", "Feature Tracking"],
    bgCode: [
      "import torch",
      "model = YOLO('best.pt')",
      "results = model.track(source=0, show=True)",
      "for box in results[0].boxes:",
      "    class_id = int(box.cls[0])",
      "    confidence = float(box.conf[0])"
    ]
  },
  {
    id: "weapon-agents",
    num: "02",
    title: "Autonomous Reasoning & Agentic Systems",
    tag: "COGNITIVE ARCHITECTURES",
    description: "Orchestrating production-grade multi-agent swarms, self-correcting RAG loops, and low-latency semantic indexing using Milvus and FAISS vector frameworks that can reason, plan, and execute tasks autonomously.",
    stack: ["Agent Swarms", "Milvus / FAISS", "Semantic Search", "RAG Optimization", "Python Core"],
    bgCode: [
      "class AIAgent(Agent):",
      "    def plan(self, objective):",
      "        state = self.get_context()",
      "        embedding = vector_db.query(state)",
      "        action = self.reason(embedding)",
      "        return action.execute()"
    ]
  },
  {
    id: "weapon-fullstack",
    num: "03",
    title: "Cinematic High-Throughput Web",
    tag: "PRODUCTION SYSTEMS",
    description: "Crafting ultra-responsive React interfaces styled with rigorous visual grids and negative space, paired with distributed Node.js/Express runtimes, secure relational databases, and flawless local state persistence.",
    stack: ["React.js / Next.js", "Express & Node.js", "TypeScript (ESM)", "Tailwind Layouts", "MongoDB & SQL"],
    bgCode: [
      "const startServer = async () => {",
      "  const app = express();",
      "  app.use(express.json());",
      "  app.use('/api', router);",
      "  app.listen(3000, '0.0.0.0');",
      "};"
    ]
  },
  {
    id: "weapon-embedded",
    num: "04",
    title: "Native Mobile & Sensor Telemetry",
    tag: "EMBEDDED HARDWARE",
    description: "Compiling ultra-efficient native Kotlin applications featuring real-time background sensor fusion, hardware-accelerated location loggers, high-frequency device state telemetry, and low-level NDK integration.",
    stack: ["Kotlin Runtime", "Android NDK", "Sensor Fusion", "Background Workers", "Device Telemetry"],
    bgCode: [
      "class SensorLogger : Service() {",
      "  override fun onSensorChanged(e: SensorEvent) {",
      "    val x = e.values[0]",
      "    val fused = filter.apply(x)",
      "    telemetryChannel.send(fused)",
      "  }",
      "}"
    ]
  }
];

interface ScrollRevealedWeaponProps {
  weapon: CoreWeapon;
  idx: number;
  key?: string;
}

function ScrollRevealedWeapon({ weapon, idx }: ScrollRevealedWeaponProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Create an individual scroll tracker for each weapon item to make the reveal extremely physical and laggy
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end center"]
  });

  // Progressive premium styling transforms
  const opacity = useTransform(scrollYProgress, [0.05, 0.65, 0.95], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0.05, 0.65], [100, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.65], [0.94, 1]);
  const rotateX = useTransform(scrollYProgress, [0.05, 0.65], [10, 0]);

  return (
    <motion.div
      ref={elementRef}
      style={{
        opacity,
        y,
        scale,
        rotateX,
        perspective: 1200
      }}
      className="group relative flex flex-col lg:flex-row items-stretch justify-between py-10 sm:py-16 border-b border-white/5 transition-all duration-500 overflow-hidden text-left"
    >
      {/* Horizontal glowing reveal line that acts on hover */}
      <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#FF4B00]/70 via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />

      {/* Decorative vertical floating code snippets in the background on hover - inspired by high-tech interfaces */}
      <div className="absolute right-10 top-6 bottom-6 w-96 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none select-none hidden lg:block overflow-hidden">
        <div className="flex flex-col gap-1 font-mono text-[10px] text-[#FF4B00] text-left">
          <div className="flex items-center gap-2 mb-2 text-white/50 border-b border-white/10 pb-1">
            <Terminal className="w-3 h-3 text-[#FF4B00]" />
            <span>SYSTEM_SHELL_TRACE // ACTIVE</span>
          </div>
          {weapon.bgCode.map((line, lIdx) => (
            <div key={lIdx} className="whitespace-nowrap font-semibold">
              <span className="text-gray-600 mr-2">{String(lIdx + 1).padStart(2, "0")}</span>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Left Column: Numbering & Detailed Titles */}
      <div className="flex items-start gap-5 md:gap-8 max-w-3xl flex-grow z-10 relative">
        <span className="font-mono text-xs sm:text-sm font-black text-[#FF4B00]/70 mt-1 shrink-0 tracking-wider select-none">
          {weapon.num}
        </span>
        
        {/* We scale the content container smoothly on hover to slightly increase font size visual presence */}
        <div className="flex flex-col gap-3 transition-all duration-500 ease-out group-hover:scale-[1.025] group-hover:translate-x-1 origin-left">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-white group-hover:text-[#FF4B00] transition-colors duration-500 leading-snug">
              {weapon.title}
            </h3>
            <span className="font-mono text-[8px] tracking-widest text-[#FF4B00] bg-[#FF4B00]/10 border border-[#FF4B00]/25 px-2.5 py-0.5 rounded font-bold uppercase select-none">
              {weapon.tag}
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl group-hover:text-gray-300 transition-colors duration-300">
            {weapon.description}
          </p>
        </div>
      </div>

      {/* Right Column: Interactive components & Tech badges */}
      <div className="flex flex-col lg:items-end justify-between gap-6 mt-6 lg:mt-0 pl-9 lg:pl-0 shrink-0 z-10 relative">
        
        {/* Animated indicators */}
        <div className="flex items-center gap-4 lg:self-end">
          <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-gray-500 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-all duration-500 group-hover:rotate-45">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Tech Stack Horizontal Badges with individual staggering hover highlights */}
        <div className="flex flex-wrap gap-1.5 lg:justify-end">
          {weapon.stack.map((tech) => (
            <span 
              key={tech}
              className="font-mono text-[9px] sm:text-xs text-gray-400 border border-white/5 px-2.5 py-1 bg-white/[0.01] group-hover:border-[#FF4B00]/10 group-hover:text-white group-hover:bg-[#FF4B00]/5 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Aesthetic Smooth Radial background glow for this specific element on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.003] via-[#FF4B00]/[0.002] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 sm:px-8 py-24 bg-[#050814]/40 border-t border-white/5 overflow-hidden">
      
      {/* Exquisite bespoke ambient high-tech particle grid background */}
      <div className="absolute inset-0 tech-dot-grid opacity-5 pointer-events-none" />

      {/* Massive editorial background word "Capabilities" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Capabilities
        </h2>
      </div>
      
      {/* Decorative concentric circular mathematical orbit waves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] pointer-events-none opacity-[0.015] select-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#FF4B00] inset-0 m-auto"
            style={{
              width: `${(i + 1) * 180}px`,
              height: `${(i + 1) * 180}px`,
            }}
          />
        ))}
      </div>

      {/* Large delicate colored ambient space dust rings */}
      <div className="absolute top-1/4 right-[-10vw] w-[50vw] h-[50vw] rounded-full bg-blue-900/5 glow-spot" />
      <div className="absolute bottom-1/4 left-[-10vw] w-[50vw] h-[50vw] rounded-full bg-[#FF4B00]/1.5 glow-spot" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* High-Impact Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="text-left max-w-3xl">
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.3em] uppercase font-bold">
              04 / TECHNICAL CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mt-3">
              <DancingText text="Strategic" />{" "}
              <DancingText text="Domain Expertise" className="italic text-[#FF4B00] font-normal" delayOffset={9} hoverColor="#white" />
              <DancingText text="." delayOffset={25} />
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md text-left font-light leading-relaxed">
            A meticulous synthesis of engineering disciplines. Hardened through direct development, clear of simulated environments.
          </p>
        </div>

        {/* Minimalist Editorial Row Grid - Staged scroll reveals requiring active user scroll actions */}
        <div className="flex flex-col border-t border-white/5">
          {coreWeapons.map((weapon, idx) => (
            <ScrollRevealedWeapon key={weapon.id} weapon={weapon} idx={idx} />
          ))}
        </div>

        {/* High-fidelity verification terminal bar in footer */}
        <div className="mt-16 pt-6 border-t border-white/5 text-left flex items-center justify-between flex-wrap gap-4">
          <p className="font-mono text-[9px] sm:text-xs text-gray-500 tracking-wide">
            // STATUS: SYSTEMS NOMINAL // CORE VERIFIED // NO SIMULATION DECLARED
          </p>
        </div>

      </div>
    </section>
  );
}
