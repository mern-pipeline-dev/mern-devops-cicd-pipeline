import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ContinuousBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden pointer-events-none">
      {/* Technologic Grid Base */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:50px_50px]" 
      />
      
      {/* Animated Light Trails */}
      <motion.div
        animate={{ x: ['-100%', '250%'], opacity: [0, 0.7, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent rotate-[20deg] blur-[1px]"
      />
      
      <motion.div
        animate={{ x: ['250%', '-100%'], opacity: [0, 0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent -rotate-[15deg] blur-[1px]"
      />

      {/* Global Glowing Depth Spots */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#FF8C00] rounded-full blur-[200px] opacity-[0.12]" />
      <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-[#00BFFF] rounded-full blur-[200px] opacity-[0.08]" />
    </div>
  );
};

export default ContinuousBackground;