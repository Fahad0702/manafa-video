import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DOT_DATA, VW, VH, BRIGHT_BLUE, MUTED_DARK } from './saudiMapDots';

const R = 7;

// Pre-compute thresholds once at module level — no per-render cost
const DOT_THRESHOLDS = DOT_DATA.map(([x, y]) => (y / VH) * 0.7 + (x / VW) * 0.3);

export default function Scene01_Map() {
  const svgRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startDelay = 600;
    const dur = 1400;
    let t0: number | null = null;
    let raf: number;
    let lastProgress = -1;

    function tick(now: number) {
      if (t0 === null) t0 = now + startDelay;
      const el = now - t0;
      if (el < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(el / dur, 1);

      // Only update DOM when progress meaningfully changes
      if (Math.abs(p - lastProgress) > 0.001 && svgRef.current) {
        const circles = svgRef.current.querySelectorAll('circle');
        for (let i = 0; i < circles.length; i++) {
          const visible = p >= DOT_THRESHOLDS[i]!;
          const currentOpacity = circles[i]!.getAttribute('opacity');
          const targetOpacity = visible ? '1' : '0';
          if (currentOpacity !== targetOpacity) {
            circles[i]!.setAttribute('opacity', targetOpacity);
          }
        }
        lastProgress = p;

        // Show legend when near complete
        if (legendRef.current) {
          legendRef.current.style.opacity = p >= 0.95 ? '1' : '0';
        }
      }

      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <div className="absolute top-10 left-12">
        <div className="font-plak-bold text-white" style={{ fontSize: 14, opacity: 0.55 }}>
          Supply Chain Finance
        </div>
      </div>

      <motion.h1
        className="font-plak-bold text-white text-center mb-6"
        style={{ fontSize: 28 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Supply Chain Finance in Saudi Arabia
      </motion.h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} width={560} height={560 * VH / VW} style={{ willChange: 'auto' }}>
          {DOT_DATA.map(([x, y, b], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={R}
              fill={b ? BRIGHT_BLUE : MUTED_DARK}
              opacity={0}
            />
          ))}
        </svg>
        <div
          ref={legendRef}
          style={{
            display: 'flex', gap: 32, marginTop: 20, alignItems: 'center',
            opacity: 0, transition: 'opacity 0.4s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 2, backgroundColor: BRIGHT_BLUE, flexShrink: 0 }} />
            <span className="font-plak-bold" style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
              Suppliers eligible for early payment solutions
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 2, backgroundColor: MUTED_DARK, border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
            <span className="font-plak-bold" style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
              Remaining suppliers
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
