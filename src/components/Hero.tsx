
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Droplets, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../constants';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastInteracted, setLastInteracted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  // Mouse Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const productRotateX = useTransform(springY, [-500, 500], [10, -10]);
  const productRotateY = useTransform(springX, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);

  const handleUserInteract = () => {
    setLastInteracted(Date.now());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-slide every 5 seconds, unless there was user interaction within the last 5 seconds
      if (Date.now() - lastInteracted >= 5000) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastInteracted]);

  const currentProduct = PRODUCTS[activeIndex];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center overflow-x-hidden bg-white pt-24 pb-28 md:py-24 lg:py-0"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-white"
      >
        <motion.div 
          className="absolute inset-0 opacity-15 blur-[120px]"
          animate={{ backgroundColor: currentProduct.color }}
          transition={{ duration: 1 }}
        />
        {/* Sparkles/Bubbles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-65"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content Container - Flex row on lg desktop, column on mobile */}
      <motion.div 
        style={{ y: contentY, rotateX }}
        className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 gap-8 lg:gap-14 h-full"
      >
        
        {/* Text Content */}
        <div className="w-full lg:w-[48%] text-left space-y-5 flex flex-col justify-center order-1 lg:order-none z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 md:space-y-5"
            >
              <div className="flex items-center gap-2">
                <motion.span 
                  className="inline-block px-5 py-1.5 rounded-full bg-[#FCF4BC] text-[#8B7300] text-xs md:text-[13px] font-black uppercase tracking-[0.2em] shadow-sm"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  Trusted by 100K+ Carpenters
                </motion.span>
              </div>
              
              <div>
                <motion.h1 
                  className="invert-cursor text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-black leading-[0.9] tracking-tighter text-[#0F172A] uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {currentProduct.name}
                </motion.h1>
              </div>

              <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl font-black text-[#2563EB]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentProduct.tagline}
              </motion.h2>

              <motion.p 
                className="text-gray-600 max-w-lg text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentProduct.description}
              </motion.p>
              
              <div className="flex flex-wrap gap-4 pt-4 md:pt-6">
                <button className="magnetic interactive bg-[#1E293B] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg flex items-center gap-3 md:gap-4 shadow-xl hover:bg-black hover:shadow-2xl transition-all cursor-pointer">
                  Explore Products <ArrowRight size={22} />
                </button>
                <button className="magnetic interactive border-2 border-[#1E293B]/20 text-[#1E293B] px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg hover:bg-[#1E293B]/5 transition-all cursor-pointer">
                  Contact Dealer
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Visual with Interactive Parallax */}
        <div className="w-full lg:w-[52%] flex items-center justify-center relative perspective-2000 py-6 lg:py-0 order-none lg:order-none min-h-[300px] md:min-h-[420px] lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.75, rotateY: -25, x: 60 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: productRotateY,
                rotateX: productRotateX,
                x: 0 
              }}
              whileHover={{ scale: 1.05 }}
              exit={{ opacity: 0, scale: 0.6, rotateY: 25, x: -60 }}
              transition={{ type: 'spring', damping: 22, stiffness: 90 }}
              className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl px-4 flex items-center justify-center preserve-3d"
            >
              <img 
                src={currentProduct.image} 
                alt={currentProduct.fullName}
                className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-[130%] h-auto drop-shadow-[0_45px_60px_rgba(0,0,0,0.3)] scale-105 sm:scale-110 lg:scale-[1.25] xl:scale-[1.35] select-none transition-transform duration-750 ease-out origin-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Complex Bottom Gradient Shadow for authentic floor depth */}
              <div className="absolute -bottom-6 md:-bottom-12 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/15 blur-3xl -z-20 rounded-full" />

              {/* Product Color Tone Ambient Backlighting */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-[120px] -z-10 opacity-40 lg:opacity-30 group-hover:opacity-60 transition-opacity duration-1000"
                style={{ backgroundColor: currentProduct.color }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Drifting subtle particles in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white opacity-40 blur-[2px]"
                animate={{
                  y: [0, -150, -320],
                  x: [0, Math.sin(i) * 80, Math.sin(i) * 160],
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.7,
                }}
                style={{
                  left: `${25 + i * 12}%`,
                  bottom: '15%',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Navigation Controls & Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-6 md:gap-10 w-full max-w-md px-6">
        <button 
          onClick={() => { handleUserInteract(); prevSlide(); }}
          className="magnetic w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#CBD5E1]/45 hover:bg-[#CBD5E1]/80 hover:shadow-md active:scale-95 transition-all text-[#1E293B] cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="md:w-7 md:h-7" />
        </button>
        
        <div className="flex gap-2.5 items-center">
          {PRODUCTS.map((_, index) => (
            <button
              key={index}
              onClick={() => { handleUserInteract(); setActiveIndex(index); }}
              className={`magnetic h-2 transition-all duration-500 hover:scale-x-110 cursor-pointer ${
                index === activeIndex ? 'w-10 sm:w-14 bg-[#2563EB]' : 'w-2 bg-[#CBD5E1]/70'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={() => { handleUserInteract(); nextSlide(); }}
          className="magnetic w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#CBD5E1]/45 hover:bg-[#CBD5E1]/80 hover:shadow-md active:scale-95 transition-all text-[#1E293B] cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="md:w-7 md:h-7" />
        </button>
      </div>

      {/* Bottom Transition Gradient Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent blur-xl z-20 pointer-events-none" />

    </section>
  );
}

