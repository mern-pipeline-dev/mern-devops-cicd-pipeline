import React from 'react';
import Navbar from './components/layout/Navbar'; 
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Booking from './pages/BookingDetail'; // Ensure this path is correct
import ContinuousBackground from './components/ui/ContinuousBackground';
import TopRightSteeringWheel from './components/ui/TopRightSteeringWheel';
import { ScrollProvider, useScrollContainer } from './context/ScrollContext';

function AppLayout() {
  const containerRef = useScrollContainer();

  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#0A0A0A] no-scrollbar"
    >
      <ContinuousBackground />
      <TopRightSteeringWheel />
      
      <header className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </header>

      <main className="relative z-10">
        <section className="h-screen snap-start">
          <Home />
        </section>
        
        <section className="h-screen snap-start">
          <Fleet />
        </section>

        {/* Removed placeholder div, added the Booking component */}
        <section className="h-screen snap-start">
          <Booking />
        </section>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppLayout />
    </ScrollProvider>
  );
}