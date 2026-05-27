import { formatCurrency } from '@/helpers/number.helper';

interface LinkedAccountCardProps {
  provider: string;
  phoneNumber: string;
  spent: number;
  isPrimary?: boolean;
  isLast?: boolean;
}

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  TELEBIRR: (
    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#1A2A3A' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="#FFC107" strokeWidth="1.8"/>
        <path d="M3 10h18" stroke="#FFC107" strokeWidth="1.8"/>
        <rect x="6" y="14" width="4" height="2" rx="0.5" fill="#FFC107"/>
      </svg>
    </div>
  ),
  'M-PESA': (
    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5E9' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="#2E7D32" strokeWidth="1.8"/>
        <circle cx="12" cy="12.5" r="2.5" stroke="#2E7D32" strokeWidth="1.8"/>
      </svg>
    </div>
  ),
  CBE: (
    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#EEF2FF' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="18" width="20" height="2" rx="1" fill="#3F51B5"/>
        <rect x="10" y="8" width="4" height="10" fill="#3F51B5"/>
        <rect x="5" y="10" width="3" height="8" fill="#3F51B5"/>
        <rect x="16" y="10" width="3" height="8" fill="#3F51B5"/>
        <path d="M12 4L22 9H2L12 4Z" fill="#3F51B5"/>
      </svg>
    </div>
  ),
};

export function LinkedAccountCard({ provider, phoneNumber, spent, isPrimary, isLast }: LinkedAccountCardProps) {
  return (
    <div className={`flex items-center justify-between px-[18px] py-[14px] ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex items-center gap-3">
        {PROVIDER_ICONS[provider] ?? (
          <div className="w-[38px] h-[38px] rounded-[10px] bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-foreground">{provider[0]}</span>
          </div>
        )}
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[14px] font-bold text-foreground">{provider}</span>
            {isPrimary && (
              <span className="text-[9px] font-bold tracking-[0.8px] uppercase px-2 py-0.5 rounded-full" style={{ background: '#FFF3CD', color: '#956A00' }}>
                Primary
              </span>
            )}
          </div>
          <p className="text-[12px] text-muted-foreground">{phoneNumber}</p>
        </div>
      </div>
      <p className="text-[14px] font-bold text-foreground">{formatCurrency(spent)} </p>
    </div>
  );
}