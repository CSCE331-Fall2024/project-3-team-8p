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


function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const { cartItems, cartTotal, addToCart, clearCart } = useCart(); // Access context values

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    return (
        <Container fluid>
            <div className="CustomerView">
                <div className="button-container">
                    <button className="black-button">Accessibility</button>
                    <img src={"images/POS.png"} alt={"Logo"} className="BannerImage" />
                    <Link to="checkout">
                        <button className="black-button">Checkout</button>
                    </Link>
                </div>
                <div className="cardSection">
                    {listings[activeTab].map((listing: MenuItem) => {
                        // Find the quantity ordered for the current listing
                        const cartItem = cartItems.find(item => item.menuItemId === listing.menuItemId);
                        const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;

                        return (
                            <ListingCard
                                key={listing.menuItemId}
                                name={listing.itemName}
                                price={listing.price}
                                imageUrl={listing.imageUrl}
                                quantityOrdered={quantityOrdered} // Pass the quantity ordered to the ListingCard
                                onAddToCart={() => addToCart(listing)} // Pass the listing to addToCart
                            />
                        );
                    })}
                </div>
                <div className="padding">
                    <ButtonContainer onTabChange={handleTabChange} />
                </div>
                <CartPopup cartItems={cartItems} total={cartTotal} onClearCart={clearCart} />
            </div>
        </Container>
    );
}

export default CustomerView;
