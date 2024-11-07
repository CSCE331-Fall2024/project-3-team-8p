import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useCart } from '../../context/CartContext';  // Import the useCart hook
import styled from 'styled-components';

// Define the CartItem type (if not defined globally)
interface CartItem {
    name: string;
    price: number;
    quantityOrdered: number;
}

const CheckoutContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    background-color: #f4f4f9;  // Light background color for the page
`;

const CartItemStyled = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    background-color: #fff;
`;

const TotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
`;

const TotalText = styled.h3`
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.button`
    padding: 12px 24px;
    background-color: #D51A1F;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1em;

    &:hover {
        background-color: #A81618;
    }
`;

const Checkout: React.FC = () => {
    const { cartItems, total, clearCart } = useCart();// Access cartItems and total from context
    //const { clearCart } = useContext(CartContext);

    const navigate = useNavigate();// For navigation

    // Navigate to the customer view for ordering more items
    const handleOrderMore = () => {
        navigate('/customer');  // Navigate back to the CustomerView to continue ordering
    };

    // Placeholder for placing the order (e.g., could clear cart or send to backend)
    const handlePlaceOrder = () => {
        alert('Order placed!');  // You can replace this with your actual order placement logic
        // Optionally clear the cart and navigate
        clearCart();
        navigate('/customer');  // Reset to customer view after placing the order
    };

    return (
        <CheckoutContainer>
            <h2>Checkout</h2>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item: CartItem) => (  // Type 'item' as CartItem
                        <CartItemStyled key={item.name}>
                            <span>{item.name} x {item.quantityOrdered}</span>
                            <span>${(item.price * item.quantityOrdered).toFixed(2)}</span>
                        </CartItemStyled>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <TotalContainer>
                    <TotalText>Total: ${total.toFixed(2)}</TotalText>
                    <ButtonsContainer>
                        <Button onClick={handleOrderMore}>Order More</Button>
                        <Button onClick={handlePlaceOrder}>Place Order</Button>
                    </ButtonsContainer>
                </TotalContainer>
            )}
        </CheckoutContainer>
    );
};

export default Checkout;
