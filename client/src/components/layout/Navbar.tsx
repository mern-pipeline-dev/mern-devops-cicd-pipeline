// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Booking', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-md px-6 py-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-[#FF8C00] text-black font-black p-2 rounded-lg transition-transform group-hover:rotate-12">
            V
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase">
            VoltDrive
          </span>
        </div>

        <ul className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#FF8C00] transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 pr-4 border-r border-gray-600">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-400 px-4 py-2.5 font-black text-xs uppercase tracking-widest hover:text-[#FF8C00] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#FF8C00] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-6 right-6 bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col gap-6 md:hidden shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 font-bold uppercase tracking-widest hover:text-[#FF8C00]" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          
          <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <p className="text-gray-400 font-bold text-sm">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-400 px-4 py-2.5 font-bold uppercase tracking-widest hover:text-[#FF8C00] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#FF8C00] text-black px-4 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;