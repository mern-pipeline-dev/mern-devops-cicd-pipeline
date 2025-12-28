import React from 'react';

const BookingDetail = () => {
  return (
    // 'w-screen' and 'overflow-x-hidden' ensures it hits the corners without scrollbars
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#0a0a0a] text-white flex flex-col">
      
      {/* NOTE: If you already have a Navbar in App.jsx, 
         DELETE the entire <nav> block below. 
      */}
      <nav className="w-full bg-[#0a0a0a] border-b border-zinc-800 px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-black font-bold px-2 py-1 rounded">V</div>
          <span className="text-xl font-bold">VoltDrive</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest">
          <a href="/" className="hover:text-orange-500">Home</a>
          <a href="/fleet" className="hover:text-orange-500">Fleet</a>
          <a href="/about" className="hover:text-orange-500">About</a>
          <a href="/contact" className="hover:text-orange-500">Contact</a>
        </div>
        <button className="bg-orange-500 text-black text-xs font-bold px-6 py-3 rounded-md uppercase">
          Download App
        </button>
      </nav>

      {/* Main Content Area - Fixed to be visible entirely */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <span className="bg-zinc-800 text-orange-400 text-[10px] font-bold px-3 py-1 rounded w-fit uppercase">
              Premium Sport
            </span>
            <h1 className="text-4xl md:text-6xl font-black">Porsche 718 Boxster S</h1>
            <div className="mt-4 rounded-3xl overflow-hidden border border-zinc-800">
              <img 
                src="YOUR_IMAGE_URL" 
                alt="Porsche" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column (Booking Form) */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 h-fit">
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-orange-500">$120</span>
              <span className="text-zinc-400 text-xl">/ day</span>
            </div>

            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pickup Location</label>
                <select className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm focus:outline-none focus:border-orange-500">
                  <option>Heathrow Airport (LHR)</option>
                </select>
              </div>
              <button className="w-full bg-orange-500 text-black font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors">
                Book Now
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookingDetail;