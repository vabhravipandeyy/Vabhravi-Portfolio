import { motion } from "motion/react";

interface DancingTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
  hoverColor?: string;
}

const letterVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: [0, -3, 0],
    transition: {
      opacity: { duration: 0.5, delay: 0.05 + i * 0.015 },
      y: {
        repeat: Infinity,
        duration: 2.8,
        ease: "easeInOut",
        delay: i * 0.06,
      }
    }
  }),
  hover: (hoverColor: string) => ({
    y: -6,
    scale: 1.12,
    color: hoverColor,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  })
};

export default function DancingText({ text, className = "", delayOffset = 0, hoverColor = "#FF4B00" }: DancingTextProps) {
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        const chars = Array.from(word);
        
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {chars.map((char, charIndex) => {
              const currentIdx = globalCharIndex++;
              
              return (
                <motion.span
                  key={charIndex}
                  custom={currentIdx + delayOffset}
                  variants={letterVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover={() => letterVariants.hover(hoverColor)}
                  viewport={{ once: true, margin: "-40px" }}
                  className="inline-block cursor-default select-none origin-bottom"
                >
                  {char}
                </motion.span>
              );
            })}
            {/* Render space between words */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block select-none">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
