/**
 * PREMIUM MOUSE INVERT EFFECT - VANILLA JS VERSION
 * 
 * This library implements a framework-agnostic mouse inverter.
 * It uses a canvas-based approach or CSS blend modes depending on performance needs.
 */

class MouseInverter {
  constructor(options = {}) {
    this.options = {
      radius: 40,
      magneticStrength: 0.35,
      blendMode: 'difference',
      color: '#ffffff',
      zIndex: 9999,
      ...options
    };

    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.isVisible = false;
    this.isHovering = false;
    this.isClicking = false;
    this.magneticElement = null;

    this.init();
  }

  init() {
    // Create elements
    this.cursor = document.createElement('div');
    this.dot = document.createElement('div');
    
    // Styling
    Object.assign(this.cursor.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${this.options.radius * 2}px`,
      height: `${this.options.radius * 2}px`,
      borderRadius: '50%',
      backgroundColor: this.options.color,
      mixBlendMode: this.options.blendMode,
      pointerEvents: 'none',
      zIndex: this.options.zIndex,
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.3s, scale 0.3s',
      opacity: 0,
      backdropFilter: 'blur(4px)'
    });

    Object.assign(this.dot.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#FEDD00',
      pointerEvents: 'none',
      zIndex: this.options.zIndex + 1,
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.3s'
    });

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.dot);
    document.body.style.cursor = 'none';

    // Events
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mousedown', () => this.isClicking = true);
    window.addEventListener('mouseup', () => this.isClicking = false);
    window.addEventListener('mouseover', this.onMouseOver.bind(this));
    document.addEventListener('mouseleave', () => this.isVisible = false);
    document.addEventListener('mouseenter', () => this.isVisible = true);

    // Animation loop for smooth easing
    this.animate();
  }

  onMouseMove(e) {
    if (!this.isVisible) this.isVisible = true;

    if (this.magneticElement) {
      const rect = this.magneticElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      this.mouse.x = e.clientX + (centerX - e.clientX) * this.options.magneticStrength;
      this.mouse.y = e.clientY + (centerY - e.clientY) * this.options.magneticStrength;
    } else {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  }

  onMouseOver(e) {
    const target = e.target;
    const interactive = target.closest('button, a, .interactive');
    
    if (interactive) {
      this.isHovering = true;
      if (interactive.classList.contains('magnetic')) {
        this.magneticElement = interactive;
      }
    } else {
      this.isHovering = false;
      this.magneticElement = null;
    }
  }

  animate() {
    // Basic LERP for smooth following
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    this.pos.x = lerp(this.pos.x, this.mouse.x, 0.1);
    this.pos.y = lerp(this.pos.y, this.mouse.y, 0.1);

    const scale = this.isHovering ? 2.5 : (this.isClicking ? 0.7 : 1);
    const opacity = this.isVisible ? 1 : 0;

    this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) scale(${scale})`;
    this.cursor.style.opacity = opacity;
    
    this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    this.dot.style.opacity = this.isHovering ? 0 : opacity;

    requestAnimationFrame(this.animate.bind(this));
  }
}

// Usage Example:
// new MouseInverter({ radius: 30, color: 'white' });
