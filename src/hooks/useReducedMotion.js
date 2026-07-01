import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Read the current preference synchronously so the very first render is already correct
// (avoids a flash of animated content for users who asked to reduce motion).
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

// Rough capability check used to decide whether to run WebGL animation loops at all.
// Low-power / data-saver / small devices get a static frame instead of a live shader.
export function isLowPowerDevice() {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator || {};
  if (nav.connection && nav.connection.saveData) return true;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) return true;
  return false;
}

// True when shaders should freeze to a single static frame rather than animate.
export function shouldFreezeMotion() {
  return prefersReducedMotion() || isLowPowerDevice();
}

// React hook that stays in sync if the user flips the OS setting while the page is open.
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}
