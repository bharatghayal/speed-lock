
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface CursorProps {
  color?: string;
  size?: number;
}

export default function CustomCursor({ color = '#2563eb', size = 20 }: CursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'magnetic' | 'invert'>('default');
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  // Position trackers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the main cursor and trailer
  const springConfig = { damping: 25, stiffness: 400 };
  const trailerSpringConfig = { damping: 30, stiffness: 100 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailerX = useSpring(mouseX, trailerSpringConfig);
  const trailerY = useSpring(mouseY, trailerSpringConfig);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide standard cursor globally
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      @media (pointer: coarse) {
        * { cursor: auto !important; }
        .custom-cursor-container { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect cursor targets
      const target = e.target as HTMLElement;
      if (!target) return;

      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.tagName === 'BUTTON' || 
                        target.tagName === 'A';
      
      const isMagnetic = target.classList.contains('magnetic');
      const isInvert = target.classList.contains('invert-cursor');
      
      if (isMagnetic) {
        setCursorType('magnetic');
        setActiveElement(target);
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Slightly pull the cursor towards center (simulated magnetic)
        // mouseX.set(centerX + (e.clientX - centerX) * 0.4);
        // mouseY.set(centerY + (e.clientY - centerY) * 0.4);
      } else if (isInvert) {
        setCursorType('invert');
      } else if (isPointer) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
        setActiveElement(null);
      }
    };

    const handleMouseDown = () => setIsVisible(true);
    const handleMouseUp = () => {};
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.head.removeChild(style);
    };
  }, [isVisible, mouseX, mouseY]);

  // Magnetic Pull Calculation for the Element itself
  useEffect(() => {
    if (cursorType === 'magnetic' && activeElement) {
      const handleMagneticMove = (e: MouseEvent) => {
        const rect = activeElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Pull the element towards the mouse slightly
        activeElement.style.transform = `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`;
      };

      const resetElement = () => {
        activeElement.style.transform = '';
      };

      window.addEventListener('mousemove', handleMagneticMove);
      activeElement.addEventListener('mouseleave', resetElement);

      return () => {
        window.removeEventListener('mousemove', handleMagneticMove);
        activeElement.removeEventListener('mouseleave', resetElement);
        resetElement();
      };
    }
  }, [cursorType, activeElement]);

  return (
    <div className="custom-cursor-container fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* 1. Main High-Precision Dot */}
            <motion.div
              style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                backgroundColor: cursorType === 'invert' ? '#fff' : color,
                mixBlendMode: cursorType === 'invert' ? 'difference' : 'normal',
              }}
              animate={{
                scale: cursorType === 'pointer' ? 1.5 : 1,
                borderRadius: cursorType === 'magnetic' ? '4px' : '50%',
              }}
              className="fixed w-3 h-3 z-[100]"
            />

            {/* 2. Smooth Aura/Trailer */}
            <motion.div
              style={{
                x: trailerX,
                y: trailerY,
                translateX: '-50%',
                translateY: '-50%',
                border: `1px solid ${cursorType === 'invert' ? '#fff' : color}`,
                mixBlendMode: cursorType === 'invert' ? 'difference' : 'normal',
              }}
              animate={{
                width: cursorType === 'pointer' ? size * 3 : 
                       cursorType === 'magnetic' ? activeElement?.offsetWidth ? activeElement.offsetWidth + 20 : size * 2 :
                       size * 2,
                height: cursorType === 'pointer' ? size * 3 : 
                        cursorType === 'magnetic' ? activeElement?.offsetHeight ? activeElement.offsetHeight + 20 : size * 2 :
                        size * 2,
                borderRadius: cursorType === 'magnetic' ? '12px' : '50%',
                opacity: cursorType === 'magnetic' ? 0.4 : 0.2,
                rotate: cursorType === 'magnetic' ? 45 : 0,
              }}
              className="fixed flex items-center justify-center pointer-events-none transition-[width,height,border-radius] duration-300"
            >
               {/* 3. Morphing Core Inside Trailer */}
               <motion.div 
                 animate={{
                   scale: cursorType === 'pointer' ? [1, 1.2, 1] : 1,
                   rotate: cursorType === 'pointer' ? [0, 90, 0] : 0,
                 }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-1 h-1 bg-current opacity-20"
               />
            </motion.div>

            {/* 4. Particle Trail (Glow aura trailing behind) */}
            <motion.div
              style={{
                x: trailerX,
                y: trailerY,
                translateX: '-50%',
                translateY: '-50%',
                background: `radial-gradient(circle at center, ${color}33 0%, transparent 70%)`
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [1, 2, 1],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="fixed w-40 h-40 rounded-full blur-3xl pointer-events-none -z-10"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
