import React from 'react';
import Header from "./Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function RouteLayoutWrapper() {
    return (
        <div className={"h-80vh"}>
            <Header />
            <Outlet />
        </div>
    );
}

export default RouteLayoutWrapper;