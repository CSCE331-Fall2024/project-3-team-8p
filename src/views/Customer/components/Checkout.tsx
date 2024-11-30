import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { WeatherApi, WeatherData } from '../../../apis/weather-api';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';

const Checkout: React.FC = () => {
    const location = useLocation();
    const isSpanish = location.state?.isSpanish || false;

    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

    const getWeatherRecommendation = (weather: string, temperature: number): string => {
        if (weather.includes('rain')) {
            return isSpanish
                ? "¡Parece que está lloviendo! Considere agregar un acompañamiento extra para mantenerse seco."
                : "Looks like it's rainy! Consider adding an extra side to help you stay dry.";
        } else if (temperature >= 85) {
            return isSpanish
                ? "¡Hace calor afuera! Una bebida refrescante sería perfecta para refrescarse."
                : "It's hot outside! A refreshing drink would be perfect to cool off.";
        } else if (temperature <= 60) {
            return isSpanish
                ? "¡Hace bastante frío! Un plato adicional te ayudará a mantenerte cálido."
                : "It's quite cold! An extra entree would help keep you warm.";
        } else {
            return isSpanish
                ? "¡Disfruta tu comida! ¿Has probado nuestros postres?"
                : "Enjoy your meal! Have you tried our desserts?";
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoadingWeather(true);
            const data = await WeatherApi.fetchWeather();
            setWeatherData(data);
            setLoadingWeather(false);
        };

        fetchWeatherData();
    }, []);

    const handlePlaceOrder = () => {
        alert(isSpanish ? "¡Pedido realizado!" : "Order placed!");
        clearCart();
        navigate('/customer');
    };

    return (
        <Container fluid className="py-3" style={{ minHeight: '90vh', background: '#dc3545' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-dark text-white text-center py-3">
                            <h2 className="h4 mb-0">{isSpanish ? "Finalizar Compra" : "Checkout"}</h2>
                        </Card.Header>
                        <Card.Body className="bg-white">
                            {cartItems.length === 0 ? (
                                <Alert variant="info" className="mb-4 text-center">
                                    {isSpanish ? "Tu carrito está vacío" : "Your cart is empty"}
                                </Alert>
                            ) : (
                                <div className="mb-4">
                                    {cartItems.map((item) => (
                                        <div key={item.menuItemId} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                            <span>
                                                {item.itemName} x {item.quantityOrdered}
                                            </span>
                                            <span className="fw-bold">${(item.price * item.quantityOrdered).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="bg-light p-4 rounded mb-4">
                                <h3 className="h5 text-primary text-center mb-3">
                                    {isSpanish ? "Actualización del Clima" : "Weather Update"}
                                </h3>
                                {loadingWeather ? (
                                    <div className="text-center">
                                        <Spinner animation="border" variant="danger" role="status">
                                            <span className="visually-hidden">
                                                {isSpanish ? "Cargando el clima..." : "Loading weather..."}
                                            </span>
                                        </Spinner>
                                    </div>
                                ) : weatherData ? (
                                    <>
                                        <p className="mb-2 fs-5 text-center">
                                            {weatherData.weather.charAt(0).toUpperCase() + weatherData.weather.slice(1)} | {weatherData.temperature}°F
                                        </p>
                                        <p className="text-muted fst-italic text-center mb-0">
                                            {getWeatherRecommendation(weatherData.weather, weatherData.temperature)}
                                        </p>
                                    </>
                                ) : (
                                    <Alert variant="warning" className="mb-0">
                                        {isSpanish ? "No se pudo obtener los datos del clima." : "Unable to fetch weather data."}
                                    </Alert>
                                )}
                            </div>

                            <div className="pt-3">
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                    <h3 className="h4 mb-0">
                                        {isSpanish ? "Total" : "Total"}: ${cartTotal.toFixed(2)}
                                    </h3>
                                    <div className="d-flex gap-2">
                                        <Link to="/customer" state={{ isSpanish: isSpanish }} className="btn btn-outline-danger">
                                            {isSpanish ? "Pedir Más" : "Order More"}
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={handlePlaceOrder}
                                            disabled={cartItems.length === 0}
                                        >
                                            {isSpanish ? "Realizar Pedido" : "Place Order"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
