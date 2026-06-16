'use client';

import { Globe, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';

interface PreferencesSectionCardProps {
  language?: string;
  pushNotificationsEnabled?: boolean;
  onLanguageChange?: () => void;
  onSecurityPress?: () => void;
  onNotificationsToggle?: (enabled: boolean) => void;
  onLogoutPress?: () => void;
}

export function PreferencesSectionCard({
  language = 'English',
  pushNotificationsEnabled = true,
  onLanguageChange,
  onSecurityPress,
  onNotificationsToggle,
  onLogoutPress,
}: PreferencesSectionCardProps) {
  const [notificationsOn, setNotificationsOn] = useState(pushNotificationsEnabled);

  const handleToggle = useCallback(() => {
    const newValue = !notificationsOn;
    setNotificationsOn(newValue);
    onNotificationsToggle?.(newValue);
  }, [notificationsOn, onNotificationsToggle]);

  return (
    <section className="mb-6" aria-label="Preferences">
      <h2 className="text-[11px] font-bold tracking-[1.2px] text-foreground-muted uppercase mb-3">
        Preferences
      </h2>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        {/* Language */}
        <button
          onClick={onLanguageChange}
          className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-muted/50 transition-colors border-b border-border cursor-pointer"
          aria-label={`Language: ${language}`}
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-foreground" />
            <span className="text-[14px] font-medium text-foreground">Language</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[13px] text-foreground-muted">{language}</span>
            <ChevronRight className="w-4 h-4 text-foreground-muted" />
          </div>
        </button>

        {/* Push Notifications */}
        <div className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="text-[14px] font-medium text-foreground">Push Notifications</span>
          </div>
          <button
            role="switch"
            aria-checked={notificationsOn}
            aria-label="Toggle push notifications"
            onClick={handleToggle}
            className={`relative inline-flex h-[26px] w-[46px] min-h-0 min-w-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
              notificationsOn ? 'bg-[#5C6B1A]' : 'bg-[#EDEAE4]'
            }`}
          >
            <span
              className={`inline-block h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                notificationsOn ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </button>
        </div>

        {/* Security & Biometrics */}
        <button
          onClick={onSecurityPress}
          className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-muted/50 transition-colors border-b border-border cursor-pointer"
          aria-label="Security and Biometrics"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-foreground" />
            <span className="text-[14px] font-medium text-foreground">Security & Biometrics</span>
          </div>
          <ChevronRight className="w-4 h-4 text-foreground-muted" />
        </button>

        {/* Logout */}
        <button
          onClick={onLogoutPress}
          className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-muted/50 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-[#EF4444]" />
            <span className="text-[14px] font-medium text-[#EF4444]">Logout</span>
          </div>
        </button>
      </div>
    </section>
  );
}
