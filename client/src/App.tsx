import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import ContinuousBackground from './components/ui/ContinuousBackground';
import TopRightSteeringWheel from './components/ui/TopRightSteeringWheel';

function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen relative overflow-x-hidden">
      {/* Fixed Background stays behind everything */}
      <ContinuousBackground />
      
      {/* Fixed UI Stays on top */}
      <TopRightSteeringWheel />
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Home />  {/* This is the 100vh Hero section */}
        <Fleet /> {/* This is the content below the fold */}
      </main>

      {/* Global Style Reset */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { margin: 0; padding: 0; background: #0A0A0A; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #FF8C00; border-radius: 10px; }
      `}} />
    </div>
  );
}

export default App;