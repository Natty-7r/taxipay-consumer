export interface MockRoute {
  id: string;
  routeFrom: string;
  routeTo: string;
  price: number;
  estimatedTime: string;
  distance: string;
}

export interface MockTaxi {
  plateNumber: string;
  model: string;
  driverName?: string;
}

export const mockTaxi: MockTaxi = {
  plateNumber: 'AA-12345',
  model: 'Toyota Hiace',
  driverName: 'Abebe',
};

export const mockRoutes: MockRoute[] = [
  {
    id: 'r1',
    routeFrom: 'Bole',
    routeTo: 'Megenagna',
    price: 120,
    estimatedTime: '15 min',
    distance: '5.2 km',
  },
  {
    id: 'r2',
    routeFrom: 'Bole',
    routeTo: 'Bole Michael',
    price: 80,
    estimatedTime: '10 min',
    distance: '3.1 km',
  },
  {
    id: 'r3',
    routeFrom: 'Bole',
    routeTo: 'Mexico',
    price: 150,
    estimatedTime: '20 min',
    distance: '7.8 km',
  },
];