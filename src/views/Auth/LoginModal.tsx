import React, { useEffect } from 'react';
import { useUser } from "../../contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Modal from "react-bootstrap/Modal";

interface GoogleUser {
    name: string;
    email: string;
    picture: string;
}

interface LoginModalProps {
    show: boolean;
    onHide: () => void;
}

function LoginModal({ show, onHide }: LoginModalProps) {
    const { setUser } = useUser();

    const handleLogin = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const decodedUserData: GoogleUser = jwtDecode(credentialResponse.credential);
            setUser(decodedUserData);
        }
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
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
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;