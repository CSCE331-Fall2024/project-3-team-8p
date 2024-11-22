import React from 'react';
import styled from 'styled-components';

interface ListingCardProps {
    name: string;
    imageUrl: string;
    calories: number;
    specialItems?: string[]; // Optional property
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

const Calories = styled.h3`
    font-size: 1.2em;
    margin: 0;
    color: #333;
    justify-content: center;
`;

const SpecialItems = styled.div`
    width: 100%;
    max-height: 200px;
    object-fit: contain;
`;

const ListingCard: React.FC<ListingCardProps> = ({ name, imageUrl, calories, specialItems = [] }) => {
    return (
        <CardContainer>
            <Image src={imageUrl} alt={name} />
            <CardContent>
                <Name>{name}</Name>
                <Calories>{calories} cal</Calories>
                <SpecialItems>
                    {specialItems.length > 0 ? (
                        specialItems.map((item, index) => (
                            <img key={index} src={item} alt={`Special item ${index + 1}`} className="smallImage"/>
                        ))
                    ) : (
                        <p>No special items available.</p>
                    )}
                </SpecialItems>
            </CardContent>
        </CardContainer>
    );
};


export default ListingCard;