import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { PRODUCTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ProductCard: React.FC<{ product: any; index: number }> = ({ product, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="w-[85vw] h-[85vh] flex-shrink-0 relative group perspective-2000"
    >
       <div 
         className="absolute inset-0 rounded-[60px] overflow-hidden backdrop-blur-3xl border-2 border-white/10 p-12 md:p-20 flex items-center gap-10 md:gap-20 transition-all duration-700 group-hover:border-white/40 group-hover:shadow-[0_0_120px_rgba(0,0,0,0.4)] bg-slate-950"
       >
          {/* Product Color Background Overlay - Shifts on Hover */}
          <div 
            className="absolute inset-0 transition-all duration-1000 opacity-10 group-hover:opacity-100" 
            style={{ 
              backgroundColor: product.color,
              mixBlendMode: 'soft-light'
            }} 
          />
          
          <div 
            className="absolute inset-0 transition-all duration-1000 opacity-0 group-hover:opacity-30 bg-gradient-to-br from-white/20 to-transparent" 
          />

          {/* Primary Mouse Spotlight Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, ${product.color}40, transparent 80%)`
              )
            }}
          />

          {/* High-Intensity Precision Light (White) */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, transparent 70%)`
              ),
              mixBlendMode: 'overlay'
            }}
          />

          <div className="w-[35%] flex flex-col justify-center space-y-8 relative z-20">
             <span className="text-4xl font-black text-white/20 font-mono tracking-tighter italic">0{index + 1}</span>
             <h3 className="text-5xl md:text-7xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">{product.name}</h3>
             <p className="text-xl text-blue-100/40 font-medium leading-relaxed uppercase tracking-widest">{product.tagline}</p>
             <p className="text-lg text-blue-50/60 font-medium">{product.description}</p>
             <div className="pt-10">
                <button className="bg-white text-blue-900 px-10 py-5 rounded-full font-black hover:scale-110 active:scale-95 transition-all shadow-xl shadow-black/10">
                   Technical Data Sheet
                </button>
             </div>
          </div>
          
          <div className="w-[65%] h-full flex items-center justify-center relative">
             <motion.div
               initial={{ scale: 1.15 }}
               whileHover={{ scale: 1.3, rotateY: -10, rotateX: 5 }}
               transition={{ type: 'spring', stiffness: 100, damping: 20 }}
               className="relative z-10 w-full flex justify-center"
             >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto max-h-[85vh] object-contain drop-shadow-[0_80px_120px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
             </motion.div>
             {/* Dynamic Ambient Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full blur-[200px] -z-10 group-hover:opacity-50 transition-opacity duration-1000 opacity-20" style={{ backgroundColor: product.color }} />
          </div>
       </div>
    </motion.div>
  );
}

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-blue-950">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[400vw] flex items-center relative gap-20 px-[10vw]">
          {/* Section Introduction */}
          <div className="w-[100vw] flex-shrink-0">
             <div className="max-w-4xl space-y-6">
                <span className="text-blue-400 font-black uppercase text-xl tracking-[0.5em]">The Gallery</span>
                <h2 className="text-[12vw] font-black text-white leading-none tracking-tighter">
                  INFINITE <br /> <span className="text-yellow-400">POSSIBILITIES.</span>
                </h2>
                <p className="text-2xl text-blue-200/60 max-w-2xl font-medium">
                  Scroll horizontally to explore our flagship range of high-performance adhesives. 
                  Designed for those who demand perfection in every bond.
                </p>
             </div>
          </div>

          {/* Product Panels */}
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}

          {/* End Panel */}
          <div className="w-[100vw] flex-shrink-0 flex items-center justify-center">
             <div className="text-center space-y-10">
                <h2 className="text-8xl font-black text-white tracking-tighter">READY TO <br /> BOND?</h2>
                <button className="bg-blue-600 text-white text-3xl px-16 py-8 rounded-full font-black border-4 border-blue-400/30 hover:bg-white hover:text-blue-900 transition-all shadow-2xl">
                   CONTACT SALES
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
