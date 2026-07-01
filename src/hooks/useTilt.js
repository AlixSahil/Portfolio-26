import { useMemo } from 'react';
import { useSpring } from 'motion/react';
import useReducedMotion from './useReducedMotion.js';

// Pointer-follow 3D tilt for cards. Mouse-only, spring-smoothed, capped low so it reads
// as depth rather than a gimmick. No-ops under reduced motion and on touch devices.
export default function useTilt(max = 6) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 150, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18, mass: 0.4 });

  const handlers = useMemo(() => {
    if (reduced) return {};
    return {
      onPointerMove: event => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * max * 2);
        rotateX.set(-py * max * 2);
        // Feed the cursor position to the CSS glow.
        event.currentTarget.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
        event.currentTarget.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
      },
      onPointerLeave: () => {
        rotateX.set(0);
        rotateY.set(0);
      }
    };
  }, [reduced, max, rotateX, rotateY]);

  const style = reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 };
  return { style, handlers };
}
