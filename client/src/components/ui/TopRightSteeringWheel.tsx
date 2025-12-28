import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TopRightSteeringWheel = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2000], [0, 360]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    ["rgba(255, 140, 0, 0)", "rgba(255, 140, 0, 0.25)", "rgba(0, 191, 255, 0.25)"]
  );

  return (
    <motion.div 
      style={{ backgroundColor }}
      className="fixed top-6 right-6 z-[60] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md"
    >
      <motion.svg 
        style={{ rotate }}
        viewBox="0 0 100 100" 
        className="w-10 h-10 md:w-12 md:h-12 fill-none stroke-[#FF8C00]"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="8" fill="#FF8C00" />
        <path d="M50 50 L50 95 M50 50 L10 50 M50 50 L90 50" />
      </motion.svg>
    </motion.div>
  );
};

export default TopRightSteeringWheel;