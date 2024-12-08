import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";

/**
 * The `RouteLayoutWrapper` component provides a layout structure for routing in the application.
 * It includes a `Header` component at the top and renders the content of the current route inside the `Outlet`.
 *
 * The `Header` is displayed at the top of the page, and the page content for the active route is rendered below it.
 *
 * @returns A layout structure with the header at the top and the routed content displayed below it.
 * @constructor
 */
function RouteLayoutWrapper() {
    return (
        <div className={"h-80-vh"}>
            <Header />
            <Outlet />
        </div>
    );
}

export default RouteLayoutWrapper;