import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LuArrowUp } from 'react-icons/lu';
import { scrollToTarget } from '../../hooks/useSmoothScroll.js';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => {
            scrollToTarget(0);
            document.querySelector('.brand')?.focus({ preventScroll: true });
          }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          whileTap={{ scale: 0.92 }}
        >
          <LuArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
