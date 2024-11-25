import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import { Container } from "react-bootstrap";
import CustomerView from "./views/Customer/CustomerView";
import CashierView from "./views/Cashier/CashierView";
import Checkout from "./views/Customer/components/Checkout";
import './App.css';
import { CartProvider } from './views/Customer/context/CartContext';

function App() {
    return (
        <div className="panda-express-app">
            <Container className="mt-3">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <div className="home">
                                {/* Links to different views */}
                                <Link to="/">Home</Link>
                                <Link to="/manager">Manager</Link>
                                <Link to="/customer">Customer</Link>
                                <Link to="/cashier">Cashier</Link>
                            </div>
                        } />
                        <Route path="/manager" element={<ManagerView />} />

                        {/* Wrap CustomerView and Checkout in CartProvider */}
                        <Route path="/customer" element={
                            <CartProvider>
                                <CustomerView />
                            </CartProvider>
                        } />
                        <Route path="/checkout" element={
                            <CartProvider>
                                <Checkout />
                            </CartProvider>
                        } />

                        {/* Route for CashierView */}
                        <Route path="/cashier" element={<CashierView />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
