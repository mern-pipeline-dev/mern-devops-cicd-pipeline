import React from 'react';
import { motion } from 'framer-motion';

const Booking = () => {
  return (
    <section className="min-h-screen flex items-center px-6 max-w-7xl mx-auto">
      <motion.div initial={{ y: 100 }} whileInView={{ y: 0 }} className="bg-[#121212] w-full p-16 rounded-[3rem] border border-gray-800 text-center">
        <h2 className="text-5xl font-black mb-6">READY TO <span className="text-[#FF8C00]">DRIVE?</span></h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">Secure your premium rental in under 60 seconds with our seamless booking system.</p>
        <button className="bg-[#00BFFF] text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">Book Now</button>
      </motion.div>
    </section>
  );
};

export default Booking;