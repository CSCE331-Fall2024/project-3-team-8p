import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/Checkout.css';
import MenuItem from '../../../models/MenuItem'; // Ensure you import MenuItem

const Checkout: React.FC = () => {
    const { cartItems, total, clearCart } = useCart();
    const navigate = useNavigate();

    const handleOrderMore = () => {
        navigate('/customer');
    };

    const handlePlaceOrder = () => {
        alert('Order placed!');
        clearCart();
        navigate('/customer');
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div className="cart-item" key={item.menuItemId}>
                            <span>{item.itemName} x {item.quantityOrdered}</span>
                            <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="total-container">
                    <h3 className="total-text">Total: ${total.toFixed(2)}</h3>
                    <div className="buttons-container">
                        <button className="button" onClick={handleOrderMore}>Order More</button>
                        <button className="button" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
