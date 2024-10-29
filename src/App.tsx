import React from 'react';
import ManagerView from "./views/ManagerView";
import { Container } from "react-bootstrap";
import './App.css';

function App() {
    return (
        <div className={"panda-express-app"}>
            <Container>
                <ManagerView />
            </Container>
        </div>
    );
}

export default App;
