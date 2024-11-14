import React, { useState } from 'react';
import './CssFiles/CartPopup.css';
import MenuItem from "../../models/MenuItem";

// Define the type for a cart item, extending from MenuItem
interface CartItem extends MenuItem {
    quantityOrdered: number;
}

// Define the props type for CartPopup
interface CartPopupProps {
    cartItems: CartItem[];
    total: number;
    onClearCart: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ cartItems, total, onClearCart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="popup-container" style={{ maxHeight: isOpen ? '400px' : '80px' }}>
            <button className="toggle-button" onClick={toggleCart}>
                {isOpen ? 'Hide Cart' : 'Show Cart'}
            </button>
            <button className="clear-button" onClick={onClearCart}>Clear Cart</button>
            {isOpen && (
                <>
                    <h3>Cart</h3>
                    {cartItems.length === 0 ? (
                        <div>Your cart is empty.</div>
                    ) : (
                        cartItems.map(item => (
                            <div className="item" key={item.menuItemId}>
                                <span>{item.itemName} x {item.quantityOrdered}</span>
                                <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
                            </div>
                        ))
                    )}
                    <h4>Total: ${total.toFixed(2)}</h4>
                </>
            )}
        </div>
    );
};

export default CartPopup;
