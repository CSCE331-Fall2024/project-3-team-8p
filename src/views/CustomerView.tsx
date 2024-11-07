// src/views/CustomerView.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import listings from '../components/customer/listingData';
import './CustomerView.css';
import ListingCard from '../components/customer/ListingCard';
import ButtonContainer from '../components/customer/ButtonContainer';
import { Tabs } from '../components/customer/TabsEnum';
import { banner } from "../components/images";
import { Listing } from "../components/customer/types";
import CartPopup from '../components/customer/CartPopup';

function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const [cartItems, setCartItems] = useState<Listing[]>([]);
    const [total, setTotal] = useState(0);

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    const addToCart = (listing: Listing) => {
        const existingItem = cartItems.find(item => item.name === listing.name);
        if (existingItem) {
            const updatedItems = cartItems.map(item =>
                item.name === listing.name
                    ? { ...item, quantityOrdered: item.quantityOrdered + 1 }
                    : item
            );
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...listing, quantityOrdered: 1 }]);
        }

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
                <Link to="/checkout" state={{ total }}>
                    <button className="black-button">Checkout</button>
                </Link>
            </div>
            <div className="cardSection">
                {listings[activeTab].map((listing, index) => {
                    const cartItem = cartItems.find(item => item.name === listing.name);
                    const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;

                    return (
                        <ListingCard
                            key={index}
                            name={listing.name}
                            price={listing.price}
                            imageUrl={listing.imageUrl}
                            quantityOrdered={quantityOrdered}
                            onAddToCart={() => addToCart(listing)}
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
