// src/components/layout/SectionWrapper.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Items move upwards smoothly as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-6 relative">
      <motion.div style={{ y, opacity }} className="h-full w-full max-w-7xl mx-auto">
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;