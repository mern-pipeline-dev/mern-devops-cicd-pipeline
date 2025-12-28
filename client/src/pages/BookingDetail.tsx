// src/pages/BookingDetail.tsx
import React from 'react';

const BookingDetail: React.FC = () => {
  const locations = [
    "Heathrow Airport (LHR)", "Gatwick Airport (LGW)", "London City Center",
    "Manchester Airport (MAN)", "Birmingham International", "Edinburgh City",
    "Glasgow Central", "Bristol Temple Meads"
  ];

  return (
    <div id="booking" className="min-h-screen w-full bg-transparent text-white flex flex-col pt-32 pb-20">
      <main className="flex-1 flex flex-col items-center px-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <span className="bg-zinc-800 text-[#FF8C00] text-[10px] font-bold px-4 py-1.5 rounded-full w-fit uppercase tracking-widest">
              Premium Sport
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none">
              Porsche 718 <br/><span className="text-[#FF8C00]">Boxster S</span>
            </h1>
            <div className="mt-4 rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/30 backdrop-blur-sm group">
              <img src="https://www.pngmart.com/files/22/Porsche-911-PNG-Transparent-Image.png" alt="Porsche" className="w-full h-auto object-cover p-12 transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          <div className="bg-[#121212]/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/5 h-fit shadow-2xl">
            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-6xl font-black text-white">$120</span>
              <span className="text-zinc-500 text-xl font-medium">/ day</span>
            </div>
            <form className="space-y-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Pickup Location</label>
                <select className="bg-zinc-800/50 border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-[#FF8C00]">
                  {locations.map((loc, index) => (<option key={index} value={loc}>{loc}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="bg-zinc-800/50 border border-white/10 rounded-2xl p-5 text-sm text-white outline-none" />
                <input type="date" className="bg-zinc-800/50 border border-white/10 rounded-2xl p-5 text-sm text-white outline-none" />
              </div>
              <button className="w-full bg-[#FF8C00] text-black font-black py-5 rounded-2xl uppercase tracking-widest text-sm">Proceed to Checkout</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetail;