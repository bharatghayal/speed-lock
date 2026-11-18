
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} className="section-padding bg-white overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 font-black uppercase text-sm tracking-widest">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter">The bond of trust</h2>
          <p className="text-gray-500 font-medium text-lg">Hear from the master craftsmen who build India's heritage with Speed Lock.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], [40 * (idx + 1), -40 * (idx + 1)]);
            
            const hoverThemes = [
              "hover:bg-red-500 hover:border-red-500 hover:shadow-red-200",
              "hover:bg-yellow-400 hover:border-yellow-400 hover:shadow-yellow-100",
              "hover:bg-blue-600 hover:border-blue-600 hover:shadow-blue-200"
            ];
            const theme = hoverThemes[idx % 3];

            return (
              <motion.div
                key={review.name}
                style={{ y }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-10 rounded-[40px] flex flex-col justify-between relative group border-2 border-transparent transition-all duration-500 bg-white shadow-xl shadow-gray-100/50 ${theme}`}
              >
                <div className="absolute top-8 right-8 text-blue-900/10 group-hover:text-white/30 transition-colors">
                  <Quote size={60} />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="text-yellow-400 group-hover:text-white" />
                    ))}
                  </div>
                  <p className="text-xl text-blue-900 font-bold leading-relaxed italic group-hover:text-white transition-colors">
                    "{review.content}"
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:border-transparent transition-all">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900 group-hover:text-white transition-colors">{review.name}</h4>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white/80 transition-colors">{review.role}</p>
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

