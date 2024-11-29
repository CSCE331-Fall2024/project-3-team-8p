import React, { useState } from 'react';
import listings from '../components/menu-boards/listingData';
import './MenuBoardView.css';
import ListingCard from '../components/menu-boards/ListingCard';
import ButtonContainer from '../components/menu-boards/ButtonContainer';
import { Tabs } from '../components/menu-boards/TabsEnum';
import { Prices } from '../components/menu-boards/TabsEnum';
import { premium, spicy } from '../components/images';

function MenuBoardView() {

    return (
        <div className="MenuBoardView">
            {Object.values(Tabs).map((tab) => (
                <div>
                    <div className="subHeader">
                        {tab}
                    </div>
                    <div className="legend">
                        <div className="legend-item">
                            <img src={premium} alt="Premium icon"/>
                            <span> = Premium item</span>
                        </div>
                        <div className="legend-content">
                            <img src={spicy} alt="Spicy icon" className="spicy-icon"/>
                            <span> = Spicy item</span>
                        </div>
                    </div>


                    <div className="cardSection">
                        {listings[tab].map((listing, index) => (
                            <ListingCard
                                key={index}
                                name={listing.name}
                                price={listing.price}
                                calories={listing.calories}
                                imageUrl={listing.imageUrl}
                                allergens={listing.allergens}
                                fat={listing.fat}
                                protein={listing.protein}
                                sugar={listing.sugar}
                                carbohydrates={listing.carbohydrates}
                                isPremium={listing.isPremium}
                                isSpicy={listing.isSpicy}
                            />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
}

export default MenuBoardView;
