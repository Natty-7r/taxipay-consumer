'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function FloatingScanButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      className="fixed bottom-[76px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30"
    >
      {/* Pulse rings */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full pulse-ring"
          style={{ background: 'rgba(255, 193, 7, 0.25)' }}
        />
        <div
          className="absolute inset-0 rounded-full pulse-ring"
          style={{ background: 'rgba(255, 193, 7, 0.15)', animationDelay: '0.6s' }}
        />
        <Link
          href="/routes"
          aria-label="Scan to Pay"
          className="relative w-[64px] h-[64px] rounded-full flex items-center justify-center border-none cursor-pointer z-10 transition-transform duration-200 active:scale-95 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
            boxShadow: '0 4px 20px rgba(255, 193, 7, 0.4)',
          }}
        >
          {/* QR Code icon matching the design */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {/* Top-left QR square */}
            <rect x="3" y="3" width="9" height="9" rx="1.5" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="5.5" y="5.5" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            {/* Top-right QR square */}
            <rect x="16" y="3" width="9" height="9" rx="1.5" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="18.5" y="5.5" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            {/* Bottom-left QR square */}
            <rect x="3" y="16" width="9" height="9" rx="1.5" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="5.5" y="18.5" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            {/* Bottom-right dots */}
            <rect x="16" y="16" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            <rect x="21" y="16" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            <rect x="16" y="21" width="4" height="4" rx="0.5" fill="#1A2A3A" />
            <rect x="21" y="21" width="4" height="4" rx="0.5" fill="#1A2A3A" />
          </svg>
        </Link>
      </div>
      <span className="text-[12px] font-semibold text-foreground">Scan to Pay</span>
    </motion.div>
  );
}