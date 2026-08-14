import React, { useState, useRef, useEffect } from 'react';
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

  // Motion Values for 3D Parallax Tilt (Dampened luxury titanium feel)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 180, mass: 0.6 };
  const rotateXSpring = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateYSpring = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  // Desktop Mouse Movement (Never intercepts touchscreen taps)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Mobile Hardware Gyroscope (Smooth Parallax Tilt without Touch Conflicts)
  useEffect(() => {
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const normX = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        const normY = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60));
        x.set(normX);
        y.set(normY);
      }
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      }
    };
  }, [x, y]);

  return (
    <div className="card-wrapper">
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        className="holographic-card"
      >
        {/* 3D Flipping Motion Container */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full relative"
        >
          {/* FRONT FACE (Click to Flip) */}
          <div 
            onClick={() => {
              if (!isFlipped) {
                playCardFlipSound();
                onToggleFlip();
              }
            }}
            style={{
              pointerEvents: isFlipped ? 'none' : 'auto',
            }}
            className="card-face card-front cursor-pointer"
          >
            {/* Holographic Refraction Layer */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, transparent 20%, rgba(56, 189, 248, 0.2) 25%, rgba(255, 255, 255, 0.2) 27%, transparent 30%)',
                backgroundSize: '200% 200%',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 10,
                opacity: isHovered ? 0.65 : 0.35,
                backgroundPositionX: `${glareX.get()}%`,
                backgroundPositionY: `${glareY.get()}%`,
              }}
            />
            <CardFront />
          </div>

          {/* BACK FACE (Zero Global Flip Listener - Pure Dedicated Actions) */}
          <div 
            style={{
              pointerEvents: isFlipped ? 'auto' : 'none',
            }}
            className="card-face card-back"
          >
            {/* Holographic Refraction Layer */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(105deg, transparent 20%, rgba(56, 189, 248, 0.2) 25%, rgba(255, 255, 255, 0.2) 27%, transparent 30%)',
                backgroundSize: '200% 200%',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 10,
                transform: 'rotateY(180deg)',
                opacity: isHovered ? 0.55 : 0.25,
                backgroundPositionX: `${glareX.get()}%`,
                backgroundPositionY: `${glareY.get()}%`,
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
    </div>
  );
};
