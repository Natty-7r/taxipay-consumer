import { formatCurrency } from '@/helpers/number.helper';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';

interface LinkedAccountCardProps {
  provider: string;
  phoneNumber: string;
  spent: number;
  isPrimary?: boolean;
  isLast?: boolean;
}

const PROVIDER_ICONS: Record<string, { icon: React.ReactNode; bgColor: string }> = {
  TELEBIRR: {
    icon: <CreditCard className="w-5 h-5" style={{ color: '#FFC107' }} />,
    bgColor: '#1A2A3A',
  },
  'M-PESA': {
    icon: <Smartphone className="w-5 h-5" style={{ color: '#2E7D32' }} />,
    bgColor: '#E8F5E9',
  },
  CBE: {
    icon: <Building2 className="w-5 h-5" style={{ color: '#3F51B5' }} />,
    bgColor: '#EEF2FF',
  },
};

export function LinkedAccountCard({ provider, phoneNumber, spent, isPrimary, isLast }: LinkedAccountCardProps) {
  const providerStyle = PROVIDER_ICONS[provider] || {
    icon: <span className="text-xs font-bold text-foreground">{provider[0]}</span>,
    bgColor: 'var(--color-muted)',
  };

  return (
    <div className={`flex items-center justify-between px-[18px] py-[14px] ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex items-center gap-3">
        <div
          className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: providerStyle.bgColor }}
        >
          {providerStyle.icon}
        </div>
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
      <p className="text-[14px] font-bold text-foreground">{formatCurrency(spent)}</p>
    </div>
  );
}