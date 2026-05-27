import { apiClient } from '@/lib/axios.config';
import { logger } from '@/lib/logger.config';

export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      return await apiClient.get<T>(`${this.baseUrl}${endpoint}`, { params });
    } catch (error) {
      logger.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      return await apiClient.post<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error) {
      logger.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  }

  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    try {
      return await apiClient.put<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error) {
      logger.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    try {
      return await apiClient.patch<T>(`${this.baseUrl}${endpoint}`, data);
    } catch (error) {
      logger.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      return await apiClient.delete<T>(`${this.baseUrl}${endpoint}`);
    } catch (error) {
      logger.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }
}