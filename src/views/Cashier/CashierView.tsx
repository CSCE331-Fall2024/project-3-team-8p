import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import MenuItemApi from '../../apis/menu-item-api';
import ListingCard from '../Customer/components/ListingCard';
import MenuItem from '../../models/MenuItem';
import OrderApi from "../../apis/order-api";
import Order from "../../models/Order";
import EmployeeApi from "../../apis/employee-api";
import { v4 as uuidv4 } from "uuid";
import OrderStatus from "../../models/enums/OrderStatus";
import LoadingView from "../shared/LoadingView";
import getTimeComponents from "../../utils/getTimeComponents";
import { useUser } from "../../contexts/UserContext";
import MenuItemCategory from "../../models/enums/MenuItemCategory";
import { useCart } from "../../contexts/CartContext";
import CartItem from "../../models/interfaces/CartItem";

const orderApi = new OrderApi();
const employeeApi = new EmployeeApi();
const menuItemApi = new MenuItemApi();

function CashierView() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const { cartItems, cartTotal, addToCart, clearCart } = useCart();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await menuItemApi.getMenuItems();
                setMenuItems(items);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch menu items:', err);
                setError('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const handlePlaceOrder = async () => {
        const employeeId: string = (await employeeApi.getEmployeeByName(user!.name))!.employeeId
        const { month, week, day, hour } = getTimeComponents();

        const newOrder: Order = new Order(
            uuidv4(),
            employeeId,
            month,
            week,
            day,
            hour,
            cartTotal,
            OrderStatus.PLACED,
        );
        cartItems.forEach((item: CartItem) => {
            newOrder.addMenuItem(
                new MenuItem(
                    item.menuItemId,
                    item.price,
                    item.itemName,
                    item.category as MenuItemCategory,
                    item.isDiscounted,
                    item.nutritionInfo
                ),
                item.quantityOrdered
            );
        });

        try {
            await orderApi.addOrder(newOrder);
            console.log("Order ID: ", newOrder.orderId);
            alert("Order Placed!")
        } catch (error) {
            console.log("Error when placing order:", error);
        }

        clearCart();
    };

    if (loading) {
        return <LoadingView color={"white"} />
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <Container fluid className="bg-danger min-vh-100 text-white py-3">
            <Row>
                <Col md={4} className="border-end border-white">
                    <Card className="bg-light text-dark">
                        <Card.Header className="bg-dark text-white">
                            <h2 className="h4 mb-0 text-center fw-bold">Current Order</h2>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.values(cartItems).map((item) => (
                                    <tr key={item.itemName}>
                                        <td>{item.itemName}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>{item.quantityOrdered}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-3">
                                <Button variant="secondary" onClick={() => clearCart()}>
                                    Clear Order
                                </Button>
                                <Button variant="primary" onClick={handlePlaceOrder}>
                                    Place Order
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="bg-light text-dark mb-3">
                        <Card.Header className="bg-dark text-white">
                            <h2 className="h4 mb-0 text-center fw-bold">Menu Items</h2>
                        </Card.Header>
                    </Card>
                    <Row className="g-3">
                        {menuItems.map((menuItem: MenuItem) => {
                            const cartItem = cartItems.find(
                                (item) => item.menuItemId === menuItem.menuItemId
                            );
                            const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;
                            return (
                                <Col key={menuItem.menuItemId} xs={12} sm={6} md={4} lg={3}>
                                    <ListingCard
                                        name={menuItem.itemName}
                                        price={menuItem.price}
                                        imageUrl={`/images/${menuItem.itemName}.png`}
                                        quantityOrdered={quantityOrdered}
                                        onAddToCart={() => addToCart(menuItem)}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default CashierView;