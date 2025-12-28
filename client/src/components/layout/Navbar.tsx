// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Navbar: React.FC = () => {
//   return (
//     <nav className="flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto bg-transparent">
//       <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
//         <div className="w-5 h-5 bg-brand-orange rounded-sm"></div>
//         <span>Unique<span className="text-brand-orange">Drive</span></span>
//       </Link>
      
//       <div className="hidden md:flex items-center gap-10 text-gray-400 font-medium">
//         <Link to="/about" className="hover:text-white transition">About Us</Link>
//         <Link to="/cars" className="hover:text-white transition">Cars</Link>
//         <Link to="/prices" className="hover:text-white transition">Prices</Link>
//         <Link to="/help" className="hover:text-white transition">Help</Link>
//       </div>

//       <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer">
//         Download App
//       </button>
//     </nav>
//   );
// };



import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Fleet', href: '#' },
    { name: 'Booking', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-[#FF8C00] text-black font-black p-2 rounded-lg transition-transform group-hover:rotate-12">
          V
        </div>
        <span className="font-black text-xl tracking-tighter text-white">
          VoltDrive
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-10 items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                link.name === 'Home' 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-[#FF8C00]'
              }`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="hidden md:block">
        <button className="bg-[#FF8C00] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95">
          Download App
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-6 right-6 bg-[#121212] border border-gray-800 p-6 rounded-2xl flex flex-col gap-6 md:hidden shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-400 font-bold uppercase tracking-widest hover:text-[#FF8C00]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-[#FF8C00] text-black w-full py-4 rounded-xl font-black uppercase tracking-widest">
            Download App
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;