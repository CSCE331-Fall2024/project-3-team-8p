import React, { useState } from 'react';
import styled from 'styled-components';
import { wok, spicy, information } from '../images';

interface ListingCardProps {
    name: string;
    imageUrl: string;
    allergens?: string[];
    calories: number;
    fat: number;
    protein: number;
    sugar: number;
    carbohydrates: number;
    isPremium: boolean;
    isSpicy: boolean;
}

const CardContainer = styled.div`
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
    margin: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
`;

const CardContent = styled.div`
    padding: 16px;
    text-align: center;
`;

const Name = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
`;

const NutritionImage = styled.img`
    width: auto;
    max-width: 50px;
    max-height: 50px;
    object-fit: contain;
    cursor: pointer; /* Makes it clickable */
`;

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    z-index: 1000;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ListingCard: React.FC<ListingCardProps> = ({
                                                     name,
                                                     imageUrl,
                                                     allergens = [],
                                                     calories,
                                                     fat,
                                                     protein,
                                                     sugar,
                                                     carbohydrates,
                                                     isPremium,
                                                     isSpicy
                                                 }) => {
    const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility

    const handleNutritionClick = () => {
        setShowPopup(true); // Show popup when NutritionImage is clicked
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close the popup when the close button is clicked
    };

    return (
        <CardContainer>
            <NutritionImage src={information} alt="Nutrition Info" onClick={handleNutritionClick} />

            <Image src={imageUrl} alt={name} />
            <CardContent>
                <Name>{name}</Name>
                <div>Calories: {calories} cal</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {isPremium && <img src={wok} alt="Premium" />}
                    {isSpicy && <img src={spicy} alt="Spicy" />}
                </div>
            </CardContent>

            {/* Popup Display */}
            {showPopup && (
                <>
                    <PopupOverlay onClick={handleClosePopup} />
                    <PopupContainer>
                        <CloseButton onClick={handleClosePopup}>&times;</CloseButton>
                        <h2>{name}</h2>
                        <p>Calories: {calories} cal</p>
                        <p>Fat: {fat} g</p>
                        <p>Protein: {protein} g</p>
                        <p>Sugar: {sugar} g</p>
                        <p>Carbohydrates: {carbohydrates} g</p>
                        {allergens.length > 0 ? (
                            <div>
                                <strong>Allergens:</strong>
                                {allergens.map((item, index) => (
                                    <p key={index}>{item}</p>
                                ))}
                            </div>
                        ) : (
                            <p>No allergens</p>
                        )}
                    </PopupContainer>
                </>
            )}
        </CardContainer>
    );
};

export default ListingCard;
