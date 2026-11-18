import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  parallaxSpeed?: number;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = "",
  parallaxSpeed = 35
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Soft vertical parallax translation guided by page scroll position
  const rawY = useTransform(scrollYProgress, [0, 1], [parallaxSpeed, -parallaxSpeed]);
  const yParallax = useSpring(rawY, { stiffness: 75, damping: 24 });

  // Soft continuous scrolling opacity
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);
  const opacityParallax = useSpring(rawOpacity, { stiffness: 95, damping: 28 });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const topGlowOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.6]);
  const bottomGlowOpacity = useTransform(scrollYProgress, [0.85, 1], [0.6, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Soft white blur glow effects at section boundaries */}
      <motion.div 
        style={{ opacity: topGlowOpacity }}
        className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white via-white/50 to-transparent blur-3xl -z-10 pointer-events-none" 
      />
      <motion.div 
        style={{ opacity: bottomGlowOpacity }}
        className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/50 to-transparent blur-3xl -z-10 pointer-events-none" 
      />

      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ y: yParallax, opacity: opacityParallax }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
