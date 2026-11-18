import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { PRODUCTS } from '../constants';

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springScroll = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-40">
          {PRODUCTS.slice(0, 3).map((product, i) => (
            <ShowcaseRow 
              key={product.id} 
              product={product} 
              index={i} 
              scrollProgress={springScroll} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ShowcaseRowProps {
  product: any;
  index: number;
  scrollProgress: any;
  key?: any;
}

function ShowcaseRow({ product, index, scrollProgress }: ShowcaseRowProps) {
  const isEven = index % 2 === 0;
  
  // Parallax offsets
  const y1 = useTransform(scrollProgress, [0, 1], [100 * (index + 1), -100 * (index + 1)]);
  const y2 = useTransform(scrollProgress, [0, 1], [50 * (index + 1), -50 * (index + 1)]);
  const rotateGlow = useTransform(scrollProgress, [0, 1], [0, 45]);

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
      {/* Product Image with Layered Parallax */}
      <div className="w-full lg:w-1/2 relative group">
        <motion.div 
          style={{ y: y1 }}
          className="relative z-10 perspective-1000"
        >
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto drop-shadow-2xl interactive"
            whileHover={{ scale: 1.05, rotateY: isEven ? 5 : -5 }}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Ambient Glow Background */}
        <motion.div 
          style={{ y: y2, rotate: rotateGlow, backgroundColor: product.color }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[120px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000 -z-10"
        />

        {/* Floating badge */}
        <motion.div
           style={{ y: y2 }}
           className={`absolute ${isEven ? '-right-10' : '-left-10'} top-10 z-20 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white hidden md:block`}
        >
           <p className="text-blue-900 font-black text-2xl">99.9%</p>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reliability Rate</p>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="text-blue-600 font-black uppercase text-sm tracking-[0.3em]">Precision Engineering</span>
          <h3 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter leading-tight">
            {product.fullName}
          </h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
            {product.description}
          </p>
          <div className="pt-6">
            <button className="interactive magnetic bg-blue-900 text-white px-10 py-5 rounded-full font-black flex items-center gap-3 group transition-all hover:pr-12">
              View Technical Specs 
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight size={20} />
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
