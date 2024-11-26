import React from 'react';
import styled from 'styled-components';
import {
    wok,
    spicy
} from '../images';

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
  //transition: transform 0.2s ease-in-out;
  //
  //&:hover {
  //  transform: scale(1.02);
  //}
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const CardContent = styled.div`
  padding: 16px;
    justify-content: center;
`;

const Name = styled.h3`
  font-size: 1.2em;
  margin: 0;
  color: #333;
  justify-content: center;
`;

const Allergens = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const Calories = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const Fat = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const Protein = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const Sugar = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const Carbohydrates = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const PremiumImage = styled.img`
    width: 100%;
    max-height: 50px;
    object-fit: contain;
`;

const SpicyImage = styled.img`
    width: 100%;
    max-height: 50px;
    object-fit: contain;
`;

const ListingCard: React.FC<ListingCardProps> = ({ name, imageUrl, allergens = [], calories, fat, protein, sugar, carbohydrates, isPremium, isSpicy}) => {
    return (
        <CardContainer>
            <Image src={imageUrl} alt={name} />
            <CardContent>
                <Name>{name}</Name>
                <Calories>{calories} cal</Calories>
                <Allergens> contains:
                    {allergens.length > 0 ? (
                        allergens.map((item, index) => (
                            <div key={index}> {item}</div>
                        ))
                    ) : (
                        <p>No allergens</p>
                    )}
                </Allergens>
                <Fat>Fat: {fat} g</Fat>
                <Protein>Protein: {protein} g</Protein>
                <Sugar>Sugar: {sugar} g</Sugar>
                <Carbohydrates>Carbohydrates: {carbohydrates} g</Carbohydrates>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    {isPremium && (
                        <PremiumImage src={wok} alt={name}/>
                    )}
                    {isSpicy && (
                        <SpicyImage src={spicy} alt={name}/>
                    )}
                </div>


            </CardContent>
        </CardContainer>
    );
};


export default ListingCard;