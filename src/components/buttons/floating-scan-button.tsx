'use client';

export function FloatingScanButton() {
  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
      <button
        aria-label="Scan to Pay"
        className="w-16 h-16 rounded-full flex items-center justify-center border-none cursor-pointer glow"
        style={{ background: 'var(--color-primary)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A2A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="3" height="3"/>
          <rect x="18" y="14" width="3" height="3"/>
          <rect x="14" y="18" width="3" height="3"/>
          <rect x="18" y="18" width="3" height="3"/>
        </svg>
      </button>
      <span className="text-[12px] font-semibold text-foreground">Scan to Pay</span>
    </div>
  );
}