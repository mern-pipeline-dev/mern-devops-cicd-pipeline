import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Items move up (y) and fade out (opacity) as they exit the viewport
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className="min-h-screen relative z-10 py-20"
    >
      {children}
    </motion.section>
  );
};