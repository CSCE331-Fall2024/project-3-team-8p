import React from 'react';
import ManagerView from "./views/ManagerView";
import { Container } from "react-bootstrap";
import './App.css';

function App() {
    return (
        <div className={"panda-express-app"}>
            <Container className={"mt-3"}>
                <ManagerView />
            </Container>
        </div>
    );
}

export default App;
