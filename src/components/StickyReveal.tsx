import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Clock, ShieldCheck, CloudSun, Sparkles } from 'lucide-react';
import superFastImg from '../assets/images/regenerated_image_1778928864132.png';
import goldImg from '../assets/images/regenerated_image_1778929256491.png';
import aquaticImg from '../assets/images/regenerated_image_1778929259387.png';

const REVEALS = [
  {
    id: "advantage-instant-bonding",
    tag: "CORE ADVANTAGE 01",
    title: "Instant Bonding",
    description: "Our proprietary formula achieves handling strength in just 15 minutes, allowing you to move to the next stage of your project faster than ever.",
    image: superFastImg, // Super Fast Adhesive
    glowColor: "rgba(243, 112, 33, 0.15)",
    solidColor: "#F37021",
    textHighlight: "text-[#F37021]",
    icon: Clock,
  },
  {
    id: "advantage-termite-shield",
    tag: "CORE ADVANTAGE 02",
    title: "Termite Proof Shield",
    description: "Built-in anti-pest additives ensure that your wood joints are protected from within, preventing long-term structural damage.",
    image: goldImg, // Gold Adhesive
    glowColor: "rgba(254, 221, 0, 0.15)",
    solidColor: "#FEDD00",
    textHighlight: "text-[#DDAF00]",
    icon: ShieldCheck,
  },
  {
    id: "advantage-weather-resistant",
    tag: "CORE ADVANTAGE 03",
    title: "Weather Resistant",
    description: "Tested in 95% humidity and extreme temperatures. Whether it's the coastal monsoons or the northern heat, your bond stays true.",
    image: aquaticImg, // Aquatic Adhesive
    glowColor: "rgba(0, 174, 239, 0.15)",
    solidColor: "#00AEEF",
    textHighlight: "text-[#2563EB]",
    icon: CloudSun,
  }
];

