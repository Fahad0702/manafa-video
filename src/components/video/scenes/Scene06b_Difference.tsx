import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneTimer } from '../../../lib/video/hooks';

const BLUE = '#293BE0';
const DANGER = '#E53E3E';
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Metric {
  label: string;
  oldValue: string;
  oldUnit: string;
  newValue: string;
  newUnit: string;
  newValueSize?: number;
  newCustomText?: string;
}

const METRICS: Metric[] = [
  { label: 'Time to Funding', oldValue: 'Weeks', oldUnit: '', newValue: '1', newUnit: 'day' },
  { label: 'Pricing Visibility', oldValue: 'Hidden', oldUnit: 'until approval', newValue: 'Transparent', newUnit: 'before you accept', newValueSize: 72 },
  { label: 'Funding Sources', oldValue: '1', oldUnit: 'bank', newValue: '', newUnit: '', newCustomText: 'Accredited Funding Network' },
];

function MetricSlide({ metric }: {
  metric: typeof METRICS[number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -30, transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } }}
      transition={{ duration: 0.5, ease: EXPO_OUT }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EXPO_OUT }}
        style={{
          textAlign: 'center',
          fontFamily: '"Neue Plak", sans-serif',
          fontWeight: 700,
          fontSize: 28,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 36,
        }}
      >
        {metric.label}
      </motion.div>

      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1120,
        gap: 0,
        height: 420,
      }}>
        {/* Old Way panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 0,
            background: 'linear-gradient(135deg, rgba(229,62,62,0.12) 0%, rgba(229,62,62,0.05) 60%, rgba(3,2,15,0.0) 100%)',
            border: '1px solid rgba(229,62,62,0.18)',
            borderRight: 'none',
            borderRadius: '16px 0 0 16px',
            padding: '36px 40px 48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(229,62,62,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div className="font-plak-bold" style={{
            fontSize: 26,
            color: '#FFFFFF',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            height: 120,
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: 16,
          }}>
            Old Way
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: '"Neue Plak", sans-serif',
              fontWeight: 700,
              fontSize: 108,
              color: DANGER,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              opacity: 0.65,
              textDecoration: 'line-through',
              textDecorationColor: 'rgba(229,62,62,0.35)',
              textDecorationThickness: '4px',
            }}>
              {metric.oldValue}
            </div>
            {metric.oldUnit && (
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 20,
                color: 'rgba(229,62,62,0.4)',
                letterSpacing: '0.04em',
                marginTop: 12,
              }}>
                {metric.oldUnit}
              </div>
            )}
          </div>
        </motion.div>

        {/* Divider with arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          flexShrink: 0,
          background: 'rgba(255,255,255,0.03)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          zIndex: 1,
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.45, ease: EXPO_OUT }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 16H26M26 16L18 8M26 16L18 24"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Manafa panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EXPO_OUT }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 0,
            background: 'linear-gradient(135deg, rgba(41,59,224,0.22) 0%, rgba(41,59,224,0.10) 50%, rgba(145,57,255,0.06) 100%)',
            border: '1px solid rgba(41,59,224,0.35)',
            borderLeft: 'none',
            borderRadius: '0 16px 16px 0',
            padding: '36px 40px 48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(41,59,224,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(41,59,224,0.8), rgba(145,57,255,0.6), transparent)',
          }} />

          <motion.img
            src={`${import.meta.env.BASE_URL}logos/logo-white.png`}
            alt="Manafa"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65, ease: EXPO_OUT }}
            style={{
              height: 120,
              objectFit: 'contain',
              marginBottom: 16,
              filter: 'drop-shadow(0 0 16px rgba(41,59,224,0.5))',
            }}
          />

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {metric.newCustomText ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.75, ease: EXPO_OUT }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 36,
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  maxWidth: 360,
                  textShadow: '0 0 40px rgba(41,59,224,0.6), 0 0 80px rgba(41,59,224,0.3)',
                }}
              >
                {metric.newCustomText}
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.75, ease: EXPO_OUT }}
                  style={{
                    fontFamily: '"Neue Plak", sans-serif',
                    fontWeight: 700,
                    fontSize: metric.newValueSize || 108,
                    color: '#FFFFFF',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 40px rgba(41,59,224,0.6), 0 0 80px rgba(41,59,224,0.3)',
                  }}
                >
                  {metric.newValue}
                </motion.div>
                {metric.newUnit && (
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: 20,
                    color: 'rgba(120,140,255,0.8)',
                    letterSpacing: '0.04em',
                    marginTop: 12,
                  }}>
                    {metric.newUnit}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Scene06b_Difference() {
  const [activeMetric, setActiveMetric] = useState(-1);
  const [showClosing, setShowClosing] = useState(false);

  useSceneTimer([
    { time: 300, callback: () => setActiveMetric(0) },
    { time: 3800, callback: () => setActiveMetric(1) },
    { time: 7300, callback: () => setActiveMetric(2) },
    { time: 10600, callback: () => { setActiveMetric(-1); setShowClosing(true); } },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#03020F',
        overflow: 'hidden',
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    >
      {/* Subtle background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <AnimatePresence mode="wait">
        {activeMetric >= 0 && activeMetric < METRICS.length && (
          <MetricSlide
            key={METRICS[activeMetric].label}
            metric={METRICS[activeMetric]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClosing && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EXPO_OUT }}
              style={{
                width: 48,
                height: 2,
                background: 'linear-gradient(90deg, #293BE0, #9139FF)',
                marginBottom: 28,
                borderRadius: 2,
              }}
            />
            <div style={{
              fontFamily: '"Neue Plak", sans-serif',
              fontWeight: 700,
              fontSize: 54,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              textAlign: 'center',
            }}>
              Supply Chain Finance.
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 20,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.02em',
              marginTop: 18,
              textAlign: 'center',
            }}>
              Built for how the Kingdom actually works.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(3,2,15,0.5) 100%)',
      }} />
    </motion.div>
  );
}
