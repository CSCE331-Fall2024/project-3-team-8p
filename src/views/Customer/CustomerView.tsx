import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import listings from '../../models/dummy-data/listingData'; // Import listings
import './css/CustomerView.css';
import ListingCard from './components/ListingCard';
import ButtonContainer from './components/ButtonContainer';
import { Tabs } from './TabsEnum';
import CartPopup from './components/CartPopup'; // Import CartPopup
import { useCart } from './context/CartContext'; // Import the useCart hook
import MenuItem from '../../models/MenuItem';


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
                <img src={"images/POS.png"} alt={"Logo"} className="BannerImage" />
                <Link to="/checkout">
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
            <CartPopup cartItems={cartItems} total={total} onClearCart={clearCart} />
        </div>
    );
}

export default CustomerView;
