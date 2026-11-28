import { useMemo } from 'react';
import { useSpring } from 'motion/react';
import useReducedMotion from './useReducedMotion.js';

// Subtle magnetic pull toward the cursor for primary CTAs. Mouse only, spring-smoothed,
// and a no-op under reduced motion or on touch.
export default function useMagnetic(strength = 0.28) {
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });

  const handlers = useMemo(() => {
    if (reduced) return {};
    return {
      onPointerMove: event => {
        if (event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      },
      onPointerLeave: () => {
        x.set(0);
        y.set(0);
      }
    };
  }, [reduced, strength, x, y]);

  return { style: reduced ? undefined : { x, y }, handlers };
}
