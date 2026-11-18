
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';

export default function CTA() {
  return (
    <section id="dealers" className="px-6 pb-20">
      <div className="container mx-auto px-10 py-18 rounded-[60px] bg-gradient-to-br from-white via-slate-50/80 to-blue-50/50 border border-slate-100/80 relative overflow-hidden text-center text-slate-900 shadow-[0_30px_70px_rgba(37,99,235,0.06)]">
        {/* Dynamic Color-Shifting Glow Shapes in high-end light-mode palette */}
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.25] pointer-events-none bg-[#EAB308]"
          style={{ mixBlendMode: 'multiply' }}
        />
        <motion.div 
          animate={{
            scale: [1.2, 0.95, 1.2],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full blur-[140px] opacity-[0.18] pointer-events-none bg-[#2563EB]"
          style={{ mixBlendMode: 'multiply' }}
        />
        <motion.div 
          animate={{
            scale: [0.9, 1.15, 0.9],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[110px] opacity-[0.12] pointer-events-none bg-blue-400"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Animated Background Grid for light mode */}
        <motion.div 
          className="absolute inset-0 opacity-[0.06]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #2563EB 1.5px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm text-sm font-black text-blue-600 uppercase tracking-widest shadow-sm"
          >
            BECOME A PARTNER
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 uppercase">
            Build Stronger With <br className="hidden md:inline" /> <span className="text-blue-600 italic">Speed Lock</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
            Join India's fastest growing network of adhesive dealers and professional carpenters. Superior products, exceptional support.
          </p>

          <div className="flex flex-wrap justify-center gap-5 pt-4 text-white">
            <button className="interactive bg-blue-600 text-white px-10 py-5 rounded-full font-black text-base md:text-lg flex items-center gap-3 shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-95 transition-all cursor-pointer magnetic">
              Request Dealer Kit <ArrowRight size={20} />
            </button>
            <button className="interactive bg-white border-2 border-slate-200/80 text-slate-800 px-10 py-5 rounded-full font-black text-base md:text-lg flex items-center gap-3 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-sm cursor-pointer magnetic">
              Find Near Me
            </button>
          </div>

          <div className="flex justify-center items-center gap-10 pt-10 border-t border-slate-200/80 text-slate-800">
             <div className="flex flex-col items-center gap-2">
                <Phone size={24} className="text-blue-600" />
                <span className="text-sm md:text-base font-black">1800-SPEED-LOCK</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <MessageSquare size={24} className="text-teal-600" />
                <span className="text-sm md:text-base font-black">Live Support 24/7</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
