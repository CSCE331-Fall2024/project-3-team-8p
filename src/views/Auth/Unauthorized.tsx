import React from 'react';
import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div>
            <h1>You are not authorized to view this page.</h1>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Unauthorized;