
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Star, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import visualStoryImg from '../assets/images/regenerated_image_1778928016842.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function VisualStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      scale: 0.8,
      borderRadius: "100%",
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      }
    });

    gsap.to(".parallax-bg-text", {
      xPercent: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background Image Overlay with Multiply Effect */}
      <div className="absolute inset-0 z-0 bg-blue-100">
        <img 
          src={visualStoryImg}
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </div>

      {/* Dynamic Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.02] z-0">
        <h2 className="parallax-bg-text text-[25vw] font-black text-blue-900 whitespace-nowrap leading-none">
          CRAFTED QUALITY COMMITMENT LEGACY
        </h2>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div ref={imageRef} className="lg:w-1/2 relative">
              <div className="relative rounded-[60px] overflow-hidden shadow-2xl">
                <img 
                  src={visualStoryImg} 
                  alt="Carpenter using Speed Lock"
                  className="w-full aspect-square object-cover"
                />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
             </div>
             
             {/* Floating badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 hidden md:block"
             >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Trusted by 100K+</span>
                </div>
                <h4 className="text-2xl font-black text-blue-900">Recommended by Indian Carpenter</h4>
             </motion.div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <span className="text-blue-600 font-black uppercase text-sm tracking-widest">OUR STORY</span>
            <h2 className="text-5xl md:text-7xl font-black text-blue-900 tracking-tighter leading-none">
              Born from the workshop. Built for excellence.
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                Speed Lock was created with a single mission: to provide Indian carpenters with world-class adhesive solutions that are specifically engineered for our climate and materials.
              </p>
              <p className="text-gray-500 leading-relaxed font-medium">
                From luxury interior projects to sturdy structural work, our products ensure that your craftsmanship lasts for generations. We combine traditional bonding wisdom with advanced chemical engineering.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 pt-4">
               {[
                 "Dries in half the time of ordinary glues",
                 "Tested in extreme 95% humidity conditions",
                 "Superior spreadability for maximum coverage",
                 "Engineered to prevent long-term termite damage"
               ].map(point => (
                 <div key={point} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                       <Star size={12} className="text-teal-600 fill-teal-600" />
                    </div>
                    <span className="text-lg font-bold text-blue-900/80">{point}</span>
                 </div>
               ))}
            </div>

            <button className="interactive group flex items-center gap-4 text-blue-900 font-black text-xl hover:translate-x-2 transition-transform">
              Watch Our Impact <ChevronRight size={28} className="text-yellow-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
