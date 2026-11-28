import React from 'react';
import { motion } from 'motion/react';
import useMagnetic from '../../hooks/useMagnetic.js';

// Button-styled link with a subtle magnetic pull on desktop pointers.
export default function MagneticLink({ className = '', children, strength, ...rest }) {
  const magnet = useMagnetic(strength);
  return (
    <motion.a className={`btn ${className}`} style={magnet.style} {...magnet.handlers} whileTap={{ scale: 0.97 }} {...rest}>
      {children}
    </motion.a>
  );
}
