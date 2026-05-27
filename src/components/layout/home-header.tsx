'use client';

import { Bell } from 'lucide-react';

interface HomeHeaderProps {
  firstName: string;
}

export function HomeHeader({ firstName }: HomeHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden flex-shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${firstName}&background=1A2A3A&color=FFC107&bold=true&size=96`}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 ml-3">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Hello, {firstName}</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Ready for your next ride?</p>
      </div>
      <button
        aria-label="Notifications"
        className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-sm"
      >
        <Bell className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
}