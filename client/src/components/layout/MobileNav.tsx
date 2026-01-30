import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Car, MapPin, LogIn, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Fleet', path: '/fleet', icon: Car },
    { name: 'Contact', path: '/contact', icon: MapPin },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#FF8C00] text-black rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="md:hidden fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 z-40 pt-24 px-4 overflow-y-auto"
            >
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#FF8C00] text-black'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-bold">{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="my-6 pt-6 border-t border-white/10 space-y-2">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleNavClick('/login')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition-all"
                    >
                      <LogIn size={20} />
                      <span className="font-bold">Login</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/register')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#FF8C00] text-black hover:bg-white transition-all font-bold"
                    >
                      <User size={20} />
                      <span>Register</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition-all"
                    >
                      <User size={20} />
                      <span className="font-bold">Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 transition-all"
                    >
                      <LogOut size={20} />
                      <span className="font-bold">Logout</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
