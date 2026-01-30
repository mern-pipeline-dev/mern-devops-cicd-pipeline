import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Shield, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap size={32} className="text-[#FF8C00]" />,
      title: "Lightning Fast",
      description: "Book your car in just 2 minutes with our streamlined process"
    },
    {
      icon: <Shield size={32} className="text-[#FF8C00]" />,
      title: "100% Safe",
      description: "All our vehicles are thoroughly inspected and insured"
    },
    {
      icon: <Clock size={32} className="text-[#FF8C00]" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your peace of mind"
    },
    {
      icon: <Users size={32} className="text-[#FF8C00]" />,
      title: "Best Prices",
      description: "Competitive rates with no hidden fees or surprises"
    }
  ];

  const testimonials = [
    {
      name: "John Doe",
      rating: 5,
      text: "Amazing service! The car was clean and the booking process was super easy.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Smith",
      rating: 5,
      text: "Best rental service in Sri Lanka. Highly recommended!",
      image: "👩‍💼"
    },
    {
      name: "Mike Johnson",
      rating: 5,
      text: "Professional staff, excellent cars, will definitely book again.",
      image: "👨‍🔧"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4 md:px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-10 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 bg-[#FF8C00]/10 text-[#FF8C00] rounded-full text-sm font-bold uppercase tracking-widest">
                🚗 Premium Car Rentals
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-white leading-tight"
            >
              Drive Your <span className="text-[#FF8C00]">Dream</span> Today
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed max-w-md"
            >
              Experience premium car rentals in Sri Lanka with the easiest booking experience and best prices guaranteed.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => navigate('/fleet')}
                className="group flex items-center justify-center gap-2 bg-[#FF8C00] text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Fleet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
                <ChevronRight size={20} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
            >
              <div>
                <p className="text-2xl font-black text-[#FF8C00]">500+</p>
                <p className="text-sm text-gray-400">Cars Available</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#FF8C00]">10K+</p>
                <p className="text-sm text-gray-400">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#FF8C00]">4.9★</p>
                <p className="text-sm text-gray-400">Average Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-96 lg:h-full flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/20 to-transparent rounded-3xl blur-2xl"></div>
            <img
              src="https://www.mazda.com.au/globalassets/mazda-3-sedan-transparent.png"
              alt="Premium Car"
              className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose VoltDrive?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide the best car rental experience with premium vehicles and exceptional service
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  hoveredCard === idx
                    ? 'bg-[#FF8C00]/10 border-[#FF8C00] scale-105'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Booking Widget */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-transparent via-[#FF8C00]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
          >
            <h3 className="text-3xl font-black text-white mb-8">Quick Booking</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Pick-up Date</label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Drop-off Date</label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8C00] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Car Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF8C00] transition-colors">
                  <option>Any Car</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => navigate('/fleet')}
              className="w-full bg-[#FF8C00] text-black py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              Search Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Our Customers Say</h2>
            <p className="text-gray-400">Join thousands of satisfied customers who love VoltDrive</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF8C00] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{testimonial.image}</span>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#FF8C00] text-[#FF8C00]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Drive?</h2>
          <p className="text-gray-400 mb-8 text-lg">Start your journey with VoltDrive today and experience premium car rental like never before.</p>
          <button
            onClick={() => navigate('/fleet')}
            className="group inline-flex items-center justify-center gap-2 bg-[#FF8C00] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Explore Our Fleet
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
