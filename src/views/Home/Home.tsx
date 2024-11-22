import React from 'react';
import { useUser } from "../../contexts/UserContext";
import { Container } from "react-bootstrap";
import "./css/Home.css";

function Home() {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
    };

    if (user) {
        return (
            <Container className="home">
                <div className={"d-flex justify-content-center align-items-center"}>
                    <div className="home-card h-80vh">
                        <h1 className={"display-3"}>POS System Dashboard</h1>
                        <h1>Welcome, {user.name}!</h1>
                        <img src={user.picture} alt={user.name} />
                        <p>{user.email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </Container>
        );
    } else {
        return <div>Hello World!</div>;
    }
}

export default Home;