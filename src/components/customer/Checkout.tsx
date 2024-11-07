// src/views/Checkout.js
import React from 'react';
import { Link } from 'react-router-dom';

function Checkout() {
    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            {/* Display total, options to go back, and 'Place Order' button */}
            <p>Your running total: $XX.XX</p>
            <Link to="/customer">
                <button>Back to Order More</button>
            </Link>
            <button onClick={() => alert('Order placed!')}>Place Order</button>
        </div>
    );
}

export default Checkout;
//Use context or use state