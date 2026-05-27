export interface MockTransaction {
  id: string;
  transactionId: string;
  referenceId: string;
  route: string;
  taxiPlate: string;
  taxiModel: string;
  amount: number;
  date: Date;
  time: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  provider: 'TELEBIRR' | 'MPESA' | 'CBE';
  merchant: string;
}

export const mockTransactions: MockTransaction[] = [
  {
    id: 'tx_001',
    transactionId: 'TXP-20241201-001',
    referenceId: 'REF-123456',
    route: 'Bole → Megenagna',
    taxiPlate: 'AA-12345',
    taxiModel: 'Toyota Hiace',
    amount: 120,
    date: new Date(2024, 11, 1, 14, 30),
    time: '2:30 PM',
    status: 'SUCCESS',
    provider: 'TELEBIRR',
    merchant: 'Abebe Taxi Services',
  },
  {
    id: 'tx_002',
    transactionId: 'TXP-20241130-002',
    referenceId: 'REF-123457',
    route: 'Piassa → Bole',
    taxiPlate: 'AA-67890',
    taxiModel: 'Toyota Corolla',
    amount: 45,
    date: new Date(2024, 10, 30, 20, 45),
    time: '8:45 PM',
    status: 'SUCCESS',
    provider: 'MPESA',
    merchant: 'Bekele Taxi',
  },
  {
    id: 'tx_003',
    transactionId: 'TXP-20241129-003',
    referenceId: 'REF-123458',
    route: 'Mexico → Bole',
    taxiPlate: 'AA-54321',
    taxiModel: 'Hyundai Grace',
    amount: 150,
    date: new Date(2024, 10, 29, 9, 15),
    time: '9:15 AM',
    status: 'SUCCESS',
    provider: 'TELEBIRR',
    merchant: 'Chala Taxi Services',
  },
  {
    id: 'tx_004',
    transactionId: 'TXP-20241128-004',
    referenceId: 'REF-123459',
    route: 'Bole → Airport',
    taxiPlate: 'AA-11111',
    taxiModel: 'Toyota Hiace',
    amount: 200,
    date: new Date(2024, 10, 28, 16, 0),
    time: '4:00 PM',
    status: 'FAILED',
    provider: 'CBE',
    merchant: 'Getachew Taxi',
  },
];

export const mockTransactionDetail = mockTransactions[0];