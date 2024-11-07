import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import ManagerView from "./views/ManagerView";
import CustomerView from "./views/CustomerView";
import Checkout from "./components/customer/Checkout";
import './App.css';
import { CartProvider } from './context/CartContext';  // Import the CartProvider

function App() {
    return (
        <div className="panda-express-app">
            <Container className="mt-3">
                <CartProvider>  {/* Wrap the whole app or just the relevant sections */}
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <div className="home">
                                    <Link to="/">Home</Link>
                                    <Link to="/manager">Manager</Link>
                                    <Link to="/customer">Customer</Link>
                                </div>
                            } />
                            <Route path="/manager" element={<ManagerView />} />
                            <Route path="/customer" element={<CustomerView />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </Container>
        </div>
    );
}

export default App;
