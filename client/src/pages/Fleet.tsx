// src/pages/Fleet.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, BadgeDollarSign, ChevronRight } from 'lucide-react';

const Fleet: React.FC = () => {
  const cars = [
    { name: "Porsche 718 Boxster", price: "120", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Mercedes AMG GT", price: "150", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Tesla Model S Plaid", price: "110", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "BMW M4 Competition", price: "135", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Lamborghini Huracán", price: "450", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
  ];

  return (
    <section id="fleet" className="min-h-screen w-full relative z-20 px-6 max-w-7xl mx-auto bg-transparent pt-32 pb-20">
      <div className="flex-shrink-0 mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="bg-[#FF8C00] p-3 rounded-full text-black"><Clock size={20} /></div>
            <h4 className="font-bold text-white text-sm">24/7 Support</h4>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="bg-[#FF8C00] p-3 rounded-full text-black"><ShieldCheck size={20} /></div>
            <h4 className="font-bold text-white text-sm">Flex Cancel</h4>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="bg-[#FF8C00] p-3 rounded-full text-black"><BadgeDollarSign size={20} /></div>
            <h4 className="font-bold text-white text-sm">No Hidden Fees</h4>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Featured <span className="text-[#FF8C00]">Fleet</span>
          </h2>
          {/* Scroll Denoter */}
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-2 text-[#FF8C00] text-xs font-bold uppercase tracking-widest"
          >
            Scroll Right <ChevronRight size={16} />
          </motion.div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar">
          {cars.map((car, i) => (
            <motion.div 
              key={i} 
              className="min-w-[300px] md:min-w-[380px] bg-[#121212]/90 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 snap-center group hover:border-[#FF8C00]/30 transition-all"
            >
              <img src={car.img} alt={car.name} className="w-full h-44 object-contain mb-6 group-hover:scale-110 transition-transform" />
              <p className="text-[#FF8C00] font-black text-2xl">${car.price}<span className="text-gray-500 text-sm font-normal">/day</span></p>
              <h3 className="text-white font-bold text-xl mt-1">{car.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
};

export default Fleet;