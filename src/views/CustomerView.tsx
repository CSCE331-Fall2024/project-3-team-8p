import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import listings from '../components/customer/listingData'; // Import listings
import './CustomerView.css';
import ListingCard from '../components/customer/ListingCard';
import ButtonContainer from '../components/customer/ButtonContainer';
import { Tabs } from '../components/customer/TabsEnum';
import { banner } from "../components/images";
import { Listing } from "../components/customer/types";
import CartPopup from '../components/customer/CartPopup'; // Import CartPopup
import { useCart } from '../context/CartContext'; // Import the useCart hook

function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const { cartItems, total, addToCart, clearCart } = useCart(); // Access context values

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    return (
        <div className="CustomerView">
            <div className="button-container">
                <button className="black-button">Accessibility</button>
                <img src={banner} alt="Centered Top Image" className="BannerImage" />
                <Link to="/checkout">
                    <button className="black-button">Checkout</button>
                </Link>
            </div>
            <div className="cardSection">
                {listings[activeTab].map((listing, index) => {
                    // Find the quantity ordered for the current listing
                    const cartItem = cartItems.find(item => item.name === listing.name);
                    const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;

                    return (
                        <ListingCard
                            key={index}
                            name={listing.name}
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
            <CartPopup cartItems={cartItems} total={total} onClearCart={clearCart} />
        </div>
    );
}

export default CustomerView;
