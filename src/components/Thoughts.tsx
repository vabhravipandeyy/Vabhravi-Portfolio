import { motion } from "motion/react";
import { ArrowUpRight, Terminal, BookOpen, Clock } from "lucide-react";
import DancingText from "./DancingText";

interface ThoughtPost {
  id: string;
  date: string;
  title: string;
  description: string;
  bgImage: string;
  readTime: string;
  link: string;
}

const thoughtPosts: ThoughtPost[] = [
  {
    id: "thought-1",
    date: "May 5, 2025",
    title: "Building Trust Through Clear Design",
    description: "How thoughtful visual choices, high-density telemetry layout, and deliberate grid structures create a stronger sense of reliability for modern platforms.",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    readTime: "4 MIN READ",
    link: "https://github.com/vabhravipandeyy"
  },
  {
    id: "thought-2",
    date: "Jun 16, 2025",
    title: "The Role of Art Direction in Branding",
    description: "Why premium visual direction, typographic pacing, and cohesive color schemes help software engineers evoke raw emotion and build a distinct point of view.",
    bgImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop",
    readTime: "5 MIN READ",
    link: "https://github.com/vabhravipandeyy"
  }
];

export default function Thoughts() {
  return (
    <section id="thoughts" className="relative px-4 sm:px-8 py-24 bg-gray-950/40 border-t border-white/5 overflow-hidden">
      
      {/* Immersive technical grid background element */}
      <div className="absolute inset-0 tech-dot-grid opacity-[0.05] pointer-events-none" />
      
      {/* Decorative colorful glow spots */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] rounded-full bg-blue-900/5 glow-spot pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-[#FF4B00]/4 glow-spot pointer-events-none" />

      {/* Massive editorial background word "Thoughts" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Thoughts
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-[#FF4B00] tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] animate-pulse" />
              06 / COGNITIVE LOGS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mt-3">
              <DancingText text="Thoughts" />
              <DancingText text="." delayOffset={8} />
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-sm text-left font-light leading-relaxed">
            // Chronicling technical essays, design systems philosophies, and state-of-the-art AI integration blue-prints.
          </p>
        </div>

        {/* Thoughts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {thoughtPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-end aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 bg-gray-900/30 p-6 sm:p-8 hover:border-[#FF4B00]/30 transition-all duration-700 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {/* Black and White Ambient Image Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={post.bgImage} 
                  alt={post.title}
                  className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Card Contents */}
              <div className="relative z-10 flex flex-col gap-3 text-left">
                {/* Meta Row */}
                <div className="flex items-center gap-3 font-mono text-[9px] text-gray-500 tracking-wider">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-[#FF4B00] font-semibold">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#FF4B00] transition-colors duration-350 leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Tiny Hover Scanline Accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4B00]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.a>
          ))}

          {/* Third Card: Editorial Call-to-Action styled card */}
          <motion.div
            className="group relative flex flex-col justify-between aspect-[4/5] rounded-3xl border-none bg-transparent p-6 sm:p-8 transition-all duration-700 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6 }}
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between font-mono text-[9px] text-gray-600 tracking-wider">
              <span>SYS_LOG // READ_MODULE</span>
              <BookOpen className="w-3.5 h-3.5 text-gray-600" />
            </div>

            {/* Main Text Copy */}
            <div className="my-auto pt-6 pb-4">
              <p className="font-serif text-xl sm:text-2xl font-light text-zinc-300 leading-snug tracking-tight">
                See how we shape brands with clarity and craft— <span className="italic text-[#FF4B00] font-normal">explore our works</span>
              </p>
            </div>

            {/* Card Footer action button */}
            <div className="flex items-center justify-between pt-4">
              <motion.a
                href="https://github.com/vabhravipandeyy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 hover:text-white tracking-widest transition-colors duration-300"
              >
                <span>VIEW ALL WORK</span>
                <div className="w-6 h-6 rounded-lg border border-white/5 flex items-center justify-center text-zinc-500 group-hover:border-[#FF4B00]/40 group-hover:text-[#FF4B00] group-hover:bg-[#FF4B00]/5 transition-all duration-300">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </motion.a>
            </div>

            {/* Glowing Accent line */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.005] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
