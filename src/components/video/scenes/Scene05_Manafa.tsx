import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '../../../lib/video/hooks';
const BASE = import.meta.env.BASE_URL;
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ENTRY: [number, number, number, number] = [0.33, 1, 0.68, 1];

export default function Scene05_Manafa() {
  const [showGlow, setShowGlow] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useSceneTimer([
    { time: 500, callback: () => setShowGlow(true) },
    { time: 900, callback: () => setShowLogo(true) },
    { time: 1100, callback: () => setShowLine(true) },
    { time: 2200, callback: () => setShowText1(true) },
    { time: 3000, callback: () => setShowText2(true) },
  ]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#03020F]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, ease: ENTRY } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(41,59,224,0.10) 0%, rgba(145,57,255,0.04) 45%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={showGlow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.5, ease: EXPO_OUT }}
      />

      <div className="flex flex-col items-center relative" style={{ zIndex: 4 }}>
        <motion.img
          src={`${BASE}logos/logo-white.png`}
          alt="Manafa"
          style={{ height: 140, objectFit: 'contain', marginBottom: 40 }}
          initial={{ opacity: 0, y: 20 }}
          animate={showLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: EXPO_OUT }}
        />

        <motion.div
          style={{
            width: 64,
            height: 1.5,
            background: 'rgba(41,59,224,0.5)',
            marginBottom: 32,
            borderRadius: 1,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showLine ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
        />

        <motion.div
          className="font-plak-regular text-white"
          style={{ fontSize: 18, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          initial={{ opacity: 0, y: 12 }}
          animate={showText1 ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
        >
          Supply Chain Finance
        </motion.div>

        <motion.div
          className="font-plak-bold text-white text-center"
          style={{ fontSize: 24, maxWidth: 700, lineHeight: 1.45, marginTop: 14 }}
          initial={{ opacity: 0, y: 12 }}
          animate={showText2 ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
        >
          The digital lending enabler powering supply chain finance in the Kingdom
        </motion.div>
      </div>
    </motion.div>
  );
}
