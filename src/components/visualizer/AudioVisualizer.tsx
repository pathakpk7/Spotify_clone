import React, { useEffect, useRef } from 'react';
import { VisualizerMode } from '../../types/music';
import { audioEngine } from '../../services/audioEngine';

interface AudioVisualizerProps {
  mode: VisualizerMode;
  isPlaying: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ mode, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

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
      ctx.clearRect(0, 0, width, height);

      const freqData = audioEngine.getFrequencyData();
      const timeData = audioEngine.getTimeDomainData();

      step += isPlaying ? 0.03 : 0.01;

      if (mode === 'waveform') {
        // Mode 1: Organic Kinetic Waveform
        const lines = 3;
        for (let l = 0; l < lines; l++) {
          ctx.beginPath();
          ctx.lineWidth = 1.5 * (window.devicePixelRatio || 1);
          ctx.strokeStyle = l === 0 
            ? 'rgba(0, 229, 117, 0.45)' 
            : l === 1 
              ? 'rgba(255, 255, 255, 0.14)' 
              : 'rgba(0, 229, 117, 0.18)';

          for (let x = 0; x < width; x += 6) {
            const index = Math.floor((x / width) * timeData.length);
            const val = (timeData[index] || 128) - 128;
            const liveAmp = isPlaying ? (val * 1.8) : 0;
            const waveAmp = (height * 0.15) + (isPlaying ? 30 : 0);
            const y = height / 2 + Math.sin(x * 0.003 + step + l) * waveAmp + liveAmp;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (mode === 'bars') {
        // Mode 2: 64-Band Symmetrical Spectrum Bars
        const barCount = 48;
        const barWidth = (width / barCount) * 0.65;
        const gap = (width / barCount) * 0.35;

        for (let i = 0; i < barCount; i++) {
          const freqIndex = Math.floor((i / barCount) * (freqData.length / 2));
          const magnitude = isPlaying ? (freqData[freqIndex] || 0) : Math.sin(step + i * 0.2) * 20 + 25;
          const barHeight = (magnitude / 255) * (height * 0.65);
          const x = i * (barWidth + gap);
          const y = height - barHeight;

          // Gradient bar
          const grad = ctx.createLinearGradient(0, y, 0, height);
          grad.addColorStop(0, '#00e575');
          grad.addColorStop(1, 'rgba(0, 229, 117, 0.05)');

          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      } else if (mode === 'radial') {
        // Mode 3: Circular Holographic Sound Radar
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.22;
        const points = 64;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 229, 117, 0.6)';
        ctx.lineWidth = 2 * (window.devicePixelRatio || 1);

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const freqIndex = Math.floor((i / points) * (freqData.length / 2));
          const boost = isPlaying ? (freqData[freqIndex] || 0) * 0.4 : Math.sin(step * 2 + i) * 8;
          const r = baseRadius + boost;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 117, 0.08)';
        ctx.fill();
      } else if (mode === 'orb') {
        // Mode 4: Kinetic Particle Orb
        const centerX = width / 2;
        const centerY = height / 2;
        const particleCount = 70;

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + step * 0.3;
          const freqIndex = Math.floor((i / particleCount) * (freqData.length / 3));
          const pulse = isPlaying ? (freqData[freqIndex] || 0) * 0.7 : 10;
          const dist = 60 + pulse + Math.sin(step + i) * 20;

          const px = centerX + Math.cos(angle) * dist;
          const py = centerY + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(px, py, 2.5 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00e575' : '#ffffff';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, isPlaying]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
