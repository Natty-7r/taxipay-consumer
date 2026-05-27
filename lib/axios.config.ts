import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { logger } from './logger.config';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
  _retry?: number;
}

class ApiClient {
  private client: AxiosInstance;
  private retryCount: number = 3;
  private retryDelay: number = 1000;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const startTime = Date.now();
        config.metadata = { startTime };
        
        logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
        
        return config;
      },
      (error) => {
        logger.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        const duration = Date.now() - ((response.config as CustomAxiosRequestConfig).metadata?.startTime || 0);
        logger.debug(`API Response: ${response.status} ${response.config.url}`, {
          duration: `${duration}ms`,
          data: response.data,
        });
        return response;
      },
      async (error: AxiosError) => {
        const config = error.config as CustomAxiosRequestConfig;
        
        if (!config || !config._retry) {
          config._retry = 0;
        }
        
        if (config._retry < this.retryCount && this.shouldRetry(error)) {
          config._retry += 1;
          const delay = this.retryDelay * config._retry;
          
          logger.warn(`Retrying request (${config._retry}/${this.retryCount})`, {
            url: config.url,
            delay,
          });
          
          await this.delay(delay);
          return this.client(config);
        }
        
        logger.error('API Response Error:', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
        });
        
        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    const status = error.response?.status;
    return !status || status >= 500 || status === 429;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  public setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }
}

export const apiClient = new ApiClient();