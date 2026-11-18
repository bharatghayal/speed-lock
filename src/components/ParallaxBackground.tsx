import React, { useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRaw.set((e.clientX / window.innerWidth) - 0.5);
      mouseYRaw.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mouseX = useSpring(mouseXRaw, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mouseYRaw, { stiffness: 50, damping: 20 });

  // x transform maps
  const xTranslate1 = useTransform(mouseX, [-0.5, 0.5], ['-20px', '20px']);
  const xTranslate2 = useTransform(mouseX, [-0.5, 0.5], ['30px', '-30px']);
  const xTranslate3 = useTransform(mouseY, [-0.5, 0.5], ['-10px', '10px']);

  // Drifting gradients parallax influenced by scroll and mouse
  const g1Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const g2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const g3Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 25,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#FFFFFF]">
      {/* Premium White Fog Layers */}
      <motion.div 
        style={{ 
          y: g1Y,
          x: xTranslate1
        }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-white blur-[140px] opacity-80"
      />
      <motion.div 
        style={{ 
          y: g2Y,
          x: xTranslate2
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#f8f9ff] blur-[160px] opacity-60"
      />
      
      {/* Modern Gradient Accents (Extremely Subtle) */}
      <motion.div 
        style={{ 
          y: g3Y,
          x: xTranslate3
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/20 blur-[120px]"
      />

      {/* Floating Ambient Glows */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white via-transparent to-transparent blur-[100px]"
      />

      {/* Atmospheric Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/5 backdrop-blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Interactive Cursor Spotlight with White Blur Glow */}
      <motion.div
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], ['-25vw', '25vw']),
          y: useTransform(mouseY, [-0.5, 0.5], ['-25vh', '25vh']),
        }}
        className="absolute left-[35vw] top-[35vh] w-[35vw] h-[35vh] rounded-full bg-white blur-[100px] opacity-[0.75] mix-blend-screen -z-30 pointer-events-none"
      />

      {/* Clean Ambient Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Edge Softening Glow */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(255,255,255,0.8)] pointer-events-none" />
    </div>
  );
}
