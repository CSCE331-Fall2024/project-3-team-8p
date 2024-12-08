import React, { useState } from 'react';
import { Button, Card, ListGroup, Badge, Collapse } from 'react-bootstrap';
import CartItem from "../../../models/interfaces/CartItem";
import { Link } from "react-router-dom";
import { usePreferences } from "../../../contexts/PreferencesContext";

interface CartPopupProps {
    cartItems: CartItem[];
    total: number;
    onClearCart: () => void;
}

/**
 * Popup modal that displays the cart contents, total price, and offers options for clearing the cart or proceeding to checkout.
 * @param cartItems - Array of items currently in the cart
 * @param total - The total price of the items in the cart
 * @param onClearCart - Callback function that is called when the cart is cleared
 * @constructor
 */
const CartPopup = ({
                       cartItems,
                       total,
                       onClearCart,
                   }: CartPopupProps) => {
    const { isSpanish, isHighContrast, textSize } = usePreferences();
    const [isOpen, setIsOpen] = useState(true);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantityOrdered, 0);

    return (
        <Card
            className={`position-fixed top-50 translate-middle-y end-0 me-3 shadow-lg border-0 ${
                isHighContrast ? 'bg-black text-white' : 'bg-white'
            }`}
            style={{
                width: '320px',
                zIndex: 1000,
            }}
        >
            <Card.Header className={`d-flex justify-content-between align-items-center py-3 ${
                isHighContrast ? 'bg-black border-light' : 'bg-white'
            }`}>
                <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold">
                        {isSpanish ? "Carro" : "Cart"}
                    </span>
                    {totalItems > 0 && (
                        <Badge bg={isHighContrast ? "light" : "danger"}
                               text={isHighContrast ? "black" : "white"}>
                            {totalItems}
                        </Badge>
                    )}
                </div>
                <div className="d-flex gap-2">
                    {cartItems.length > 0 && (
                        <Button
                            variant={isHighContrast ? "outline-light" : "outline-danger"}
                            size="sm"
                            onClick={onClearCart}
                            className="d-flex align-items-center gap-1"
                            style={{ fontSize: `${textSize}px` }}
                        >
                            {isSpanish ? "Claro" : "Clear"}
                        </Button>
                    )}
                    <Button
                        variant={isHighContrast ? "outline-light" : "outline-danger"}
                        size="sm"
                        onClick={() => setIsOpen(prev => !prev)}
                        aria-expanded={isOpen}
                        aria-controls="cart-content"
                    >
                        {isOpen ? '▼' : '▲'}
                    </Button>
                </div>
            </Card.Header>

            <Collapse in={isOpen}>
                <div id="cart-content">
                    <Card.Body className="p-0">
                        {cartItems.length === 0 ? (
                            <div className={`p-3 text-center ${isHighContrast ? "text-white" : "text-muted"}`}>
                                {isSpanish ? "Tu carrito esta vacío" : "Your cart is empty"}
                            </div>
                        ) : (
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item
                                        key={item.menuItemId}
                                        className={`d-flex justify-content-between align-items-center px-3 py-2 ${
                                            isHighContrast ? 'bg-black text-white border-light' : ''
                                        }`}
                                    >
                                        <div>
                                            <div className="fw-medium">{isSpanish ? item.translatedItemName : item.itemName}</div>
                                            <div className={`small ${isHighContrast ? 'text-light' : 'text-muted'}`}>
                                                ${item.price.toFixed(2)} × {item.quantityOrdered}
                                            </div>
                                        </div>
                                        <span className={`fw-semibold ${
                                            isHighContrast ? 'text-white' : 'text-danger'
                                        }`}>
                                            ${(item.price * item.quantityOrdered).toFixed(2)}
                                        </span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Card.Body>

                    {cartItems.length > 0 && (
                        <Card.Footer className={`px-3 py-3 ${
                            isHighContrast ? 'bg-black border-light' : 'bg-light'
                        }`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-semibold">Total</span>
                                <span className={`fw-bold fs-5 ${
                                    isHighContrast ? 'text-white' : 'text-danger'
                                }`}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <Link to="checkout">
                                <Button
                                    variant={isHighContrast ? "light" : "danger"}
                                    className="w-100 mt-2"
                                    style={{ fontSize: `${textSize}px` }}
                                >
                                    {isSpanish ? "Pasar por la caja" : "Proceed to Checkout"}
                                </Button>
                            </Link>
                        </Card.Footer>
                    )}
                </div>
            </Collapse>
        </Card>
    );
};

export default CartPopup;