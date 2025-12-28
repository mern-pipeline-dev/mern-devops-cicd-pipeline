import React from 'react';
import { useScrollContainer } from '../../context/ScrollContext';

// 1. Remove the 'BackgroundProps' interface that was causing the error
// 2. Remove the { container } prop from the function arguments

const ContinuousBackground: React.FC = () => {
  // 3. Use the hook to get the ref from Context instead of Props
  const containerRef = useScrollContainer();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Your background logic here using containerRef.current */}
    </div>
  );
};

export default ContinuousBackground;