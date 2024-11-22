import React from 'react';
import { useUser } from "../../contexts/UserContext";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./css/Header.css";

function Header() {
    const { user } = useUser();

    return (
        <Navbar expand="lg" className="main-nav sticky top-0 py-3">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>
                    <img
                        alt={"logo"}
                        src={"/images/POS.png"}
                        height={30}
                        className="d-inline-block align-top"
                    />
                    &ensp;POS System
                </Navbar.Brand>
                {/* Menu bar toggle button on smaller screens */}
                <Navbar.Toggle aria-controls="panda-express-nav" />
                <Navbar.Collapse id="panda-express-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/manager"}>Manager</Nav.Link>
                        <Nav.Link as={Link} to={"/customer"}>Customer</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;