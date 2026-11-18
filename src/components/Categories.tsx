
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Hammer, Zap, Building, Droplets, Settings, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { 
    title: "Wood Adhesive", 
    icon: Hammer, 
    color: "bg-orange-600", 
    hoverColor: "hover:bg-orange-600",
    desc: "Premium bonding for high-end furniture and carpentry." 
  },
  { 
    title: "Instant Glue", 
    icon: Zap, 
    color: "bg-yellow-500", 
    hoverColor: "hover:bg-yellow-500",
    desc: "Rapid adhesion for quick fixes and assembly lines." 
  },
  { 
    title: "Construction", 
    icon: Building, 
    color: "bg-blue-600", 
    hoverColor: "hover:bg-blue-600",
    desc: "Heavy-duty solutions for architectural bonding." 
  },
  { 
    title: "PVC & Plastics", 
    icon: Droplets, 
    color: "bg-green-600", 
    hoverColor: "hover:bg-green-600",
    desc: "Specialized formulas for leak-proof pipe joints." 
  },
  { 
    title: "Industrial", 
    icon: Settings, 
    color: "bg-purple-600", 
    hoverColor: "hover:bg-purple-600",
    desc: "Large scale bonding for manufacturing units." 
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-blue-600 font-black uppercase text-sm tracking-widest">CATEGORIES</span>
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter">Engineered for every material</h2>
          </div>
          <button className="interactive group flex items-center gap-2 text-blue-900 font-bold hover:underline">
            View All Specialized Solutions <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], [20 * (idx % 3 + 1), -20 * (idx % 3 + 1)]);
            
            return (
              <motion.div
                key={cat.title}
                style={{ y }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group interactive relative bg-white p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ${cat.hoverColor} border-2 border-transparent hover:border-white/20`}
              >
                {/* Background Glass Glow (kept for extra depth) */}
                <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[80px] -z-10 ${cat.color}`} />
                
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg group-hover:bg-white group-hover:text-blue-900`}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-blue-900 mb-3 group-hover:text-white transition-colors">{cat.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
                  {cat.desc}
                </p>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-white/20 overflow-hidden">
                  <motion.div 
                    className={`h-full ${cat.color} group-hover:bg-white`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-xs font-black uppercase tracking-widest text-blue-900 group-hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                    Explore <ChevronRight size={14} />
                  </button>
                  <div className="w-10 h-10 rounded-full border border-gray-100 group-hover:border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-500">
                     <ChevronRight size={16} className="text-blue-900 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

