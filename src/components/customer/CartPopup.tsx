// CartPopup.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

// Define the type for a cart item
interface CartItem {
    name: string;
    price: number;
    quantityOrdered: number;
}

// Define the props type for CartPopup
interface CartPopupProps {
    cartItems: CartItem[];
    total: number;
    onClearCart: () => void;
}

const PopupContainer = styled.div`
    position: fixed;
    top: 50%; /* Adjusted top position to be higher on the screen */
    right: 20px; /* Position from the right */
    transform: translateY(-50%); /* Center the element vertically based on its top */
    width: 250px; /* Set width for the cart popup */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    z-index: 1000; /* Ensure it's above other content */
    transition: max-height 0.3s ease-in-out; /* Transition for collapsing */
    overflow: hidden; /* Hide content when collapsed */
`;


const Item = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ClearButton = styled.button`
    margin-top: 10px;
    background-color: #D51A1F; // Panda Express red
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    margin-left: 45px;

    &:hover {
        background-color: #A81618; // Darker red on hover
    }
`;

const ToggleButton = styled.button`
    background-color: #D51A1F; // Panda Express red
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 10px;

    &:hover {
        background-color: #A81618; // Darker red on hover
    }
`;

const CartPopup: React.FC<CartPopupProps> = ({ cartItems, total, onClearCart }) => {
    const [isOpen, setIsOpen] = useState(false); // State to manage the visibility of the cart

    const toggleCart = () => {
        setIsOpen(prev => !prev); // Toggle the open state
    };

    return (
        <PopupContainer style={{ maxHeight: isOpen ? '400px' : '80px' }}>
            <ToggleButton onClick={toggleCart}>{isOpen ? 'Hide Cart' : 'Show Cart'}</ToggleButton>
            <ClearButton onClick={onClearCart}>Clear Cart</ClearButton>
            {isOpen && (
                <>
                    <h3>Cart</h3>
                    {cartItems.length === 0 ? (
                        <div>Your cart is empty.</div>
                    ) : (
                        cartItems.map(item => (
                            <Item key={item.name}>
                                <span>{item.name} x {item.quantityOrdered}</span>
                                <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
                            </Item>
                        ))
                    )}
                    <h4>Total: ${total.toFixed(2)}</h4>

                </>
            )}
        </PopupContainer>
    );
};

export default CartPopup;
