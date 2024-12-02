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
import MenuBoardsView from "./views/Menu-Boards/MenuBoardsView";
// import { PreferencesProvider } from "./contexts/PreferencesContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import EmployeeOnlyRoute from "./views/Auth/EmployeeOnlyRoute";
import KitchenView from "./views/Kitchen/KitchenView";


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
                            <Route path="menu-items" element={
                                <MenuBoardsView></MenuBoardsView>
                            } />
                            <Route path="cashier" element={<CashierView />} />
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
                        </Route>
                    </Routes>
                </UserProvider>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
