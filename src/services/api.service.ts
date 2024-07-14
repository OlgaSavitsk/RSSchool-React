import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

class ApiClient {
    private api: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.api = axios.create(axiosConfig);
        this.api.interceptors.response.use((response: AxiosResponse) => response.data);
    }

    get<T>(url: string, params: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<T> {
        return this.api({
            method: 'get',
            url,
            params,
            ...requestConfig
        });
    }

    post<T>(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<T> {
        return this.api({
            method: 'post',
            url,
            data,
            ...requestConfig
        });
    }

    put(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<void> {
        return this.api({
            method: 'put',
            url,
            data,
            ...requestConfig
        });
    }

    delete(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<void> {
        return this.api({
            method: 'delete',
            url,
            data,
            ...requestConfig
        });
    }
}

const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    responseType: 'json',
});

export default apiClient;
