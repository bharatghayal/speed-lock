
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import supportExpertImg from '../assets/images/regenerated_image_1778927756612.jpg';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-blue-900 overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-[100px] opacity-20 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Connect With Our <br /> <span className="text-yellow-400 font-black">Experts</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 font-medium"
          >
            Whether you're a professional craftsman or a DIY enthusiast, we're here to provide the technical support you need.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 shadow-xl flex items-center justify-center text-blue-900 shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-yellow-400 uppercase text-xs tracking-wider mb-2">Location</h4>
                    <p className="text-sm font-bold text-white/90 leading-relaxed">
                      V9GJ+GCH, MIDC Industrial Area, Chilkalthana, <br />
                      Chhatrapati Sambhajinagar, MH 431006
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 shadow-xl flex items-center justify-center text-blue-900 shrink-0 overflow-hidden">
                      <img 
                        src={supportExpertImg} 
                        alt="Support Expert" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to Icon if image fails
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <Phone size={28} className="absolute z-[-1]" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-blue-900 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-black text-yellow-400 uppercase text-xs tracking-wider mb-0.5">Helpline</h4>
                    <p className="text-sm font-bold text-white/90 leading-tight">
                      +91 1800 123 4567 <br />
                      <span className="text-[10px] text-blue-100/60 uppercase">Mon - Sat: 9AM - 6PM</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 shadow-xl flex items-center justify-center text-blue-900 shrink-0">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-yellow-400 uppercase text-xs tracking-wider mb-2">Email</h4>
                    <p className="text-sm font-bold text-white/90 leading-relaxed">
                      support@speedlock.in <br />
                      sales@speedlock.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-[40px] border border-white/20 space-y-6 shadow-2xl">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:ring-2 focus:ring-yellow-400 font-bold text-white outline-none placeholder-white/20 transition-all" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white uppercase tracking-widest ml-4">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:ring-2 focus:ring-yellow-400 font-bold text-white outline-none placeholder-white/20 transition-all" placeholder="email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white uppercase tracking-widest ml-4">Inquiry Type</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:ring-2 focus:ring-yellow-400 font-bold text-white outline-none appearance-none cursor-pointer transition-all">
                  <option className="bg-blue-900">General Support</option>
                  <option className="bg-blue-900">Become a Dealer</option>
                  <option className="bg-blue-900">Product Inquiry</option>
                  <option className="bg-blue-900">Bulk Order</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white uppercase tracking-widest ml-4">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:ring-2 focus:ring-yellow-400 font-bold text-white outline-none resize-none placeholder-white/20 transition-all" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button className="w-full bg-yellow-400 text-blue-900 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all group active:scale-95">
                Send Message
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Map Integration */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[500px] lg:min-h-full rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.1287661273397!2d75.3855523!3d19.87677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb93d8b6a38db3%3A0x6a0e44f08e0a84d4!2sV9GJ%2BGCH%2C%20MIDC%20Industrial%20Area%2C%20Chilkalthana%2C%20Chhatrapati%20Sambhajinagar%2C%20Maharashtra%20431006!5e0!3m2!1sen!2sin!4v1715830000000!5m2!1sen!2sin" 
              className="w-full h-full absolute inset-0 grayscale contrast-125 focus:grayscale-0 transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Visual Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
