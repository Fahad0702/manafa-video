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
  showCards: boolean;
  showRows: boolean;
  checkboxState: number;
  buttonState: number;
  phase: number;
}

type SceneAction =
  | { type: 'SHOW_CARDS' }
  | { type: 'SHOW_ROWS' }
  | { type: 'PHASE_1' }
  | { type: 'PHASE_2_CHECKBOX_1' }
  | { type: 'PHASE_3_CHECKBOX_2' }
  | { type: 'PHASE_4_BUTTON_1' }
  | { type: 'PHASE_5' }
  | { type: 'PHASE_6_BUTTON_2' }
  | { type: 'PHASE_7_BUTTON_3' }
  | { type: 'PHASE_8' };

const initialState: SceneState = {
  showCards: false,
  showRows: false,
  checkboxState: 0,
  buttonState: 0,
  phase: 0,
};

function reducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SHOW_CARDS': return { ...state, showCards: true };
    case 'SHOW_ROWS': return { ...state, showRows: true };
    case 'PHASE_1': return { ...state, phase: 1 };
    case 'PHASE_2_CHECKBOX_1': return { ...state, phase: 2, checkboxState: 1 };
    case 'PHASE_3_CHECKBOX_2': return { ...state, checkboxState: 2, phase: 3 };
    case 'PHASE_4_BUTTON_1': return { ...state, buttonState: 1, phase: 4 };
    case 'PHASE_5': return { ...state, phase: 5 };
    case 'PHASE_6_BUTTON_2': return { ...state, phase: 6, buttonState: 2 };
    case 'PHASE_7_BUTTON_3': return { ...state, buttonState: 3, phase: 7 };
    case 'PHASE_8': return { ...state, phase: 8 };
    default: return state;
  }
}

