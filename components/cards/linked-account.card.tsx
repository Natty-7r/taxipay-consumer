import { formatCurrency } from '@/helpers/number.helper';

interface LinkedAccountCardProps {
  provider: string;
  phoneNumber: string;
  spent: number;
  isPrimary?: boolean;
}

export function LinkedAccountCard({ provider, phoneNumber, spent, isPrimary }: LinkedAccountCardProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex-1">
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