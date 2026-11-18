
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Facebook, PhoneCall, Zap } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Dealer Network', href: '#dealers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-gray-100/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)]' 
          : 'py-5 bg-white/45 backdrop-blur-md border-b border-white/10 shadow-sm'
      }`}
    >
      {/* Yellow Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group interactive magnetic transition-all duration-500">
          <img 
            src={`https://lh3.googleusercontent.com/d/1ATcb9LNPVwwFtGMAY0_ygGP7w-zkLAgV`} 
            alt="Speed Lock Logo" 
            className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Show fallback text logo if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <div className="fallback-logo hidden flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <Zap size={22} fill="currentColor" className="text-yellow-400" />
            </div>
            <span className="text-xl font-black tracking-tighter text-blue-900 uppercase flex flex-col leading-none">
              Speed
              <span className="text-blue-600 text-[10px] tracking-[0.3em] font-black -mt-0.5">Adhesive</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-semibold tracking-wide hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all magnetic">
            Find a Dealer
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-blue-900" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl lg:hidden flex flex-col p-6 gap-4 border-t border-gray-100"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-bold text-gray-800 py-2 border-b border-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2">
              Find a Dealer <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
