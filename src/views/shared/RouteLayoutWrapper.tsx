import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";

function RouteLayoutWrapper() {
    return (
        <div className={"h-80-vh"}>
            <Header />
            <Outlet />
        </div>
    );
}

export default RouteLayoutWrapper;