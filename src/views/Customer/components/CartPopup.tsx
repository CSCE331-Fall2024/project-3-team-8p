import React, { useState } from 'react';
import '../css/CartPopup.css';
import CartItem from "../../../models/interfaces/CartItem";

interface CartPopupProps {
    cartItems: CartItem[];
    total: number;
    onClearCart: () => void;
}

const CartPopup = ({ cartItems, total, onClearCart }: CartPopupProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleCart = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`popup-container ${isOpen ? "open" : "closed"}`}>
            <div className="d-flex justify-content-between">
                <button className="toggle-button" onClick={toggleCart}>
                    {isOpen ? 'Hide Cart' : 'Show Cart'}
                </button>
                <button className="clear-button" onClick={onClearCart}>Clear Cart</button>
            </div>
            {isOpen && (
                <>
                    <h3 className="mt-3">Cart</h3>
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
