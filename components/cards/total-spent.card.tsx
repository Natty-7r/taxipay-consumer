import { formatCurrency } from '@/helpers/number.helper';

interface TotalSpentCardProps {
  amount: number;
}

export function TotalSpentCard({ amount }: TotalSpentCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg mb-6 border border-border">
      <p className="text-sm font-medium text-muted-foreground mb-2">Total Spent</p>
      <p className="text-3xl font-bold text-foreground mb-1">
        {formatCurrency(amount)}
      </p>
      <p className="text-xs text-muted-foreground">All time taxi rides</p>
    </div>
  );
}