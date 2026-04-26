import React, { useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import Act3Layout from '../Act3Layout';
import RiyalSymbol from '../RiyalSymbol';
import Cursor, { CursorPhase } from '../Cursor';
import { useElementCenter } from '../../../lib/video/useElementCenter';

type Target = 'start' | 'checkbox' | 'button';

interface SceneState {
  showCards: boolean;
  showRows: boolean;
  cursorPhase: CursorPhase;
  cursorTarget: Target;
  rowSelected: boolean;
  buttonState: 'idle' | 'active' | 'down' | 'up';
}

const initial: SceneState = {
  showCards: false,
  showRows: false,
  cursorPhase: 'hidden',
  cursorTarget: 'start',
  rowSelected: false,
  buttonState: 'idle',
};

type Action =
  | { type: 'SHOW_CARDS' }
  | { type: 'SHOW_ROWS' }
  | { type: 'CURSOR_APPEAR' }
  | { type: 'CURSOR_TO_CHECKBOX' }
  | { type: 'CHECK_DOWN' }
  | { type: 'CHECK_UP' }
  | { type: 'CURSOR_TO_BUTTON' }
  | { type: 'BUTTON_DOWN' }
  | { type: 'BUTTON_UP' }
  | { type: 'CURSOR_EXIT' };

function reducer(state: SceneState, action: Action): SceneState {
  switch (action.type) {
    case 'SHOW_CARDS':
      return { ...state, showCards: true };
    case 'SHOW_ROWS':
      return { ...state, showRows: true };
    case 'CURSOR_APPEAR':
      return { ...state, cursorPhase: 'visible', cursorTarget: 'start' };
    case 'CURSOR_TO_CHECKBOX':
      return { ...state, cursorTarget: 'checkbox' };
    case 'CHECK_DOWN':
      return { ...state, cursorPhase: 'click-down' };
    case 'CHECK_UP':
      return {
        ...state,
        cursorPhase: 'click-up',
        rowSelected: true,
        buttonState: 'active',
      };
    case 'CURSOR_TO_BUTTON':
      return { ...state, cursorTarget: 'button', cursorPhase: 'visible' };
    case 'BUTTON_DOWN':
      return { ...state, cursorPhase: 'click-down', buttonState: 'down' };
    case 'BUTTON_UP':
      return { ...state, cursorPhase: 'click-up', buttonState: 'up' };
    case 'CURSOR_EXIT':
      return { ...state, cursorPhase: 'hidden' };
    default:
      return state;
  }
}

export default function Scene09_Invoices() {
  const [state, dispatch] = useReducer(reducer, initial);

  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cbPos = useElementCenter(checkboxRef, containerRef);
  const btnPos = useElementCenter(buttonRef, containerRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => dispatch({ type: 'SHOW_CARDS' }), 350),
      setTimeout(() => dispatch({ type: 'SHOW_ROWS' }), 950),
      setTimeout(() => dispatch({ type: 'CURSOR_APPEAR' }), 1500),
      setTimeout(() => dispatch({ type: 'CURSOR_TO_CHECKBOX' }), 1900),
      setTimeout(() => dispatch({ type: 'CHECK_DOWN' }), 3100),
      setTimeout(() => dispatch({ type: 'CHECK_UP' }), 3300),
      setTimeout(() => dispatch({ type: 'CURSOR_TO_BUTTON' }), 3800),
      setTimeout(() => dispatch({ type: 'BUTTON_DOWN' }), 5400),
      setTimeout(() => dispatch({ type: 'BUTTON_UP' }), 5650),
      setTimeout(() => dispatch({ type: 'CURSOR_EXIT' }), 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const startX = cbPos.x - 60;
  const startY = cbPos.y + 220;

  const cursorX =
    state.cursorTarget === 'start'
      ? startX
      : state.cursorTarget === 'checkbox'
      ? cbPos.x
      : btnPos.x;
  const cursorY =
    state.cursorTarget === 'start'
      ? startY
      : state.cursorTarget === 'checkbox'
      ? cbPos.y
      : btnPos.y;

  const callout = (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
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
    <Act3Layout
      breadcrumb="Financing / Supply Chain Financing / Request funds"
      callout={callout}
    >
      <div
        ref={containerRef}
        className="flex flex-col p-5 h-full overflow-hidden relative"
      >
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            {[
              { label: 'Choosing Invoices', active: true, done: false },
              { label: 'Financial Offer', active: false, done: false },
              { label: 'AOP Appendix', active: false, done: false },
              { label: 'Murabaha Process', active: false, done: false },
            ].map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && (
                  <div className="w-8 h-px" style={{ background: '#E5E7EB' }} />
                )}
                <div className="flex items-center gap-1">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 28,
                      height: 28,
                      border: `2px solid ${step.active ? '#293BE0' : '#E5E7EB'}`,
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
                      color: step.active ? '#293BE0' : '#9CA3AF',
                      fontWeight: step.active ? 700 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-5">
          {(
            [
              { val: '3', label: 'Total Number of Invoices', sub: 'Invoice' },
              {
                val: (
                  <>
                    200,000,000 <RiyalSymbol height="0.75em" />
                  </>
                ),
                label: 'Facility Limit',
                sub: '',
              },
              {
                val: (
                  <>
                    53,500,000 <RiyalSymbol height="0.75em" />
                  </>
                ),
                label: 'Total Invoices in Riyal',
                sub: '',
              },
            ] as { val: React.ReactNode; label: string; sub: string }[]
          ).map((card, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-xl p-4"
              style={{ border: '1px solid #E5E7EB' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: state.showCards ? 1 : 0,
                y: state.showCards ? 0 : 10,
              }}
              transition={{
                delay: 0.1 * i,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="font-plak-bold flex items-baseline gap-1"
                style={{ fontSize: 22, color: '#293BE0' }}
              >
                {card.val}
              </div>
              {card.sub && (
                <div
                  className="font-inter-regular"
                  style={{ fontSize: 12, color: '#6B7280' }}
                >
                  {card.sub}
                </div>
              )}
              <div
                className="font-inter-regular"
                style={{ fontSize: 12, color: '#6B7280' }}
              >
                {card.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-inter-bold" style={{ fontSize: 14 }}>
              Choose the invoices you want to finance{' '}
            </span>
            <span
              className="font-inter-regular"
              style={{ fontSize: 12, color: '#293BE0' }}
            >
              (max 15 per order)
            </span>
          </div>
          <motion.div
            ref={buttonRef}
            className="px-4 py-2 rounded-lg font-inter-bold text-white"
            style={{ fontSize: 13 }}
            animate={{
              background:
                state.buttonState === 'idle' ? '#1A1A2E' : '#293BE0',
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
              background: { duration: 0.25 },
              boxShadow: { duration: 0.22 },
            }}
          >
            {state.buttonState === 'idle' ? (
              'Select Invoices to be Financed'
            ) : (
              <>
                Finance 22,500,000 <RiyalSymbol height="0.75em" />
              </>
            )}
          </motion.div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <div
            className="grid gap-0"
            style={{ gridTemplateColumns: '40px 1fr 1fr 1fr 1fr 80px' }}
          >
            {['', 'Invoice Number', 'Invoice Amount ↕', 'Creation Date ↕', 'Invoice Due Date ↓', ''].map(
              (h, i) => (
                <div
                  key={i}
                  className="font-inter-bold px-3 py-3"
                  style={{
                    fontSize: 12,
                    color: '#6B7280',
                    background: '#F9FAFB',
                    borderBottom: '1px solid #E5E7EB',
                  }}
                >
                  {h}
                </div>
              ),
            )}
            {[
              { num: 'INV-RWB-2024-001', amount: '22,500,000.00', created: '03/10/2024', due: '15/01/2025' },
              { num: 'INV-RWB-2024-002', amount: '18,750,000.00', created: '18/10/2024', due: '28/01/2025' },
              { num: 'INV-RWB-2024-003', amount: '12,250,000.00', created: '05/11/2024', due: '10/02/2025' },
            ].map((inv, i) => {
              const isFirstRow = i === 0;
              const rowHighlighted = isFirstRow && state.rowSelected;
              return (
                <React.Fragment key={inv.num}>
                  {[
                    <div
                      key="cb"
                      className="px-3 py-3 flex items-center"
                      style={{
                        borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none',
                        background: rowHighlighted ? '#F3F4F6' : '#fff',
                      }}
                    >
                      <motion.div
                        ref={isFirstRow ? checkboxRef : undefined}
                        className="flex items-center justify-center rounded"
                        style={{ width: 18, height: 18 }}
                        animate={{
                          background: rowHighlighted ? '#293BE0' : '#fff',
                          borderColor: rowHighlighted ? '#293BE0' : '#D1D5DB',
                          borderWidth: 1.5,
                          borderStyle: 'solid',
                          scale:
                            isFirstRow && state.cursorPhase === 'click-down'
                              ? 0.85
                              : rowHighlighted
                              ? 1.15
                              : 1,
                        }}
                        transition={{
                          scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                          background: { duration: 0.15 },
                          borderColor: { duration: 0.15 },
                        }}
                      >
                        {rowHighlighted && (
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
                    ...(
                      [
                        inv.num,
                        <>
                          <RiyalSymbol height="0.75em" /> {inv.amount}
                        </>,
                        inv.created,
                        inv.due,
                        'For Details >',
                      ] as React.ReactNode[]
                    ).map((cell, ci) => (
                      <motion.div
                        key={ci}
                        className="px-3 py-3 font-inter-regular flex items-center gap-0.5"
                        style={{
                          fontSize: 13,
                          color: ci === 4 ? '#293BE0' : '#1A1A2E',
                          borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none',
                          background: rowHighlighted ? '#F3F4F6' : '#fff',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: state.showRows ? 1 : 0 }}
                        transition={{
                          delay: 0.06 * i,
                          duration: 0.25,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {cell}
                      </motion.div>
                    )),
                  ]}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <Cursor x={cursorX} y={cursorY} phase={state.cursorPhase} travelMs={950} />
      </div>
    </Act3Layout>
  );
}
