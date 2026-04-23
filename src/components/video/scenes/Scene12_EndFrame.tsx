import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Scene12_EndFrame() {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 0:58.2 logo appears
    // 0:58.5 tagline/URL/number fades
    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShowText(true), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#03020F]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}logos/logo-white.png`} 
        alt="Manafa" 
        className="h-[160px] object-contain mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0.9 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />

      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 10 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="font-plak-bold text-[28px] text-[#293BE0]">#Growth_Partner</div>
        <div className="font-plak-bold text-[18px] text-white/70">manafa.sa</div>
        <div className="font-plak-regular text-[16px] text-white/50">8001240460</div>
        
        <div className="flex gap-4 mt-4">
          <div className="px-4 py-2 border border-white/20 rounded font-plak-regular text-[12px] text-white">Google Play</div>
          <div className="px-4 py-2 border border-white/20 rounded font-plak-regular text-[12px] text-white">App Store</div>
          <div className="px-4 py-2 border border-white/20 rounded font-plak-regular text-[12px] text-white">AppGallery</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 w-full flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="font-plak-regular text-center max-w-[600px]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Manafa is a company regulated and supervised by the Saudi Central Bank (SAMA)
        </div>
        <div className="font-plak-regular text-center max-w-[600px]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          Manafa SCF Program is being tested within the Saudi Central Bank's Regulatory Sandbox under limits and guidelines
        </div>
      </motion.div>
    </motion.div>
  );
}
