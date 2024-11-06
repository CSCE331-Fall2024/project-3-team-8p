// CustomerView.tsx
import React, { useState } from 'react';
import listings from '../../models/dummy-data/listing-data'; // Import listings
import './CustomerView.css';
import ListingCard from './ListingCard';
import ButtonContainer from './ButtonContainer';
import { Tabs } from './tabs-enum';
import {banner} from "../images";

function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    return (
        <div className="CustomerView">
            <div className="button-container">
                <button className="black-button">Accessibility</button>
                <img src={banner} alt="Centered Top Image" className="BannerImage"/>
                <button className="black-button">Checkout</button>
            </div>
            <div className="cardSection">
                {listings[activeTab].map((listing, index) => (
                    <ListingCard
                        key={index}
                        name={listing.name}
                        price={listing.price}
                        imageUrl={listing.imageUrl}
                        quantityOrdered={listing.quantityOrdered}
                    />
                ))}
            </div>
            <div className="padding">
                <ButtonContainer onTabChange={handleTabChange} />
            </div>
        </div>
    );
}

export default CustomerView;
