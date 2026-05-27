import { formatCurrency } from '@/helpers/number.helper';
import { ArrowUpRight } from 'lucide-react';

interface RecentActivityCardProps {
  route: string;
  amount: number;
  date: string;
  time: string;
  provider: string;
  isLast?: boolean;
}

export function RecentActivityCard({ route, amount, date, time, provider, isLast }: RecentActivityCardProps) {
  return (
    <div className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-border' : ''}`}>
      <div className="flex items-center gap-3 flex-1">
        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-foreground text-sm mb-1">{route}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{date}, {time}</span>
            <span>•</span>
            <span>via {provider}</span>
          </div>
        </div>
      </div>
      <p className="font-semibold text-foreground">{formatCurrency(amount)}</p>
    </div>
  );
}