export default function StickyReveal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic index selector based on precise scroll thresholds
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveIndex(0);
    } else if (latest >= 0.35 && latest < 0.68) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Soft parallax scroll transforms for background ambient light
  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const handleScrollToDetail = (idx: number) => {
    const headerOffset = 180;
    const parent = containerRef.current;
    if (parent) {
      const scrollHeight = parent.clientHeight;
      const step = scrollHeight / REVEALS.length;
      const targetScroll = parent.offsetTop + (idx * step) + 50;
      
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -headerOffset,
        });
      } else {
        window.scrollTo({
          top: targetScroll - headerOffset,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      id="core-advantages" 
      ref={containerRef} 
      className="relative bg-white text-slate-900 py-12 md:py-20 overflow-visible border-y border-slate-100"
    >
      {/* Background Soft Interactive White Blur Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: bgY }}
          className="absolute right-0 top-1/4 w-[60vw] h-[60vh] rounded-full bg-gradient-to-tr from-blue-50/40 via-white to-transparent blur-[120px] opacity-70"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [120, -120]) }}
          className="absolute left-[-10vw] bottom-1/4 w-[50vw] h-[50vh] rounded-full bg-gradient-to-br from-slate-50 via-white to-transparent blur-[140px] opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Modern Minimal Heading */}
        <div id="advantages-header" className="max-w-4xl mb-12 sm:mb-20 space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-extrabold tracking-[0.2em] uppercase text-xs sm:text-sm">
            <Sparkles size={16} className="text-yellow-500 animate-pulse" />
            <span>Unmatched Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
            Designed for <br /> Absolute Performance.
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg max-w-xl">
            Explore the advanced materials science that makes Speed Lock a trusted name across the Indian woodworking community.
          </p>
        </div>

        {/* Desktop Split Sticky Layout (lg and above) */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start relative min-h-[170vh]">
          
          {/* Scrollable Text Content (Left 5 Columns) */}
          <div className="col-span-5 space-y-24 py-12">
            {REVEALS.map((reveal, index) => {
              const active = index === activeIndex;
              const Icon = reveal.icon;
              return (
                <div 
                  key={reveal.id} 
                  id={reveal.id}
                  className="min-h-[45vh] flex flex-col justify-center transition-all duration-500"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black tracking-[0.25em] uppercase ${active ? 'text-blue-600' : 'text-slate-400'} transition-colors duration-300`}>
                        {reveal.tag}
                      </span>
                      <div className={`h-[1px] w-12 transition-all duration-500 ${active ? 'bg-blue-600 w-20' : 'bg-slate-200'}`} />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-2xl border transition-all duration-500 ${
                        active 
                          ? 'bg-blue-50 border-blue-100 text-blue-600 shadow-sm' 
                          : 'bg-slate-50 border-slate-100 text-slate-400'
                      }`}>
                        <Icon size={26} />
                      </div>
                      <div className="space-y-4">
                        <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight transition-all duration-300 ${
                          active ? 'text-slate-900 scale-102 origin-left' : 'text-slate-400'
                        }`}>
                          {reveal.title}
                        </h3>
                        <p className={`text-lg leading-relaxed transition-all duration-500 font-medium ${
                          active ? 'text-slate-650 font-semibold' : 'text-slate-400/80 font-normal'
                        }`}>
                          {reveal.description}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleScrollToDetail(index)}
                      className={`magnetic interactive flex items-center gap-2 font-black text-sm uppercase tracking-wider py-2 group/btn transition-all duration-300 cursor-pointer ${
                        active ? `${reveal.textHighlight} opacity-100` : 'text-slate-400 opacity-0 pointer-events-none'
                      }`}
                    >
                      <span>Explore Technology</span>
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Visual Container (Right 7 Columns) */}
          <div className="col-span-7 sticky top-1/4 h-[580px] w-full flex items-center justify-center bg-slate-50/50 rounded-[40px] border border-slate-100/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] overflow-hidden">
            
            {/* Dynamic Ambient Glow Behind Bottles */}
            <div className="absolute inset-x-0 top-1/4 bottom-1/4 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8 }}
                  className="w-[300px] h-[300px] rounded-full blur-[100px] opacity-60"
                  style={{ backgroundColor: REVEALS[activeIndex].glowColor }}
                />
              </AnimatePresence>
            </div>

            {/* Custom Interactive Elements */}
            <div className="absolute top-8 right-8 text-neutral-300 font-mono text-xs flex items-center gap-1.5 select-none font-bold">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
               SECURE_SEAL_ACTIVE_0{activeIndex + 1}
            </div>

            {/* Main Dynamic Product Render */}
            <div className="relative w-full h-[85%] flex items-center justify-center z-10 select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.75, r: 15, y: 30 }}
                  animate={{ opacity: 1, scale: 1, r: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, r: -15, y: -30 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="relative flex items-center justify-center w-full h-full cursor-pointer group"
                >
                  <img 
                    src={REVEALS[activeIndex].image} 
                    alt={REVEALS[activeIndex].title}
                    className="h-[80%] max-h-[380px] w-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.12)] object-contain transition-transform duration-700 pointer-events-none group-hover:rotate-2 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Circular Tech Reticle */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[360px] h-[360px] rounded-full border border-dashed pointer-events-none -z-10 bg-white/5 opacity-50"
                    style={{ borderColor: REVEALS[activeIndex].solidColor }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Side Scroll Dots Progress Bar */}
            <div id="sticky-scroll-pills" className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
              {REVEALS.map((_, i) => (
                <button
                  key={i}
                  id={`scroll-step-pill-${i}`}
                  onClick={() => handleScrollToDetail(i)}
                  className={`magnetic group p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer`}
                  aria-label={`Scroll to section ${i + 1}`}
                >
                  <div className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === activeIndex 
                      ? 'w-7 bg-blue-600' 
                      : 'w-2.5 bg-slate-200 hover:bg-slate-350'
                  }`} />
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Mobile & Tablet Elegant Stacked Layout (< lg) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {REVEALS.map((reveal, index) => {
            const Icon = reveal.icon;
            return (
              <motion.div
                key={reveal.id}
                id={`${reveal.id}-mobile`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-[30px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all"
              >
                {/* Micro Ambient Glow Accent */}
                <div 
                  className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-2xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: reveal.solidColor }}
                />

                <div className="space-y-6 relative z-10 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-[0.2em] text-slate-400">
                      {reveal.tag}
                    </span>
                    <div className="p-3 bg-white border border-slate-100 rounded-xl text-blue-600 shadow-sm">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {reveal.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-semibold">
                      {reveal.description}
                    </p>
                  </div>
                </div>

                {/* Compact elegant image mockup for mobile */}
                <div className="relative h-44 mt-6 flex items-center justify-center select-none bg-white/80 border border-slate-100 rounded-2xl overflow-hidden py-4">
                  <img 
                    src={reveal.image} 
                    alt={reveal.title}
                    className="h-full w-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)] object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle, ${reveal.glowColor} 0%, transparent 70%)` }}
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/50 flex justify-end">
                  <button className="interactive text-blue-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 py-1 select-none">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
