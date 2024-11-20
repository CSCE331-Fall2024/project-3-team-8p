const API_KEY = '99469efe4065076d644eb0ef7a745882'; // Replace with your OpenWeather API key
const CITY = 'College Station'; // Replace with your desired city or make dynamic

export interface WeatherData {
    weather: string;
    temperature: number;
}

export const WeatherService = {
    async fetchWeather(): Promise<WeatherData | null> {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`
            );

            if (response.ok) {
                const data = await response.json();
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
