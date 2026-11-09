import React from 'react';
import { motion } from 'framer-motion';
import { ThreeHeadphoneCanvas } from './ThreeHeadphoneCanvas';

interface RotatingHeadphoneProps {
  isPlaying: boolean;
  isZooming?: boolean;
  onClick?: () => void;
}

export const RotatingHeadphone: React.FC<RotatingHeadphoneProps> = ({
  isPlaying,
  isZooming = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-[480px] h-[460px] sm:h-[520px] flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* 1. Ambient Pure White Light Aura (Radiant Ethereal Halo behind the Headphone) */}
      <motion.div
        animate={{
          scale: isZooming ? 4 : isPlaying ? [1, 1.18, 1.05, 1.22, 1] : [0.96, 1.04, 0.96],
          opacity: isZooming ? 0 : isPlaying ? [0.45, 0.75, 0.55, 0.82, 0.45] : [0.32, 0.46, 0.32]
        }}
        transition={{
          duration: isZooming ? 0.9 : isPlaying ? 2.5 : 4.5,
          repeat: isZooming ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.48) 0%, rgba(240, 245, 255, 0.2) 38%, rgba(255, 255, 255, 0.04) 62%, transparent 75%)',
          filter: 'blur(40px)'
        }}
      />

      {/* 2. Secondary Core High-Intensity White Beam */}
      <motion.div
        animate={{
          scale: isZooming ? 3 : isPlaying ? [1, 1.25, 1] : [0.92, 1.02, 0.92],
          opacity: isZooming ? 0 : isPlaying ? [0.65, 0.95, 0.65] : [0.4, 0.58, 0.4]
        }}
        transition={{
          duration: isZooming ? 0.7 : isPlaying ? 1.8 : 3.6,
          repeat: isZooming ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-52 h-52 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 45%, transparent 70%)',
          filter: 'blur(24px)'
        }}
      />

      {/* 3. Volumetric 3D Headphone (Three.js WebGL with True Depth & Volume) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <ThreeHeadphoneCanvas
          isPlaying={isPlaying}
          isZooming={isZooming}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