export default function Scene09_Invoices() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showCards, showRows, checkboxState, buttonState, phase } = state;

  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cbPos = useElementCenter(checkboxRef, containerRef);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => dispatch({ type: 'SHOW_CARDS' }), 500),
      setTimeout(() => dispatch({ type: 'SHOW_ROWS' }), 1200),
      setTimeout(() => dispatch({ type: 'PHASE_1' }), 2000),
      setTimeout(() => dispatch({ type: 'PHASE_2_CHECKBOX_1' }), 3000),
      setTimeout(() => dispatch({ type: 'PHASE_3_CHECKBOX_2' }), 3250),
      setTimeout(() => dispatch({ type: 'PHASE_4_BUTTON_1' }), 3600),
      setTimeout(() => dispatch({ type: 'PHASE_5' }), 4200),
      setTimeout(() => dispatch({ type: 'PHASE_6_BUTTON_2' }), 5500),
      setTimeout(() => dispatch({ type: 'PHASE_7_BUTTON_3' }), 5750),
      setTimeout(() => dispatch({ type: 'PHASE_8' }), 6300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const targetX =
    phase === 0 ? cbPos.x + 100 :
    phase <= 4 ? cbPos.x + 2 :
    phase === 5 ? (cbPos.x + btnPos.x) / 2 :
    btnPos.x + 2;
  const targetY =
    phase === 0 ? cbPos.y - 20 :
    phase <= 4 ? cbPos.y + 4 :
    phase === 5 ? (cbPos.y + btnPos.y) / 2 :
    btnPos.y + 4;

  const cursorOpacity = phase >= 1 && phase < 8 ? 1 : 0;
  const cursorScale =
    phase === 2 ? 0.7 :
    phase === 6 ? 0.7 :
    1;

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="font-inter-bold text-white" style={{ fontSize: 18 }}>
        Approved invoices appear automatically
      </div>
      <div className="font-inter-regular text-white mt-1" style={{ fontSize: 14, opacity: 0.6 }}>
        Choose which ones to finance
      </div>
    </motion.div>
  );

  return (
    <Act3Layout breadcrumb="Financing / Supply Chain Financing / Request funds" callout={callout}>
      <div ref={containerRef} className="flex flex-col p-5 h-full overflow-auto relative">
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            {[
              { label: 'Choosing Invoices', active: true, done: false },
              { label: 'Financial Offer', active: false, done: false },
              { label: 'AOP Appendix', active: false, done: false },
              { label: 'Murabaha Process', active: false, done: false },
            ].map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <div className="w-8 h-px" style={{ background: '#E5E7EB' }} />}
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 28, height: 28,
                      border: `2px solid ${step.active ? '#293BE0' : '#E5E7EB'}`,
                      background: step.done ? '#293BE0' : 'transparent',
                    }}
                  >
                    {step.active && !step.done && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#293BE0' }} />}
                    {step.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                  </div>
                  <span className="font-inter-bold" style={{ fontSize: 12, color: step.active ? '#293BE0' : '#9CA3AF', fontWeight: step.active ? 700 : 400 }}>{step.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-5">
          {([
            { val: '3', label: 'Total Number of Invoices', sub: 'Invoice' },
            { val: <>200,000,000 <RiyalSymbol height="0.75em" /></>, label: 'Facility Limit', sub: '' },
            { val: <>53,500,000 <RiyalSymbol height="0.75em" /></>, label: 'Total Invoices in Riyal', sub: '' },
          ] as { val: React.ReactNode; label: string; sub: string }[]).map((card, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-xl p-4"
              style={{ border: '1px solid #E5E7EB' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showCards ? 1 : 0, y: showCards ? 0 : 10 }}
              transition={{ delay: 0.1 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-plak-bold flex items-baseline gap-1" style={{ fontSize: 22, color: '#293BE0' }}>{card.val}</div>
              {card.sub && <div className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>{card.sub}</div>}
              <div className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>{card.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-inter-bold" style={{ fontSize: 14 }}>Choose the invoices you want to finance </span>
            <span className="font-inter-regular" style={{ fontSize: 12, color: '#293BE0' }}>(max 15 per order)</span>
          </div>
          <motion.div
            ref={buttonRef}
            className="px-4 py-2 rounded-lg font-inter-bold text-white"
            style={{ fontSize: 13 }}
            animate={{
              background: buttonState >= 1 ? '#293BE0' : '#1A1A2E',
              scale: buttonState === 2 ? 0.85 : buttonState === 3 ? 1.08 : 1,
              boxShadow: buttonState === 2
                ? '0 0 0 6px rgba(41,59,224,0.3)'
                : buttonState === 3
                ? '0 4px 20px rgba(41,59,224,0.4)'
                : '0 0 0 0px rgba(41,59,224,0)',
            }}
            transition={{
              scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
              background: { duration: 0.2 },
              boxShadow: { duration: 0.2 },
            }}
          >
            {buttonState === 0 ? 'Select Invoices to be Financed' : <>Financing 22,500,000 <RiyalSymbol height="0.75em" /></>}
          </motion.div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <div className="grid gap-0" style={{ gridTemplateColumns: '40px 1fr 1fr 1fr 1fr 80px' }}>
            {['', 'Invoice Number', 'Invoice Amount ↕', 'Creation Date ↕', 'Invoice Due Date ↓', ''].map((h, i) => (
              <div key={i} className="font-inter-bold px-3 py-3" style={{ fontSize: 12, color: '#6B7280', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                {h}
              </div>
            ))}
            {[
              { num: 'INV-RWB-2024-001', amount: '22,500,000.00', created: '03/10/2024', due: '15/01/2025' },
              { num: 'INV-RWB-2024-002', amount: '18,750,000.00', created: '18/10/2024', due: '28/01/2025' },
              { num: 'INV-RWB-2024-003', amount: '12,250,000.00', created: '05/11/2024', due: '10/02/2025' },
            ].map((inv, i) => (
              <React.Fragment key={inv.num}>
                {[
                  <div key="cb" className="px-3 py-3 flex items-center" style={{ borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none', background: i === 0 && checkboxState === 2 ? '#F3F4F6' : '#fff' }}>
                    <motion.div
                      ref={i === 0 ? checkboxRef : undefined}
                      className="flex items-center justify-center rounded"
                      style={{ width: 18, height: 18 }}
                      animate={{
                        background: i === 0 && checkboxState === 2 ? '#293BE0' : '#fff',
                        borderColor: i === 0 && checkboxState === 2 ? '#293BE0' : '#D1D5DB',
                        borderWidth: 1.5,
                        borderStyle: 'solid',
                        scale: i === 0 && checkboxState === 1 ? 0.75 : i === 0 && checkboxState === 2 ? 1.2 : 1,
                      }}
                      transition={{
                        scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                        background: { duration: 0.1 },
                        borderColor: { duration: 0.1 },
                      }}
                    >
                      {i === 0 && checkboxState === 2 && (
                        <motion.svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        >
                          <motion.path
                            d="M20 6L9 17l-5-5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                          />
                        </motion.svg>
                      )}
                    </motion.div>
                  </div>,
                  ...([inv.num, <><RiyalSymbol height="0.75em" /> {inv.amount}</>, inv.created, inv.due, 'For Details >'] as React.ReactNode[]).map((cell, ci) => (
                    <motion.div
                      key={ci}
                      className="px-3 py-3 font-inter-regular flex items-center gap-0.5"
                      style={{
                        fontSize: 13,
                        color: ci === 4 ? '#293BE0' : '#1A1A2E',
                        borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none',
                        background: i === 0 && checkboxState === 2 ? '#F3F4F6' : '#fff',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showRows ? 1 : 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {cell}
                    </motion.div>
                  ))
                ]}
              </React.Fragment>
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
            x: targetX,
            y: targetY,
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
