import React, { useEffect, useState } from 'react';
import ListingCard from './components/ListingCard';
import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
import MenuItemApi from '../../apis/menu-item-api';
import MenuBoardItem from '../../models/MenuBoardItem';
import menuItemCategory from '../../models/enums/MenuItemCategory';

const tabOptions = [
    { label: 'Entrees', value: menuItemCategory.Entree },
    { label: 'Sides', value: menuItemCategory.Side },
    { label: 'Drinks', value: menuItemCategory.Drink },
    { label: 'Appetizers', value: menuItemCategory.Appetizer },
];

const MenuBoardsView = () => {
    const [menuItems, setMenuItems] = useState<MenuBoardItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const menuItemApi = new MenuItemApi();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await menuItemApi.getMenuItems();

                const boardItems = items.map((item) =>
                    MenuBoardItem.fromDict({
                        menuItemId: item.menuItemId,
                        price: item.price,
                        itemName: item.itemName,
                        category: item.category,
                        nutritionInfo: item.nutritionInfo,
                    })
                );

                setMenuItems(boardItems);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching menu items.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) {
        return (
            <Container fluid className="bg-white min-vh-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container fluid className="bg-white min-vh-100 d-flex justify-content-center align-items-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

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
                            style={{ width: '50px', height: 'auto', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Spicy</span>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                        <Image
                            src={'images/premium.png'}
                            alt="Premium Icon"
                            style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Premium</span>
                    </div>
                </Col>
            </Row>

            {tabOptions.map((tab) => {
                const filteredItems = MenuBoardItem.fromCategory(tab.value, menuItems);

                return (
                    <div key={tab.value} className="mb-5">
                        <h1 style={{ color: 'black' }} className="text-center mb-4">{tab.label}</h1>
                        <Row className="justify-content-center">
                            {filteredItems.map((item) => (
                                <Col key={item.menuItemId} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
                                    <ListingCard
                                        menuItemId={item.menuItemId}
                                        itemName={item.translatedItemName || item.itemName}
                                        price={item.price}
                                        imageUrl={`/images/${item.itemName}.avif`}
                                        nutritionInfo={item.nutritionInfo}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                );
            })}
        </Container>
    );
};

export default MenuBoardsView;
