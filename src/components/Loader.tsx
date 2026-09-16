import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThreeDLoaderAnimation from "./ThreeDLoaderAnimation";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const logs = [
    "INITIALIZING CORES...",
    "CONNECTING TO DIT_UNIVERSITY ARCHIVES...",
    "LOADING SPECIALIZATION [AI & ML]... OK",
    "DEPLOYING FASTAPI & GEOSPATIAL ENGINE...",
    "BOOTING RAG SEARCH (FAISS INDEXER)... OK",
    "VERIFYING GST_FRAUD RISK PIPELINE...",
    "SECURING SERVERLESS AWS NODES...",
    "FETCHING VABHRAVI PANDEY // PORTFOLIO..."
  ];

  useEffect(() => {
    // Progress increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    // Fast terminal log cycles
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    // Trigger complete callback when progress is 100%
    const timeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Generate unique barcode widths to make it look premium and real
  const barcodeBars = [
    3, 1, 4, 2, 1, 3, 1, 5, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 4, 1, 2, 5, 1, 3
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-[#030712] z-50 flex flex-col items-center justify-center tech-dot-grid overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(8px)",
        transition: { duration: 0.6, ease: "easeInOut" } 
      }}
    >
      {/* 3D Holographic Particle Core using Three.js */}
      <ThreeDLoaderAnimation progress={progress} />

      {/* Corner engineering marks for the structural look */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-gray-700 tracking-widest">+ SYSTEM_BOOT</div>
      <div className="absolute top-6 right-6 font-mono text-[9px] text-gray-700 tracking-widest">STABLE_V1.0.1 // (76)</div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-gray-700 tracking-widest">+ VABHRAVI_PANDEY</div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-gray-700 tracking-widest">PORT_3000 // IN</div>

      <div className="relative flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        {/* Futuristic SVG HUD Dial */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center mb-6">
          {/* Outer rotating dashed ring */}
          <svg className="absolute w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#FF4B00" 
              strokeWidth="0.5" 
              strokeDasharray="4, 6" 
              opacity="0.4"
            />
          </svg>

          {/* Middle rotating ticks ring */}
          <svg className="absolute w-[86%] h-[86%] animate-[spin_8s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#00E5FF" 
              strokeWidth="1.2" 
              strokeDasharray="1, 8" 
              opacity="0.6"
            />
          </svg>

          {/* Inner solid border ring with crosshair dots */}
          <div className="absolute w-[72%] h-[72%] rounded-full border border-white/10 flex items-center justify-center bg-gray-950/20 backdrop-blur-[2px]">
            {/* Top crosshair dot */}
            <div className="absolute top-0 w-1 h-1 bg-[#FF4B00] rounded-full -translate-y-1/2" />
            {/* Bottom crosshair dot */}
            <div className="absolute bottom-0 w-1 h-1 bg-[#FF4B00] rounded-full translate-y-1/2" />
            
            {/* The actual percentage display inside */}
            <div className="flex flex-col items-center justify-center">
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#FF4B00]/70 uppercase font-bold mb-1">
                BOOT
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wider flex items-baseline">
                {progress}
                <span className="font-mono text-sm text-[#FF4B00] ml-0.5">%</span>
              </h1>
              <span className="font-mono text-[7px] text-gray-500 tracking-widest mt-1">
                SYS_LNK // 76
              </span>
            </div>
          </div>
        </div>

        {/* Live fast scrolling terminal logs at the bottom */}
        <div className="h-6 flex flex-col items-center justify-center font-mono">
          <p className="text-[10px] sm:text-xs tracking-wider text-gray-400 font-medium">
            &gt;&gt;&nbsp;<span className="text-[#FF4B00] font-semibold">{logs[logIndex]}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
