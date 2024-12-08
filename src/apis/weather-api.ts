import axios from "axios";

const API_KEY = '99469efe4065076d644eb0ef7a745882';
const CITY = "College Station";

export interface WeatherData {
    weather: string;
    temperature: number;
}

/**
 * API client for weather data
 */
export const WeatherApi = {
    /**
     * Gets weather information for current location
     * @async
     * @returns A `Promise` containing {@linkcode WeatherData}
     */
    async fetchWeather(): Promise<WeatherData | null> {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
                {
                    params: {
                        q: CITY,
                        units: 'imperial',
                        appid: API_KEY,
                    },
                }
            );

            if (response.status === 200) {
                const data = response.data;
                return {
                    weather: data.weather[0].description,
                    temperature: data.main.temp,
                };
            } else {
                console.error('Failed to fetch weather data');
                return null;
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    },
};
