import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import CustomerView from "./views/Customer/CustomerView";
import CashierView from "./views/Cashier/CashierView";
import Checkout from "./views/Customer/components/Checkout";
import './App.css';
import { CartProvider } from './contexts/CartContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext";
import ManagerOnlyRoute from "./views/Auth/ManagerOnlyRoute";
import Home from "./views/Home/Home";
import RouteLayoutWrapper from "./views/shared/RouteLayoutWrapper";
import MenuView from "./views/Menu/MenuView";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import EmployeeOnlyRoute from "./views/Auth/EmployeeOnlyRoute";
import KitchenView from "./views/Kitchen/KitchenView";
import Reviews from "./views/Review/ReviewView"

/**
 * The `App` component sets up the routing and layout for the entire application.
 * The component uses `react-router-dom` to define the routes and render the appropriate views based on the path.
 *
 * @returns The main app layout with routes and context providers for managing authentication, preferences, and cart.
 * @constructor
 */
function App() {
    return (
        <Router>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
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
                                <PreferencesProvider>
                                    <CartProvider>
                                        <Outlet />
                                    </CartProvider>
                                </PreferencesProvider>
                            }>
                                <Route index element={<CustomerView />} />
                                <Route path="checkout" element={<Checkout />} />
                            </Route>
                            <Route path="menu" element={
                                <MenuView></MenuView>
                            } />
                            <Route path="cashier" element={
                                <EmployeeOnlyRoute>
                                    <CartProvider>
                                        <PreferencesProvider>
                                            <CashierView />
                                        </PreferencesProvider>
                                    </CartProvider>
                                </EmployeeOnlyRoute>
                            } />
                            <Route path="kitchen" element={
                                <EmployeeOnlyRoute>
                                    <KitchenView />
                                </EmployeeOnlyRoute>
                            } />

                            <Route path={"Reviews"}>
                                <Route index element={<Reviews />} />
                            </Route>

                        </Route>
                    </Routes>
                </UserProvider>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
