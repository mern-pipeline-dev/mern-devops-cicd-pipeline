import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Eye, Zap, Fuel, Users, Cog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Car {
  id: string;
  name: string;
  price: number;
  img: string;
  brand: string;
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  seats: number;
  transmission: 'Manual' | 'Automatic';
  rating: number;
  reviews: number;
  isFavorite?: boolean;
}

const Fleet: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('price');
  const [expandedFilters, setExpandedFilters] = useState({
    type: true,
    fuel: true,
    price: true,
    transmission: true
  });

  // Sample car data
  const cars: Car[] = [
    { 
      id: '1', 
      name: "Ford Focus Hatchback", 
      price: 18000, 
      img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500",
      brand: "Ford",
      type: "Hatchback",
      fuel: "Petrol",
      seats: 5,
      transmission: "Automatic",
      rating: 4.8,
      reviews: 245
    },
    { 
      id: '2', 
      name: "Mazda CX-5", 
      price: 25000, 
      img: "https://images.unsplash.com/photo-1533473359331-35a87a5471c5?w=500",
      brand: "Mazda",
      type: "SUV",
      fuel: "Petrol",
      seats: 5,
      transmission: "Automatic",
      rating: 4.9,
      reviews: 389
    },
    { 
      id: '3', 
      name: "Range Rover Sport", 
      price: 85000, 
      img: "https://images.unsplash.com/photo-1606611013016-969c19a27e1c?w=500",
      brand: "Range Rover",
      type: "SUV",
      fuel: "Diesel",
      seats: 5,
      transmission: "Automatic",
      rating: 4.7,
      reviews: 156
    },
    { 
      id: '4', 
      name: "Honda Vezel", 
      price: 15500, 
      img: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500",
      brand: "Honda",
      type: "Hatchback",
      fuel: "Hybrid",
      seats: 5,
      transmission: "Automatic",
      rating: 4.6,
      reviews: 203
    },
    { 
      id: '5', 
      name: "Toyota Corolla", 
      price: 12000, 
      img: "https://images.unsplash.com/photo-1517398288895-fcd954f7a93d?w=500",
      brand: "Toyota",
      type: "Sedan",
      fuel: "Petrol",
      seats: 5,
      transmission: "Automatic",
      rating: 4.5,
      reviews: 512
    },
    { 
      id: '6', 
      name: "Tesla Model 3", 
      price: 65000, 
      img: "https://images.unsplash.com/photo-1560958089-b8a46dd52a86?w=500",
      brand: "Tesla",
      type: "Sedan",
      fuel: "Electric",
      seats: 5,
      transmission: "Automatic",
      rating: 4.9,
      reviews: 178
    },
  ];

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let result = cars;

    // Apply type filter
    if (selectedType.length > 0) {
      result = result.filter(car => selectedType.includes(car.type));
    }

    // Apply fuel filter
    if (selectedFuel.length > 0) {
      result = result.filter(car => selectedFuel.includes(car.fuel));
    }

    // Apply price filter
    result = result.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);

    // Apply sorting
    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedType, selectedFuel, priceRange, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString()}`;
  };

  const handleViewCar = (carId: string) => {
    navigate(`/fleet/${carId}`);
  };

  // Filter section component
  const FilterSection: React.FC<{ title: string; section: keyof typeof expandedFilters; children: React.ReactNode }> = ({ title, section, children }) => (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }))}
        className="w-full flex items-center justify-between py-4 text-white hover:text-[#FF8C00] transition-colors"
      >
        <span className="font-bold uppercase tracking-widest">{title}</span>
        <motion.div
          animate={{ rotate: expandedFilters[section] ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {expandedFilters[section] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-4 space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="text-[#FF8C00]">Fleet</span>
          </h1>
          <p className="text-gray-400 text-lg">Choose from {filteredCars.length} available vehicles</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Filters</h3>

            {/* Car Type Filter */}
            <FilterSection title="Car Type" section="type">
              {['Sedan', 'SUV', 'Hatchback', 'Coupe'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedType.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedType([...selectedType, type]);
                      } else {
                        setSelectedType(selectedType.filter(t => t !== type));
                      }
                    }}
                    className="w-4 h-4 accent-[#FF8C00]"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{type}</span>
                </label>
              ))}
            </FilterSection>

            {/* Fuel Type Filter */}
            <FilterSection title="Fuel Type" section="fuel">
              {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(fuel => (
                <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFuel.includes(fuel)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFuel([...selectedFuel, fuel]);
                      } else {
                        setSelectedFuel(selectedFuel.filter(f => f !== fuel));
                      }
                    }}
                    className="w-4 h-4 accent-[#FF8C00]"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{fuel}</span>
                </label>
              ))}
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection title="Price Range" section="price">
              <div className="space-y-4">
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full accent-[#FF8C00]"
                />
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#FF8C00]"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </FilterSection>

            {/* Clear Filters */}
            {(selectedType.length > 0 || selectedFuel.length > 0) && (
              <button
                onClick={() => {
                  setSelectedType([]);
                  setSelectedFuel([]);
                  setPriceRange([10000, 100000]);
                }}
                className="w-full mt-6 py-2 bg-[#FF8C00]/20 text-[#FF8C00] rounded-lg hover:bg-[#FF8C00]/30 transition-colors font-bold"
              >
                Clear Filters
              </button>
            )}
          </motion.div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
            >
              <p className="text-gray-400">
                Showing <span className="font-bold text-white">{filteredCars.length}</span> cars
              </p>
              <div className="flex gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00] transition-colors"
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-1 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#FF8C00] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-1 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#FF8C00] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Cars Display */}
            {filteredCars.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredCars.map((car, idx) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF8C00] transition-all duration-300 hover:shadow-xl hover:shadow-[#FF8C00]/20 ${
                        viewMode === 'list' ? 'flex' : 'flex flex-col'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-[#FF8C00]/20 to-transparent" style={{
                        width: viewMode === 'list' ? '40%' : '100%',
                        minHeight: viewMode === 'list' ? '200px' : '200px'
                      }}>
                        <img
                          src={car.img}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFavorite(car.id)}
                          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-md hover:bg-black/70 transition-colors"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors ${
                              favorites.includes(car.id)
                                ? 'fill-[#FF8C00] text-[#FF8C00]'
                                : 'text-white'
                            }`}
                          />
                        </motion.button>
                      </div>

                      {/* Content */}
                      <div className={`p-6 flex flex-col flex-1 ${viewMode === 'list' ? 'w-60' : ''}`}>
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#FF8C00] transition-colors">
                            {car.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-yellow-400 text-sm">
                              ★ {car.rating}
                            </span>
                            <span className="text-gray-500 text-sm">({car.reviews} reviews)</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Users size={16} className="text-[#FF8C00]" />
                            <span>{car.seats} Seats</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Fuel size={16} className="text-[#FF8C00]" />
                            <span>{car.fuel}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Zap size={16} className="text-[#FF8C00]" />
                            <span>{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Cog size={16} className="text-[#FF8C00]" />
                            <span>{car.type}</span>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="pt-4 border-t border-white/10 mt-auto space-y-3">
                          <div>
                            <p className="text-[#FF8C00] font-black text-2xl">
                              {formatPrice(car.price)}
                              <span className="text-gray-500 text-sm font-normal ml-1">/day</span>
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleViewCar(car.id)}
                            className="w-full bg-[#FF8C00] text-black py-2 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                          >
                            <Eye size={18} />
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl text-gray-400 mb-4">No cars match your filters</p>
                <button
                  onClick={() => {
                    setSelectedType([]);
                    setSelectedFuel([]);
                    setPriceRange([10000, 100000]);
                  }}
                  className="text-[#FF8C00] hover:text-white transition-colors"
                >
                  Clear filters to see all cars
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
