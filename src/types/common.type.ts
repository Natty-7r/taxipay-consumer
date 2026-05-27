export type SortOrder = 'asc' | 'desc';

export type Theme = 'light' | 'dark' | 'system';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface FilterOptions {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string[];
  provider?: string[];
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';