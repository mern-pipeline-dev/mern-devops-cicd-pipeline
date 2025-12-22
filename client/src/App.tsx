import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-brand-orange/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, e.g., <Route path="/cars" element={<Cars />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;