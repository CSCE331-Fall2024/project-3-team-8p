import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import { Container } from "react-bootstrap";
import './App.css';
import CustomerView from "./views/Customer/CustomerView";
import { MenuItemApi } from "./apis/menu-item-api";
import MenuItem from "./models/MenuItem";

const client: MenuItemApi = new MenuItemApi();

function App() {

    return (
        <div className={"panda-express-app"}>
            <Container className={"mt-3"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className={"home"}>
                                    {/*  To be replaced by a dedicated "home" or "login page" component  */}
                                    <Link to={"/"}>Home</Link>
                                    <Link to={"/Manager"}>Manager</Link>
                                    <Link to={"/Customer"}>Customer</Link>
                                </div>
                            </>
                        } />
                        <Route path="/manager" element={<ManagerView />} />
                        <Route path="/customer" element={<CustomerView />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
