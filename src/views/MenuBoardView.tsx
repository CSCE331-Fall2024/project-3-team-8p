import React, { useState } from 'react';
import listings from '../components/menu-boards/listingData';
import './MenuBoardView.css';
import ListingCard from '../components/menu-boards/ListingCard';
import ButtonContainer from '../components/menu-boards/ButtonContainer';
import { Tabs } from '../components/menu-boards/TabsEnum';
import { Prices } from '../components/menu-boards/TabsEnum';
// import {banner} from "../components/images";

function MenuBoardView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    };

    return (
        <div className="MenuBoardView">
            <div className="button-container">
                <button className="black-button">Accessibility</button>
                {/*</!*<img src={banner} alt="Centered Top Image" className="BannerImage"/>*!/>*/}
                <h1> {activeTab} </h1>

                <button className="black-button">Checkout</button>
            </div>
            <div className="subHeader">
                <p> ${Prices[activeTab].toFixed(2)} ea.</p>
            </div>
            <div className="cardSection">
                {listings[activeTab].map((listing, index) => (
                    <ListingCard
                        key={index}
                        name={listing.name}
                        calories={listing.calories}
                        imageUrl={listing.imageUrl}
                        specialItems={listing.specialItems}
                    />
                ))}

            </div>
            <div className="padding">
                <ButtonContainer onTabChange={handleTabChange} />
            </div>
        </div>
    );
}

export default MenuBoardView;
