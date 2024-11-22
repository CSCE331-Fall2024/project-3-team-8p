import React from 'react';
import Header from "./Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function RouteLayoutWrapper() {
    return (
        <div className={"h-80vh"}>
            <Header />
            <Container className="d-flex flex-column align-items-center justify-content-center mt-3">
                <Outlet />
            </Container>
        </div>
    );
}

export default RouteLayoutWrapper;