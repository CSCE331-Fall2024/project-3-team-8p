import React, { useState } from 'react';
import styled from 'styled-components';
// import { spicyIcon, information, premiumIcon } from '../images';
import NutritionInfoDict from "../../../models/dict-types/NutritionInfoDict";


interface ListingCardProps {
    menuItemId: string;
    price: number;
    itemName: string;
    imageUrl: string;
    nutritionInfo: NutritionInfoDict;
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

const ListingCard: React.FC<ListingCardProps> = ({itemName, price, imageUrl, nutritionInfo}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleNutritionClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <CardContainer>
            <NutritionImage src={'images/information.png'} alt="Nutrition Info" onClick={handleNutritionClick} />

            <Image src={imageUrl} alt={itemName}
                   onError={(e) => {
                       (e.target as HTMLImageElement).src = "/images/sample_image.png";
                   }}/>
            <CardContent>
                <Name>{itemName}</Name>
                <p> ${price.toFixed(2)} </p>
                <div>Calories: {nutritionInfo.calories} cal</div>
                <PremiumContainer>
                    {nutritionInfo.isPremium && <Premium src={'images/premium.png'} alt="Premium"/>}

                </PremiumContainer>
                <SpicyContainer>
                    {nutritionInfo.isSpicy && <Spicy src={'images/spicy.png'} alt="Spicy"/>}
                </SpicyContainer>
            </CardContent>


            {showPopup && (
                <>
                    <PopupOverlay onClick={handleClosePopup} />
                    <PopupContainer>
                        <CloseButton onClick={handleClosePopup}>&times;</CloseButton>
                        <h2>{itemName}</h2>
                        <p>Calories: {nutritionInfo.calories} cal</p>
                        <p>Fat: {nutritionInfo.fat} g</p>
                        <p>Protein: {nutritionInfo.protein} g</p>
                        <p>Sugar: {nutritionInfo.sugar} g</p>
                        <p>Carbohydrates: {nutritionInfo.carbohydrates} g</p>
                        {nutritionInfo.allergens.length > 0 ? (
                            <div>
                                <strong>Allergens:</strong>
                                {nutritionInfo.allergens.map((item, index) => (
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