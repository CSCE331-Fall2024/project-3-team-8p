import React, { useState } from 'react';
import styled from 'styled-components';
import { spicyIcon, information, premiumIcon } from '../images';

interface ListingCardProps {
    name: string;
    price: number;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const PremiumContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    position: relative;
`;

const SpicyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px 0;
`;



const Name = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
`;

const NutritionImage = styled.img`
    width: auto;
    max-width: 25px;
    max-height: 25px;
    object-fit: contain;
    cursor: pointer;
`;

const Premium = styled.img`
    width: 100px;
    height: auto;
    max-height: 30px;
    object-fit: contain;
    float: left;
`;

const Spicy = styled.img`
    width: 75px;
    height: auto;
    object-fit: contain;
    padding: 10px;
    
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

const ListingCard: React.FC<ListingCardProps> = ({name, price, imageUrl, allergens = [], calories, fat, protein, sugar, carbohydrates, isPremium, isSpicy}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleNutritionClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <CardContainer>
            <NutritionImage src={information} alt="Nutrition Info" onClick={handleNutritionClick} />

            <Image src={imageUrl} alt={name} />
            <CardContent>
                <Name>{name}</Name>
                <p> ${price.toFixed(2)} </p>
                <div>Calories: {calories} cal</div>
                <PremiumContainer>
                    {isPremium && <Premium src={premiumIcon} alt="Premium"/>}

                </PremiumContainer>
                <SpicyContainer>
                    {isSpicy && <Spicy src={spicyIcon} alt="Spicy"/>}
                </SpicyContainer>
            </CardContent>


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
