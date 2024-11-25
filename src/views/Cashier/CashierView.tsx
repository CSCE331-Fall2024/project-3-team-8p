import React, { useState } from 'react';
import listings from '../../models/dummy-data/listingData';
import ListingCard from '../Customer/components/ListingCard';
import MenuItem from '../../models/MenuItem';
import './css/CashierView.css';

function CashierView() {
    const [input, setInput] = useState(''); // To track the number input
    const [order, setOrder] = useState<{ [key: string]: { name: string; price: number; quantity: number } }>({});
    const [lastClickedItem, setLastClickedItem] = useState<MenuItem | null>(null);

    // Handle clicking a listing card to increment quantity
    const handleAddToOrder = (menuItem: MenuItem) => {
        setLastClickedItem(menuItem);
        setOrder((prevOrder) => {
            const currentItem = prevOrder[menuItem.menuItemId];
            const newQuantity = currentItem ? currentItem.quantity + 1 : 1;
            return { ...prevOrder, [menuItem.menuItemId]: { name: menuItem.itemName, price: menuItem.price, quantity: newQuantity } };
        });
    };

    // Handle numpad click and update the quantity for the last clicked item
    const handleClick = (value: string) => {
        setInput((prev) => prev + value); // Append value to input
    };

    // Update quantity for the last clicked item based on numpad input
    const handleEnter = () => {
        const quantity = parseInt(input, 10);
        if (lastClickedItem && !isNaN(quantity)) {
            setOrder((prevOrder) => ({
                ...prevOrder,
                [lastClickedItem.menuItemId]: {
                    name: lastClickedItem.itemName,
                    price: lastClickedItem.price,
                    quantity,
                },
            }));
            setInput(''); // Clear input after setting quantity
        }
    };

    const handleClear = () => {
        setInput(''); // Clear the input
    };

    const handleClearOrder = () => {
        setOrder({}); // Clear the order table
    };

    const handlePlaceOrder = () => {
        setOrder({}); // Clear the order table after placing the order
    };

    return (
        <div className="cashier-view">
            {/* Left Container */}
            <div className="left-container">
                {/* Numpad Section */}
                <div className="number-pad">
                    <h2>Numpad</h2>
                    <div className="grid">
                        {/* Number buttons 1-9 */}
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                            <button key={num} onClick={() => handleClick(num)}>
                                {num}
                            </button>
                        ))}
                        {/* Clear, 0, and Enter buttons */}
                        <button className="clear" onClick={handleClear}>Clear</button>
                        <button onClick={() => handleClick('0')}>0</button>
                        <button className="enter" onClick={handleEnter}>Enter</button>
                    </div>
                </div>

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
                                imageUrl={menuItem.imageUrl}
                                quantityOrdered={order[menuItem.menuItemId]?.quantity || 0} // Reflects updated quantity from order
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
