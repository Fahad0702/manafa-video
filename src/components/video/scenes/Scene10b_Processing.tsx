import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';

const BASE = import.meta.env.BASE_URL;

const FUNDER_LOGOS = [
  { id: 'snb', src: `${BASE}logos/snb.png`, name: 'SNB' },
  { id: 'sab', src: `${BASE}logos/sab.png`, name: 'SAB' },
  { id: 'sidf', src: `${BASE}logos/sidf.png`, name: 'SIDF' },
  { id: 'jpmorgan', src: `${BASE}logos/jpmorgan.svg`, name: 'JPMorgan' },
];

export default function Scene10b_Processing() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSpinner(true), 300);
    const t2 = setTimeout(() => setShowLogos(true), 600);
    const t3 = setTimeout(() => setShowText(true), 1000);
    return () => {
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, []);

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 8 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18 }}>
        Processing your funding request
      </div>
      <div className="font-inter-regular text-white mt-1" style={{ fontSize: 14, opacity: 0.6 }}>
        Connecting with funding partners
      </div>
    </motion.div>
  );

  return (
    <Act3Layout breadcrumb="Financing / Supply Chain Financing / Processing" callout={callout}>
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="relative" style={{ width: 200, height: 200 }}>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '3px solid #E5E7EB' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showSpinner ? 1 : 0, scale: showSpinner ? 1 : 0.8 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          <motion.svg
            className="absolute inset-0"
            viewBox="0 0 200 200"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSpinner ? 1 : 0, rotate: 360 }}
            transition={{
              opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 2.5, repeat: Infinity, ease: 'linear' },
            }}
          >
            <circle
              cx="100" cy="100" r="97"
              fill="none"
              stroke="#293BE0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="200 400"
            />
          </motion.svg>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSpinner ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-inter-bold" style={{ fontSize: 14, color: '#293BE0' }}>
              Funding
            </div>
          </motion.div>

          {showLogos && (
            <motion.div
              className="absolute inset-0"
              style={{ width: 200, height: 200 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              {FUNDER_LOGOS.map((logo, i) => {
                const angleOffset = (360 / FUNDER_LOGOS.length) * i - 90;
                const orbitRadius = 120;
                const cx = 100 + Math.cos((angleOffset * Math.PI) / 180) * orbitRadius - 28;
                const cy = 100 + Math.sin((angleOffset * Math.PI) / 180) * orbitRadius - 28;
                return (
                  <motion.div
                    key={logo.id}
                    className="absolute rounded-full flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 56,
                      background: '#fff',
                      border: '1px solid #E5E7EB',
                      left: cx,
                      top: cy,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        style={{ maxWidth: 36, maxHeight: 36, objectFit: 'contain' }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        <motion.div
          className="font-inter-regular mt-8"
          style={{ fontSize: 14, color: '#6B7280' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          This usually takes less than a minute...
        </motion.div>
      </div>
    </Act3Layout>
  );
}
