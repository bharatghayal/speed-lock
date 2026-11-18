
import React from 'react';

import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A172F] text-slate-200 pt-20 pb-10 px-6 border-t border-blue-950">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 group cursor-pointer transition-all duration-500">
              <img 
                src={`https://lh3.googleusercontent.com/d/1ATcb9LNPVwwFtGMAY0_ygGP7w-zkLAgV`} 
                alt="Speed Lock Logo" 
                className="h-12 w-auto object-contain brightness-110 filter hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="fallback-logo hidden flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Zap size={22} fill="currentColor" className="text-yellow-400" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase flex flex-col leading-none">
                  Speed
                  <span className="text-blue-400 text-[10px] tracking-[0.3em] font-black -mt-0.5">Adhesive</span>
                </span>
              </div>
            </a>
            <p className="text-slate-400 font-medium leading-relaxed">
              Pioneering modern bonding solutions for the Indian subcontinent. Quality, strength, and trust since inception.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-all border border-blue-800/40">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-all border border-blue-800/40">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center text-white font-bold hover:scale-110 transition-all border border-blue-800/40">LI</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8 border-b border-blue-900 pb-2">PRODUCTS</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#product-gold" className="hover:text-yellow-400 transition-colors">Speed Lock Gold</a></li>
              <li><a href="#product-aquatic" className="hover:text-yellow-400 transition-colors">Speed Lock Aquatic</a></li>
              <li><a href="#product-ultra" className="hover:text-yellow-400 transition-colors">Speed Lock Ultra</a></li>
              <li><a href="#product-super-fast" className="hover:text-yellow-400 transition-colors">Super Fast Adhesive</a></li>
              <li><a href="#product-pro-grip" className="hover:text-yellow-400 transition-colors">Pro Grip Series</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8 border-b border-blue-900 pb-2">COMPANY</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">Our History / About Us</a></li>
              <li><a href="#dealers" className="hover:text-yellow-400 transition-colors">Dealer Network</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Media Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-8 border-b border-blue-900 pb-2">CONTACT US</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li className="text-sm">Corporate Office: Marol, Andheri East, Mumbai, MH</li>
              <li className="text-sm">Address: V9GJ+GCH, MIDC Industrial Area, Chilkalthana, Chhatrapati Sambhajinagar, MH 431006</li>
              <li className="text-sm">Helpline: <span className="text-yellow-400">1800 123 4567</span></li>
              <li className="text-sm">Email: <span className="text-blue-400">info@speedlock.in</span></li>
              <li className="pt-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-blue-500 transition-all w-full shadow-lg cursor-pointer">
                  Become a Dealer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-blue-950 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center md:text-left">
            © 2026 SPEED LOCK ADHESIVES PVT LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
