import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiTesla, SiMercedes, SiBmw, SiPorsche, SiLamborghini } from 'react-icons/si';

const Home = () => {
  const { scrollYProgress } = useScroll();
  
  // Transition: Content slides up slightly as the next section arrives
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="h-screen w-full flex flex-col justify-between relative z-20 px-6 max-w-7xl mx-auto overflow-hidden pb-6 pt-10">
      
      {/* 1. TOP SECTION: Topic and Main Action */}
      <motion.div style={{ y, opacity }} className="flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-8xl font-black uppercase text-white tracking-tighter leading-[0.85]">
              Premium Car <br /> 
              <span className="text-[#FF8C00] drop-shadow-[0_0_30px_rgba(255,140,0,0.3)]">Rental</span>
            </h1>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Experience the pleasure of driving the best high-tech, premium cars from around the world. Seamless and fast.
            </p>
            <div className="pt-2">
              <button className="bg-[#FF8C00] text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(255,140,0,0.2)] hover:bg-white transition-all active:scale-95">
                BROWSE FLEET
              </button>
            </div>
          </div>

          {/* Mazda Image with Integrated Glow */}
          <div className="hidden lg:flex justify-end relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF8C00]/5 blur-[120px] rounded-full" />
            <img 
              src="https://www.mazda.com.au/globalassets/mazda-3-sedan-transparent.png" 
              alt="Mazda 3 Premium" 
              className="w-full max-w-xl relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] object-contain"
            />
          </div>
        </div>
      </motion.div>

      {/* 2. BOTTOM SECTION: Fleet Logos (Pinned to bottom of view) */}
      <motion.div style={{ y, opacity }} className="w-full pt-6 border-t border-white/5">
        <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px] mb-4">World Class Fleet</p>
        <div className="flex flex-wrap items-center gap-10 md:gap-20 opacity-100 text-white">
          <SiPorsche size={36} className="hover:text-[#FF8C00] transition-colors cursor-pointer" /> 
          <SiMercedes size={40} className="hover:text-[#FF8C00] transition-colors cursor-pointer" /> 
          <SiTesla size={30} className="hover:text-[#FF8C00] transition-colors cursor-pointer" /> 
          <SiBmw size={40} className="hover:text-[#FF8C00] transition-colors cursor-pointer" /> 
          <SiLamborghini size={40} className="hover:text-[#FF8C00] transition-colors cursor-pointer" />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;