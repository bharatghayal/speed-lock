
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Thermometer, Zap, Hand, Droplets, Link2, Clock, ShieldCheck, Factory, Trophy } from 'lucide-react';
import { PRODUCTS } from '../constants';

// Map product feature text to icons
const FEATURE_ICONS: Record<string, any> = {
  "High Heat Resistance": Thermometer,
  "Superior Strength": Link2,
  "Quick Grab": Hand,
  "Waterproof": Droplets,
  "Next-Gen Formula": ShieldCheck,
  "D3 Grade Waterproof": Droplets,
  "Bubble-Free": Zap,
  "Termite Resistant": ShieldCheck,
  "Heavy Duty": Factory,
  "Instant Bonding": Clock,
  "Weather Proof": Droplets,
};

const PRODUCT_DETAILED_FEATURES: Record<string, Array<{ icon: any, title: string, desc: string }>> = {
  aquatic: [
    { icon: Droplets, title: "WATERPROOF", desc: "D3-grade waterproof for high moisture." },
    { icon: Link2, title: "HIGH STRENGTH", desc: "Uncompromising bonding durability." },
    { icon: Zap, title: "BUBBLE-FREE", desc: "Engineered bubble-free flawless finish." },
    { icon: ShieldCheck, title: "TERMITE RESIST", desc: "Inherent protection against wood pests." }
  ],
  gold: [
    { icon: Thermometer, title: "HIGH HEAT", desc: "Stable in extreme heat & high humidity." },
    { icon: Link2, title: "NEXT-GEN", desc: "Superior strength with higher coverage." },
    { icon: Hand, title: "QUICK GRAB", desc: "Speedy initial tack for swift assembly." },
    { icon: Droplets, title: "WATER RESIST", desc: "Moisture-resistant formula for longevity." }
  ],
  ultra: [
    { icon: ShieldCheck, title: "DIN EN 204", desc: "Fully conforms to European standards." },
    { icon: Factory, title: "HEAVY DUTY", desc: "High structural weight support capability." },
    { icon: Clock, title: "FAST BOND", desc: "Cures rapidly to optimize production rate." },
    { icon: Trophy, title: "PRO QUALITY", desc: "Premium industrial grade adhesive force." }
  ],
  "super-fast": [
    { icon: Clock, title: "SUPER FAST", desc: "Minimizes clamp time for custom builds." },
    { icon: ShieldCheck, title: "ANTI-TERMITE", desc: "Protects joints and wood surfaces permanently." },
    { icon: Zap, title: "ANTI-BUBBLE", desc: "Ensures uniform laydown with no air voids." },
    { icon: Droplets, title: "WEATHER PROOF", desc: "High endurance in intense outdoor climate." }
  ],
  "pro-grip": [
    { icon: ShieldCheck, title: "PRO SPEC", desc: "Recommended choice for high-end carpentry." },
    { icon: Link2, title: "HIGH BOND", desc: "Creates extremely resilient adhesive lines." },
    { icon: Clock, title: "DRY TIME", desc: "Optimized assembly buffer before drying." },
    { icon: Zap, title: "VISCOSITY", desc: "Thicker consistency for drip-free setups." }
  ]
};

