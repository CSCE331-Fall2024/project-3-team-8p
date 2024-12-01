import React, { useState } from 'react';
import { Tabs } from './components/TabsEnum';
import ListingCard from './components/ListingCard';
import listings from '../../models/dummy-data/MenuBoardsListingData';
import { Container, Row, Col } from 'react-bootstrap';

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
                        <ListingCard
                            menuItemId={item.menuItemId}
                            name={item.itemName}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            allergens={item.allergens}
                            calories={item.calories}
                            fat={item.fat}
                            protein={item.protein}
                            sugar={item.sugar}
                            carbohydrates={item.carbohydrates}
                            isPremium={item.isPremium}
                            isSpicy={item.isSpicy}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MenuBoardsView;
