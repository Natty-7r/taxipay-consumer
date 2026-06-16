export interface RecentActivity {
  id: string;
  route: string;
  date: string;
  time: string;
  amount: number;
  provider: 'TELEBIRR' | 'MPESA' | 'CBE';
  status: 'success' | 'failed' | 'pending';
  taxiPlate?: string;
  routeId?: string;
}

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act_001',
    route: 'Bole → Piassa',
    date: 'Today',
    time: '8:42 PM',
    amount: 45,
    provider: 'TELEBIRR',
    status: 'success',
    taxiPlate: 'AA-12345',
    routeId: 'r1',
  },
  {
    id: 'act_002',
    route: 'Megenagna → Bole',
    date: 'Yesterday',
    time: '5:30 PM',
    amount: 120,
    provider: 'MPESA',
    status: 'success',
    taxiPlate: 'AA-67890',
    routeId: 'r2',
  },
  {
    id: 'act_003',
    route: 'Mexico → Bole',
    date: 'Dec 1',
    time: '10:15 AM',
    amount: 80,
    provider: 'TELEBIRR',
    status: 'success',
    taxiPlate: 'AA-54321',
    routeId: 'r3',
  },
];

export const greetingMessage = 'Ready for your next ride?';