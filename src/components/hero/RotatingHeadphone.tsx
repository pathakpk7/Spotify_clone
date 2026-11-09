import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface RotatingHeadphoneProps {
  isPlaying: boolean;
}

export const RotatingHeadphone: React.FC<RotatingHeadphoneProps> = ({ isPlaying }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring-based interactive mouse parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const tiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] h-[420px] sm:h-[480px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. Ambient Acoustic Radial Glow (Behind the Headphone) */}
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.15, 1.05, 1.2, 1] : [0.95, 1.02, 0.95],
          opacity: isPlaying ? [0.45, 0.75, 0.55, 0.8, 0.45] : [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: isPlaying ? 2.4 : 4.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 117, 0.32) 0%, rgba(0, 180, 216, 0.14) 40%, transparent 72%)',
          filter: 'blur(36px)'
        }}
      />

      {/* 2. Secondary Core Neon Glow Node */}
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.25, 1] : [0.9, 1, 0.9],
          opacity: isPlaying ? [0.6, 0.9, 0.6] : [0.3, 0.45, 0.3]
        }}
        transition={{
          duration: isPlaying ? 1.6 : 3.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute w-44 h-44 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 117, 0.5) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      />

      {/* 3. Interactive Floating 3D Wrapper */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: isPlaying ? [-8, 8, -8] : [-4, 4, -4]
        }}
        transition={{
          duration: isPlaying ? 3 : 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative z-10 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Continuous 3D Axis Rotation Cylinder */}
        <motion.div
          animate={{
            rotateY: [0, 360]
          }}
          transition={{
            duration: isPlaying ? 16 : 24,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="relative w-[300px] sm:w-[340px] h-[340px] sm:h-[380px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Detailed Futuristic Matte Black Studio Headphone (Pure Vector Craft with Specular Depth) */}
          <svg
            viewBox="0 0 400 420"
            className="w-full h-full filter drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Headband Gradient */}
              <linearGradient id="headbandGrad" x1="50" y1="40" x2="350" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14161a" />
                <stop offset="20%" stopColor="#22252c" />
                <stop offset="50%" stopColor="#0d0e12" />
                <stop offset="80%" stopColor="#22252c" />
                <stop offset="100%" stopColor="#14161a" />
              </linearGradient>

              {/* Metallic Spine Highlight */}
              <linearGradient id="metallicHighlight" x1="100" y1="20" x2="300" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Headband Padding Gradient */}
              <linearGradient id="cushionGrad" x1="100" y1="45" x2="300" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#08080a" />
                <stop offset="50%" stopColor="#16181f" />
                <stop offset="100%" stopColor="#08080a" />
              </linearGradient>

              {/* Left Earcup Shell Gradient */}
              <radialGradient id="leftCupGrad" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#2c303a" />
                <stop offset="45%" stopColor="#13151a" />
                <stop offset="85%" stopColor="#090a0d" />
                <stop offset="100%" stopColor="#050608" />
              </radialGradient>

              {/* Right Earcup Shell Gradient */}
              <radialGradient id="rightCupGrad" cx="65%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#2c303a" />
                <stop offset="45%" stopColor="#13151a" />
                <stop offset="85%" stopColor="#090a0d" />
                <stop offset="100%" stopColor="#050608" />
              </radialGradient>

              {/* Earpad Foam Texture Gradient */}
              <linearGradient id="earpadFoam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#181a20" />
                <stop offset="30%" stopColor="#090a0d" />
                <stop offset="70%" stopColor="#0d0e12" />
                <stop offset="100%" stopColor="#040506" />
              </linearGradient>

              {/* Acoustic Ring Neon Accent */}
              <linearGradient id="neonPulse" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00e575" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>

            {/* --- HEADBAND ARCH STRUCTURE --- */}
            {/* Outer Ergonomic Steel Arc */}
            <path
              d="M75 220 C70 95 130 32 200 32 C270 32 330 95 325 220"
              stroke="url(#headbandGrad)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Specular Titanium Edge */}
            <path
              d="M85 200 C80 105 135 44 200 44 C265 44 320 105 315 200"
              stroke="url(#metallicHighlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Inner Memory-Foam Headband Cushion */}
            <path
              d="M105 185 C100 115 145 60 200 60 C255 60 300 115 295 185"
              stroke="url(#cushionGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Headband Section Segmentation Grooves */}
            {[140, 170, 200, 230, 260].map((cx, idx) => (
              <line
                key={idx}
                x1={cx}
                y1={52}
                x2={cx + (cx < 200 ? -2 : cx > 200 ? 2 : 0)}
                y2={70}
                stroke="#040405"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            ))}

            {/* --- GIMBAL / PIVOT HARDWARE ARMS --- */}
            {/* Left Gimbal Arm */}
            <path
              d="M72 200 L68 250 C68 258 72 264 78 266 L86 268"
              stroke="#242730"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="70" cy="225" r="5" fill="#3a3f4d" stroke="#121418" strokeWidth="2" />
            
            {/* Right Gimbal Arm */}
            <path
              d="M328 200 L332 250 C332 258 328 264 322 266 L314 268"
              stroke="#242730"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="330" cy="225" r="5" fill="#3a3f4d" stroke="#121418" strokeWidth="2" />

            {/* --- LEFT EARCUP (Acoustic Chamber) --- */}
            <g transform="translate(42, 230)">
              {/* Outer Cushion Cushioning */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="58"
                fill="url(#earpadFoam)"
                stroke="#242730"
                strokeWidth="2"
              />
              {/* Cushion Inner Crease */}
              <ellipse
                cx="42"
                cy="65"
                rx="24"
                ry="44"
                fill="#07080a"
                stroke="#15171d"
                strokeWidth="2"
              />
              {/* Matte Outer Housing Dome */}
              <ellipse
                cx="30"
                cy="65"
                rx="26"
                ry="50"
                fill="url(#leftCupGrad)"
                stroke="#1f222a"
                strokeWidth="2"
              />
              {/* Circular Acoustic Core Plate */}
              <circle
                cx="28"
                cy="65"
                r="18"
                fill="#0a0b0e"
                stroke="url(#neonPulse)"
                strokeWidth={isPlaying ? 2 : 1}
                strokeDasharray={isPlaying ? '4 2' : 'none'}
                opacity={isPlaying ? 0.9 : 0.4}
              />
              {/* Driver Core Pivot Pin */}
              <circle cx="28" cy="65" r="5" fill="#1c1f26" stroke="#00e575" strokeWidth="1" />
            </g>

            {/* --- RIGHT EARCUP (Acoustic Chamber) --- */}
            <g transform="translate(282, 230)">
              {/* Outer Cushion Cushioning */}
              <ellipse
                cx="38"
                cy="65"
                rx="34"
                ry="58"
                fill="url(#earpadFoam)"
                stroke="#242730"
                strokeWidth="2"
              />
              {/* Cushion Inner Crease */}
              <ellipse
                cx="34"
                cy="65"
                rx="24"
                ry="44"
                fill="#07080a"
                stroke="#15171d"
                strokeWidth="2"
              />
              {/* Matte Outer Housing Dome */}
              <ellipse
                cx="46"
                cy="65"
                rx="26"
                ry="50"
                fill="url(#rightCupGrad)"
                stroke="#1f222a"
                strokeWidth="2"
              />
              {/* Circular Acoustic Core Plate */}
              <circle
                cx="48"
                cy="65"
                r="18"
                fill="#0a0b0e"
                stroke="url(#neonPulse)"
                strokeWidth={isPlaying ? 2 : 1}
                strokeDasharray={isPlaying ? '4 2' : 'none'}
                opacity={isPlaying ? 0.9 : 0.4}
              />
              {/* Driver Core Pivot Pin */}
              <circle cx="48" cy="65" r="5" fill="#1c1f26" stroke="#00e575" strokeWidth="1" />
            </g>

            {/* Subtle Audio Glow Reflection on Headphone Center */}
            {isPlaying && (
              <circle
                cx="200"
                cy="280"
                r="30"
                fill="url(#neonPulse)"
                opacity="0.12"
                filter="blur(16px)"
              />
            )}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
