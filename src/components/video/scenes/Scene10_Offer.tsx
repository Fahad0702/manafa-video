import React, { useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import RiyalSymbol from '../RiyalSymbol';
import Cursor, { CursorPhase } from '../Cursor';
import { useElementCenter } from '../../../lib/video/useElementCenter';

interface SceneState {
  showCard: boolean;
  showRows: boolean;
  cursorPhase: CursorPhase;
  cursorAtTarget: boolean;
  buttonState: 'idle' | 'down' | 'up';
}

const initial: SceneState = {
  showCard: false,
  showRows: false,
  cursorPhase: 'hidden',
  cursorAtTarget: false,
  buttonState: 'idle',
};

type Action =
  | { type: 'SHOW_CARD' }
  | { type: 'SHOW_ROWS' }
  | { type: 'CURSOR_APPEAR' }
  | { type: 'CURSOR_TRAVEL' }
  | { type: 'CLICK_DOWN' }
  | { type: 'CLICK_UP' }
  | { type: 'CURSOR_EXIT' };

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case 'SHOW_CARD':
      return { ...state, showCard: true };
    case 'SHOW_ROWS':
      return { ...state, showRows: true };
    case 'CURSOR_APPEAR':
      return { ...state, cursorPhase: 'visible' };
    case 'CURSOR_TRAVEL':
      return { ...state, cursorAtTarget: true };
    case 'CLICK_DOWN':
      return { ...state, cursorPhase: 'click-down', buttonState: 'down' };
    case 'CLICK_UP':
      return { ...state, cursorPhase: 'click-up', buttonState: 'up' };
    case 'CURSOR_EXIT':
      return { ...state, cursorPhase: 'hidden' };
    default:
      return state;
  }
}

