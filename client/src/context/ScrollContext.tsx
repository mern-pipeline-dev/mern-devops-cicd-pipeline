// src/context/ScrollContext.tsx
import React, { createContext, useContext, useRef, type RefObject } from 'react';

type ScrollContextType = RefObject<HTMLDivElement | null>;
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollContext.Provider value={containerRef}>
      <div 
        ref={containerRef} 
        className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth relative"
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

export function useScrollContainer() {
  const context = useContext(ScrollContext);
  if (!context) throw new Error('useScrollContainer must be used within ScrollProvider');
  return context;
}