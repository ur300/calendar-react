import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      // baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : '/api',
      baseURL: import.meta.env.VITE_API_URL,
    });

  }


  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete(url, config);
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch(url, data, config);
  }
}

export default new ApiService();
