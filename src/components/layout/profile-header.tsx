'use client';

import { Settings } from 'lucide-react';

export function ProfileHeader() {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-base font-semibold text-foreground">Profile</h1>
      <button
        aria-label="Settings"
        className="w-10 h-10 min-h-0 min-w-0 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
      >
        <Settings className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
}
