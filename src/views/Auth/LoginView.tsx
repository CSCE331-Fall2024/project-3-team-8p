import React from 'react';
import { useUser } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";

// Remove the CSS import as we'll use Bootstrap classes

interface GoogleUser {
    name: string;
    email: string;
    picture: string;
}

function LoginView() {
    const { user, setUser } = useUser();

    const handleLogin = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const decodedUserData: GoogleUser = jwtDecode(credentialResponse.credential);
            setUser(decodedUserData);
        }
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container h-80vh d-flex align-items-center justify-content-center">
            <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-4">
                    <div className="text-center mb-4">
                        <img
                            src="images/POS.png"
                            alt="POS Logo"
                            className="img-fluid mb-3"
                            style={{ height: '64px', width: 'auto' }}
                        />
                        <h1 className="h3 mb-2">Welcome Back</h1>
                        <p className="text-muted">Sign in to access the POS system</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <GoogleLogin
                            onSuccess={handleLogin}
                            onError={() => console.log("Login failed!")}
                            theme="filled_blue"
                            size="large"
                            shape="rectangular"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginView;