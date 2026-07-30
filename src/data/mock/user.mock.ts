export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nidNumber?: string;
  avatar?: string;
}

export interface MockLinkedAccount {
  provider: 'TELEBIRR' | 'MPESA' | 'CBE';
  phoneNumber: string;
  maskedNumber: string;
  spent: number;
  isPrimary: boolean;
  linkedDate?: string;
}

export const mockUser: MockUser = {
  id: 'usr_001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+251 911 123 456',
  nidNumber: '1234 •••• 7890',
};

export const mockLinkedAccounts: MockLinkedAccount[] = [

  {
    provider: 'MPESA',
    phoneNumber: '+254 7XX XXX456',
    maskedNumber: '+254 7XX ***456',
    spent: 400,
    isPrimary: true,
    linkedDate: 'Jan 2024',
  },
    {
    provider: 'TELEBIRR',
    phoneNumber: '+251 9XX XXX123',
    maskedNumber: '+251 9XX ***123',
    spent: 650,
    isPrimary: false,
  },
  {
    provider: 'CBE',
    phoneNumber: '+251 9XX XXX789',
    maskedNumber: '+251 9XX ***789',
    spent: 200,
    isPrimary: false,
    linkedDate: 'Mar 2024',
  },
];

export const mockTotalSpent = 1250;
export const mockCurrentAccount = mockLinkedAccounts[0];
