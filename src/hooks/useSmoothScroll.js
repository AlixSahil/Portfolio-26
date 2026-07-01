import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './useReducedMotion.js';

// Momentum/smooth scrolling. Returns a ref to the Lenis instance so the nav can use
// lenis.scrollTo() for smooth anchor jumps. Disabled entirely for reduced-motion users
// (native scroll only) to avoid the vestibular trigger.
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
