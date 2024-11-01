import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManagerView from "./views/ManagerView";
import { Container } from "react-bootstrap";
import './App.css';
import CustomerView from "./views/CustomerView";
import {HTTPClient} from "./services/HTTPClient";

function App() {

    let client:HTTPClient = new HTTPClient();
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
                                <Link to={"/manager"}>Manager</Link>
                                <Link to={"/customer"}>Customer</Link>
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
