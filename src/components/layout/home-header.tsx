'use client';

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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </button>
    </div>
  );
}