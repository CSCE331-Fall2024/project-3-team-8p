import React from 'react';
import ListingCard from './components/ListingCard';
import { Container, Row, Col, Image } from 'react-bootstrap';
import MenuBoardItem from "../../models/MenuBoardItem";
import menuItemCategory from "../../models/enums/MenuItemCategory";
// import { Tabs } from '../../views/Customer/TabsEnum'; // or wherever your Tabs enum is located
import MenuBoardsDict from "../../models/dict-types/MenuBoardsDict"; // import the MenuBoardsDict type

// Example data, replace with actual data or import from your data source
const allMenuItems: MenuBoardsDict[] = [
    // Add your list of MenuBoardsDict items here
];

const tabOptions = [
    { label: 'Entrees', value: menuItemCategory.Entree },
    { label: 'Sides', value: menuItemCategory.Side },
    { label: 'Drinks', value: menuItemCategory.Drink },
    { label: 'Appetizers', value: menuItemCategory.Appetizer },
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
                        {MenuBoardItem.fromCategory(tab.value, allMenuItems).map((item) => (
                            <Col key={item.menuItemId} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
                                <ListingCard
                                    menuItemId={item.menuItemId}
                                    itemName={item.itemName}
                                    price={item.price}
                                    // imageUrl={item.imageUrl}
                                    nutritionInfo={item.nutritionInfo}
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
