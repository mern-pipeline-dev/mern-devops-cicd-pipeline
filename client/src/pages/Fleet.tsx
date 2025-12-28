import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const Fleet: React.FC = () => {
  // Expanded fleet to 6 cars
  const cars = [
    { name: "Porsche 718 Boxster", price: "120", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Mercedes AMG GT", price: "150", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Tesla Model S Plaid", price: "110", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "BMW M4 Competition", price: "135", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Lamborghini Huracán", price: "450", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Porsche 911 Carrera", price: "180", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" }
  ];

  return (
    <section className="h-screen w-full relative z-20 px-6 max-w-7xl mx-auto snap-start overflow-hidden">
      {/* pt-32 ensures content is pushed down enough to clear the Navbar */}
      <div className="h-full flex flex-col pt-32 pb-10">
        
        {/* Top Section: Why Choose Us */}
        <div className="flex-shrink-0 mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase">Why Choose Us?</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FF8C00] p-3 rounded-full text-black flex-shrink-0"><Clock size={24} /></div>
              <h4 className="font-bold text-white text-sm md:text-base">24/7 Support</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#FF8C00] p-3 rounded-full text-black flex-shrink-0"><ShieldCheck size={24} /></div>
              <h4 className="font-bold text-white text-sm md:text-base">Flex Cancel</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#FF8C00] p-3 rounded-full text-black flex-shrink-0"><BadgeDollarSign size={24} /></div>
              <h4 className="font-bold text-white text-sm md:text-base">No Hidden Fees</h4>
            </div>
          </div>
        </div>

        {/* Bottom Section: Horizontal Scrolling Fleet */}
        <div className="flex-1 flex flex-col min-h-0">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">
            Featured <span className="text-[#FF8C00]">Fleet</span>
          </h2>
          
          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {cars.map((car, i) => (
              <motion.div 
                key={i} 
                // Animation: Cards slide in from the right and fade in one by one
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1, 
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="min-w-[300px] md:min-w-[380px] bg-[#121212] rounded-[2.5rem] p-8 border border-white/5 snap-center group hover:border-[#FF8C00]/30 transition-all flex flex-col justify-between"
              >
                <div className="flex-1 flex items-center justify-center mb-6">
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    src={car.img} 
                    alt={car.name} 
                    className="w-full h-44 object-contain transition-transform duration-500" 
                  />
                </div>
                <div>
                  <p className="text-[#FF8C00] font-black text-2xl">
                    ${car.price}
                    <span className="text-gray-500 text-sm font-normal">/day</span>
                  </p>
                  <h3 className="text-white font-bold text-xl mt-1">{car.name}</h3>
                  <div className="flex gap-4 text-gray-500 text-xs mt-4 pt-4 border-t border-white/5">
                    <span>⛽ Petrol</span>
                    <span>👤 2 Seats</span>
                    <span>⚙️ Auto</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility for the horizontal container */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default Fleet;