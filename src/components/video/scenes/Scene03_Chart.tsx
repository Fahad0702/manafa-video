import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Scene03_Chart() {
  const [showBar1, setShowBar1] = useState(false);
  const [showLabel1, setShowLabel1] = useState(false);
  const [showBar2, setShowBar2] = useState(false);
  const [showLabel2, setShowLabel2] = useState(false);
  const [showGap, setShowGap] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowBar1(true), 700);
    const t2 = setTimeout(() => setShowLabel1(true), 1400);
    const t3 = setTimeout(() => setShowBar2(true), 1800);
    const t4 = setTimeout(() => setShowLabel2(true), 2500);
    const t5 = setTimeout(() => setShowGap(true), 3200);
    return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, []);

  const bar1Height = 160;
  const bar2Height = 260;
  const barWidth = 160;
  const chartHeight = 300;
  const gapHeight = bar2Height - bar1Height;

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <motion.h1
        className="font-plak-bold text-white text-center mb-20"
        style={{ fontSize: 32 }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        Vision 2030 SME Target
      </motion.h1>

      <div className="relative flex items-end" style={{ height: chartHeight, gap: 60 }}>
        <div className="flex flex-col items-center">
          <motion.div
            className="font-plak-bold text-white text-center"
            style={{ fontSize: 40, marginBottom: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLabel1 ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            ~22%
          </motion.div>
          <motion.div
            className="rounded-t-lg"
            style={{ width: barWidth, background: 'rgba(41, 59, 224, 0.45)' }}
            initial={{ height: 0 }}
            animate={{ height: showBar1 ? bar1Height : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div
            className="text-center pt-3 font-plak-bold text-white"
            style={{ fontSize: 14, opacity: 0.5, width: barWidth }}
          >
            SME GDP Today
          </div>
        </div>

        <div className="flex flex-col items-center relative">
          <motion.div
            className="font-plak-bold text-white text-center"
            style={{ fontSize: 40, marginBottom: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLabel2 ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            35%
          </motion.div>
          <div style={{ width: barWidth, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <motion.div
              className="rounded-t-lg overflow-hidden"
              style={{
                width: barWidth,
                background: '#9139FF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: showGap ? gapHeight : 0, opacity: showGap ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-plak-bold" style={{ color: '#fff', fontSize: 22, lineHeight: 1 }}>13%</div>
              <div className="font-plak-bold" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>The Gap</div>
            </motion.div>
            <motion.div
              style={{ width: barWidth, background: '#293BE0' }}
              initial={{ height: 0 }}
              animate={{ height: showBar2 ? bar1Height : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div
            className="text-center pt-3 font-plak-bold text-white"
            style={{ fontSize: 14, opacity: 0.5, width: barWidth }}
          >
            Vision 2030 Target
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2" style={{ transform: 'translateX(-50%)' }}>
        <span className="font-plak-bold text-white" style={{ fontSize: 13, opacity: 0.35 }}>
          Vision 2030 / Economy Middle East
        </span>
      </div>
    </motion.div>
  );
}
