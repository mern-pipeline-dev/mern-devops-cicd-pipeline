import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Navigation, Signal, Wifi } from 'lucide-react';
import { useDrivingSimulation } from '../../../hooks/useDrivingSimulation';
import steeringWheelImg from '../../../assets/steering-wheel.jpg'; // Verified .jpg

const LiveDashboard = () => {
  const { speed, steering, navRotation, drivingState } = useDrivingSimulation();
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  const currentSpeed = useTransform(speed, (latest) => Math.round(latest));
  const needleRotate = useTransform(speed, [0, 180], [-110, 110]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-10 text-[10px] font-bold tracking-widest text-gray-500">
        <div className="flex items-center gap-2 text-green-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> LIVE GPS
        </div>
        <div className="text-[#FF8C00]">VOLTDRIVE NAV</div>
        <div className="text-[#00BFFF] flex items-center gap-2"><Wifi className="w-3 h-3"/>{time}</div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Navigation */}
        <div className="w-40 h-40 bg-[#0A0A0A] rounded-2xl relative border border-gray-800 overflow-hidden">
          <motion.div style={{ rotate: navRotation }} className="absolute inset-0 flex items-center justify-center">
            <Navigation fill="#00BFFF" className="text-[#00BFFF] w-10 h-10 drop-shadow-[0_0_15px_#00BFFF80]" />
          </motion.div>
        </div>

        {/* Steering Wheel (JPG) */}
        <div className="relative group">
          <motion.div style={{ rotate: steering }} className="w-56 h-56 flex items-center justify-center">
            <img 
              src={steeringWheelImg} 
              alt="Steering Wheel" 
              className="w-full h-full object-contain mix-blend-screen opacity-90" // Fix for JPG background
            />
          </motion.div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
            {drivingState}
          </div>
        </div>

        {/* Speedometer */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="85" fill="none" stroke="#222" strokeWidth="4" strokeDasharray="350 150" transform="rotate(135 100 100)" />
            <motion.path d="M 35 165 A 85 85 0 1 1 165 165" fill="none" stroke="#FF8C00" strokeWidth="4" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <motion.span className="text-5xl font-black text-[#FF8C00] font-mono">{currentSpeed}</motion.span>
            <span className="text-[10px] text-gray-500 uppercase">KM/H</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;