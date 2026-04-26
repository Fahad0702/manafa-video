import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '../../../lib/video/hooks';
const BG = '#03020F';
const DANGER = '#E53E3E';
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STEPS = [
  { number: '01', label: 'Submit invoice to bank' },
  { number: '02', label: 'Bank assigns a credit officer' },
  { number: '03', label: 'Buyer approval required' },
  { number: '04', label: 'Manual document verification' },
  { number: '05', label: 'Committee review & approval' },
  { number: '06', label: 'Funds disbursed — minus hefty fees' },
];

const STEP_HEIGHT = 72;
const COMPRESSED_HEIGHT = 42;
const COMPRESSED_GAP = 6;

function StepBar({
  step,
  index,
  totalVisible,
}: {
  step: typeof STEPS[number];
  index: number;
  totalVisible: number;
}) {
  const isLast = index === totalVisible - 1;
  const compressedCount = totalVisible - 1;

  const yPos = isLast
    ? compressedCount * (COMPRESSED_HEIGHT + COMPRESSED_GAP)
    : index * (COMPRESSED_HEIGHT + COMPRESSED_GAP);

  const height = isLast ? STEP_HEIGHT : COMPRESSED_HEIGHT;
  const opacity = isLast ? 1 : 0.35 + (index / Math.max(compressedCount, 1)) * 0.3;
  const fontSize = isLast ? 20 : 15;
  const numberSize = isLast ? 16 : 13;

  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: yPos, opacity: 1 }}
      transition={{ duration: 0.55, ease: EXPO_OUT }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: STEP_HEIGHT,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ height, opacity }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
        style={{
          width: '100%',
          borderRadius: 8,
          background: isLast ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
          border: isLast ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          overflow: 'hidden',
          boxSizing: 'border-box' as const,
        }}
      >
        <motion.span
          animate={{ fontSize: numberSize, opacity: isLast ? 0.4 : 0.3 }}
          transition={{ duration: 0.35, ease: EXPO_OUT }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: DANGER,
            letterSpacing: '0.05em',
            marginRight: 16,
            minWidth: 28,
            display: 'inline-block',
          }}
        >
          {step.number}
        </motion.span>
        <motion.span
          animate={{ fontSize, opacity: isLast ? 1 : 0.6 }}
          transition={{ duration: 0.35, ease: EXPO_OUT }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: isLast ? 700 : 400,
            color: '#FFFFFF',
            whiteSpace: 'nowrap' as const,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {step.label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Scene04_Problem() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [showVerdict, setShowVerdict] = useState(false);
  const [showSubline, setShowSubline] = useState(false);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);


  const stackHeight = visibleCount > 0
    ? (visibleCount - 1) * (COMPRESSED_HEIGHT + COMPRESSED_GAP) + STEP_HEIGHT
    : 0;

  useSceneTimer([
    { time: 700,   callback: () => { if (mountedRef.current) { setVisibleCount(1); } } },
    { time: 2300,  callback: () => { if (mountedRef.current) { setVisibleCount(2); } } },
    { time: 3900,  callback: () => { if (mountedRef.current) { setVisibleCount(3); } } },
    { time: 5500,  callback: () => { if (mountedRef.current) { setVisibleCount(4); } } },
    { time: 7100,  callback: () => { if (mountedRef.current) { setVisibleCount(5); } } },
    { time: 8800,  callback: () => { if (mountedRef.current) { setVisibleCount(6); } } },
    { time: 11800, callback: () => { if (mountedRef.current) setCollapsed(true); } },
    { time: 12100, callback: () => { if (mountedRef.current) { setShowVerdict(true); } } },
    { time: 13400, callback: () => { if (mountedRef.current) setShowSubline(true); } },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{
        position: 'absolute',
        inset: 0,
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    >
      <div style={{ width: '100%', maxWidth: 800, padding: '0 48px', boxSizing: 'border-box' }}>
        <div style={{
          fontFamily: '"Neue Plak", sans-serif',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: '0.12em',
          color: DANGER,
          textTransform: 'uppercase' as const,
          marginBottom: 32,
          opacity: 0.85,
        }}>
          The Old Way
        </div>

        <motion.div
          animate={{
            height: collapsed ? 0 : stackHeight,
            opacity: collapsed ? 0 : 1,
          }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {STEPS.slice(0, visibleCount).map((step, index) => (
            <StepBar
              key={step.number}
              step={step}
              index={index}
              totalVisible={visibleCount}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showVerdict ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
        >
          <div style={{
            fontFamily: '"Neue Plak", sans-serif',
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.15,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}>
            Complex.{' '}
            <span style={{ color: DANGER }}>Exhausting.</span>
            {' '}Slow.
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showSubline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 18,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 16,
              letterSpacing: '0.01em',
            }}
          >
            1 offer. Take it or leave it.
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
