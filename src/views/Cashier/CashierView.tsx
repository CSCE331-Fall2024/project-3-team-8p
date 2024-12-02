import React, { useState, useEffect } from 'react';
import MenuItemApi from '../../apis/menu-item-api';
import ListingCard from '../Customer/components/ListingCard';
import MenuItem from '../../models/MenuItem';
import './css/CashierView.css';
import OrderApi from "../../apis/order-api";
import Order from "../../models/Order";
import EmployeeApi from "../../apis/employee-api";
import {v4 as uuidv4} from "uuid";
import OrderStatus from "../../models/enums/OrderStatus";
import LoadingView from "../shared/LoadingView";
import getTimeComponents from "../../utils/getTimeComponents";

function CashierView() {
    const orderApi = new OrderApi();
    const employeeApi = new EmployeeApi();
    interface OrderItem {
        name: string;
        price: number;
        quantity: number;
    }
    interface OrderInterface {
        [key: string]: OrderItem;
    }

    const [order, setOrder] = useState<OrderInterface>({});
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // State for menu items
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const menuItemApi = new MenuItemApi();

    useEffect(() => {
        // Fetch menu items on component mount
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

    const handleAddToOrder = (menuItem: MenuItem) => {
        setOrder((prevOrder) => {
            const currentItem = prevOrder[menuItem.menuItemId];
            const newQuantity = currentItem ? currentItem.quantity + 1 : 1;
            return {
                ...prevOrder,
                [menuItem.menuItemId]: {
                    name: menuItem.itemName,
                    price: menuItem.price,
                    quantity: newQuantity,
                },
            };
        });
    };

    const handleClearOrder = () => {
        setOrder({});
    };

    const handlePlaceOrder = async () => {
        // Get the "Customer" employee ID:
        const customerId: string = (await employeeApi.getEmployeeByName("Customer"))!.employeeId
        const { month, week, day, hour } = getTimeComponents();

        const cartTotal = Object.values(order).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // Construct the order object
        const newOrder: Order = new Order(
            uuidv4(),
            customerId,
            month,
            week,
            day,
            hour,
            cartTotal,
            OrderStatus.PLACED,
        );

        console.log("ORDER ID:", newOrder.orderId);

        try {
            await orderApi.addOrder(newOrder);
            alert("Order Placed!")
        } catch (error) {
            console.log(error);
        }

        handleClearOrder();
    };

    if (loading) {
        return <LoadingView color={"white"}/>
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="cashier-view">
            {/* Left Container */}
            <div className="left-container">
                {/* Order Table Section */}
                <div className="order-table">
                    <h2>Order Table</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.values(order).map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="order-actions">
                        <button onClick={handleClearOrder}>Clear Order</button>
                        <button onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </div>

            {/* Right Container */}
            <div className="right-container">
                <h2>Menu Items</h2>
                <div className="card-section">
                    {menuItems.map((menuItem: MenuItem) => (
                        <ListingCard
                            key={menuItem.menuItemId}
                            name={menuItem.itemName}
                            price={menuItem.price}
                            imageUrl={`/images/${menuItem.itemName}.png`}
                            quantityOrdered={order[menuItem.menuItemId]?.quantity || 0}
                            onAddToCart={() => handleAddToOrder(menuItem)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CashierView;
