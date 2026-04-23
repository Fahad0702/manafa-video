import React, { useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import RiyalSymbol from '../RiyalSymbol';

function useElementCenter(
  elRef: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const posRef = useRef({ x: 0, y: 0 });
  const [, rerender] = useReducer(n => n + 1, 0);
  useEffect(() => {
    let id: number;
    const update = () => {
      if (elRef.current && containerRef.current) {
        const er = elRef.current.getBoundingClientRect();
        const cr = containerRef.current.getBoundingClientRect();
        const nx = er.left - cr.left + er.width / 2;
        const ny = er.top - cr.top + er.height / 2;
        if (Math.abs(posRef.current.x - nx) > 1 || Math.abs(posRef.current.y - ny) > 1) {
          posRef.current = { x: nx, y: ny };
          rerender();
        }
      }
      id = requestAnimationFrame(update);
    };
    id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [elRef, containerRef]);
  return posRef.current;
}

interface SceneState {
  showCard: boolean;
  showRows: boolean;
  phase: number;
  buttonState: number;
}

type SceneAction =
  | { type: 'SHOW_CARD' }
  | { type: 'SHOW_ROWS' }
  | { type: 'PHASE_1' }
  | { type: 'PHASE_2_BUTTON_1' }
  | { type: 'PHASE_3_BUTTON_2' }
  | { type: 'PHASE_4' };

const initialState: SceneState = {
  showCard: false,
  showRows: false,
  phase: 0,
  buttonState: 0,
};

function reducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SHOW_CARD': return { ...state, showCard: true };
    case 'SHOW_ROWS': return { ...state, showRows: true };
    case 'PHASE_1': return { ...state, phase: 1 };
    case 'PHASE_2_BUTTON_1': return { ...state, phase: 2, buttonState: 1 };
    case 'PHASE_3_BUTTON_2': return { ...state, buttonState: 2, phase: 3 };
    case 'PHASE_4': return { ...state, phase: 4 };
    default: return state;
  }
}

export default function Scene10_Offer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showCard, showRows, phase, buttonState } = state;

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => dispatch({ type: 'SHOW_CARD' }), 500),
      setTimeout(() => dispatch({ type: 'SHOW_ROWS' }), 1000),
      setTimeout(() => dispatch({ type: 'PHASE_1' }), 2800),
      setTimeout(() => dispatch({ type: 'PHASE_2_BUTTON_1' }), 4500),
      setTimeout(() => dispatch({ type: 'PHASE_3_BUTTON_2' }), 4750),
      setTimeout(() => dispatch({ type: 'PHASE_4' }), 5300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const cursorX = phase === 0 ? btnPos.x - 80 : btnPos.x + 2;
  const cursorY = phase === 0 ? btnPos.y + 60 : btnPos.y + 4;
  const cursorOpacity = phase >= 1 && phase < 4 ? 1 : 0;
  const cursorScale = phase === 2 ? 0.7 : 1;

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18 }}>
        Instant financing offer
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
      <div ref={containerRef} className="flex flex-col p-5 h-full overflow-auto relative">
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <div className="w-8 h-px" style={{ background: step.active || steps[i-1].done ? '#293BE0' : '#E5E7EB' }} />}
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 28, height: 28,
                      border: `2px solid ${step.active || step.done ? '#293BE0' : '#E5E7EB'}`,
                      background: step.done ? '#293BE0' : 'transparent',
                    }}
                  >
                    {step.active && !step.done && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#293BE0' }} />}
                    {step.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                  </div>
                  <span className="font-inter-bold" style={{ fontSize: 12, color: step.active || step.done ? '#293BE0' : '#9CA3AF', fontWeight: step.active || step.done ? 700 : 400 }}>{step.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-inter-bold" style={{ fontSize: 20 }}>Financial Offer</div>
            <div className="font-inter-regular mt-1" style={{ fontSize: 13, color: '#6B7280' }}>Please review the financial offer below.</div>
            <div className="font-inter-regular mt-1" style={{ fontSize: 13 }}>
              Offer is valid until: <span style={{ color: '#293BE0' }}>11:00 AM</span>
            </div>
          </div>
          <motion.div
            ref={buttonRef}
            className="font-inter-bold text-white px-5 py-2 rounded-lg"
            style={{ fontSize: 13 }}
            animate={{
              background: buttonState >= 1 ? '#293BE0' : '#1A1A2E',
              scale: buttonState === 1 ? 0.85 : buttonState === 2 ? 1.08 : 1,
              boxShadow: buttonState === 1
                ? '0 0 0 6px rgba(41,59,224,0.3)'
                : buttonState === 2
                ? '0 4px 20px rgba(41,59,224,0.4)'
                : '0 0 0 0px rgba(41,59,224,0)',
            }}
            transition={{
              scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
              boxShadow: { duration: 0.2 },
              background: { duration: 0.15 },
            }}
          >
            Accept the Financial Offer
          </motion.div>
        </div>

        <motion.div
          className="rounded-xl p-6 mb-4 relative overflow-hidden"
          style={{ background: '#293BE0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 20 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="flex items-center justify-center rounded mb-3" style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="font-inter-bold text-white flex items-baseline gap-1" style={{ fontSize: 30 }}>
            <RiyalSymbol height="0.75em" color="white" /> 22,500,000.00
          </div>
          <div className="font-inter-regular text-white mt-1 flex items-center gap-2" style={{ fontSize: 13, opacity: 0.85 }}>
            Financing Amount
            <div className="flex items-center justify-center rounded-full border text-white" style={{ width: 18, height: 18, borderColor: 'rgba(255,255,255,0.5)', fontSize: 12 }}>i</div>
          </div>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 160, height: 160, top: -40, right: -40, border: '3px solid rgba(255,255,255,0.1)' }} />
        </motion.div>

        <div className="grid gap-4 rounded-xl p-5" style={{ gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #E5E7EB' }}>
          {([
            { val: '1', label: 'Invoice Count', extra: 'Invoice' },
            { val: <><RiyalSymbol height="0.75em" /> 225,000.00</>, label: 'Financing Cost' },
            { val: <><RiyalSymbol height="0.75em" /> 112,500.00</>, label: 'Administrative Fees' },
            { val: <><RiyalSymbol height="0.75em" /> 50,625.00</>, label: 'Value Added Tax' },
          ] as { val: React.ReactNode; label: string; extra?: string }[]).map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: showRows ? 1 : 0 }} transition={{ delay: 0.1 * i, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
              <div className="font-inter-bold flex items-baseline gap-0.5" style={{ fontSize: 18 }}>{item.val}</div>
              {item.extra && <div className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>{item.extra}</div>}
              <div className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>{item.label}</div>
            </motion.div>
          ))}
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
            x: cursorX,
            y: cursorY,
            scale: cursorScale,
            opacity: cursorOpacity,
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
