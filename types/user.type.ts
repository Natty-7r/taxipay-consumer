export type UserRole = 'user' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'none';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nidNumber?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nidNumber?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface NIDVerificationDto {
  nidNumber: string;
  fullName: string;
  dateOfBirth: string;
}

export interface LinkedAccount {
  provider: 'TELEBIRR' | 'MPESA' | 'CBE';
  phoneNumber: string;
  isPrimary: boolean;
  spent: number;
  maskedNumber: string;
}

export interface UserSession {
  user: User | null;
  isAuthenticated: boolean;
  linkedAccounts: LinkedAccount[];
  totalSpent: number;
}