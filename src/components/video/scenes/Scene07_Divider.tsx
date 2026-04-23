import React from 'react';
import { motion } from 'framer-motion';

export default function Scene07_Divider() {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#03020F]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <motion.div
        className="font-plak-bold text-[56px] text-white tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        How It Works
      </motion.div>
      <motion.div
        className="font-plak-bold text-[24px] text-[#293BE0] mt-2 tracking-wide uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        The Supplier Journey
      </motion.div>
    </motion.div>
  );
}
