'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface HomeHeaderProps {
  firstName: string;
}

export function HomeHeader({ firstName }: HomeHeaderProps) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Hello, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ready for your next ride?
        </p>
      </div>
      <Avatar className="w-12 h-12 border-2 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(firstName)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}