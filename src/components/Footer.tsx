export default function Footer() {
  return (
    <footer className="w-full bg-[#030712] border-t border-white/5 py-8 px-4 sm:px-8 relative overflow-hidden">
      {/* Blueprint Grid Overlay background */}
      <div className="absolute inset-0 tech-dot-grid opacity-10 pointer-events-none" />

      {/* Tiny subtle footer metadata line */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-left gap-4 relative z-10">
        <p className="font-mono text-[9px] text-gray-600 tracking-wider">
          VP_PORTFOLIO_SYSTEM_MAIN_SHEET_REF://2026_STABLE
        </p>
        <p className="font-mono text-[9px] text-gray-[#FF4B00]/70 tracking-wider font-semibold">
          VABHRAVI PANDEY // PORTFOLIO © 2026
        </p>
        <p className="font-mono text-[9px] text-gray-600 tracking-wider">
          DIT UNIVERSITY // B.TECH CSE (AI & ML)
        </p>
      </div>
    </footer>
  );
}
