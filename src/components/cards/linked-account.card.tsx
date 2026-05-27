import cbeIcon from '@/assets/images/png/cbe.png';
import mpesaIcon from '@/assets/images/png/mpesa.png';
import telebirrIcon from '@/assets/images/png/telebirr.png';
import { formatCurrency } from '@/helpers/number.helper';
import { IconCard } from './icon.card';

interface LinkedAccountCardProps {
  provider: string;
  phoneNumber: string;
  spent: number;
  isPrimary?: boolean;
  isLast?: boolean;
}

const PROVIDER_CONFIG: Record<string, { src: any; alt: string }> = {
  TELEBIRR: { src: telebirrIcon, alt: 'Telebirr' },
  'M-PESA': { src: mpesaIcon, alt: 'M-Pesa' },
  CBE: { src: cbeIcon, alt: 'CBE' },
};

export function LinkedAccountCard({ provider, phoneNumber, spent, isPrimary, isLast }: LinkedAccountCardProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <div className={`flex items-center justify-between px-[18px] py-[14px] ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex items-center gap-3">
        {config ? (
          <IconCard src={config.src} alt={config.alt} size="md" variant="secondary" shape="rounded" />
        ) : (
          <IconCard icon={<span className="text-xs font-bold">{provider[0]}</span>} size="md" variant="muted" shape="rounded" />
        )}
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[14px] font-bold text-foreground">{provider}</span>
            {isPrimary && (
              <span className="text-[9px] font-bold tracking-[0.8px] uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
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