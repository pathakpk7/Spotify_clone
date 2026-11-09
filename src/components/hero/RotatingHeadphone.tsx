import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  // Spring-based interactive mouse parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const tiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZooming) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[460px] h-[460px] sm:h-[520px] flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{ perspective: 1400 }}
    >
      {/* 1. Ambient Pure White Light Aura (Radiant Ethereal Halo behind the Headphone) */}
      <motion.div
        animate={{
          scale: isZooming ? 4 : isPlaying ? [1, 1.18, 1.05, 1.22, 1] : [0.96, 1.04, 0.96],
          opacity: isZooming ? 0 : isPlaying ? [0.45, 0.8, 0.55, 0.85, 0.45] : [0.32, 0.48, 0.32]
        }}
        transition={{
          duration: isZooming ? 0.9 : isPlaying ? 2.5 : 4.5,
          repeat: isZooming ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(240, 245, 255, 0.18) 38%, rgba(255, 255, 255, 0.04) 62%, transparent 75%)',
          filter: 'blur(38px)'
        }}
      />

      {/* 2. Secondary Core High-Intensity White Beam */}
      <motion.div
        animate={{
          scale: isZooming ? 3 : isPlaying ? [1, 1.25, 1] : [0.92, 1.02, 0.92],
          opacity: isZooming ? 0 : isPlaying ? [0.65, 0.95, 0.65] : [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: isZooming ? 0.7 : isPlaying ? 1.8 : 3.6,
          repeat: isZooming ? 0 : Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-52 h-52 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.25) 45%, transparent 70%)',
          filter: 'blur(22px)'
        }}
      />

      {/* 3. Interactive Floating 3D Wrapper with Zoom-In Transition */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d'
        }}
        animate={
          isZooming
            ? { scale: [1, 12], opacity: [1, 0], z: 800 }
            : { y: isPlaying ? [-8, 8, -8] : [-4, 4, -4], scale: 1, opacity: 1 }
        }
        transition={
          isZooming
            ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
            : { duration: isPlaying ? 3 : 5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* Continuous 3D Axis Rotation */}
        <motion.div
          animate={{
            rotateY: [0, 360]
          }}
          transition={{
            duration: isPlaying ? 16 : 24,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="relative w-[310px] sm:w-[360px] h-[350px] sm:h-[400px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Detailed Matte Black Studio Headphone with Realistic Specular Lighting */}
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full filter drop-shadow-[0_28px_45px_rgba(0,0,0,0.95)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Headband Steel Arc */}
              <linearGradient id="headbandGrad" x1="50" y1="40" x2="350" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#121418" />
                <stop offset="22%" stopColor="#252932" />
                <stop offset="50%" stopColor="#0b0c0f" />
                <stop offset="78%" stopColor="#252932" />
                <stop offset="100%" stopColor="#121418" />
              </linearGradient>

              {/* Specular Titanium Chrome Edge */}
              <linearGradient id="metallicHighlight" x1="90" y1="20" x2="310" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.65)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Memory Foam Headband Cushion */}
              <linearGradient id="cushionGrad" x1="100" y1="45" x2="300" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#060708" />
                <stop offset="50%" stopColor="#181a22" />
                <stop offset="100%" stopColor="#060708" />
              </linearGradient>

              {/* Left Earcup Shell */}
              <radialGradient id="leftCupGrad" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#2c303a" />
                <stop offset="42%" stopColor="#121419" />
                <stop offset="85%" stopColor="#08090c" />
                <stop offset="100%" stopColor="#040405" />
              </radialGradient>

              {/* Right Earcup Shell */}
              <radialGradient id="rightCupGrad" cx="65%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#2c303a" />
                <stop offset="42%" stopColor="#121419" />
                <stop offset="85%" stopColor="#08090c" />
                <stop offset="100%" stopColor="#040405" />
              </radialGradient>

              {/* Earpad Foam Texture */}
              <linearGradient id="earpadFoam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#181a22" />
                <stop offset="30%" stopColor="#090a0d" />
                <stop offset="70%" stopColor="#0d0e13" />
                <stop offset="100%" stopColor="#030405" />
              </linearGradient>

              {/* Acoustic Driver Ring Glow */}
              <linearGradient id="driverGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#00e575" />
              </linearGradient>
            </defs>

            {/* --- HEADBAND ARCH --- */}
            {/* Outer Ergonomic Steel Arc */}
            <path
              d="M75 220 C70 95 130 32 200 32 C270 32 330 95 325 220"
              stroke="url(#headbandGrad)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Specular Edge Highlight */}
            <path
              d="M85 200 C80 105 135 44 200 44 C265 44 320 105 315 200"
              stroke="url(#metallicHighlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Inner Memory-Foam Headband Cushion */}
            <path
              d="M105 185 C100 115 145 60 200 60 C255 60 300 115 295 185"
              stroke="url(#cushionGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Section Grooves */}
            {[140, 170, 200, 230, 260].map((cx, idx) => (
              <line
                key={idx}
                x1={cx}
                y1={52}
                x2={cx + (cx < 200 ? -2 : cx > 200 ? 2 : 0)}
                y2={70}
                stroke="#020304"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.95"
              />
            ))}

            {/* --- GIMBAL / PIVOT HARDWARE --- */}
            <path
              d="M72 200 L68 250 C68 258 72 264 78 266 L86 268"
              stroke="#252832"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="70" cy="225" r="5" fill="#3a3f4d" stroke="#101216" strokeWidth="2" />
            
            <path
              d="M328 200 L332 250 C332 258 328 264 322 266 L314 268"
              stroke="#252832"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="330" cy="225" r="5" fill="#3a3f4d" stroke="#101216" strokeWidth="2" />

            {/* --- LEFT EARCUP (Acoustic Chamber) --- */}
            <g transform="translate(42, 230)">
              {/* Outer Foam Cushion */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="58"
                fill="url(#earpadFoam)"
                stroke="#252832"
                strokeWidth="2"
              />
              {/* Inner Cushion Crease */}
              <ellipse
                cx="42"
                cy="65"
                rx="24"
                ry="44"
                fill="#060709"
                stroke="#14161c"
                strokeWidth="2"
              />
              {/* Matte Outer Housing Dome */}
              <ellipse
                cx="30"
                cy="65"
                rx="26"
                ry="50"
                fill="url(#leftCupGrad)"
                stroke="#20232b"
                strokeWidth="2"
              />
              {/* Circular Acoustic Core Plate with Ambient Accent */}
              <circle
                cx="28"
                cy="65"
                r="18"
                fill="#08090c"
                stroke="url(#driverGlow)"
                strokeWidth={isPlaying ? 2 : 1}
                strokeDasharray={isPlaying ? '4 2' : 'none'}
                opacity={isPlaying ? 0.9 : 0.45}
              />
              <circle cx="28" cy="65" r="5" fill="#1b1e25" stroke="#ffffff" strokeWidth="1" />
            </g>

            {/* --- RIGHT EARCUP (Acoustic Chamber) --- */}
            <g transform="translate(282, 230)">
              {/* Outer Foam Cushion */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="58"
                fill="url(#earpadFoam)"
                stroke="#252832"
                strokeWidth="2"
              />
              {/* Inner Cushion Crease */}
              <ellipse
                cx="34"
                cy="65"
                rx="24"
                ry="44"
                fill="#060709"
                stroke="#14161c"
                strokeWidth="2"
              />
              {/* Matte Outer Housing Dome */}
              <ellipse
                cx="46"
                cy="65"
                rx="26"
                ry="50"
                fill="url(#rightCupGrad)"
                stroke="#20232b"
                strokeWidth="2"
              />
              {/* Circular Acoustic Core Plate */}
              <circle
                cx="48"
                cy="65"
                r="18"
                fill="#08090c"
                stroke="url(#driverGlow)"
                strokeWidth={isPlaying ? 2 : 1}
                strokeDasharray={isPlaying ? '4 2' : 'none'}
                opacity={isPlaying ? 0.9 : 0.45}
              />
              <circle cx="48" cy="65" r="5" fill="#1b1e25" stroke="#ffffff" strokeWidth="1" />
            </g>

            {/* Center Pure White Light Reflection */}
            <circle
              cx="200"
              cy="280"
              r="26"
              fill="#ffffff"
              opacity={isPlaying ? '0.18' : '0.08'}
              filter="blur(14px)"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
