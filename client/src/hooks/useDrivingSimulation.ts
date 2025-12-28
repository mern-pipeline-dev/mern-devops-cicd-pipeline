import { useState, useEffect } from 'react';
import { useSpring, animate } from 'framer-motion';

export const useDrivingSimulation = () => {
  const [drivingState, setDrivingState] = useState<'STRAIGHT' | 'LEFT' | 'RIGHT'>('STRAIGHT');
  const speed = useSpring(80, { stiffness: 50, damping: 20 });
  const steering = useSpring(0, { stiffness: 40, damping: 15 });
  const navRotation = useSpring(0, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const loop = setInterval(() => {
      const chance = Math.random();
      if (chance > 0.7) {
        const isLeft = Math.random() > 0.5;
        setDrivingState(isLeft ? 'LEFT' : 'RIGHT');
        animate(speed, Math.random() * 15 + 40, { duration: 2 });
        steering.set(isLeft ? -75 : 75);
        navRotation.set(isLeft ? -45 : 45);
      } else {
        setDrivingState('STRAIGHT');
        animate(speed, Math.random() * 20 + 70, { duration: 3 });
        steering.set(0);
        navRotation.set(0);
      }
    }, 5000);
    return () => clearInterval(loop);
  }, [speed, steering, navRotation]);

  return { speed, steering, navRotation, drivingState };
};