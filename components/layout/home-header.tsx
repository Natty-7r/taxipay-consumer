'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
        <p className="text-sm text-muted-foreground mt-0.5">
          Ready for your next ride?
        </p>
      </div>
      <Avatar className="w-12 h-12 border-2 border-primary/20 bg-primary/10">
        <AvatarFallback className="text-primary font-semibold">
          {getInitials(firstName)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}