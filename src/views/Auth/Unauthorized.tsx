import React from 'react';
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Unauthorized() {
    return (
        <div className="container h-80vh d-flex align-items-center justify-content-center">
            <Alert variant="danger text-center">
                <Alert.Heading>You are not authorized to view this page.</Alert.Heading>
                <Link to="/">Home</Link>
            </Alert>
        </div>
    );
}

export default Unauthorized;