export default function ThreeDCarousel() {
  const [index, setIndex] = useState(1); // Set to Gold by default (index 1)
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid motion
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  const prev = () => setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  const next = () => setIndex((prev) => (prev + 1) % PRODUCTS.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 10000); 
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section-padding bg-[#0a0a0a] overflow-hidden relative min-h-screen flex flex-col justify-center"
    >
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative h-[700px] md:h-[820px] flex items-center justify-center">
        {/* Navigation - Circle Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 md:px-12 z-50 pointer-events-none">
           <button onClick={prev} className="magnetic w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white/50 hover:text-white bg-white/10 backdrop-blur-xl border border-white/20 pointer-events-auto transition-all duration-500 hover:scale-110 active:scale-95 group shadow-2xl">
             <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
           </button>
           <button onClick={next} className="magnetic w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white/50 hover:text-white bg-white/10 backdrop-blur-xl border border-white/20 pointer-events-auto transition-all duration-500 hover:scale-110 active:scale-95 group shadow-2xl">
             <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>

        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center perspective-[3000px]">
          {PRODUCTS.map((product, i) => {
            const offset = (i - index + PRODUCTS.length) % PRODUCTS.length;
            const displayOffset = offset > PRODUCTS.length / 2 ? offset - PRODUCTS.length : offset;
            const isCenter = displayOffset === 0;
            const isVisible = Math.abs(displayOffset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={product.id}
                animate={{
                  x: displayOffset * 460,
                  scale: isCenter ? 1 : 0.75,
                  rotateY: displayOffset * -30,
                  z: isCenter ? 0 : -500,
                  opacity: isCenter ? 1 : 0.3,
                  filter: isCenter ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full max-w-[420px] md:max-w-[480px] z-10"
                style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
              >
                <div className="relative w-full aspect-[4/5.5] rounded-[30px] md:rounded-[50px] overflow-visible group">
                  {/* The Background Frame */}
                  <div className="absolute inset-0 rounded-[30px] md:rounded-[50px] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-1000 group-hover:scale-[1.01]">
                      {/* Top Section - Brand Color */}
                      <div 
                        className="h-[40%] w-full relative overflow-hidden flex flex-col items-center p-6 pt-10 md:pt-12 transition-colors duration-1000" 
                        style={{ background: product.color }} 
                      >
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.4),_transparent_70%)] opacity-20" />
                         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
                         
                         {/* Product Branding */}
                         <div className="relative z-10 space-y-0.5 text-center w-full px-4 flex flex-col items-center">
                           <span className="text-white/80 font-black uppercase text-[8px] md:text-[10px] tracking-[0.5em] block mb-1">ULTRA_SERIES</span>
                           <h3 className="text-[21px] md:text-[34px] font-black uppercase tracking-tight whitespace-nowrap drop-shadow-md text-white">
                             SPEEDLOCK <span className="italic" style={{ color: product.id === 'gold' ? '#1e293b' : 'rgba(255,255,255,0.85)' }}>{product.name}</span>
                           </h3>
                           <p className="text-white/90 font-bold uppercase text-[6px] md:text-[8px] tracking-[0.2em] pt-2 drop-shadow-sm">NEXT-GENERATION WOOD ADHESIVE</p>
                         </div>
                      </div>

                      {/* Bottom Section - Feature Rich Grid */}
                      <div className="h-[60%] w-full bg-white p-5 md:p-8 flex flex-col justify-end space-y-4 md:space-y-6 relative overflow-hidden">
                        {/* Features Grid */}
                        <div className="grid grid-cols-4 gap-1.5 md:gap-3 z-10 relative">
                          {(PRODUCT_DETAILED_FEATURES[product.id] || PRODUCT_DETAILED_FEATURES.gold).map((feat, idx) => {
                            const Icon = feat.icon;
                            const labelColor = product.id === 'gold' ? '#b45309' : product.color;
                            return (
                              <div key={idx} className="flex flex-col items-center text-center space-y-1.5 group/feat">
                                <div 
                                  className="w-10 h-10 md:w-13 md:h-13 rounded-full flex items-center justify-center transition-all duration-500 bg-slate-50 border border-slate-100"
                                  style={{ color: labelColor }}
                                >
                                   <Icon size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="space-y-0.5 mt-1">
                                  <span className="text-[6.5px] md:text-[9.5px] font-black uppercase text-slate-900 leading-none block tracking-tight">{feat.title}</span>
                                  <p className="text-[5px] md:text-[7.5px] text-slate-400 font-semibold leading-relaxed hidden md:block max-w-[90px] mx-auto">
                                    {feat.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom Summary text */}
                        <div className="pt-3 border-t border-slate-100 text-center flex flex-col items-center">
                           <p className="text-slate-400 font-black uppercase text-[6px] md:text-[8px] tracking-[0.3em] mb-1">
                             CRAFTSMAN'S CHOICE
                           </p>
                           <p className="text-slate-500 font-medium text-[8px] md:text-[11px] leading-relaxed max-w-[320px] mx-auto">
                             {product.description}
                           </p>
                           {isCenter && (
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 window.location.hash = `#product-${product.id}`;
                               }}
                               className="mt-3 py-1.5 px-4 text-[9px] font-black uppercase text-white bg-slate-900 hover:bg-black tracking-wider rounded-lg transition-all cursor-pointer hover:shadow active:scale-95 flex items-center gap-1"
                             >
                               <span>Interactive Specs</span>
                             </button>
                           )}
                        </div>
                      </div>
                  </div>

                  {/* Product Image - Scaled UP and perfectly centered */}
                  <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] md:w-[115%] z-40 pointer-events-none">
                    <motion.div 
                      animate={isCenter ? { 
                        y: [0, -12, 0],
                        rotate: [0, 0.5, 0, -0.5, 0]
                      } : {}}
                      transition={{ 
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="relative"
                    >
                      <motion.div 
                        whileHover={isCenter ? { scale: 1.05 } : {}}
                        className="relative flex items-center justify-center"
                      >
                          {/* Ground Shadow */}
                          <motion.div 
                            initial={false}
                            animate={isCenter ? { 
                              scale: [1, 0.95, 1],
                              opacity: [0.35, 0.2, 0.35],
                              filter: ["blur(40px)", "blur(50px)", "blur(40px)"]
                            } : { opacity: 0 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-10 bg-black/80 rounded-full -z-10" 
                          />
                          
                          {/* Product Glow */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[120px] opacity-20 -z-20" style={{ backgroundColor: product.color }} />

                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto drop-shadow-[0_45px_65px_rgba(0,0,0,0.55)] relative z-10 select-none pb-4"
                            referrerPolicy="no-referrer"
                          />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Premium Cinematic Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative flex items-center"
          >
            <div className={`transition-all duration-1000 rounded-full ${
              index === i ? 'w-8 h-1.5 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]' : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'
            }`} />
          </button>
        ))}
      </div>
      
      <div className="absolute bottom-3 left-0 w-full text-center">
         <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.8em] block">PREMIUM QUALITY. MAXIMUM PERFORMANCE.</span>
      </div>
    </section>
  );
}
