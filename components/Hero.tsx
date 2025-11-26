
import React, { useRef, useEffect, useState } from 'react';
import GlitchText from './ui/GlitchText';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const words = ["Testing", "Scaling", "Growth", "Coding", "Support"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Neural Network Canvas Animation
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
      let animationFrameId: number;
      let mouse = { x: -1000, y: -1000 };

      const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          initParticles();
      };

      const initParticles = () => {
          particles = [];
          const particleCount = Math.min(window.innerWidth / 15, 80); // Optimized count
          for (let i = 0; i < particleCount; i++) {
              particles.push({
                  x: Math.random() * canvas.width,
                  y: Math.random() * canvas.height,
                  vx: (Math.random() - 0.5) * 0.3,
                  vy: (Math.random() - 0.5) * 0.3,
                  size: Math.random() * 2 + 1
              });
          }
      };

      const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update and draw particles
          particles.forEach((p, i) => {
              p.x += p.vx;
              p.y += p.vy;

              if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
              if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

              // Draw particle
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(160, 216, 239, 0.3)'; // Brand Blue light
              ctx.fill();

              // Connect to mouse
              const dxMouse = mouse.x - p.x;
              const dyMouse = mouse.y - p.y;
              const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
              if (distMouse < 250) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(160, 216, 239, ${0.3 - distMouse / 250})`;
                  ctx.lineWidth = 1;
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(mouse.x, mouse.y);
                  ctx.stroke();
              }
          });

          animationFrameId = requestAnimationFrame(draw);
      };

      window.addEventListener('resize', resize);
      window.addEventListener('mousemove', (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
      });

      resize();
      draw();

      return () => {
          window.removeEventListener('resize', resize);
          cancelAnimationFrame(animationFrameId);
      };
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center z-10 overflow-hidden pb-20">
      
      {/* Interactive Neural Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-auto opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Main Headline */}
      <div className="text-center px-4 relative z-10 pointer-events-none mt-10">
        <h1 className="font-sans font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.1] text-black dark:text-white max-w-7xl mx-auto tracking-tighter transition-colors duration-500">
          
          <div className="block mb-2 md:mb-4">
             <GlitchText text="Let AI handle" speed={100} />
          </div>

          {/* Animated Second Line */}
          <div className="relative h-[1.1em] overflow-hidden">
             {words.map((word, index) => (
               <span 
                key={word}
                className={`absolute top-0 left-0 w-full text-center transition-all duration-700 ease-in-out transform ${
                  index === activeWordIndex 
                    ? 'translate-y-0 opacity-100 text-brand-blue dark:text-brand-blue blur-none' 
                    : 'translate-y-full opacity-0 blur-sm'
                }`}
               >
                 your {word}
               </span>
             ))}
          </div>

        </h1>
        
        <div className="mt-12 opacity-0 animate-slideUp space-y-2" style={{ animationDelay: '600ms' }}>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium tracking-tight">
               We engineer the neural architecture for next-gen enterprises.
            </p>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 font-normal">
               Deploy autonomous agents that scale revenue, not headcount.
            </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fadeIn" style={{ animationDelay: '1000ms' }}>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Explore Capabilities</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-300/0 via-gray-400 to-gray-300/0 dark:from-brand-blue/0 dark:via-brand-blue dark:to-brand-blue/0"></div>
      </div>
    </section>
  );
};

export default Hero;
