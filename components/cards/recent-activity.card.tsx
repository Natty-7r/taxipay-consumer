import { formatCurrency } from '@/helpers/number.helper';
import { ArrowUpRight } from 'lucide-react';

interface RecentActivityCardProps {
  route: string;
  amount: number;
  date: string;
  time: string;
  provider: string;
}

export function RecentActivityCard({ route, amount, date, time, provider }: RecentActivityCardProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
          <span className="font-medium text-foreground">{route}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{date}, {time}</span>
          <span>•</span>
          <span>via {provider}</span>
        </div>
      </div>
      <p className="font-semibold text-foreground">{formatCurrency(amount)}</p>
    </div>
  );
}