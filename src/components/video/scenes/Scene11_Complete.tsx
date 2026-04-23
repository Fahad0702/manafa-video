import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import RiyalSymbol from '../RiyalSymbol';

export default function Scene11_Complete() {
  const [showCheck, setShowCheck] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 500);
    const t2 = setTimeout(() => setShowPop(true), 800);
    const t3 = setTimeout(() => setShowText1(true), 1000);
    const t4 = setTimeout(() => setShowText2(true), 1500);

    return () => { [t1,t2,t3,t4].forEach(clearTimeout); };
  }, []);

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: showText1 ? 1 : 0, y: showText1 ? 0 : 8 }}
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
        <div className="relative mb-6">
          <motion.div
            className="rounded-full border-[3px] flex items-center justify-center relative"
            style={{ width: 80, height: 80, borderColor: '#293BE0' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: showCheck ? 1 : 0.8, opacity: showCheck ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M4 12l5 5L20 7"
                stroke="#293BE0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: showCheck ? 1 : 0 }}
                transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                x: showPop ? Math.cos((angle * Math.PI) / 180) * 50 - 3 : 0,
                y: showPop ? Math.sin((angle * Math.PI) / 180) * 50 - 1.5 : 0,
                scale: showPop ? 1 : 0,
                opacity: showPop ? 0 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            />
          ))}
        </div>

        <motion.div
          className="font-inter-bold mb-3"
          style={{ fontSize: 18, color: '#1A1A2E' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showText1 ? 1 : 0, y: showText1 ? 0 : 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Congratulations! The financing has been successfully completed!
        </motion.div>

        <motion.div
          className="font-inter-regular mb-6"
          style={{ fontSize: 13, color: '#6B7280', maxWidth: 500, lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showText2 ? 1 : 0, y: showText2 ? 0 : 8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          With the lowest cost and quickest funding, an amount of{' '}
          <RiyalSymbol height="0.85em" />1,000,000.00 will be transferred to your bank account after deducting administrative fees. The transfer will be completed within one business day at most.
        </motion.div>

        <motion.div
          className="font-inter-bold text-white px-6 py-3 rounded-lg"
          style={{ fontSize: 14, background: '#1A1A2E' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: showText2 ? 1 : 0, y: showText2 ? 0 : 8 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Home Page
        </motion.div>
      </div>
    </Act3Layout>
  );
}
