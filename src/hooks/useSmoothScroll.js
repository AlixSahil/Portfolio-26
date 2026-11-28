import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './useReducedMotion.js';

// Shared Lenis instance so any component can scroll programmatically or pause scrolling
// (e.g. while a dialog is open). Null when smooth scrolling is disabled.
let lenisInstance = null;
export const getLenis = () => lenisInstance;

// Lenis already honours the CSS scroll-padding-top set on <html> (fixed-header clearance),
// so no extra offset is applied here.

// Smoothly scroll to an element / selector / pixel offset, falling back to native scroll.
export function scrollToTarget(target) {
  const lenis = lenisInstance;
  if (lenis) {
    if (lenis.isStopped) lenis.start();
    lenis.scrollTo(target);
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

// Momentum scrolling. In-page anchor links (href="#section") are intercepted so they glide
// there with the fixed header accounted for. Disabled entirely for reduced-motion users —
// they keep native anchor jumps (CSS scroll-padding handles the header).
export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisInstance = lenis;

    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      const target = hash === '#top' || hash === '#' ? 0 : document.querySelector(hash);
      if (target === null) return;
      event.preventDefault();
      scrollToTarget(target);
      // Move keyboard focus to the destination section for screen-reader / keyboard users.
      if (target !== 0 && link.dataset.focusTarget !== 'false') {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener('click', onClick);

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
