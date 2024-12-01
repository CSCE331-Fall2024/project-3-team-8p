import React, { useState } from 'react';
import { Tabs } from './components/TabsEnum';
import listings from '../components/menu-boards/listingData';
import { Card, Container, Row, Col } from 'react-bootstrap';

const MenuBoardsView = () => {
    const [currentTab, setCurrentTab] = useState(Tabs.Entrees); // Default tab

    return (
        <Container fluid className="bg-white vh-100">
    <Row className="my-4">
    <Col className="text-center">
    <button
        className={`btn ${currentTab === Tabs.Entrees ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setCurrentTab(Tabs.Entrees)}
>
    Entrees
    </button>
    <button
    className={`btn ${currentTab === Tabs.Sides ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setCurrentTab(Tabs.Sides)}
>
    Sides
    </button>
    <button
    className={`btn ${currentTab === Tabs.Drinks ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setCurrentTab(Tabs.Drinks)}
>
    Drinks
    </button>
    <button
    className={`btn ${currentTab === Tabs.Desserts ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setCurrentTab(Tabs.Desserts)}
>
    Desserts
    </button>
    </Col>
    </Row>

    <Row className="justify-content-center">
        {listings[currentTab].map((item, index) => (
                <Col key={index} md={4} className="mb-4">
            <Card className="text-center">
            <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
    <Card.Body>
    <Card.Title>{item.name}</Card.Title>
    <Card.Text>
    <strong>Price:</strong> ${item.price.toFixed(2)}
    <br />
    <strong>Calories:</strong> {item.calories} kcal
    <br />
    <strong>Allergens:</strong> {item.allergens.length > 0 ? item.allergens.join(', ') : 'None'}
    <br />
    {item.isPremium && <span className="badge bg-warning text-dark">Premium</span>}
    {item.isSpicy && <span className="badge bg-danger ms-2">Spicy</span>}
        </Card.Text>
        </Card.Body>
        </Card>
        </Col>
    ))}
    </Row>
    </Container>
);
};

    export default MenuBoardsView;