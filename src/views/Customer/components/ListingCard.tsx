import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { usePreferences } from "../../../contexts/PreferencesContext";
import { DISCOUNT_RATE } from "../../../utils/constants";

interface ListingCardProps {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
    onAddToCart: () => void;
    isDiscounted?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
                                                     name,
                                                     price,
                                                     imageUrl,
                                                     quantityOrdered,
                                                     onAddToCart,
                                                     isDiscounted = false
                                                 }) => {
    const { isHighContrast, textSize } = usePreferences();

    return (
        <Card
            onClick={onAddToCart}
            className={`h-100 shadow-sm ${
                isHighContrast ? 'bg-black border-white' : 'bg-white border-0'
            }`}
            role="button"
            aria-label={`Add ${name} to cart`}
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
            }}
        >
            <div className="position-relative">
                <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={name}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/sample_image.png";
                    }}
                    style={{
                        height: '200px',
                        objectFit: 'contain',
                        padding: '1rem'
                    }}
                />
                <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                    {quantityOrdered > 0 && (
                        <Badge
                            bg={isHighContrast ? "light" : "danger"}
                            text={isHighContrast ? "black" : "white"}
                        >
                            {quantityOrdered}
                        </Badge>
                    )}
                    {isDiscounted && (
                        <Badge
                            bg={isHighContrast ? "light" : "success"}
                            text={isHighContrast ? "black" : "white"}
                        >
                            Sale
                        </Badge>
                    )}
                </div>
            </div>
            <Card.Body className={`d-flex flex-column align-items-center text-center ${
                isHighContrast ? 'text-white' : ''
            }`}>
                <Card.Title className="mb-2" style={{ fontSize: `${textSize}px` }}>
                    {name}
                </Card.Title>
                <Card.Text
                    className={`d-flex gap-2 align-items-baseline fw-bold mb-0 ${isHighContrast ? 'text-white' : 'text-danger'}`}
                    style={{ fontSize: `${textSize}px` }}
                >
                    {isDiscounted && (
                        <Card.Text
                            className={`mb-0 text-muted text-decoration-line-through`}
                            style={{ fontSize: `${textSize - 2}px` }}
                        >
                            ${price.toFixed(2)}
                        </Card.Text>
                    )}
                    <Card.Text
                        className={`fw-bold mb-0 ${isHighContrast ? 'text-white' : 'text-danger'}`}
                        style={{ fontSize: `${textSize}px` }}
                    >
                        ${isDiscounted ? (price * DISCOUNT_RATE).toFixed(2) : price.toFixed(2)}
                    </Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ListingCard;