import { formatCurrency } from '@/helpers/number.helper';

interface TotalSpentCardProps {
  amount: number;
}

export function TotalSpentCard({ amount }: TotalSpentCardProps) {
  return (
    <div className="relative rounded-3xl p-6 mb-5 overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
      {/* decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute -bottom-5 right-3 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div className="flex items-center gap-1.5 mb-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-[12px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Spent</p>
      </div>

      <p className="font-bold text-white leading-none tracking-tight" style={{ fontSize: '42px' }}>
        {formatCurrency(amount)}
        <span className="text-xl font-medium ml-1 opacity-90">ETB</span>
      </p>
      <p className="text-[12px] mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>All time taxi rides</p>

      {/* taxi icon */}
      <div className="absolute right-6 bottom-5 opacity-15">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
          <rect x="4" y="26" width="56" height="26" rx="6"/>
          <path d="M10 26 L16 14 H48 L54 26"/>
          <rect x="8" y="30" width="10" height="8" rx="2" fill="#1A2A3A"/>
          <rect x="46" y="30" width="10" height="8" rx="2" fill="#1A2A3A"/>
          <circle cx="14" cy="52" r="6"/>
          <circle cx="50" cy="52" r="6"/>
          <rect x="26" y="6" width="12" height="8" rx="2"/>
        </svg>
      </div>
    </div>
  );
} 