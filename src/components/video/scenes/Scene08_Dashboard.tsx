import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';

function useElementCenter(
  elRef: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let id: number;
    const update = () => {
      if (elRef.current && containerRef.current) {
        const er = elRef.current.getBoundingClientRect();
        const cr = containerRef.current.getBoundingClientRect();
        const nx = er.left - cr.left + er.width / 2;
        const ny = er.top - cr.top + er.height / 2;
        setPos(p => (Math.abs(p.x - nx) > 1 || Math.abs(p.y - ny) > 1) ? { x: nx, y: ny } : p);
      }
      id = requestAnimationFrame(update);
    };
    id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [elRef, containerRef]);
  return pos;
}

export default function Scene08_Dashboard() {
  const [clickState, setClickState] = useState(0);
  const [cursorPhase, setCursorPhase] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const t1 = setTimeout(() => setCursorPhase(1), 2200);
    const t2 = setTimeout(() => { setCursorPhase(2); setClickState(1); }, 4500);
    const t3 = setTimeout(() => { setCursorPhase(3); setClickState(2); }, 4800);
    return () => { [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const callout = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18, opacity: 0.85 }}>
        Your financing dashboard
      </div>
    </motion.div>
  );

  return (
    <Act3Layout breadcrumb="Dashboard" callout={callout}>
      <div ref={containerRef} className="flex flex-col gap-4 p-5 h-full overflow-auto relative">
        <div className="flex gap-4">
          <div
            className="flex-[2] rounded-xl p-6 flex flex-col text-white relative overflow-hidden"
            style={{ background: '#293BE0' }}
          >
            <div className="font-inter-bold mb-1" style={{ fontSize: 18 }}>You can now request your funding!</div>
            <div className="font-inter-regular mb-5" style={{ fontSize: 13, opacity: 0.9, maxWidth: '75%' }}>
              Manafa offers you several financing products to meet your needs.
            </div>
            <motion.div
              ref={buttonRef}
              className="font-inter-bold px-4 py-2 rounded-lg w-max cursor-pointer"
              style={{ fontSize: 13, background: '#fff', color: '#1A1A2E' }}
              animate={{
                scale: clickState === 1 ? 0.85 : clickState === 2 ? 1.08 : 1,
                boxShadow: clickState === 1
                  ? '0 0 0 6px rgba(255,255,255,0.3)'
                  : clickState === 2
                  ? '0 4px 20px rgba(255,255,255,0.4)'
                  : '0 0 0 0px rgba(255,255,255,0)',
              }}
              transition={{
                scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                boxShadow: { duration: 0.2 },
              }}
            >
              Request Funding
            </motion.div>
            <div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 180, height: 180, top: -50, right: -50, background: 'rgba(255,255,255,0.08)' }}
            />
          </div>

          <div
            className="flex-1 bg-white flex flex-col gap-3 rounded-xl p-4"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded" style={{ width: 28, height: 28, background: '#EEF2FF', color: '#293BE0' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="font-inter-bold" style={{ fontSize: 14 }}>Supply Chain Financing</div>
            </div>
            <div className="font-inter-regular px-2 py-1 rounded w-max" style={{ fontSize: 12, background: '#EEF2FF', color: '#293BE0' }}>Cash Flow Improvement</div>
            <div className="font-inter-regular flex-1" style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
              Financing for suppliers by enhancing working capital and providing quick liquidity
            </div>
            <div className="font-inter-bold" style={{ fontSize: 13, color: '#293BE0' }}>Fund Request &gt;</div>
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl px-5 py-3"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <div className="font-inter-bold" style={{ fontSize: 14 }}>Schedule an Appointment with a Financial Advisor</div>
          <div style={{ color: '#293BE0' }}>&gt;</div>
        </div>

        <div className="flex-1 rounded-xl p-4" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex justify-between items-center mb-4">
            <div className="font-inter-bold" style={{ fontSize: 15 }}>Tasks (0)</div>
            <div className="font-inter-regular" style={{ fontSize: 12, color: '#293BE0' }}>View All</div>
          </div>
          <div className="flex flex-col gap-2">
            {['Assignment of Proceeds Framework', 'Credit Facility Agreement', 'Complete Company Profile'].map((task, i) => (
              <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full" style={{ width: 18, height: 18, background: '#D1FAE5', color: '#10B981', fontSize: 12 }}>✓</div>
                  <span className="font-inter-regular" style={{ fontSize: 13, color: '#1A1A2E' }}>{task}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-inter-regular" style={{ fontSize: 12, color: '#10B981' }}>Completed</span>
                  <span className="font-inter-regular" style={{ fontSize: 12, color: '#9CA3AF' }}>26/05/2025</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 24,
            height: 24,
            top: 0,
            left: 0,
            zIndex: 50,
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            x: cursorPhase === 0 ? btnPos.x + 80 : btnPos.x + 2,
            y: cursorPhase === 0 ? btnPos.y + 30 : btnPos.y + 4,
            opacity: cursorPhase >= 1 ? 1 : 0,
            scale: cursorPhase === 2 ? 0.7 : 1,
          }}
          transition={{
            x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.12, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#fff" stroke="#293BE0" strokeWidth="1.5"/>
          </svg>
        </motion.div>
      </div>
    </Act3Layout>
  );
}
