import { motion } from "motion/react";
import { personalInfo, educationList } from "../data";
import { BookOpen, GraduationCap, MapPin, Award } from "lucide-react";
import DancingText from "./DancingText";

export default function About() {
  return (
    <section id="about" className="relative px-4 sm:px-8 py-20 bg-gray-950/60 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[30vw] h-[30vw] rounded-full bg-blue-500/5 glow-spot" />

      {/* Massive editorial background word "Profile" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Profile
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.25em] uppercase font-semibold">
              01 / PHILOSOPHY & BACKGROUND
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              <DancingText text="Engineering as an Art Form." />
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-500 max-w-xs text-left md:text-right">
            // Balancing deep algorithmic precision with elegant digital interactions.
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio & Professional Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Flipped Laptop Development Session Image */}
            <motion.div 
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40 p-2 mb-2 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-400 bg-black/60 px-2 py-0.5 rounded border border-white/5 z-20">
                // ACTIVE_SESSION: DEV_ENVIRONMENT
              </div>
              <div className="absolute top-4 right-4 font-mono text-[8px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/10 z-20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                SYSTEM_STABLE
              </div>
              <div className="aspect-[3/4] sm:aspect-[4/5] max-h-[520px] w-full rounded-xl overflow-hidden relative bg-black/40">
                <img 
                  src={personalInfo.laptopUrl} 
                  alt="Vabhravi Pandey Developer Session" 
                  className="w-full h-full object-contain object-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 font-mono text-[9px] text-gray-500">
                <span>ENGINEERING_CLASS: FULL_STACK_DEV</span>
                <span>DIT_UNIVERSITY // SPECIALIZATION: AI_ML</span>
              </div>
            </motion.div>
            {/* Philosophical Editorial Quote */}
            <div className="relative border-l border-[#FF4B00] pl-4 py-1 my-1.5 text-left">
              <span className="font-mono text-[8px] text-[#FF4B00] uppercase tracking-widest block mb-0.5">
                // SYSTEM_CONCEPT_CORE
              </span>
              <p className="font-serif text-sm sm:text-base text-white font-light leading-relaxed italic">
                "I believe code is the <span className="text-[#FF4B00] font-medium not-italic">modern blueprint</span>—every line of React, FastAPI, or PyTorch is a structural support for the user experience."
              </p>
            </div>
            
            {/* Elegant multi-paragraph Biography */}
            <div className="flex flex-col gap-3 text-left font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              <p>
                Hi, I'm <span className="text-white font-semibold">Vabhravi Pandey</span>, an AI/ML undergraduate with hands-on experience building full-stack AI applications, RAG pipelines, and scalable backend services at <span className="text-blue-400 font-semibold">DIT University</span>.
              </p>
              <p>
                I specialize in engineering high-performance AI systems, combining machine learning and RAG architectures with robust full-stack web technologies to solve complex real-world problems.
              </p>
            </div>

            {/* Micro-specifications Grid matching the cyber theme */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 font-mono text-[10px] text-left">
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-500 text-[8px] tracking-wider uppercase font-bold">// COGNITIVE_ARCHITECTURE</span>
                <span className="text-gray-300">PyTorch, RAG, FAISS, LLMs</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-500 text-[8px] tracking-wider uppercase font-bold">// DISTRIBUTED_STACK</span>
                <span className="text-gray-300">React, FastAPI, Node, Express</span>
              </div>
            </div>

            {/* Custom Aesthetic Barcode Signature - relocated underneath academic credentials */}
          </div>

          {/* Right Column: Education Specs Card List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-mono text-xs tracking-widest text-gray-400 uppercase font-bold text-left mb-2">
              // ACADEMIC CREDENTIALS
            </h3>

            {educationList.map((edu, index) => (
              <motion.div
                key={edu.institution}
                className="glass-panel p-6 relative rounded-xl border-white/5 hover:border-blue-500/20 transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Visual Icon Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white">
                  <GraduationCap className="w-5 h-5 text-[#FF4B00]" />
                </div>

                <div className="flex flex-col text-left">
                  {/* Date range in JetBrains Mono */}
                  <span className="font-mono text-xs text-[#FF4B00] font-medium tracking-wider mb-1">
                    {edu.dateRange}
                  </span>

                  {/* Institution Name */}
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-snug pr-12">
                    {edu.institution}
                  </h4>

                  {/* Degree name */}
                  <p className="font-sans text-sm text-gray-300 font-medium mt-2">
                    {edu.degree}
                  </p>

                  {/* Grade Score with Badge style */}
                  <div className="flex items-center gap-2 mt-4 bg-white/5 border border-white/10 px-3 py-1.5 w-fit rounded">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-mono text-xs text-white font-bold">
                      {edu.grade}
                    </span>
                  </div>

                  {/* Location & Summary */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono mt-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{edu.location}</span>
                  </div>
                  
                  <p className="font-sans text-xs text-gray-500 mt-2.5 leading-relaxed italic">
                    {edu.details}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Custom Aesthetic Barcode Signature - relocated underneath academic credentials */}
            <motion.div 
              className="mt-4 pt-6 border-t border-white/10 flex flex-row items-center justify-between gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Left Side: Barcode and signature label */}
              <div className="flex flex-col gap-1.5 text-left">
                <p className="font-mono text-[8px] text-gray-500 tracking-wider uppercase">// SYS_SIGNATURE_AUTHENTICATION</p>
                {/* Barcode component generated purely in CSS */}
                <div className="flex items-end h-6 bg-transparent gap-[1px]">
                  <div className="w-[2px] h-full bg-[#FF4B00]" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                  <div className="w-[3px] h-full bg-[#FF4B00]" />
                  <div className="w-[1.5px] h-full bg-transparent" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                  <div className="w-[2px] h-full bg-[#FF4B00]" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                  <div className="w-[4px] h-full bg-[#FF4B00]" />
                  <div className="w-[1.5px] h-full bg-transparent" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                  <div className="w-[2px] h-full bg-[#FF4B00]" />
                  <div className="w-[1.5px] h-full bg-[#FF4B00]" />
                  <div className="w-[1px] h-full bg-transparent" />
                  <div className="w-[3px] h-full bg-[#FF4B00]" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                  <div className="w-[1.5px] h-full bg-[#FF4B00]" />
                  <div className="w-[1px] h-full bg-[#FF4B00]" />
                </div>
              </div>

              {/* Right Side: Consolidated metadata and signature branding block */}
              <div className="flex flex-col items-end gap-1 text-right">
                <p className="font-mono text-[8px] text-gray-500 tracking-wider">PORTFOLIO SIGNATURE</p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-white font-bold tracking-widest animate-pulse">VP_ARCHITECT</span>
                  <span className="text-[#FF4B00] font-mono text-[9px] font-bold">[v1.0.1_STABLE]</span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase font-semibold">
                  V. PANDEY // DEHRADUN
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
