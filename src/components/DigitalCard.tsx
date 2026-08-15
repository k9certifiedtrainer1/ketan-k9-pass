import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { playCardFlipSound } from '../utils/soundEffects';

interface DigitalCardProps {
  isFlipped: boolean;
  onToggleFlip: () => void;
  onOpenBooking: () => void;
  onOpenWallet: () => void;
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
  isFlipped,
  onToggleFlip,
  onOpenBooking,
  onOpenWallet,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Heavy titanium dampened spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  // Desktop mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Mobile gyroscope tilt
  useEffect(() => {
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      x.set(Math.max(-0.5, Math.min(0.5, e.gamma / 60)));
      y.set(Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60)));
    };
    window.addEventListener('deviceorientation', onOrientation, true);
    return () => window.removeEventListener('deviceorientation', onOrientation, true);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      className="card-wrapper"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* ── FRONT FACE ─────────────────────────────────────────────────────── */}
        <div
          className="card-face card-front"
          style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
          onClick={() => {
            playCardFlipSound();
            onToggleFlip();
          }}
        >
          {/* Subtle Champagne Gold Specular Shimmer */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-[24px]"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(212,175,55,0.18) 25%, rgba(255,255,255,0.22) 27%, transparent 30%)',
              opacity: isHovered ? 0.65 : 0.3,
              mixBlendMode: 'screen',
            }}
          />
          <CardFront />
        </div>

        {/* ── BACK FACE ──────────────────────────────────────────────────────── */}
        <div
          className="card-face card-back"
          style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
        >
          {/* Subtle Champagne Gold Specular Shimmer */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-[24px]"
            style={{
              background: 'linear-gradient(105deg, transparent 20%, rgba(212,175,55,0.18) 25%, rgba(255,255,255,0.22) 27%, transparent 30%)',
              opacity: isHovered ? 0.55 : 0.2,
              mixBlendMode: 'screen',
              transform: 'rotateY(180deg)',
            }}
          />
          <CardBack
            onFlip={onToggleFlip}
            onOpenBooking={onOpenBooking}
            onOpenWallet={onOpenWallet}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
