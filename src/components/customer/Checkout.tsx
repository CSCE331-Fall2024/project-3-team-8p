// src/views/Checkout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Checkout() {
    // Retrieve the state (total) from the Link
    const location = useLocation();
    const total = location.state?.total || 0; // Default to 0 if no total is passed

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <p>Your running total: ${total.toFixed(2)}</p>
            <Link to="/customer">
                <button>Back to Order More</button>
            </Link>

            <Link to="/customer">
            <button onClick={() => alert('Order placed!')}>Place Order</button>
            </Link>
        </div>
    );
}

export default Checkout;
