import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto bg-transparent">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
        <div className="w-5 h-5 bg-brand-orange rounded-sm"></div>
        <span>Unique<span className="text-brand-orange">Drive</span></span>
      </Link>
      
      <div className="hidden md:flex items-center gap-10 text-gray-400 font-medium">
        <Link to="/about" className="hover:text-white transition">About Us</Link>
        <Link to="/cars" className="hover:text-white transition">Cars</Link>
        <Link to="/prices" className="hover:text-white transition">Prices</Link>
        <Link to="/help" className="hover:text-white transition">Help</Link>
      </div>

      <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer">
        Download App
      </button>
    </nav>
  );
};