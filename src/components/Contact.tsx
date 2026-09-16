import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { personalInfo } from "../data";
import { ArrowUpRight, Send, Mail, Phone, MapPin, Check } from "lucide-react";
import DancingText from "./DancingText";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      let success = false;

      // Type asserting personalInfo to access dynamic fields safely
      const info = personalInfo as any;

      if (info.googleSheetUrl) {
        // Send to Google Sheets (Google Apps Script Web App URL)
        const response = await fetch(info.googleSheetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        if (response.ok) {
          success = true;
        }
      } else if (info.web3formsKey) {
        // Send to Web3Forms (direct email)
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: info.web3formsKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.name}`,
            from_name: "Portfolio Node Agent",
          }),
        });
        const result = await response.json();
        if (result.success) {
          success = true;
        }
      } else {
        // Fallback: Simulation mode
        console.warn("Forms submission: No endpoint configured. Simulating success. Please add web3formsKey or googleSheetUrl in src/data.ts");
        await new Promise((resolve) => setTimeout(resolve, 1200));
        success = true;
      }

      if (success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 6000);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 sm:px-[10vw] py-24 bg-zinc-950/40 border-t border-zinc-900 overflow-hidden">
      
      {/* Dynamic Concentric Circular Waves / Radar Pattern Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 w-[180%] h-[180%] text-white" 
          fill="none" 
          viewBox="0 0 1000 1000"
          stroke="currentColor" 
          strokeWidth="0.75"
        >
          <circle cx="500" cy="500" r="120" strokeDasharray="3 3" />
          <circle cx="500" cy="500" r="220" />
          <circle cx="500" cy="500" r="320" strokeDasharray="6 6" />
          <circle cx="500" cy="500" r="420" />
          <circle cx="500" cy="500" r="520" />
          <circle cx="500" cy="500" r="620" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="720" />
          <circle cx="500" cy="500" r="820" />
          <circle cx="500" cy="500" r="920" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* Decorative colored glow highlights */}
      <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] rounded-full bg-blue-900/5 glow-spot pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#FF4B00]/4 glow-spot pointer-events-none" />

      {/* Massive editorial background word "Contact" */}
      <div className="absolute top-[3%] sm:top-[6%] left-[6%] md:left-[10%] select-none pointer-events-none z-0 text-left">
        <h2 className="font-serif text-[11vw] font-bold leading-none text-[#FF4B00]/5 tracking-tighter">
          Contact
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Let's build something rare */}
          <div className="lg:col-span-6 text-left flex flex-col justify-between h-full gap-12">
            <div>
              {/* Modern Segment/Page label with orange bullet */}
              <div className="flex items-center gap-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-zinc-500 tracking-[0.3em] uppercase font-bold">
                  07 — LET'S TALK
                </span>
              </div>

              {/* Big, elegant typography headliner */}
              <h2 className="font-serif text-5xl sm:text-7xl font-light text-zinc-100 tracking-tight leading-[1.05] mb-6">
                <DancingText text="Let's orchestrate" /><br />
                <DancingText text="the" />{" "}
                <DancingText text="unthinkable." className="italic font-normal text-[#FF4B00] font-serif" delayOffset={17} hoverColor="#white" />
              </h2>
              
              <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
                Fusing rigorous full-stack system architecture with deep neural reasoning capabilities to compile production-grade, tactile software.
              </p>

              {/* Bento-style email transceiver capsule */}
              <motion.div 
                className="relative bg-[#0d0f19]/35 border border-zinc-850 rounded-2xl p-6 hover:border-[#FF4B00]/40 hover:bg-[#0d0f19]/60 transition-all duration-500 group overflow-hidden max-w-lg mb-10 cursor-pointer"
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => window.open(`mailto:${personalInfo.email}`)}
              >
                {/* Animated scanline inside the card */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF4B00]/40 to-transparent group-hover:translate-y-32 transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] text-[#FF4B00] tracking-widest font-black uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LINK_ESTABLISHED // COMM_LINE
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                    SECURE_PORT_3000
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-lg sm:text-2xl font-light text-zinc-200 group-hover:text-white transition-colors duration-300 select-all">
                    {personalInfo.email}
                  </span>
                  <div className="w-9 h-9 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-[#FF4B00]/40 group-hover:text-[#FF4B00] group-hover:bg-[#FF4B00]/5 transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section: Socials and Resume Link */}
            <div>
              <span className="font-mono text-[9px] text-zinc-500 font-black tracking-widest uppercase block mb-4">
                // EXTERNAL TERMINAL LINKS
              </span>
              
              {/* Dynamic Grid of Micro-Terminal Social Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-lg">
                <motion.a 
                  href={personalInfo.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between border border-zinc-900 bg-[#060810]/40 backdrop-blur-sm px-4 py-3 rounded-xl font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white hover:border-[#FF4B00]/30 hover:bg-[#FF4B00]/5 transition-all duration-300 group/soc shadow-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>[LN] LINKEDIN</span>
                  <span className="text-zinc-600 group-hover/soc:text-[#FF4B00] transition-colors">↗</span>
                </motion.a>
                <motion.a 
                  href={personalInfo.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between border border-zinc-900 bg-[#060810]/40 backdrop-blur-sm px-4 py-3 rounded-xl font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white hover:border-[#FF4B00]/30 hover:bg-[#FF4B00]/5 transition-all duration-300 group/soc shadow-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>[GH] GITHUB</span>
                  <span className="text-zinc-600 group-hover/soc:text-[#FF4B00] transition-colors">↗</span>
                </motion.a>
                <motion.a 
                  href={personalInfo.socials.leetcode} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between border border-zinc-900 bg-[#060810]/40 backdrop-blur-sm px-4 py-3 rounded-xl font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white hover:border-[#FF4B00]/30 hover:bg-[#FF4B00]/5 transition-all duration-300 group/soc shadow-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>[LC] LEETCODE</span>
                  <span className="text-zinc-600 group-hover/soc:text-[#FF4B00] transition-colors">↗</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form & Resume Download */}
          <div className="lg:col-span-6 relative w-full pt-12 lg:pt-0 flex flex-col gap-6">
            
            {/* Giant Faded background word "Hello" */}
            <div className="absolute -top-10 right-0 select-none pointer-events-none z-0">
              <span className="font-serif text-[18vw] lg:text-[13vw] font-bold text-zinc-900/[0.08] leading-none tracking-tighter block select-none">
                Hello
              </span>
            </div>

            <div className="relative z-10 w-full border border-zinc-900/80 bg-[#040612]/30 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
              {/* Top status indicator header for form */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.25em] font-extrabold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] animate-ping" />
                  SECURE TRANSMISSION NODE
                </span>
                <span className="font-mono text-[9px] text-zinc-600">ID: VP_RECV_01</span>
              </div>

              {submitStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-pulse">
                    <Check className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 tracking-[0.25em] uppercase font-bold mb-2">
                    // BROADCAST_SUCCESSFUL
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-4">
                    Transmission Delivered.
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed font-light">
                    Your parameters have been serialized and piped to Vabhravi Pandey. A handshake will initiate shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2 relative group">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase font-extrabold group-focus-within:text-[#FF4B00] transition-colors">
                      [01] // COGNIZANT_IDENTIFIER
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your name or agency"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-800 pb-4 pt-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-700 focus:outline-none transition-all duration-300 font-sans"
                      required
                    />
                    {/* Glowing, sliding animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF4B00] group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_8px_#FF4B00]" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 relative group">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase font-extrabold group-focus-within:text-[#FF4B00] transition-colors">
                      [02] // INTERNET_PROTOCOL_MAIL
                    </span>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-800 pb-4 pt-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-700 focus:outline-none transition-all duration-300 font-sans"
                      required
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF4B00] group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_8px_#FF4B00]" />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2 relative group">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase font-extrabold group-focus-within:text-[#FF4B00] transition-colors">
                      [03] // INQUIRY_PARAMETER_STRING
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Type query sequence..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-800 pb-4 pt-1 text-sm sm:text-base text-zinc-100 placeholder-zinc-700 focus:outline-none transition-all duration-300 resize-none font-sans"
                      required
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF4B00] group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_8px_#FF4B00]" />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex flex-col gap-3">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#FF4B00] hover:bg-[#ff5d1a] disabled:bg-[#FF4B00]/40 text-white font-mono text-xs tracking-widest font-extrabold flex items-center justify-center gap-3 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-[#FF4B00]/10 w-full sm:w-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? "TRANSMITTING..." : "BROADCAST SIGNAL"}
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </motion.button>

                    {submitStatus === "error" && (
                      <span className="font-mono text-[10px] text-red-500 tracking-wider">
                        // ERROR: Connection failed. Please check network or configuration.
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Download Resume Button Element */}
            <motion.button 
              onClick={() => window.open(personalInfo.resumeUrl, "_blank")}
              className="relative z-10 w-full bg-[#0d0f19]/40 border border-zinc-900 hover:border-[#FF4B00]/40 rounded-2xl p-5 flex items-center justify-between group overflow-hidden transition-all duration-300 shadow-xl"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Pulsating corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4B00]/5 rounded-full blur-2xl group-hover:bg-[#FF4B00]/10 transition-colors pointer-events-none" />
              
              {/* Scanning neon line */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF4B00]/60 to-transparent group-hover:translate-y-14 transition-transform duration-700 ease-in-out pointer-events-none" />

              <div className="flex items-center gap-4 text-left">
                {/* Visual indicator orb */}
                <div className="w-10 h-10 rounded-xl bg-[#FF4B00]/10 border border-[#FF4B00]/20 flex items-center justify-center text-[#FF4B00] group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-[#FF4B00] tracking-[0.25em] font-extrabold uppercase">
                    SYS_FILE_ACCESS // LOCAL_RESOURCES
                  </span>
                  <span className="font-serif text-base sm:text-lg text-zinc-100 group-hover:text-white font-medium transition-colors">
                    DOWNLOAD RESUME
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="font-mono text-[9px] text-zinc-500 border border-zinc-900 group-hover:border-[#FF4B00]/30 group-hover:text-zinc-200 bg-black/40 px-3 py-1.5 rounded-lg transition-all duration-300">
                PDF // 164 KB
              </div>
            </motion.button>

          </div>

        </div>

      </div>
    </section>
  );
}
