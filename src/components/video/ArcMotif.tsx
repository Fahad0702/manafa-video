import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArcMotifProps {
  currentScene: number;
}

// Each act group gets a distinct arc configuration
// scene 0: Intro
// scene 1-4: Act 1 (data/map)
// scene 5-7: Act 2 (logo reveal / partner network / comparison)
// scene 8-13: Act 3 (UI walkthrough)
// scene 14: End frame

interface ArcConfig {
  id: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: string; // vw
  cx: number; cy: number; r: number;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  opacity: number;
}

const ACT1_ARCS: ArcConfig[] = [
  {
    id: 'a1-tr',
    position: { top: '0', right: '0' },
    size: '24vw',
    cx: 100, cy: 0, r: 55,
    stroke: '#293BE0', strokeWidth: 3,
    strokeDasharray: '65 200',
    opacity: 0.25,
  },
];

// Act 2: top corner only (single arc, top-right)
const ACT2_ARCS: ArcConfig[] = [
  {
    id: 'a2-tr',
    position: { top: '0', right: '0' },
    size: '36vw',
    cx: 100, cy: 0, r: 72,
    stroke: '#9139FF', strokeWidth: 3.5,
    strokeDasharray: '75 200',
    opacity: 0.26,
  },
];

// Act 3: right-side + bottom
const ACT3_ARCS: ArcConfig[] = [
  {
    id: 'a3-right',
    position: { top: '50%', right: '0' },
    size: '28vw',
    cx: 100, cy: 50, r: 68,
    stroke: '#293BE0', strokeWidth: 3.5,
    strokeDasharray: '70 200',
    opacity: 0.28,
  },
  {
    id: 'a3-bottom',
    position: { bottom: '0', left: '50%' },
    size: '26vw',
    cx: 0, cy: 100, r: 62,
    stroke: '#293BE0', strokeWidth: 3,
    strokeDasharray: '55 200',
    opacity: 0.20,
  },
];

const END_ARCS: ArcConfig[] = [
  {
    id: 'end-bl',
    position: { bottom: '0', left: '0' },
    size: '28vw',
    cx: 0, cy: 100, r: 68,
    stroke: '#293BE0', strokeWidth: 3,
    strokeDasharray: '60 200',
    opacity: 0.22,
  },
];

function getArcs(scene: number): ArcConfig[] {
  if (scene === 0) return ACT1_ARCS;
  if (scene <= 4) return ACT1_ARCS;
  if (scene <= 7) return ACT2_ARCS;
  if (scene <= 13) return ACT3_ARCS;
  return END_ARCS;
}

// Direction hint: where each arc slides in/out from (x,y offsets in px)
function getSlideOffset(cfg: ArcConfig): { x: number; y: number } {
  const top = 'top' in cfg.position;
  const bottom = 'bottom' in cfg.position;
  const left = 'left' in cfg.position;
  const right = 'right' in cfg.position;
  return {
    x: right ? 40 : left ? -40 : 0,
    y: bottom ? 40 : top ? -40 : 0,
  };
}

function ArcSvg({ cfg }: { cfg: ArcConfig }) {
  const { x, y } = getSlideOffset(cfg);
  return (
    <motion.svg
      key={cfg.id}
      className="absolute"
      style={{ ...cfg.position, width: cfg.size, height: cfg.size, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      viewBox="0 0 100 100"
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: cfg.opacity, x: 0, y: 0 }}
      exit={{ opacity: 0, x, y }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <circle
        cx={cfg.cx}
        cy={cfg.cy}
        r={cfg.r}
        fill="none"
        stroke={cfg.stroke}
        strokeWidth={cfg.strokeWidth}
        strokeDasharray={cfg.strokeDasharray}
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export default function ArcMotif({ currentScene }: ArcMotifProps) {
  const arcs = getArcs(currentScene);
  const groupKey = currentScene <= 4 ? 'act1' : currentScene <= 7 ? 'act2' : currentScene <= 13 ? 'act3' : 'end';

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="sync">
        {arcs.map(cfg => (
          <ArcSvg key={`${groupKey}-${cfg.id}`} cfg={cfg} />
        ))}
      </AnimatePresence>
    </div>
  );
}
