import React from 'react';
import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
};

const group = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const viewport = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };

// Scroll-triggered fade-up. `as` picks the element; `stagger` turns it into a group whose
// direct <RevealItem> children animate in sequence.
export function Reveal({ as = 'div', stagger = false, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component variants={stagger ? group : variants} initial="hidden" whileInView="visible" viewport={viewport} {...rest}>
      {children}
    </Component>
  );
}

export function RevealItem({ as = 'div', children, ...rest }) {
  const Component = motion[as];
  return (
    <Component variants={variants} {...rest}>
      {children}
    </Component>
  );
}
