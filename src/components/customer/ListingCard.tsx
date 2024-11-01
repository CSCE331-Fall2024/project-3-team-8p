// ListingCard.tsx
import React from 'react';
import styled from 'styled-components';

interface ListingCardProps {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
    onAddToCart: () => void; // Add this prop
}

const CardContainer = styled.div`
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
  cursor: pointer; // Add cursor to indicate clickability
  
  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  font-size: 1.2em;
  margin: 0;
  color: #333;
`;

const Price = styled.span`
  font-size: 1.1em;
  font-weight: bold;
  color: #0073e6;
  display: block;
  margin-top: 8px;
`;

const Quantity = styled.span`
  font-size: 0.9em;
  color: #666;
  margin-top: 4px;
  display: block;
`;

const ListingCard: React.FC<ListingCardProps> = ({ name, price, imageUrl, quantityOrdered, onAddToCart }) => {
    return (
        <CardContainer onClick={onAddToCart}> {/* Call onAddToCart on click */}
            <Image src={imageUrl} alt={name} />
            <CardContent>
                <Name>{name}</Name>
                <Price>${price.toFixed(2)}</Price>
                <Quantity>Quantity Ordered: {quantityOrdered}</Quantity>
            </CardContent>
        </CardContainer>
    );
};

export default ListingCard;
