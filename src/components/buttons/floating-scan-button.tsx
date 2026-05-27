'use client';

import { QrCode, Scan } from 'lucide-react';

export function FloatingScanButton() {
  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
      <button
        aria-label="Scan to Pay"
        className="w-16 h-16 rounded-full flex items-center justify-center border-none cursor-pointer glow"
        style={{ background: 'var(--color-primary)' }}
      >
        <QrCode className="w-7 h-7" style={{ color: 'var(--color-primary-foreground)' }} />
      </button>
      <span className="text-[12px] font-semibold text-foreground">Scan to Pay</span>
    </div>
  );
}