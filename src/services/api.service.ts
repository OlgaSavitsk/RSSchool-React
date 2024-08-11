import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
  private api: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.api = axios.create(axiosConfig);
    this.api.interceptors.response.use((response: AxiosResponse) => response.data);
  }

  get<T>(url: string, params: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<T> {
    return this.api({
      method: "get",
      url,
      params,
      ...requestConfig,
    });
  }
}

const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: "json",
});

export default apiClient;
