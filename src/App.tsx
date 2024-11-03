import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerView from "./views/Manager/ManagerView";
import { Container } from "react-bootstrap";
import './App.css';
import CustomerView from "./views/Customer/CustomerView";
import {ApiClient} from "./apis/utils/api-client";

function App() {

    let client:ApiClient = new ApiClient();
    client.getRequest("menuitems");


    return (
        <div className={"panda-express-app"}>
            <Container className={"mt-3"}>
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
                        <Route path="/customer" element={<CustomerView />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
