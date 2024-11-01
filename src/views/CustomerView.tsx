// CustomerView.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import listings from './listingData'; // Import listings
import './CustomerView.css';
import ListingCard from './components/customer/ListingCard';
import ButtonContainer from './components/customer/ButtonContainer';
import { Tabs } from './TabsEnum';
import { banner } from "./Images";
import { Listing } from "./components/customer/types";
import CartPopup from './components/customer/CartPopup'; // Import CartPopup

function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const [cartItems, setCartItems] = useState<Listing[]>([]); // Keep track of cart items
    const [total, setTotal] = useState(0); // Total price

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    const addToCart = (listing: Listing) => {
        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.name === listing.name);
        if (existingItem) {
            // If it exists, increase quantityOrdered
            const updatedItems = cartItems.map(item =>
                item.name === listing.name
                    ? { ...item, quantityOrdered: item.quantityOrdered + 1 }
                    : item
            );
            setCartItems(updatedItems);
        } else {
            // If it does not exist, add it to the cart with quantity 1
            setCartItems([...cartItems, { ...listing, quantityOrdered: 1 }]);
        }

        // Update the total
        setTotal(prevTotal => prevTotal + listing.price);
    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    };

    return (
        <div className="CustomerView">
            <div className="button-container">
                <button className="black-button">Accessibility</button>
                <img src={banner} alt="Centered Top Image" className="BannerImage" />
                <button className="black-button">Checkout</button>
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
            {/* Include the CartPopup here with cartItems and total */}
            <CartPopup cartItems={cartItems} total={total} onClearCart={clearCart} />
        </div>
    );
}

export default CustomerView;
