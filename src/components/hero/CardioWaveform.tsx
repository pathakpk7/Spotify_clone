import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../../services/audioEngine';

interface CardioWaveformProps {
  isPlaying: boolean;
}

export const CardioWaveform: React.FC<CardioWaveformProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;
    let pulsePhase = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height * 0.52;

      ctx.clearRect(0, 0, width, height);

      // Speed of waveform traversal
      offset += isPlaying ? 3.5 : 1.8;
      pulsePhase += isPlaying ? 0.08 : 0.04;

      // Real audio frequency magnitude
      const freqData = audioEngine.getFrequencyData();
      let bassAvg = 0;
      if (freqData.length > 0) {
        for (let i = 0; i < 8; i++) {
          bassAvg += freqData[i] || 0;
        }
        bassAvg = bassAvg / 8;
      }
      const bassFactor = isPlaying ? (bassAvg / 255) * 1.6 : 0.3;

      // Draw faint background horizon grid line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Main glowing heartbeat string
      const drawHeartbeatString = (glow: boolean, alpha: number, widthScale: number, strokeColor: string) => {
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = (glow ? 5 : 2) * (window.devicePixelRatio || 1) * widthScale;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (glow) {
          ctx.shadowBlur = isPlaying ? 22 : 12;
          ctx.shadowColor = '#00e575';
        } else {
          ctx.shadowBlur = 0;
        }

        const step = 4;
        const wavelength = 360; // Distance between heartbeats

        for (let x = 0; x <= width; x += step) {
          // Normalized position inside repetitive heartbeat cycle
          const cycleX = ((x + offset) % wavelength + wavelength) % wavelength;
          let deltaY = 0;

          // ECG P-Q-R-S-T cardiac waveform shape
          if (cycleX > 100 && cycleX <= 130) {
            // P Wave (small gentle deflection)
            const p = (cycleX - 100) / 30;
            deltaY = -Math.sin(p * Math.PI) * (14 + bassFactor * 10);
          } else if (cycleX > 140 && cycleX <= 150) {
            // Q Wave (slight dip before spike)
            const q = (cycleX - 140) / 10;
            deltaY = Math.sin(q * Math.PI) * (12 + bassFactor * 8);
          } else if (cycleX > 150 && cycleX <= 170) {
            // R Wave (Massive sharp ventricular contraction spike)
            const r = (cycleX - 150) / 20;
            deltaY = -Math.sin(r * Math.PI) * (75 + bassFactor * 70);
          } else if (cycleX > 170 && cycleX <= 185) {
            // S Wave (Deep rebound dip)
            const s = (cycleX - 170) / 15;
            deltaY = Math.sin(s * Math.PI) * (26 + bassFactor * 20);
          } else if (cycleX > 210 && cycleX <= 260) {
            // T Wave (medium repolarization arch)
            const t = (cycleX - 210) / 50;
            deltaY = -Math.sin(t * Math.PI) * (20 + bassFactor * 16);
          } else {
            // Subtle baseline harmonic shimmer
            deltaY = Math.sin((x * 0.02) + pulsePhase) * (2.5 + bassFactor * 3);
          }

          const y = centerY + deltaY;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      // 1. Ambient outer glow pass
      drawHeartbeatString(true, 0.4, 1.8, 'rgba(0, 229, 117, 0.35)');

      // 2. High-intensity sharp core beam pass
      drawHeartbeatString(false, 1, 1, '#00e575');

      // 3. Central white-hot core line
      drawHeartbeatString(false, 0.9, 0.5, 'rgba(255, 255, 255, 0.85)');

      // Pulsing node particle traveling along the heartbeat
      const leadX = (offset * 1.5) % width;
      ctx.beginPath();
      ctx.arc(leadX, centerY, 3.5 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00e575';
      ctx.shadowBlur = 15;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
