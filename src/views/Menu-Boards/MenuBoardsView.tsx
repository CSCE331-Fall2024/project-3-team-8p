import React from 'react';
import ListingCard from './components/ListingCard';
import listings from '../../models/dummy-data/MenuBoardsListingData';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Tabs } from './components/TabsEnum';

const tabOptions = [
    { label: 'Entrees', value: Tabs.Entrees },
    { label: 'Sides', value: Tabs.Sides },
    { label: 'Drinks', value: Tabs.Drinks },
    { label: 'Desserts', value: Tabs.Desserts },
];

const MenuBoardsView = () => {
    return (
        <Container fluid className="bg-white min-vh-100 px-4 py-4">
            <Row className="mb-2">
                <Col xs={12} className="text-center">
                    <h1>Menu Items</h1>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs={12} className="d-flex justify-content-center">
                    <div className="d-flex align-items-center mx-4">
                        <Image
                            src={'images/spicy.png'}
                            alt="Spicy Icon"
                            style={{
                                width: '50px',
                                height: 'auto',
                                marginRight: '10px',
                            }}
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Spicy</span>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                        <Image
                            src={'images/premium.png'}
                            alt="Premium Icon"
                            style={{
                                width: '100px',
                                height: 'auto',
                                marginRight: '10px',
                            }}
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Premium</span>
                    </div>
                </Col>
            </Row>

            {tabOptions.map((tab) => (
                <div key={tab.value} className="mb-5">
                    <h1 style={{ color: 'black' }} className="text-center mb-4">{tab.label}</h1>

                    <Row className="justify-content-center">
                        {listings[tab.value].map((item) => (
                            <Col key={item.menuItemId} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
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
                </div>
            ))}
        </Container>
    );
};

export default MenuBoardsView;
