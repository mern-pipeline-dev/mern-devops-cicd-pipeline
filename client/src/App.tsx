import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ScrollProvider } from './context/ScrollContext';
import Navbar from './components/layout/Navbar';
import ScrollingCar from './components/ui/ScrollingCar';
import ContinuousBackground from './components/ui/ContinuousBackground';

import Home from './pages/Home';
import Fleet from './pages/Fleet';
import BookingDetail from './pages/BookingDetail';
import ContactAndFooter from './pages/ContactAndFooter';
import Login from './pages/Login';
import Register from './pages/Register';

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <ContinuousBackground />
    <ScrollingCar />
    <main className="relative z-10 w-full">
      <Home />
      <Fleet />
      <BookingDetail />
      <ContactAndFooter />
    </main>
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main App Routes */}
            <Route path="/*" element={<MainLayout />} />
          </Routes>
        </ScrollProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;