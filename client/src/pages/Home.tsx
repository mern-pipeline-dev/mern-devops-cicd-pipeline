import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// npm install react-icons
import { SiToyota, SiSuzuki, SiHonda, SiNissan, SiMitsubishi } from 'react-icons/si';
import { useScrollContainer } from '../context/ScrollContext';

/**
 * HOME COMPONENT (Refactored)
 * Removed: HomeProps interface and 'container' prop.
 * Added: useScrollContainer hook for clean Context access.
 */
const Home: React.FC = () => {
  // Access the scroll container ref from Context
  const containerRef = useScrollContainer();

  // Use the context ref for Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Transformation values based on scroll position
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const brands = [
    { name: "Toyota", Icon: SiToyota },
    { name: "Suzuki", Icon: SiSuzuki },
    { name: "Honda", Icon: SiHonda },
    { name: "Nissan", Icon: SiNissan },
    { name: "Mitsubishi", Icon: SiMitsubishi }
  ];

  return (
    <section className="h-screen w-full snap-start flex flex-col justify-between px-6 max-w-7xl mx-auto relative z-20 pb-10 pt-24 overflow-hidden">
      <motion.div style={{ y, opacity }} className="grid lg:grid-cols-2 gap-10 flex-grow items-center">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase text-white tracking-tighter leading-[0.85]">
            Premium Car <br /> <span className="text-[#FF8C00]">Rental</span>
          </h1>
          <p className="text-gray-400 text-sm lg:text-base max-w-md leading-relaxed">
            Experience the pleasure of driving the best high-tech premium cars in Sri Lanka.
          </p>
          <div className="pt-2">
            <button className="bg-[#FF8C00] text-black px-10 py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-white transition-all">
              BROWSE FLEET
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-end relative">
          <img 
            src="https://www.mazda.com.au/globalassets/mazda-3-sedan-transparent.png" 
            alt="Mazda 3" 
            className="w-full max-w-xl relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain"
          />
        </div>
      </motion.div>

      {/* Sri Lankan Brand Logos */}
      <motion.div style={{ y, opacity }} className="w-full pt-6 border-t border-white/5">
        <p className="text-gray-500 uppercase tracking-widest font-bold text-[9px] mb-6">Famous Brands in Sri Lanka</p>
        <div className="flex justify-between items-center opacity-100 text-white">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-2 group cursor-pointer">
              <brand.Icon size={30} className="group-hover:text-[#FF8C00] transition-colors" />
              <span className="text-[10px] font-black tracking-widest uppercase group-hover:text-[#FF8C00] transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Home;