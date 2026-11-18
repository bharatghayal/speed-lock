
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Droplets, Trophy } from 'lucide-react';

export default function WhyChoose() {
  return (
    <section id="about" className="section-padding bg-blue-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-[150px] -mr-48 -mt-48 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-[150px] -ml-48 -mb-48 opacity-20" />

      <div className="container mx-auto relative z-10 px-6">
        <div className="flex flex-col items-center text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-6"
          >
            <div className="text-yellow-400 font-black uppercase text-sm tracking-widest block">
              Speed Lock Adhesives: Strong Bonds. Lasting Performance.
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase text-white">
              Sirf Chipkaye Nahi, <br className="hidden md:inline" /> Mazbooti Ke Saath Jode.
            </h2>
            <p className="text-lg md:text-xl text-blue-100 font-medium leading-relaxed max-w-3xl mx-auto space-y-4">
              <span className="block mb-4">
                Speed Lock Adhesives is committed to delivering high-quality adhesive solutions that offer strength, durability, and reliability. Our philosophy is simple: <strong className="text-yellow-400">Sirf Chipkaye Nahi, Mazbooti Ke Saath Jode.</strong>
              </span>
              <span className="block mb-4">
                Designed for Indian conditions, our adhesives provide superior bonding strength, water resistance, and excellent coverage, helping reduce wastage while improving efficiency. Backed by advanced manufacturing, strict quality standards, and a strong distribution network, we ensure consistent performance and dependable supply.
              </span>
              <span className="block mb-4">
                For professionals, retailers, and end users alike, Speed Lock means quality you can trust and results that last.
              </span>
              <span className="block text-yellow-400 font-bold uppercase tracking-wider mt-4">
                Speed Lock Adhesives – Sirf Chipkaye Nahi, Mazbooti Ke Saath Jode.
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {[
              { icon: Shield, title: "Industrial Strength", desc: "Formulated for heavy load-bearing structures." },
              { icon: Droplets, title: "Weather Resistance", desc: "Perfectly stable in extreme heat and humidity." },
              { icon: Zap, title: "Instant Grip", desc: "Fast setting time to boost your productivity." },
              { icon: Trophy, title: "Premium Quality", desc: "Conforms to international D3 and D4 standards." },
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 md:p-10 rounded-[32px] bg-white/5 border border-white/10 hover:bg-yellow-400 hover:border-yellow-400 transition-all duration-300 group cursor-default text-left flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  <item.icon size={40} className="text-yellow-400 mb-6 group-hover:text-blue-900 transition-colors" />
                  <h3 className="text-2xl font-black mb-3 group-hover:text-blue-900 transition-colors">{item.title}</h3>
                </div>
                <p className="text-blue-100/60 text-base font-medium leading-relaxed group-hover:text-blue-900/80 transition-colors mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
