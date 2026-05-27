import { formatCurrency } from '@/helpers/number.helper';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';
import taxiIcon from '@/assets/svg/taxi-icon.png';

interface TotalSpentCardProps {
  amount: number;
}

export function TotalSpentCard({ amount }: TotalSpentCardProps) {
  return (
    <div className="relative rounded-3xl p-6 mb-5 overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
      {/* decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute -bottom-5 right-3 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div className="flex items-center gap-1.5 mb-1.5">
        <CircleDollarSign className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.5)' }} />
        <p className="text-[12px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Spent</p>
      </div>

      <p className="font-bold text-white leading-none tracking-tight" style={{ fontSize: '42px' }}>
        {formatCurrency(amount)}
        <span className="text-xl font-medium ml-1 opacity-90">ETB</span>
      </p>
      <p className="text-[12px] mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>All time taxi rides</p>

      {/* taxi icon from assets */}
      <div className="absolute right-6 bottom-5 opacity-15">
        <Image
          src={taxiIcon}
          alt="Taxi"
          width={64}
          height={64}
          className="text-white"
        />
      </div>
    </div>
  );
}