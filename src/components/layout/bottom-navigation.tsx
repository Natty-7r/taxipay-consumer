'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, QrCode, ScanQrCode, Wallet, User } from 'lucide-react';

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: History, label: 'History', href: '/history' },
  { icon: QrCode, label: 'Scan', href: '/scan' },
  { icon: Wallet, label: 'Wallet', href: '/wallet' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 max-w-[428px] mx-auto">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || (href === '/home' && pathname === '/');
          const isScan = href === '/scan';

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${isScan
                ? '-mt-6 bg-primary text-white shadow-lg shadow-primary/30'
                : isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
                } 
                ${isScan ? "mb-3 p-3 rounded-full" : "px-3 py-2 rounded-xl "}`}
            >
              <Icon className={` ${isScan ? 'w-7 h-7 rounded-full' : 'w-5 h-5'}`} />
              {!isScan && <span className={`text-xs font-medium ${isScan ? 'text-xs' : ''}`}>{label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}