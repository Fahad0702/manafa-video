import React from 'react';
import { motion } from 'framer-motion';

export type CursorPhase =
  | 'hidden'
  | 'visible' // visible, idle at given position
  | 'click-down' // pressed
  | 'click-up'; // released (subtle pop, scale 1)

interface CursorProps {
  /** x relative to the container that is `position: relative` and contains the cursor. */
  x: number;
  /** y relative to the container. */
  y: number;
  phase: CursorPhase;
  /** Total time (ms) the cursor takes to travel between positions. */
  travelMs?: number;
}

/**
 * A standardized animated cursor used across the Act 3 UI scenes.
 *
 * - (x, y) is the TIP of the cursor arrow — the SVG hot-point lands exactly there.
 * - When `phase` flips to a new position the cursor smoothly travels there.
 * - `click-down` shrinks slightly; `click-up` returns to natural scale.
 * - `hidden` fades the cursor out without changing position.
 */
const CURSOR_SIZE = 26;
// Tip offset inside the 26x26 SVG (the "5.5,3.21" in the path, scaled).
const TIP_X = 6;
const TIP_Y = 4;

export default function Cursor({ x, y, phase, travelMs = 700 }: CursorProps) {
  const visible = phase !== 'hidden';
  const scale = phase === 'click-down' ? 0.78 : 1;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        top: 0,
        left: 0,
        zIndex: 50,
        marginTop: -TIP_Y,
        marginLeft: -TIP_X,
        filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.45))',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
      animate={{
        x,
        y,
        opacity: visible ? 1 : 0,
        scale,
      }}
      transition={{
        x: { duration: travelMs / 1000, ease: [0.45, 0.05, 0.2, 1] },
        y: { duration: travelMs / 1000, ease: [0.45, 0.05, 0.2, 1] },
        opacity: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.12, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill="#FFFFFF"
          stroke="#1A1A2E"
          strokeWidth="1.4"
        />
      </svg>
    </motion.div>
  );
}
