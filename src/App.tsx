import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import CustomerView from "./views/Customer/CustomerView";
import CashierView from "./views/Cashier/CashierView";
import Checkout from "./views/Customer/components/Checkout";
import './App.css';
import { CartProvider } from './contexts/CartContext';
import LoginModal from "./views/Auth/LoginModal";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext";
import ManagerOnlyRoute from "./views/Auth/ManagerOnlyRoute";
import Home from "./views/Home/Home";
import RouteLayoutWrapper from "./views/shared/RouteLayoutWrapper";


function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
            <Router>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<RouteLayoutWrapper />}>
                            <Route index element={<Home />} />
                            <Route path="manager" element={
                                <ManagerOnlyRoute>
                                    <ManagerView />
                                </ManagerOnlyRoute>
                            } />
                            <Route path={"customer"} element={
                                <CartProvider>
                                    <Outlet />
                                </CartProvider>
                            }>
                                <Route index element={<CustomerView />} />
                                <Route path="checkout" element={<Checkout />} />
                            </Route>
                            {/*<Route path="cashier" element={<CashierView />} />*/}
                        </Route>
                    </Routes>
                </UserProvider>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
