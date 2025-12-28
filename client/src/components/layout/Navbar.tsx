// Navbar.tsx
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
    // 'fixed top-0 left-0 w-full' keeps the navbar at the top of the browser window
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md px-6 py-6 flex justify-between items-center max-w-7xl mx-auto right-0">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-[#FF8C00] text-black font-black p-2 rounded-lg transition-transform group-hover:rotate-12">
          V
        </div>
        <span className="font-black text-xl tracking-tighter text-white">
          VoltDrive
        </span>
      </div>

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

      <div className="hidden md:block">
        <button className="bg-[#FF8C00] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95">
          Download App
        </button>
      </div>

      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-6 right-6 bg-[#121212] border border-gray-800 p-6 rounded-2xl flex flex-col gap-6 md:hidden shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 font-bold uppercase tracking-widest hover:text-[#FF8C00]" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;