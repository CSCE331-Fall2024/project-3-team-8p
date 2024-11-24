import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import { Container } from "react-bootstrap";
import CustomerView from "./views/Customer/CustomerView";
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
                            <div className={"home"}>
                                {/*  To be replaced by a dedicated "home" or "login page" component  */}
                                <Link to={"/"}>Home</Link>
                                <Link to={"/Manager"}>Manager</Link>
                                <Link to={"/Customer"}>Customer</Link>
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
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
