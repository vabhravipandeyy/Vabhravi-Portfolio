import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { personalInfo } from "../data";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live real-time clock for Chennai (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeStr = now.toLocaleTimeString("en-US", options);
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "projects", label: "PROJECTS" },
    { id: "skills", label: "STACK" },
    { id: "certificates", label: "AWARDS & CERTS" },
    { id: "thoughts", label: "THOUGHTS" },
    { id: "contact", label: "CONTACT" }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/85 backdrop-blur-md px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo - SG */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection("home")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border border-white/90 px-2.5 py-1 font-serif text-xl font-bold tracking-tight text-white transition-all duration-300 group-hover:bg-white group-hover:text-gray-950 group-hover:border-transparent">
            VP
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-widest text-[#FF4B00] font-semibold">
              AI_ENGINEER
            </span>
            <span className="font-sans text-[11px] font-medium tracking-wider text-gray-400 group-hover:text-white transition-colors">
              PORTFOLIO
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative font-mono text-xs tracking-widest font-medium py-1 transition-colors hover:text-white ${
                activeSection === item.id ? "text-white" : "text-gray-400"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF4B00] shadow-[0_0_10px_#FF4B00] z-10"
                  layoutId="activeNavIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Info Area (Clock & CTA Button) */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs">
          {/* Location & Time Info */}
          <motion.div 
            className="flex flex-col items-end text-[10px] tracking-wider text-gray-400 border-r border-white/10 pr-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-gray-500 uppercase">DEHRADUN, INDIA</span>
            <span className="text-[#FF4B00] font-medium font-mono">{currentTime || "01:16 AM IST"} (IST)</span>
          </motion.div>

          {/* Contact Me CTA */}
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 font-mono text-[11px] tracking-widest text-white transition-all duration-300 hover:border-[#FF4B00] hover:text-[#FF4B00]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CONTACT ME
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* User Status Breathing Point */}
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 bg-white/5 px-2.5 py-1 rounded">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            ONLINE
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          className="lg:hidden absolute top-full left-0 w-full bg-gray-950/95 border-b border-white/5 py-6 px-6 flex flex-col gap-4 shadow-xl backdrop-blur-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left font-mono text-sm tracking-widest font-medium py-2 border-b border-white/5 transition-colors ${
                  activeSection === item.id ? "text-[#FF4B00]" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-gray-400">
            <div>
              <p className="text-[10px] text-gray-500 uppercase">CURRENT TIME</p>
              <p className="text-white text-sm mt-0.5">{currentTime || "01:16 AM IST"}</p>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="border border-[#FF4B00] text-[#FF4B00] px-4 py-2 text-[11px] tracking-widest hover:bg-[#FF4B00] hover:text-white transition-colors"
            >
              HIRE VABHRAVI
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
