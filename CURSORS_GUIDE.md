# Premium Cursor & Magnetic Interaction Guide

This project features a high-performance, cinematic mouse interaction system inspired by world-class branding websites (Apple, Sony, Dyson).

## Implementation Details

### 1. React/Framer Motion Version (Recommended)
Located in `src/components/CustomCursor.tsx`.
- Uses `motion` (Framer Motion) for smooth hardware-accelerated animations.
- Features `useSpring` logic for natural organic following movement.
- Integrated magnetic pull detection for elements with the `.magnetic` class.

### 2. Framework-Agnostic Version (Vanilla JS)
Located in `public/mouse-invert-vanilla.js`.
- Lightweight and standalone.
- Uses standard CSS `mix-blend-mode` for the inversion.
- Perfect for landing pages built with pure HTML/JS.

## How to use in your project

### Step 1: CSS Setup
Add this to your global CSS to hide the default browser cursor:
```css
@media (pointer: fine) {
  .custom-cursor-active, .custom-cursor-active * {
    cursor: none !important;
  }
}
```

### Step 2: Adding Interactive Elements
To make the cursor react to an element, add the `interactive` class. To enable the magnetic pull, add the `magnetic` class.
```html
<button class="interactive magnetic">Buy Speed Lock</button>
```

### Step 3: Performance Considerations
- The effect is automatically disabled on mobile/touch devices in the React version to save CPU.
- Large `mix-blend-mode` layers can be intensive; the radius is optimized at 40-60px for 60fps performance on most systems.

---
*Created for Speed Lock Adhesive Landing Page Project.*
