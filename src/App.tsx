import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import ManagerView from "./views/ManagerView";
import CustomerView from "./views/CustomerView";
import Checkout from "./components/customer/Checkout";
import './App.css';
import { CartProvider } from './context/CartContext';
import {HTTPClient} from "./services/HTTPClient";

function App() {

    let client:HTTPClient = new HTTPClient();
    client.getRequest("menuitems");


    return (
        <div className="panda-express-app">
            <Container className="mt-3">
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
