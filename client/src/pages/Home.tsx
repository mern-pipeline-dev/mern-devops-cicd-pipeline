import React from 'react';
import { ChevronDown } from 'lucide-react';
import { VehicleModel } from '../components/ui/VehicleModel';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0F0F0F]">
      
      {/* 1. The 3D Model as Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 lg:opacity-80">
        <div className="w-full h-full max-w-[1200px] max-h-[800px] lg:translate-x-32 transition-transform duration-1000">
          <VehicleModel />
        </div>
      </div>

      {/* 2. Content Overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-10 pt-32 min-h-screen flex flex-col justify-between">
        
        <div className="max-w-2xl">
          <h1 className="text-7xl md:text-9xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">
            Drive Your <br />
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Dreams.
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-sm mt-8 leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/5">
            Experience the future of premium travel. From luxury concepts to rugged off-roaders, the journey starts here.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-brand-orange hover:bg-orange-600 px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-orange/20 cursor-pointer">
              Explore Fleet
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all cursor-pointer">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end pb-12">
          <div className="hidden lg:block text-xs uppercase tracking-[0.3em] text-gray-500 vertical-text">
            Unique Drive // 2025 Edition
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-orange">Scroll</span>
            <ChevronDown size={30} className="text-brand-orange animate-bounce" />
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-mono text-gray-400">
            <span>01 // LUXURY</span>
            <span>02 // COMFORT</span>
            <span>03 // SPEED</span>
          </div>
        </div>
      </div>

      {/* 3. Aesthetic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -z-10"></div>
    </div>
  );
};

export default Home;