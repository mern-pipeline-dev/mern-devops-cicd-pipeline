import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/' },
      { name: 'Our Fleet', path: '/fleet' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/' },
    ],
    Support: [
      { name: 'Help Center', path: '/' },
      { name: 'FAQ', path: '/' },
      { name: 'Terms & Conditions', path: '/' },
      { name: 'Privacy Policy', path: '/' },
    ],
    Legal: [
      { name: 'Insurance Info', path: '/' },
      { name: 'Safety Guidelines', path: '/' },
      { name: 'Refund Policy', path: '/' },
      { name: 'Accessibility', path: '/' },
    ],
    Social: [
      { icon: Facebook, url: '#', label: 'Facebook' },
      { icon: Twitter, url: '#', label: 'Twitter' },
      { icon: Instagram, url: '#', label: 'Instagram' },
      { icon: Linkedin, url: '#', label: 'LinkedIn' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-[#FF8C00] text-black rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-4">VoltDrive</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium car rental service in Sri Lanka. Drive your dream car today.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Phone size={18} className="text-[#FF8C00]" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Mail size={18} className="text-[#FF8C00]" />
                <span>info@voltdrive.lk</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <MapPin size={18} className="text-[#FF8C00]" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {footerLinks.Company.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3">
              {footerLinks.Support.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.Legal.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-[#FF8C00] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-gray-500 text-sm">
            © {currentYear} VoltDrive. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-4">
            {footerLinks.Social.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 text-gray-400 hover:bg-[#FF8C00] hover:text-black hover:border-[#FF8C00] transition-all"
                  title={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00] transition-colors"
            />
            <button className="bg-[#FF8C00] text-black px-6 py-2 rounded-lg font-bold hover:bg-white transition-all">
              Subscribe
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF8C00]/5 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
