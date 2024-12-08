import axios, { AxiosInstance } from 'axios';

/**
 * Provides shared axios configurations.
 *
 * @remarks
 * Sets backend base URL
 */
export default abstract class BaseApi {
    /**
     * Backend REST API base URL
     * @private
     */
    private readonly _baseUrl: string = process.env.REACT_APP_BACKEND_DEVELOPMENT_API_URL as string;
    /**
     * The axios client
     * @protected
     */
    protected apiClient: AxiosInstance;

    /**
     * Constructs a new {@linkcode BaseApi} instance
     * @param endpoint - The endpoint to serve as the Base URL
     * @protected
     */
    protected constructor(endpoint: string) {
        this.apiClient = axios.create({
            baseURL: `${this._baseUrl}/${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Intercept and handle errors during API requests
        this.apiClient.interceptors.request.use(
            config => config,
            error => {
                console.log("API request error:", error);
                throw new Error("API request error:", error);
            }
        )

        // Intercept and handle any errors from API responses
        this.apiClient.interceptors.response.use(
            response => response,
            error => {
                // Log errors
                console.error("API response error:", error);

                // Handle specific status codes
                let errorMessage;
                switch (error.response?.status) {
                    case 401:
                        errorMessage = "Unauthorized";
                        break;
                    case 403:
                        errorMessage = "Forbidden";
                        break;
                    case 404:
                        errorMessage = "Not Found";
                        break;
                    default:
                        errorMessage = "Resource request failed";
                        break;
                }
                throw new Error("API response error: " + errorMessage);
            }
        );
    }
}
