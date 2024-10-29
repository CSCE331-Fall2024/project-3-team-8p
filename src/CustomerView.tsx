// CustomerView.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from './Images/logo.svg';
import banner from './Images/POS.png';
import BeijingBeef from './Images/Beijing Beef.png'
import BlackPepperChicken from './Images/Black Pepper Chicken.png'
import BlackPepperSteak from './Images/Black Pepper Sirloin Steak.png'
import OrangeChicken from './Images/The Original Orange Chicken.png'
import KungPao from './Images/Kung Pao Chicken.png'
import HotOnes from './Images/Hot Ones Blazing Bourbon Chicken.png'
import HoneyWalnut from './Images/Honey Walnut Shrimp.png'
import HoneySesame from './Images/Honey Sesame Chicken Breast.png'
import GrilledTeriyaki from './Images/Grilled Teriyaki Chicken.png'
import BroccoliBeef from './Images/Broccoli Beef.png'
import WhiteRice from './Images/White Steamed Rice.png'
import FriedRice from './Images/Fried Rice.png'
import SuperGreens from './Images/Super Greens.png'
import ChowMein from './Images/Chow Mein.png'
import Pepsi from './Images/Pepsi.png'
import DrPepper from './Images/Dr. Pepper.png'
import Aquafina from './Images/Aquafina.png'
import SweetTea from './Images/Sweet Tea.png'
import './CustomerView.css';
import ListingCard from './ListingCard';
import AccessibilityButton from './AccessibilityButton';
import CheckoutButton from './CheckoutButton';
import ButtonContainer from './ButtonContainer';

const CardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 40px;
    
`;

// Define Listing type
interface Listing {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
}

// Define listings with specific tab categories
const listings: Record<'Entrees' | 'Sides' | 'Drinks' | 'Desserts', Listing[]> = {
    Entrees: [
        { name: 'Beijing Beef', price: 4.40, imageUrl: BeijingBeef, quantityOrdered: 0 },
        { name: 'The Original Orange Chicken', price: 4.40, imageUrl: OrangeChicken, quantityOrdered: 0 },
        { name: 'Kung Pao Chicken', price: 4.40, imageUrl: KungPao, quantityOrdered: 0 },
        { name: 'Hot Ones Blazing Bourbon Chicken', price: 4.40, imageUrl: HotOnes, quantityOrdered: 0 },
        { name: 'Honey Walnut Shrimp', price: 4.40, imageUrl: HoneyWalnut, quantityOrdered: 0 },
        { name: 'Honey Sesame Chicken Breast', price: 4.40, imageUrl: HoneySesame, quantityOrdered: 0 },
        { name: 'Grilled Teriyaki', price: 4.40, imageUrl: GrilledTeriyaki, quantityOrdered: 0 },
        { name: 'Black Pepper Sirloin Steak', price: 4.40, imageUrl: BlackPepperSteak, quantityOrdered: 0 },
        { name: 'Black Pepper Chicken', price: 4.40, imageUrl: BlackPepperChicken, quantityOrdered: 0 },
        { name: 'BrocolliBeef', price: 4.40, imageUrl: BroccoliBeef, quantityOrdered: 0 }
    ],
    Sides: [
        { name: 'White Rice', price: 4.40, imageUrl: WhiteRice, quantityOrdered: 0 },
        { name: 'Fried Rice', price: 4.40, imageUrl: FriedRice, quantityOrdered: 0 },
        { name: 'Chow Mein', price: 4.40, imageUrl: ChowMein, quantityOrdered: 0 },
        { name: 'Super Greens', price: 4.40, imageUrl: SuperGreens, quantityOrdered: 0 }
    ],
    Drinks: [
        { name: 'Dr. Pepper', price: 4.40, imageUrl: DrPepper, quantityOrdered: 0 },
        { name: 'Pepsi', price: 4.40, imageUrl: Pepsi, quantityOrdered: 0 },
        { name: 'Aquafina', price: 4.40, imageUrl: Aquafina, quantityOrdered: 0 },
        { name: 'Sweet Tea', price: 4.40, imageUrl: SweetTea, quantityOrdered: 0 }
    ],
    Desserts: [
        { name: 'Mochi', price: 4.99, imageUrl: 'https://via.placeholder.com/300', quantityOrdered: 1 },
    ],
    //'Leave a Review': [],
};

function CustomerView() {
    // State to track active tab and show respective listings
    const [activeTab, setActiveTab] = useState<keyof typeof listings>('Entrees');

    // Handle tab change
    const handleTabChange = (tab: keyof typeof listings) => {
        setActiveTab(tab);
    };

    return (
        <div className="CustomerView">
            {/* Accessibility and Checkout Button */}
            <div className="button-container">
                <AccessibilityButton />
                <img src={banner} alt="Centered Top Image" className="BannerImage" />
                <CheckoutButton />
            </div>

            {/* Card Section showing listings based on active tab */}
            <CardSection>
                {listings[activeTab].map((listing, index) => (
                    <ListingCard
                        key={index}
                        name={listing.name}
                        price={listing.price}
                        imageUrl={listing.imageUrl}
                        quantityOrdered={listing.quantityOrdered}
                    />
                ))}
            </CardSection>

            {/* Button Container to switch tabs */}
            <div className={"padding"}>
            <ButtonContainer onTabChange={handleTabChange} />
            </div>
        </div>
    );
}

export default CustomerView;
