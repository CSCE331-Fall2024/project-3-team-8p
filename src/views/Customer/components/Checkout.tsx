import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/Checkout.css';




const Checkout: React.FC = () => {
    const { cartItems, total, clearCart } = useCart();
    const navigate = useNavigate();

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

    const [weather, setWeather] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

    const fetchWeather = async () => {
        try {
            // Replace with your OpenWeather API key
            const API_KEY = '99469efe4065076d644eb0ef7a745882';
            // Replace with your desired city or use geolocation for dynamic location
            const CITY = 'College Station';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`
            );

            if (response.ok) {
                const data = await response.json();
                setWeather(data.weather[0].description);
                setTemperature(data.main.temp);
            } else {
                console.error('Failed to fetch weather data');
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            setLoadingWeather(false);
        }
    };

    useEffect(() => {
        fetchWeather();
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
                ) : weather && temperature !== null ? (
                    <>
                        <p>
                            {weather.charAt(0).toUpperCase() + weather.slice(1)} | {temperature}°F
                        </p>
                        <p className="recommendation">
                            {getWeatherRecommendation(weather, temperature)}
                        </p>
                    </>
                ) : (
                    <p>Unable to fetch weather data.</p>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="total-container">
                    <h3 className="total-text">Total: ${total.toFixed(2)}</h3>
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
