// src/components/ui/ContinuousBackground.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollContainer } from '../../context/ScrollContext';

const ContinuousBackground: React.FC = () => {
  const containerRef = useScrollContainer();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Smoke {
      x: number; y: number; size: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 120 + 60;
        this.speedY = -0.4;
        this.opacity = Math.random() * 0.03;
      }
      update() {
        this.y += this.speedY;
        if (this.y < -this.size) this.y = canvas!.height + this.size;
      }
      draw() {
        ctx!.beginPath();
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        g.addColorStop(0, `rgba(140, 140, 140, ${this.opacity})`);
        g.addColorStop(1, 'transparent');
        ctx!.fillStyle = g;
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Spark {
      x: number; y: number; size: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = -Math.random() * 4 - 2;
      }
      update() {
        this.y += this.speedY;
        if (this.y < -10) this.y = canvas!.height + 10;
      }
      draw() {
        ctx!.fillStyle = '#FF8C00';
        ctx!.shadowBlur = 15;
        ctx!.shadowColor = '#FF4500';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 25; i++) particles.push(new Smoke());
      for (let i = 0; i < 45; i++) particles.push(new Spark());
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      style={{ scale: backgroundScale, opacity: backgroundOpacity }}
      className="fixed inset-0 z-0 bg-[#070707] pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,140,0,0.05),transparent_70%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </motion.div>
  );
};

export default ContinuousBackground;