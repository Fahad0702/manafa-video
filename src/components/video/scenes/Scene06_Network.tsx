import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

const PARTNERS = [
  { id: 'aramco', src: `${BASE}logos/aramco.png`, width: 110, height: 36 },
  { id: 'snb', src: `${BASE}logos/snb.png`, width: 100, height: 50 },
  { id: 'sec', src: `${BASE}logos/sec.png`, width: 80, height: 68 },
  { id: 'sab', src: `${BASE}logos/sab.png`, width: 110, height: 38 },
  { id: 'sidf', src: `${BASE}logos/sidf.png`, width: 115, height: 44 },
  { id: 'jpmorgan', src: '', width: 120, height: 26 },
];

export default function Scene06_Network() {
  const [showCenter, setShowCenter] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [partnerCount, setPartnerCount] = useState(0);
  const [showConnectors, setShowConnectors] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setShowCenter(true), 400);
    const t1 = setTimeout(() => setShowRing(true), 1000);
    const t2 = setTimeout(() => setPartnerCount(1), 1600);
    const t3 = setTimeout(() => setPartnerCount(2), 2200);
    const t4 = setTimeout(() => setPartnerCount(3), 2800);
    const t5 = setTimeout(() => setPartnerCount(4), 3400);
    const t6 = setTimeout(() => setPartnerCount(5), 4000);
    const t7 = setTimeout(() => setPartnerCount(6), 4600);
    const t8 = setTimeout(() => setShowConnectors(true), 5200);
    const t9 = setTimeout(() => setShowTagline(true), 6600);
    return () => {
      [t0, t1, t2, t3, t4, t5, t6, t7, t8, t9].forEach(clearTimeout);
    };
  }, []);

  const orbitRadius = 280;

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-[#03020F] overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <div className="relative" style={{ width: 800, height: 680 }}>
        <div
          className="absolute"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: orbitRadius * 2 + 60,
              height: orbitRadius * 2 + 60,
              left: -(orbitRadius + 30),
              top: -(orbitRadius + 30),
              border: '1px solid rgba(41, 59, 224, 0.12)',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: showRing ? 1 : 0, scale: showRing ? 1 : 0.85 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />

          <motion.div
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: 280,
              height: 280,
              left: -140,
              top: -140,
              background: 'radial-gradient(circle, rgba(41, 59, 224, 0.18) 0%, rgba(41, 59, 224, 0.04) 70%, transparent 100%)',
              border: '1.5px solid rgba(41, 59, 224, 0.35)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: showCenter ? 1 : 0, scale: showCenter ? 1 : 0.5 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 320,
                height: 320,
                background: 'radial-gradient(circle, rgba(41, 59, 224, 0.1) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={`${BASE}logos/logo-white.png`}
              alt="Manafa"
              style={{ width: 220, height: 220, objectFit: 'contain', position: 'relative', zIndex: 2 }}
            />
          </motion.div>

          <svg
            className="absolute"
            style={{
              width: orbitRadius * 2 + 200,
              height: orbitRadius * 2 + 200,
              left: -(orbitRadius + 100),
              top: -(orbitRadius + 100),
              pointerEvents: 'none',
            }}
            viewBox={`0 0 ${orbitRadius * 2 + 200} ${orbitRadius * 2 + 200}`}
          >
            {showConnectors && PARTNERS.map((partner, i) => {
              const angle = ((360 / PARTNERS.length) * i - 90) * (Math.PI / 180);
              const cx = orbitRadius + 100;
              const cy = orbitRadius + 100;
              const px = cx + Math.cos(angle) * orbitRadius;
              const py = cy + Math.sin(angle) * orbitRadius;
              return (
                <motion.line
                  key={`connector-${partner.id}`}
                  x1={cx}
                  y1={cy}
                  x2={px}
                  y2={py}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </svg>

          {PARTNERS.map((partner, i) => {
            const angle = ((360 / PARTNERS.length) * i - 90) * (Math.PI / 180);
            const px = Math.cos(angle) * orbitRadius;
            const py = Math.sin(angle) * orbitRadius;
            const cardSize = 140;

            return (
              <motion.div
                key={partner.id}
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  left: px - cardSize / 2,
                  top: py - cardSize / 2,
                  width: cardSize,
                  height: cardSize,
                  background: '#fff',
                  boxShadow: '0 6px 28px rgba(0, 0, 0, 0.3)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: partnerCount > i ? 1 : 0,
                  scale: partnerCount > i ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              >
                {partner.id === 'jpmorgan' ? (
                  <div
                    style={{
                      fontFamily: '"Times New Roman", Times, "Liberation Serif", serif',
                      fontWeight: 700,
                      fontSize: 26,
                      color: '#5C402E',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    J.P.Morgan
                  </div>
                ) : (
                  <img
                    src={partner.src}
                    alt={partner.id}
                    style={{ width: partner.width, height: partner.height, objectFit: 'contain' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className="font-plak-bold text-white text-center"
        style={{ fontSize: 24, marginTop: 8 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: showTagline ? 0.9 : 0, y: showTagline ? 0 : 12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        Backed by the Kingdom's leading institutions
      </motion.div>
    </motion.div>
  );
}
