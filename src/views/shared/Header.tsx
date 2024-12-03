import React, { useState } from 'react';
import { useUser } from "../../contexts/UserContext";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./css/Header.css";
import LoginModal from "../Auth/LoginModal";

function Header() {
    const { user, setUser } = useUser();
    const location = useLocation();
    const [showLogin, setShowLogin] = useState(false);

    const handleLogout = () => {
        setUser(null);
    };

    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top py-3 shadow">
                <Container fluid className={"px-4"}>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3">
                        <Image
                            alt="Panda Express POS Logo"
                            src="/images/POS.png"
                            height={30}
                            className="d-inline-block"
                        />
                        POS System
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="panda-express-nav" />

                    <Navbar.Collapse id="panda-express-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/"
                                className={`rounded mx-1 ${location.pathname === "/" ? "active" : ""}`}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/manager"
                                className={`rounded mx-1 ${location.pathname === "/manager" ? "active" : ""}`}
                            >
                                Manager
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/cashier"
                                className={`rounded mx-1 ${location.pathname === "/cashier" ? "active" : ""}`}
                            >
                                Cashier
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/kitchen"
                                className={`rounded mx-1 ${location.pathname === "/kitchen" ? "active" : ""}`}
                            >
                                Kitchen
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/customer"
                                className={`rounded mx-1 ${location.pathname === "/customer" ? "active" : ""}`}
                            >
                                Customer
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/menu"
                                className={`rounded mx-1 ${location.pathname === "/menu" ? "active" : ""}`}
                            >
                                Menu
                            </Nav.Link>
                        </Nav>

                        {user ? (
                            <div className="d-flex align-items-center bg-secondary p-2 rounded">
                                <Image
                                    src={user.picture}
                                    alt={user.name}
                                    roundedCircle
                                    width={32}
                                    height={32}
                                    className="border border-2 border-opacity-25"
                                />
                                <span className="text-light mx-3 fw-medium">
                                {user.name}
                            </span>
                                <button
                                    className="btn btn-danger btn-sm fw-medium"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Button className="btn btn-primary btn-sm fw-medium" onClick={handleShowLogin}>
                                Login
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal show={showLogin} onHide={handleCloseLogin} />
        </>
    );
}

export default Header;