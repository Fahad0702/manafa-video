import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RiyalSymbol from '../RiyalSymbol';
import { DOT_DATA, VW, VH, BRIGHT_BLUE, MUTED_DARK } from './saudiMapDots';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ to, duration, suffix = '' }: { to: number; duration: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let rafId: number;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setVal(eased * to);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setVal(to);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  const display = to % 1 === 0 ? Math.round(val).toString() : val.toFixed(1);
  return <>{display}{suffix}</>;
}

export default function Scene02_Data() {
  const [showD1, setShowD1] = useState(false);
  const [showD2, setShowD2] = useState(false);
  const [showD3, setShowD3] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowD1(true), 600);
    const t2 = setTimeout(() => setShowD2(true), 3500);
    const t3 = setTimeout(() => setShowD3(true), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 z-10 flex p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <div className="absolute top-10 left-12">
        <div className="font-plak-bold text-white" style={{ fontSize: 14, opacity: 0.55 }}>
          Supply Chain Finance
        </div>
      </div>

      <motion.div
        className="w-1/2 h-full flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox={`0 0 ${VW} ${VH}`} width={320} height={320 * VH / VW}>
          {DOT_DATA.map(([x, y, b], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={7}
              fill={b ? BRIGHT_BLUE : MUTED_DARK}
            />
          ))}
        </svg>
      </motion.div>

      <div className="w-1/2 h-full flex flex-col justify-center gap-10 pl-12">

        <motion.div
          variants={statVariants}
          initial="hidden"
          animate={showD1 ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-plak-bold text-white leading-none" style={{ fontSize: 72 }}>
            {showD1 ? <CountUp to={1.7} duration={800} suffix="M" /> : '0.0M'}
          </div>
          <div className="font-plak-bold text-white mt-2" style={{ fontSize: 18, opacity: 0.65 }}>
            Registered Businesses
          </div>
          <div className="font-plak-bold text-white mt-1" style={{ fontSize: 13, opacity: 0.35 }}>
            Monsha'at, Q3 2025
          </div>
        </motion.div>

        <motion.div
          variants={statVariants}
          initial="hidden"
          animate={showD2 ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-plak-bold leading-none flex items-baseline gap-1" style={{ fontSize: 72, color: '#293BE0' }}>
            <RiyalSymbol height="0.72em" color="white" />
            {showD2 ? <CountUp to={300} duration={800} suffix="B" /> : '0B'}
          </div>
          <div className="font-plak-bold text-white mt-2" style={{ fontSize: 18, opacity: 0.65 }}>
            SME Financing Gap
          </div>
          <div className="font-plak-bold text-white mt-1" style={{ fontSize: 13, opacity: 0.35 }}>
            Saudi Central Bank
          </div>
        </motion.div>

        <motion.div
          variants={statVariants}
          initial="hidden"
          animate={showD3 ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-4">
            <div className="font-plak-bold text-white leading-none" style={{ fontSize: 72 }}>
              {showD3 ? <CountUp to={81} duration={800} /> : '0'}
            </div>
            <div className="font-plak-bold text-white" style={{ fontSize: 36, opacity: 0.7 }}>
              Days
            </div>
          </div>
          <div className="font-plak-bold text-white mt-2" style={{ fontSize: 18, opacity: 0.65 }}>
            Average Time to Get Paid
          </div>
          <div className="font-plak-bold text-white mt-1" style={{ fontSize: 13, opacity: 0.35 }}>
            PwC ME Working Capital Study 2025
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
