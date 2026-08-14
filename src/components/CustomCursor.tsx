import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);

  // Mouse coordinates with spring smoothing for Desktop
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsVisible(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setIsVisible(false);
        setTouchPos(null);
      }, 350);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice && touchPos && isVisible) {
    return (
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: touchPos.x,
          top: touchPos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-emerald-400 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.7)] flex items-center justify-center animate-ping duration-700">
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>
    );
  }

  if (!isTouchDevice && isVisible) {
    return (
      <motion.div
        className="fixed pointer-events-none z-[99999] top-0 left-0 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer Emerald Halo */}
        <div className="w-9 h-9 rounded-full border border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_16px_rgba(16,185,129,0.45)] flex items-center justify-center transition-transform duration-150">
          {/* Inner Precision Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
        </div>
      </motion.div>
    );
  }

  return null;
};
