import React from 'react';
import { useUser } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import "./css/LoginView.css";

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

    // Redirect to home page if the user is already logged in
    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-content">
                    {/* Header Section */}
                    <div className="login-header">
                        <img
                            src="images/POS.png"
                            alt="POS Logo"
                            className="login-logo"
                        />
                        <h1>Welcome Back</h1>
                        <p>Sign in to access the POS system</p>
                    </div>

                    {/* Google Login Button */}
                    <div className="login-button-container">
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