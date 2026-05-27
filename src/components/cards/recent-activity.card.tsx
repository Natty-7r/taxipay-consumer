import { formatCurrency } from '@/helpers/number.helper';

interface RecentActivityCardProps {
  route: string;
  amount: number;
  date: string;
  time: string;
  provider: string;
  isLast?: boolean;
  isRecent?: boolean;
}

export function RecentActivityCard({ route, amount, date, time, provider, isLast, isRecent }: RecentActivityCardProps) {
  return (
    <div className={`flex items-center justify-between px-[18px] py-[14px] ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex items-center gap-3">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: isRecent ? 'var(--color-primary)' : '#D1D5DB' }}
        />
        <div>
          <p className="text-[14px] font-bold text-foreground mb-0.5">{route}</p>
          <p className="text-[11px] text-muted-foreground">{date}, {time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[14px] font-bold text-foreground">{formatCurrency(amount)} ETB</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">via {provider}</p>
      </div>
    </div>
  );
}