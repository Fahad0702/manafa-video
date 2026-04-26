import React, { useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import Cursor, { CursorPhase } from '../Cursor';
import { useElementCenter } from '../../../lib/video/useElementCenter';

interface SceneState {
  cursorPhase: CursorPhase;
  cursorAtTarget: boolean; // true once moving toward / arrived at button
  buttonPress: 'idle' | 'down' | 'up';
}

const initial: SceneState = {
  cursorPhase: 'hidden',
  cursorAtTarget: false,
  buttonPress: 'idle',
};

type Action =
  | { type: 'CURSOR_APPEAR' }
  | { type: 'CURSOR_TRAVEL' }
  | { type: 'CLICK_DOWN' }
  | { type: 'CLICK_UP' }
  | { type: 'CURSOR_EXIT' };

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case 'CURSOR_APPEAR':
      return { ...state, cursorPhase: 'visible' };
    case 'CURSOR_TRAVEL':
      return { ...state, cursorAtTarget: true };
    case 'CLICK_DOWN':
      return { ...state, cursorPhase: 'click-down', buttonPress: 'down' };
    case 'CLICK_UP':
      return { ...state, cursorPhase: 'click-up', buttonPress: 'up' };
    case 'CURSOR_EXIT':
      return { ...state, cursorPhase: 'hidden' };
    default:
      return state;
  }
}

export default function Scene08_Dashboard() {
  const [state, dispatch] = useReducer(reducer, initial);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => dispatch({ type: 'CURSOR_APPEAR' }), 1400),
      setTimeout(() => dispatch({ type: 'CURSOR_TRAVEL' }), 1700),
      setTimeout(() => dispatch({ type: 'CLICK_DOWN' }), 5400),
      setTimeout(() => dispatch({ type: 'CLICK_UP' }), 5650),
      setTimeout(() => dispatch({ type: 'CURSOR_EXIT' }), 7800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cursor entry: below-right of the button so it reads as a natural approach.
  const startX = btnPos.x + 240;
  const startY = btnPos.y + 180;

  const cursorX = state.cursorAtTarget ? btnPos.x : startX;
  const cursorY = state.cursorAtTarget ? btnPos.y : startY;

  const callout = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18, opacity: 0.9 }}>
        Your financing dashboard
      </div>
      <div className="font-inter-regular text-white mt-1" style={{ fontSize: 14, opacity: 0.55 }}>
        Approved invoices are already there. One click to begin.
      </div>
    </motion.div>
  );

  return (
    <Act3Layout breadcrumb="Dashboard" callout={callout}>
      <div ref={containerRef} className="flex flex-col gap-4 p-5 h-full overflow-hidden relative">
        <div className="flex gap-4">
          <div
            className="flex-[2] rounded-xl p-6 flex flex-col text-white relative overflow-hidden"
            style={{ background: '#293BE0' }}
          >
            <div className="font-inter-bold mb-1" style={{ fontSize: 18 }}>
              You can now request your funding!
            </div>
            <div
              className="font-inter-regular mb-5"
              style={{ fontSize: 13, opacity: 0.9, maxWidth: '75%' }}
            >
              Manafa offers you several financing products to meet your needs.
            </div>
            <motion.div
              ref={buttonRef}
              className="font-inter-bold px-4 py-2 rounded-lg w-max"
              style={{ fontSize: 13, background: '#fff', color: '#1A1A2E' }}
              animate={{
                scale:
                  state.buttonPress === 'down' ? 0.94 :
                  state.buttonPress === 'up' ? 1.06 : 1,
                boxShadow:
                  state.buttonPress === 'down'
                    ? '0 0 0 4px rgba(255,255,255,0.28)'
                    : state.buttonPress === 'up'
                    ? '0 6px 22px rgba(255,255,255,0.35)'
                    : '0 0 0 0px rgba(255,255,255,0)',
              }}
              transition={{
                scale: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
                boxShadow: { duration: 0.22 },
              }}
            >
              Request Funding
            </motion.div>
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 180,
                height: 180,
                top: -50,
                right: -50,
                background: 'rgba(255,255,255,0.08)',
              }}
            />
          </div>

          <div
            className="flex-1 bg-white flex flex-col gap-3 rounded-xl p-4"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: 28, height: 28, background: '#EEF2FF', color: '#293BE0' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="font-inter-bold" style={{ fontSize: 14 }}>
                Supply Chain Financing
              </div>
            </div>
            <div
              className="font-inter-regular px-2 py-1 rounded w-max"
              style={{ fontSize: 12, background: '#EEF2FF', color: '#293BE0' }}
            >
              Cash Flow Improvement
            </div>
            <div
              className="font-inter-regular flex-1"
              style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}
            >
              Financing for suppliers by enhancing working capital and providing quick liquidity.
            </div>
            <div className="font-inter-bold" style={{ fontSize: 13, color: '#293BE0' }}>
              Fund Request &gt;
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl px-5 py-3"
          style={{ border: '1px solid #E5E7EB' }}
        >
          <div className="font-inter-bold" style={{ fontSize: 14 }}>
            Schedule an Appointment with a Financial Advisor
          </div>
          <div style={{ color: '#293BE0' }}>&gt;</div>
        </div>

        <div className="flex-1 rounded-xl p-4 overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <div className="flex justify-between items-center mb-4">
            <div className="font-inter-bold" style={{ fontSize: 15 }}>
              Recent Activity
            </div>
            <div className="font-inter-regular" style={{ fontSize: 12, color: '#293BE0' }}>
              View All
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              'Assignment of Proceeds Framework',
              'Credit Facility Agreement',
              'Complete Company Profile',
            ].map((task, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2"
                style={{ borderBottom: '1px solid #F3F4F6' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 18,
                      height: 18,
                      background: '#D1FAE5',
                      color: '#10B981',
                      fontSize: 12,
                    }}
                  >
                    ✓
                  </div>
                  <span
                    className="font-inter-regular"
                    style={{ fontSize: 13, color: '#1A1A2E' }}
                  >
                    {task}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-inter-regular" style={{ fontSize: 12, color: '#10B981' }}>
                    Completed
                  </span>
                  <span className="font-inter-regular" style={{ fontSize: 12, color: '#9CA3AF' }}>
                    26/05/2025
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Cursor x={cursorX} y={cursorY} phase={state.cursorPhase} travelMs={1100} />
      </div>
    </Act3Layout>
  );
}
