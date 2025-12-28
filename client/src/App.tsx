
import React from 'react';
import { ScrollProvider } from './context/ScrollContext';
import Navbar from './components/layout/Navbar';
import ScrollingCar from './components/ui/ScrollingCar';
import ContinuousBackground from './components/ui/ContinuousBackground';

import Home from './pages/Home';
import Fleet from './pages/Fleet';
import BookingDetail from './pages/BookingDetail';
import ContactAndFooter from './pages/ContactAndFooter';

const App: React.FC = () => {
  return (
    <ScrollProvider>
      <Navbar />
      <ContinuousBackground />
      <ScrollingCar />
      <main className="relative z-10 w-full">
        <Home />
        <Fleet />
        <BookingDetail />
        <ContactAndFooter />
      </main>
    </ScrollProvider>
  );
};

export default App;