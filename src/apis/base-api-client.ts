import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

/*
Sends GET, POST, PUT, and DELETE requests to server
*/
export class BaseApiClient {
    private readonly _baseUrl: string = "http://localhost:8080/api/v1";
    protected apiClient: AxiosInstance;

    constructor(endpoint: string) {
        this.apiClient = axios.create({
            baseURL: `${this._baseUrl}/${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Intercept and handle any errors from API responses
        this.apiClient.interceptors.response.use(
            response => response,
            error => {
                // Log errors
                console.error('API Error:', error);

                // Handle specific status codes
                switch (error.response?.status) {
                    case 401:
                        throw new Error("Unauthorized.");
                    case 403:
                        throw new Error("Forbidden.");
                    case 404:
                        throw new Error("Not Found.");
                    default:
                        throw new Error("Resource request failed.");
                }
            }
        );
    }
}
