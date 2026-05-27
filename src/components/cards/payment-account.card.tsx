import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentAccountCardProps {
  provider: string;
  phoneNumber: string;
  onPressChange?: () => void;
}

export function PaymentAccountCard({ provider, phoneNumber, onPressChange }: PaymentAccountCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
      <p className="text-xs font-medium text-muted-foreground mb-3">PAYING WITH</p>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{provider}</span>
          </div>
          <p className="text-sm text-muted-foreground">{phoneNumber}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onPressChange}
          className="text-primary hover:text-primary/80"
        >
          Change
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}