'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, Wallet, User, Scan } from 'lucide-react';

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: History, label: 'History', href: '/history' },
  { icon: Scan, label: 'Scan', href: '/scan' },
  { icon: Wallet, label: 'Wallet', href: '/wallet' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border max-w-[428px] mx-auto">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || (href === '/home' && pathname === '/');
          
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 touch-target ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}