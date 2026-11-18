import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Categories from './components/Categories';
import ProductShowcase from './components/ProductShowcase';
import ProductDetailPage from './components/ProductDetailPage';
import ThreeDCarousel from './components/ThreeDCarousel';
import StickyReveal from './components/StickyReveal';
import PremiumParallax from './components/PremiumParallax';
import Testimonials from './components/Testimonials';
import VisualStory from './components/VisualStory';
import ContactSection from './components/ContactSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import WhatsAppChat from './components/WhatsAppChat';
import ParallaxBackground from './components/ParallaxBackground';
import SmoothScroll from './components/SmoothScroll';
import ScrollReveal from './components/ScrollReveal';

export default function App() {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const pid = hash.replace('#product-', '');
        setActiveProductId(pid);
      } else {
        setActiveProductId(null);
        if (hash && hash.length > 1) {
          const targetId = hash.replace('#', '');
          // Wait for DOM to finish rendering
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo(element, { duration: 1.2, offset: -80 });
              } else {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }, 150);
        }
      }
    };
    
    // Check initial hash on load
    handleHash();

    // Listen to hash changes in browser
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleBackToHome = () => {
    // Navigate home smoothly
    window.location.hash = '';
    setActiveProductId(null);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen selection:bg-blue-100 selection:text-blue-900">
        <ParallaxBackground />
        <CustomCursor />
        <Header />
        
        <main className="relative z-10">
          {activeProductId ? (
            <ProductDetailPage productId={activeProductId} onBack={handleBackToHome} />
          ) : (
            <>
              <Hero />
              
              <ScrollReveal direction="up">
                <WhyChoose />
              </ScrollReveal>

              <div className="py-20 md:py-32">
                <PremiumParallax />
              </div>

              <ScrollReveal direction="up">
                <Categories />
              </ScrollReveal>

              <ScrollReveal direction="up">
                <ProductShowcase />
              </ScrollReveal>

              <ScrollReveal direction="up">
                <StickyReveal />
              </ScrollReveal>

              <div className="py-20">
                <ThreeDCarousel />
              </div>

              <ScrollReveal direction="up">
                <VisualStory />
              </ScrollReveal>

              <ScrollReveal direction="up">
                <Testimonials />
              </ScrollReveal>

              <ScrollReveal direction="up">
                <ContactSection />
              </ScrollReveal>

              <ScrollReveal direction="up">
                <CTA />
              </ScrollReveal>
            </>
          )}
        </main>

        <Footer />
        <WhatsAppChat />
      </div>
    </SmoothScroll>
  );
}
