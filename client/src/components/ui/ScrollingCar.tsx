// src/components/ui/ScrollingCar.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollingCar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Appears after the first section and moves across the screen
  const x = useTransform(scrollYProgress, [0.15, 0.4], ['-100%', '100%']);
  const opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);

  return (
    <div className="fixed top-[40%] left-0 w-full pointer-events-none z-40">
      <motion.img
        style={{ x, opacity }}
        // Using a high-quality transparent car image from a link as requested
        src="https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png"
        alt="Scrolling Sports Car"
        className="w-[500px] md:w-[800px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};

export default ScrollingCar;