import React, { useState } from 'react';
import listings from '../../models/dummy-data/listingData';
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

    const handleAddToOrder = (menuItem: MenuItem) => {
        setOrder((prevOrder) => {
            const currentItem = prevOrder[menuItem.menuItemId];
            const newQuantity = currentItem ? currentItem.quantity + 1 : 1;
            return { ...prevOrder, [menuItem.menuItemId]: { name: menuItem.itemName, price: menuItem.price, quantity: newQuantity } };
        });
    };

    const handleClearOrder = () => {
        setOrder({});
    };

    const handlePlaceOrder = () => {
        setOrder({});
    };

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
                                <td>{item.price}</td>
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
                    {Object.values(listings).flatMap((menuItems: MenuItem[]) =>
                        menuItems.map((menuItem: MenuItem) => (
                            <ListingCard
                                key={menuItem.menuItemId}
                                name={menuItem.itemName}
                                price={menuItem.price}
                                imageUrl={"images/"+menuItem.itemName+".png"}
                                quantityOrdered={order[menuItem.menuItemId]?.quantity || 0}
                                onAddToCart={() => handleAddToOrder(menuItem)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default CashierView;
