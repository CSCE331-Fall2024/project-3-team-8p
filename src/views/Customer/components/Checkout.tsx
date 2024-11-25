import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import '../css/Checkout.css';
import { WeatherService, WeatherData } from '../../../apis/WeatherService'


const Checkout: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

    const getWeatherRecommendation = (weather: string, temperature: number): string => {
        if (weather.includes('rain')) {
            return "Looks like it's rainy! Consider adding an extra side to help you stay dry.";
        } else if (temperature >= 85) {
            return "It's hot outside! A refreshing drink would be perfect to cool off.";
        } else if (temperature <= 60) {
            return "It's quite cold! An extra entree would help keep you warm.";
        } else {
            return "Enjoy your meal! Have you tried our desserts?";
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoadingWeather(true);
            const data = await WeatherService.fetchWeather();
            setWeatherData(data);
            setLoadingWeather(false);
        };

        fetchWeatherData();
    }, []);

    const handleOrderMore = () => {
        navigate('/customer');
    };

    const handlePlaceOrder = () => {
        alert('Order placed!');
        clearCart();
        navigate('/customer');
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div className="cart-item" key={item.menuItemId}>
                            <span>
                                {item.itemName} x {item.quantityOrdered}
                            </span>
                            <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="weather-container">
                <h3>Current Weather</h3>
                {loadingWeather ? (
                    <p>Loading weather...</p>
                ) : weatherData ? (
                    <>
                        <p>
                            {weatherData.weather.charAt(0).toUpperCase() + weatherData.weather.slice(1)} | {weatherData.temperature}°F
                        </p>
                        <p className="recommendation">
                            {getWeatherRecommendation(weatherData.weather, weatherData.temperature)}
                        </p>
                    </>
                ) : (
                    <p>Unable to fetch weather data.</p>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="total-container">
                    <h3 className="total-text">Total: ${cartTotal.toFixed(2)}</h3>
                    <div className="buttons-container">
                        <button className="button" onClick={handleOrderMore}>
                            Order More
                        </button>
                        <button className="button" onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;