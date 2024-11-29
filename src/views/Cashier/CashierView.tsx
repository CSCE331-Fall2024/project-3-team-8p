import React, { useState, useEffect } from 'react';
import MenuItemApi from '../../apis/menu-item-api';
import ListingCard from '../Customer/components/ListingCard';
import MenuItem from '../../models/MenuItem';
import './css/CashierView.css';

function CashierView() {
    interface OrderItem {
        name: string;
        price: number;
        quantity: number;
    }
    interface Order {
        [key: string]: OrderItem;
    }

    const [order, setOrder] = useState<Order>({});
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

    const handlePlaceOrder = () => {
        // Place order logic here (e.g., send to API)
        setOrder({});
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
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
