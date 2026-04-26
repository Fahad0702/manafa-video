import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import RiyalSymbol from '../RiyalSymbol';

export default function Scene11_Complete() {
  const [showCheck, setShowCheck] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSubline, setShowSubline] = useState(false);
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowCheck(true), 250),
      setTimeout(() => setShowPop(true), 550),
      setTimeout(() => setShowHeadline(true), 800),
      setTimeout(() => setShowSubline(true), 1500),
      setTimeout(() => setShowAmount(true), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : 8 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18 }}>
        Funded. Within one business day.
      </div>
    </motion.div>
  );

  return (
    <Act3Layout breadcrumb="Financing / Supply Chain Financing / Complete" callout={callout}>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative mb-8">
          <motion.div
            className="rounded-full border-[3px] flex items-center justify-center relative"
            style={{ width: 96, height: 96, borderColor: '#293BE0', background: 'rgba(41,59,224,0.06)' }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: showCheck ? 1 : 0.6, opacity: showCheck ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M4 12l5 5L20 7"
                stroke="#293BE0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: showCheck ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.svg>
          </motion.div>

          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute rounded-full"
              style={{ width: 6, height: 3, background: '#293BE0', top: '50%', left: '50%', originX: 0, originY: 0 }}
              initial={{ rotate: angle, x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: showPop ? Math.cos((angle * Math.PI) / 180) * 60 - 3 : 0,
                y: showPop ? Math.sin((angle * Math.PI) / 180) * 60 - 1.5 : 0,
                scale: showPop ? 1 : 0,
                opacity: showPop ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            />
          ))}
        </div>

        <motion.div
          className="font-plak-bold mb-3"
          style={{ fontSize: 36, color: '#1A1A2E', letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showHeadline ? 1 : 0, y: showHeadline ? 0 : 10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Funded.
        </motion.div>

        <motion.div
          className="font-inter-regular mb-6"
          style={{ fontSize: 15, color: '#6B7280', maxWidth: 460, lineHeight: 1.5 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showSubline ? 1 : 0, y: showSubline ? 0 : 8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Capital back where it belongs &mdash; in your business.
        </motion.div>

        <motion.div
          className="flex items-center gap-2 px-5 py-3 rounded-full"
          style={{
            background: 'rgba(41,59,224,0.08)',
            border: '1px solid rgba(41,59,224,0.18)',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: showAmount ? 1 : 0, scale: showAmount ? 1 : 0.92 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>
            Transferred
          </span>
          <span
            className="font-plak-bold flex items-baseline gap-1"
            style={{ fontSize: 18, color: '#293BE0' }}
          >
            <RiyalSymbol height="0.8em" /> 22,500,000.00
          </span>
        </motion.div>
      </div>
    </Act3Layout>
  );
}
