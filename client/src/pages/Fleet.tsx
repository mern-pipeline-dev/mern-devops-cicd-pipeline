import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const Fleet = () => {
  const cards = [
    { name: "Porsche 718 Boxster", price: "120", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Porsche 718 Cayman", price: "120", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" },
    { name: "Porsche 911 Carrera", price: "120", img: "https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" }
  ];

  return (
    <section className="min-h-screen py-20 px-6 max-w-7xl mx-auto relative z-20">
      <div className="grid md:grid-cols-3 gap-8 mb-24 text-white">
        {[ { icon: <Clock />, label: "24/7 Support" }, { icon: <ShieldCheck />, label: "Flex Cancellations" }, { icon: <BadgeDollarSign />, label: "No Hidden Fees" }].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="bg-[#FF8C00] p-3 rounded-full text-black">{item.icon}</div>
            <h4 className="font-bold">{item.label}</h4>
          </div>
        ))}
      </div>

      <h2 className="text-4xl font-black text-white mb-12 uppercase tracking-tighter">Featured <span className="text-[#FF8C00]">Fleet</span></h2>
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((car, i) => (
          <motion.div key={i} whileInView={{ y: [50, 0], opacity: [0, 1] }} className="bg-[#121212] rounded-3xl p-6 border border-white/5 group">
            <img src={car.img} alt={car.name} className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-white font-bold text-lg mt-4">{car.name}</h3>
            <p className="text-[#FF8C00] font-black text-xl mt-2">${car.price}<span className="text-gray-500 text-xs">/day</span></p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Fleet;