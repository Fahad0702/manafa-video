import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '../../../lib/video/hooks';

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ENTRY_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];
const BASE = import.meta.env.BASE_URL;

export default function Scene00_Intro() {
  const [showLogo, setShowLogo] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useSceneTimer([
    { time: 200, callback: () => setShowGlow(true) },
    { time: 500, callback: () => setShowLogo(true) },
    { time: 1300, callback: () => setShowLine1(true) },
    { time: 2000, callback: () => setShowLine2(true) },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: ENTRY_EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{
        position: 'absolute', inset: 0,
        background: '#03020F',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    >
      {showGlow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: EXPO_OUT }}
          style={{
            position: 'absolute',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41,59,224,0.12) 0%, rgba(145,57,255,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <motion.img
        src={`${BASE}logos/logo-white.png`}
        alt="Manafa"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={showLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.8, ease: EXPO_OUT }}
        style={{
          height: 140, objectFit: 'contain',
          marginBottom: 48,
          filter: showLogo ? 'brightness(1)' : 'brightness(2)',
          transition: 'filter 0.8s ease',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showLine1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: EXPO_OUT }}
        className="font-plak-bold"
        style={{
          fontSize: 36,
          color: '#FFFFFF', textAlign: 'center',
          letterSpacing: '-0.01em', lineHeight: 1.25,
          maxWidth: 700,
        }}
      >
        Introducing Manafa SCF
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={showLine2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        className="font-inter-regular"
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.45)', textAlign: 'center',
          letterSpacing: '0.01em', lineHeight: 1.4,
          maxWidth: 600, marginTop: 16,
        }}
      >
        A new leap in working capital solutions in the Kingdom
      </motion.div>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(3,2,15,0.5) 100%)',
      }} />
    </motion.div>
  );
}
