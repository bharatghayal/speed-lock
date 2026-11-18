import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Shield, Zap, Droplets, Target } from 'lucide-react';
import workshopImg from '../assets/images/regenerated_image_1778927756612.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumParallax() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Parallax background movement
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Image depth effect
    gsap.fromTo(imgRef.current, 
      { scale: 1.2, y: 100 },
      {
        scale: 1,
        y: -100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      }
    );

    // Floating cards staggering
    gsap.from(".parallax-card", {
      y: 200,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[140vh] flex items-center justify-center overflow-hidden py-32 bg-white">
      {/* Background Cinematic Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <h1 className="text-[40vw] font-black text-blue-900 leading-none whitespace-nowrap select-none">
          STRENGTH FORCE POWER
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Text Content Layer */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-blue-600 font-black tracking-[0.2em] uppercase text-xs"
              >
                <div className="w-8 h-[2px] bg-blue-600" />
                India’s Most Preferred Adhesive Brand
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-[1.15] tracking-tighter uppercase">
                Euro Adhesives: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-indigo-900">
                  Real Benefits. Real Results.
                </span>
              </h2>
            </div>

            <div className="text-base text-gray-600 font-medium leading-relaxed max-w-xl space-y-4">
              <p className="text-gray-700">
                Established by <strong className="text-blue-950">Jyoti Resins & Adhesives Limited</strong>, Euro Adhesives is India’s leading brand in high-grade & premium synthetic resin adhesives. Our philosophy is simple: <span className="text-blue-600 font-bold italic">Sirf Jodo Nahin, Fayedon ke Saath Jodo.</span>
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hence, we design every product and service to deliver measurable outcomes: stronger, longer-lasting bonds for Indian conditions, water-resistance capabilities, and high coverage that cuts wastage. Our robust warehousing, large stocking capacity, and a pan-India network keep projects across that nation moving on time.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Innovation at Euro starts on site, not just in the lab. Continuous R&D, strict quality controls, and disciplined processes ensure performance you can trust. Transparent policies and responsive technical support make assurance a part of every pack.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                For makers and contractors, that means speed, strength, and support. For retailers and channel partners, it means brand pull, reliable supply, and growth programs. For end customers, it means durability that lasts. All of these so that we don’t only speak our philosophy, we live it.
              </p>
              <p className="text-blue-600 font-black tracking-wider uppercase text-sm border-t border-gray-100 pt-4 font-sans">
                Euro Adhesives – Sirf Jodo Nahi, Fayedon ke Saath Jodo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Impact Proof", desc: "Absorbs vibration without cracking." },
                { icon: Zap, title: "Nano-Tech", desc: "Deeper penetration into wood pores." },
                { icon: Droplets, title: "Hydro-Zero", desc: "Absolute protection against moisture." },
                { icon: Target, title: "Precision", desc: "No mess, no drip application." },
              ].map((item, i) => (
                <div key={i} className="parallax-card glass p-6 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all group interactive">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-black text-blue-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Immersive Image Layer */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[60px] shadow-2xl">
              <img 
                ref={imgRef}
                src={workshopImg} 
                alt="Molecular Bond Technology"
                className="w-full aspect-[4/5] object-cover bg-gray-50 scale-110"
              />
            </div>

            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-900 text-white rounded-full flex flex-col items-center justify-center p-8 text-center shadow-2xl z-20"
            >
              <span className="text-3xl font-black font-mono italic">20X</span>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Stronger than average glue</span>
            </motion.div>

            <div className="absolute -bottom-10 -left-10 w-64 h-32 bg-white/80 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl p-8 z-20">
               <div className="space-y-2">
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: '95%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                 </div>
                 <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest flex justify-between font-mono italic">
                    <span>Bond Integrity</span>
                    <span>99.9%</span>
                 </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
