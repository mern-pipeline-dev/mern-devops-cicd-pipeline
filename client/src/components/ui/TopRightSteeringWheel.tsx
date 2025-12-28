import React from 'react';
import { useScrollContainer } from '../../context/ScrollContext';

const TopRightSteeringWheel: React.FC = () => {
  // Get the scroll container ref from the Context Provider
  const containerRef = useScrollContainer();

  return (
    <div className="fixed top-8 right-8 z-50">
      {/* Your steering wheel logic here */}
    </div>
  );
};

export default TopRightSteeringWheel;