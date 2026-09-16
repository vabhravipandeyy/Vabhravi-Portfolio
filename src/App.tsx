/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Thoughts from "./components/Thoughts";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ThreeDBackground from "./components/ThreeDBackground";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lock scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  // Dynamic Scroll Progress and Active Section Intersection Tracker
  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Progress Percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // High-precision viewport-focused scroll spy
      const sections = ["home", "about", "experience", "projects", "skills", "certificates", "thoughts", "contact"];
      let currentSection = "home";
      let minDistance = Infinity;
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // We look for the section that occupies the focus point in the upper half of the screen
          const distance = Math.abs(rect.top - window.innerHeight * 0.25);
          
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            currentSection = id;
            break;
          }
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Run once on mount to set initial correct tab
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleExploreClick = () => {
    const element = document.getElementById("projects");
    if (element) {
      setActiveSection("projects");
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#03050c] text-white selection:bg-[#FF4B00]/30 selection:text-[#FF4B00] relative md:cursor-none">
      
      {/* 3D Interactive Background Constellation */}
      {!isLoading && <ThreeDBackground />}

      {/* Animated custom mouse cursor */}
      <CustomCursor />
      
      {/* Animated premium high-tech barcode loading screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {/* Sleek dynamic page scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-[#FF4B00] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Decorative vertical coordinates and branding watermark on page margins */}
      <div className="fixed right-5 bottom-12 z-30 font-mono text-[9px] text-gray-500 hidden xl:flex items-center gap-4 origin-right rotate-90 -translate-y-16">
        <span>VP_ARCHITECT // [v1.0.1_STABLE] // V. PANDEY // DEHRADUN</span>
        <span className="w-10 h-[1px] bg-gray-800" />
        <span>AVAILABLE_FOR_WORK</span>
      </div>

      {/* Premium Header */}
      {!isLoading && (
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      )}

      {/* Content Sections with Cinematic Page Reveal */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <main className="flex flex-col">
              <Hero onExploreClick={handleExploreClick} />
              
              <About />
              
              <Experience />
              
              <Projects />
              
              <Skills />
              
              <Certificates />
              
              <Thoughts />
              
              <Contact />
            </main>

            {/* Custom Interactive Footer requested by user */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
