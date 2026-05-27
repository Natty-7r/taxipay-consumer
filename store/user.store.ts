import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LinkedAccount, UserSession } from '@/types/user.type';
import { encrypt, decrypt } from '@/helpers/encryption.helper';

interface UserState {
  user: User | null;
  linkedAccounts: LinkedAccount[];
  totalSpent: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLinkedAccounts: (accounts: LinkedAccount[]) => void;
  setTotalSpent: (amount: number) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  addLinkedAccount: (account: LinkedAccount) => void;
  removeLinkedAccount: (phoneNumber: string) => void;
  setPrimaryAccount: (phoneNumber: string) => void;
  updateTotalSpent: (amount: number) => void;
  logout: () => void;
  getSession: () => UserSession;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      linkedAccounts: [],
      totalSpent: 0,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setLinkedAccounts: (accounts) => set({ linkedAccounts: accounts }),
      
      setTotalSpent: (amount) => set({ totalSpent: amount }),
      
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      addLinkedAccount: (account) =>
        set((state) => ({
          linkedAccounts: [...state.linkedAccounts, account],
        })),
      
      removeLinkedAccount: (phoneNumber) =>
        set((state) => ({
          linkedAccounts: state.linkedAccounts.filter(
            (acc) => acc.phoneNumber !== phoneNumber
          ),
        })),
      
      setPrimaryAccount: (phoneNumber) =>
        set((state) => ({
          linkedAccounts: state.linkedAccounts.map((acc) => ({
            ...acc,
            isPrimary: acc.phoneNumber === phoneNumber,
          })),
        })),
      
      updateTotalSpent: (amount) =>
        set((state) => ({
          totalSpent: state.totalSpent + amount,
        })),
      
      logout: () =>
        set({
          user: null,
          linkedAccounts: [],
          totalSpent: 0,
          isAuthenticated: false,
        }),
      
      getSession: () => {
        const { user, linkedAccounts, totalSpent, isAuthenticated } = get();
        return { user, linkedAccounts, totalSpent, isAuthenticated };
      },
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const encrypted = localStorage.getItem(name);
          if (!encrypted) return null;
          return decrypt(encrypted);
        },
        setItem: (name, value) => {
          const encrypted = encrypt(value.state);
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);