export default function Scene10_Offer() {
  const [state, dispatch] = useReducer(reducer, initial);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => dispatch({ type: 'SHOW_CARD' }), 400),
      setTimeout(() => dispatch({ type: 'SHOW_ROWS' }), 1100),
      setTimeout(() => dispatch({ type: 'CURSOR_APPEAR' }), 3200),
      setTimeout(() => dispatch({ type: 'CURSOR_TRAVEL' }), 3550),
      setTimeout(() => dispatch({ type: 'CLICK_DOWN' }), 6000),
      setTimeout(() => dispatch({ type: 'CLICK_UP' }), 6250),
      setTimeout(() => dispatch({ type: 'CURSOR_EXIT' }), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Approach the Accept button from below-left so it reads as a real cursor entry.
  const startX = btnPos.x - 220;
  const startY = btnPos.y + 260;

  const cursorX = state.cursorAtTarget ? btnPos.x : startX;
  const cursorY = state.cursorAtTarget ? btnPos.y : startY;

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18 }}>
        One offer. Every cost, visible.
      </div>
      <div className="font-inter-regular text-white mt-1" style={{ fontSize: 14, opacity: 0.6 }}>
        Transparent pricing. Accept in one click.
      </div>
    </motion.div>
  );

  const steps = [
    { label: 'Choosing Invoices', done: true, active: false },
    { label: 'Financial Offer', done: false, active: true },
    { label: 'AOP Appendix', done: false, active: false },
    { label: 'Murabaha Process', done: false, active: false },
  ];

  return (
    <Act3Layout breadcrumb="Financing / Supply Chain Financing / Financial Offer" callout={callout}>
      <div ref={containerRef} className="flex flex-col p-5 h-full overflow-hidden relative">
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && (
                  <div
                    className="w-8 h-px"
                    style={{
                      background:
                        step.active || steps[i - 1].done ? '#293BE0' : '#E5E7EB',
                    }}
                  />
                )}
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 28,
                      height: 28,
                      border: `2px solid ${
                        step.active || step.done ? '#293BE0' : '#E5E7EB'
                      }`,
                      background: step.done ? '#293BE0' : 'transparent',
                    }}
                  >
                    {step.active && !step.done && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: '#293BE0',
                        }}
                      />
                    )}
                    {step.done && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="font-inter-bold"
                    style={{
                      fontSize: 12,
                      color: step.active || step.done ? '#293BE0' : '#9CA3AF',
                      fontWeight: step.active || step.done ? 700 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-inter-bold" style={{ fontSize: 20 }}>
              Financial Offer
            </div>
            <div
              className="font-inter-regular mt-1"
              style={{ fontSize: 13, color: '#6B7280' }}
            >
              Please review the financial offer below.
            </div>
            <div className="font-inter-regular mt-1" style={{ fontSize: 13 }}>
              Offer is valid until: <span style={{ color: '#293BE0' }}>11:00 AM</span>
            </div>
          </div>
          <motion.div
            ref={buttonRef}
            className="font-inter-bold text-white px-5 py-2 rounded-lg"
            style={{ fontSize: 13 }}
            animate={{
              background: state.buttonState === 'idle' ? '#1A1A2E' : '#293BE0',
              scale:
                state.buttonState === 'down'
                  ? 0.94
                  : state.buttonState === 'up'
                  ? 1.06
                  : 1,
              boxShadow:
                state.buttonState === 'down'
                  ? '0 0 0 4px rgba(41,59,224,0.3)'
                  : state.buttonState === 'up'
                  ? '0 6px 22px rgba(41,59,224,0.4)'
                  : '0 0 0 0px rgba(41,59,224,0)',
            }}
            transition={{
              scale: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
              boxShadow: { duration: 0.22 },
              background: { duration: 0.2 },
            }}
          >
            Accept the Financial Offer
          </motion.div>
        </div>

        <motion.div
          className="rounded-xl p-6 mb-4 relative overflow-hidden"
          style={{ background: '#293BE0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: state.showCard ? 1 : 0,
            y: state.showCard ? 0 : 20,
          }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <div
            className="flex items-center justify-center rounded mb-3"
            style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.2)', color: 'white' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div
            className="font-inter-bold text-white flex items-baseline gap-1"
            style={{ fontSize: 30 }}
          >
            <RiyalSymbol height="0.75em" color="white" /> 22,500,000.00
          </div>
          <div
            className="font-inter-regular text-white mt-1 flex items-center gap-2"
            style={{ fontSize: 13, opacity: 0.85 }}
          >
            Financing Amount
            <div
              className="flex items-center justify-center rounded-full border text-white"
              style={{
                width: 18,
                height: 18,
                borderColor: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
            >
              i
            </div>
          </div>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 160,
              height: 160,
              top: -40,
              right: -40,
              border: '3px solid rgba(255,255,255,0.1)',
            }}
          />
        </motion.div>

        <div
          className="grid gap-4 rounded-xl p-5"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid #E5E7EB',
          }}
        >
          {(
            [
              { val: '1', label: 'Invoice Count', extra: 'Invoice' },
              { val: <><RiyalSymbol height="0.75em" /> 225,000.00</>, label: 'Financing Cost' },
              { val: <><RiyalSymbol height="0.75em" /> 112,500.00</>, label: 'Administrative Fees' },
              { val: <><RiyalSymbol height="0.75em" /> 50,625.00</>, label: 'Value Added Tax' },
            ] as { val: React.ReactNode; label: string; extra?: string }[]
          ).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: state.showRows ? 1 : 0 }}
              transition={{
                delay: 0.1 * i,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="font-inter-bold flex items-baseline gap-0.5"
                style={{ fontSize: 18 }}
              >
                {item.val}
              </div>
              {item.extra && (
                <div
                  className="font-inter-regular"
                  style={{ fontSize: 12, color: '#6B7280' }}
                >
                  {item.extra}
                </div>
              )}
              <div
                className="font-inter-regular"
                style={{ fontSize: 12, color: '#6B7280' }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <Cursor x={cursorX} y={cursorY} phase={state.cursorPhase} travelMs={1100} />
      </div>
    </Act3Layout>
  );
}
