import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import listings from '../../models/dummy-data/listingData';
import './css/CustomerView.css';
import ListingCard from './components/ListingCard';
import ButtonContainer from './components/ButtonContainer';
import { Tabs } from './TabsEnum';
import CartPopup from './components/CartPopup';
import { useCart } from '../../contexts/CartContext';
import MenuItem from '../../models/MenuItem';
import { Container } from "react-bootstrap";
import AccessibilityModal from './components/AccessibilityModal';



function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
    const [textSize, setTextSize] = useState<number>(16); // Default text size
    const [isSpanish, setIsSpanish] = useState<boolean>(false);
    const { cartItems, cartTotal, addToCart, clearCart } = useCart();

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    const toggleAccessibilityModal = () => {
        setShowAccessibilityModal(!showAccessibilityModal);
    };

    const increaseTextSize = () => {
        setTextSize((prev) => Math.min(prev + 2, 20)); // Limit max size
    };

    const decreaseTextSize = () => {
        setTextSize((prev) => Math.max(prev - 2, 12)); // Limit min size
    };

    const toggleLanguage = () => {
        setIsSpanish((prev) => !prev);
    };

    return (
        <div className="CustomerView" style={{ fontSize: `${textSize}px` }}>
            <div className="button-container">
                <button className="black-button" onClick={toggleAccessibilityModal}>
                    Accessibility
                </button>
                <img src={"images/POS.png"} alt={"Logo"} className="BannerImage" />
                <Link to="/customer/checkout">
                    <button className="black-button">Checkout</button>
                </Link>
            </div>
            <div className="cardSection">
                {listings[activeTab].map((listing: MenuItem) => {
                    const cartItem = cartItems.find(item => item.menuItemId === listing.menuItemId);
                    const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;
                    return (
                        <ListingCard
                            key={listing.menuItemId}
                            name={isSpanish ? listing.itemName : listing.itemName} // Use Spanish if toggled
                            price={listing.price}
                            imageUrl={`/images/${listing.itemName}.png`} // Adjusted path for public folder
                            quantityOrdered={quantityOrdered}
                            onAddToCart={() => addToCart(listing)}
                        />
                    );
                })}
            </div>
            <div className="padding">
                <ButtonContainer onTabChange={handleTabChange}/>
            </div>
            <CartPopup cartItems={cartItems} total={cartTotal} onClearCart={clearCart}/>

            {showAccessibilityModal && (
                <AccessibilityModal
                    onClose={toggleAccessibilityModal}
                    onIncreaseTextSize={increaseTextSize}
                    onDecreaseTextSize={decreaseTextSize}
                    onToggleLanguage={toggleLanguage}
                    isSpanish={isSpanish}
                />
            )}
        </div>
    );
}

export default CustomerView;
