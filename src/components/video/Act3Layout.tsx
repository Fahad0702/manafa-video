import React from 'react';
import { motion } from 'framer-motion';

const SIDEBAR_ITEMS = ['Home', 'Profile', 'Financing', 'Wallet', 'Explore', 'Affiliate'];

interface Act3LayoutProps {
  breadcrumb: string;
  callout?: React.ReactNode;
  children: React.ReactNode;
}

export default function Act3Layout({ breadcrumb, callout, children }: Act3LayoutProps) {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style paint' }}
    >
      <div
        className="flex rounded-xl overflow-hidden"
        style={{
          width: '75vw',
          height: '72vh',
          border: '1px solid #E5E7EB',
          boxShadow: '0 8px 48px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="flex flex-col shrink-0 bg-white"
          style={{ width: '280px', borderRight: '1px solid #E5E7EB' }}
        >
          <div
            className="flex items-center gap-2 p-4"
            style={{ borderBottom: '1px solid #E5E7EB' }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 36, height: 36, background: '#293BE0' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}logos/logo-white.png`}
                alt="Manafa"
                style={{ width: 22, height: 22, objectFit: 'contain' }}
              />
            </div>
            <div>
              <div className="font-inter-bold" style={{ fontSize: 14, color: '#1A1A2E' }}>Rawabi Supply Co.</div>
              <div className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>Supplier</div>
            </div>
          </div>

          <div className="flex flex-col gap-px p-3 flex-1">
            {SIDEBAR_ITEMS.map(item => (
              <div
                key={item}
                className="px-3 py-2 rounded-lg"
                style={{
                  fontSize: 14,
                  color: item === 'Financing' ? '#293BE0' : '#1A1A2E',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: item === 'Financing' ? 700 : 400,
                  background: item === 'Financing' ? '#EEF0FC' : 'transparent',
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            className="p-4 flex flex-col gap-2"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="rounded-full shrink-0 flex items-center justify-center"
                style={{ width: 20, height: 20, background: '#EEF0FC' }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#293BE0' }} />
              </div>
              <span className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>
                Approved by the Shariah Committee
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="rounded-full shrink-0 flex items-center justify-center"
                style={{ width: 20, height: 20, background: '#EEF0FC' }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#293BE0' }} />
              </div>
              <span className="font-inter-regular" style={{ fontSize: 12, color: '#6B7280' }}>
                Licensed by SAMA
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 bg-white overflow-hidden">
          <div
            className="flex items-center justify-between px-5 shrink-0"
            style={{ height: 48, borderBottom: '1px solid #E5E7EB' }}
          >
            <div className="font-inter-bold" style={{ fontSize: 13, color: '#1A1A2E' }}>
              {breadcrumb}
            </div>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 30, height: 30, background: '#293BE0' }}
            >
              <span className="font-inter-bold" style={{ fontSize: 12, color: '#fff' }}>RS</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>
        </div>
      </div>

      {callout && (
        <div className="mt-5 text-center">
          {callout}
        </div>
      )}
    </motion.div>
  );
}
