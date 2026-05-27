import { formatCurrency } from '@/helpers/number.helper';

interface LinkedAccountCardProps {
  provider: string;
  phoneNumber: string;
  spent: number;
  isPrimary?: boolean;
  isLast?: boolean;
}

export function LinkedAccountCard({ provider, phoneNumber, spent, isPrimary, isLast }: LinkedAccountCardProps) {
  return (
    <div className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-border' : ''}`}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-foreground">{provider}</span>
          {isPrimary && (
            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              PRIMARY
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{phoneNumber}</p>
      </div>
      <p className="font-semibold text-foreground">{formatCurrency(spent)}</p>
    </div>
  );
}