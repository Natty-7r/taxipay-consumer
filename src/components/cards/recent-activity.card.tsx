'use client';

import Link from 'next/link';
import { formatCurrency } from '@/helpers/number.helper';
import { Circle } from 'lucide-react';

interface RecentActivityCardProps {
  route: string;
  amount: number;
  date: string;
  time: string;
  provider: string;
  isLast?: boolean;
  isRecent?: boolean;
  routeId?: string;
}

export function RecentActivityCard({ route, amount, date, time, provider, isLast, isRecent, routeId }: RecentActivityCardProps) {
  const href = routeId ? `/receipt?routeId=${routeId}` : '/receipt';

  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-[18px] py-[14px] hover:bg-muted/40 active:bg-muted/60 transition-colors ${!isLast ? 'border-b border-border' : ''}`}
    >
      <div className="flex items-center gap-3">
        <Circle
          className="w-2.5 h-2.5 fill-current flex-shrink-0"
          style={{ color: isRecent ? 'var(--color-primary)' : '#D1D5DB' }}
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
    </Link>
  );
}