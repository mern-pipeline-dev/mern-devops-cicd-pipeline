// src/pages/Fleet.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, BadgeDollarSign, ChevronRight } from 'lucide-react';

import focusImg from '../assets/focus.jpg';
import mazdaImg from '../assets/mazda.jpg';
import rangeroverImg from '../assets/rangerover.jpg';
import vezelImg from '../assets/vezel.jpg';


const Fleet: React.FC = () => {
  // Prices updated to realistic LKR daily rates
  const cars = [
    { name: "Ford Focus Hatchback", price: 18000, img: focusImg },
    { name: "Mazda CX-5", price: 25000, img: mazdaImg },
    { name: "Range Rover Sport", price: 85000, img: rangeroverImg },
    { name: "Honda Vezel", price: 15500, img: vezelImg },
    { name: "Ford Focus Hatchback", price: 18000, img: focusImg }, 
  ];

  // Helper to format as LKR
  const formatLKR = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(amount).replace('LKR', 'Rs.'); // Swapping code for standard Rs. symbol
  };

  return (
    <section id="fleet" className="min-h-screen w-full relative z-20 px-6 max-w-7xl mx-auto bg-transparent pt-32 pb-20">
      {/* Why Choose Us Section */}
      <div className="flex-shrink-0 mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tighter">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="bg-brand-orange p-3 rounded-full text-black"><Clock size={20} /></div>
            <h4 className="font-bold text-white text-sm">24/7 Support</h4>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="bg-brand-orange p-3 rounded-full text-black"><ShieldCheck size={20} /></div>
            <h4 className="font-bold text-white text-sm">Safety Check</h4>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="bg-brand-orange p-3 rounded-full text-black"><BadgeDollarSign size={20} /></div>
            <h4 className="font-bold text-white text-sm">No Hidden Fees</h4>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Featured <span className="text-brand-orange">Fleet</span>
          </h2>
          
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest"
          >
            Scroll Right <ChevronRight size={16} />
          </motion.div>
        </div>
        
        {/* Car Cards Container */}
        <div className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar">
          {cars.map((car, i) => (
            <motion.div 
              key={i} 
              className="min-w-[300px] md:min-w-[380px] bg-[#121212]/90 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 snap-center group hover:border-brand-orange/30 transition-all"
            >
              <img src={car.img} alt={car.name} className="w-full h-44 object-contain mb-6 group-hover:scale-105 transition-transform duration-500" />
              
              {/* Updated Price Display */}
              <p className="text-brand-orange font-black text-2xl">
                {formatLKR(car.price)}
                <span className="text-gray-500 text-sm font-normal ml-1">/day</span>
              </p>
              
              <h3 className="text-white font-bold text-xl mt-1">{car.name}</h3>
              
              <button className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-brand-orange hover:text-black hover:border-brand-orange transition-all duration-300">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hide Scrollbar Style */}
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
};

export default Fleet;