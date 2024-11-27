// ListingCard.tsx
import React from 'react';
import '../css/ListingCard.css';

interface ListingCardProps {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
    onAddToCart: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ name, price, imageUrl, quantityOrdered, onAddToCart }) => {
    return (
        <div className="card-container" onClick={onAddToCart}> {/* Apply CSS class for container */}
            <img
                className="image"
                src={imageUrl}
                alt={name}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/sample_image.png";
                }}
            />
            <div className="card-content"> {/* Apply CSS class for content */}
                <h3 className="name">{name}</h3> {/* Apply CSS class for name */}
                <span className="price">${price.toFixed(2)}</span> {/* Apply CSS class for price */}
                <span className="quantity">Quantity Ordered: {quantityOrdered}</span> {/* Apply CSS class for quantity */}
            </div>
        </div>
    );
};

export default ListingCard;
