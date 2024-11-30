import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface ListingCardProps {
    name: string;
    price: number;
    imageUrl: string;
    quantityOrdered: number;
    onAddToCart: () => void;
    isHighContrast?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
                                                     name,
                                                     price,
                                                     imageUrl,
                                                     quantityOrdered,
                                                     onAddToCart,
                                                     isHighContrast = false
                                                 }) => {
    return (
        <Card
            onClick={onAddToCart}
            className={`h-100 border-0 shadow-sm ${
                isHighContrast ? 'bg-dark' : 'bg-white'
            }`}
            role="button"
            aria-label={`Add ${name} to cart`}
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
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
                {quantityOrdered > 0 && (
                    <Badge
                        bg={isHighContrast ? "light" : "danger"}
                        text={isHighContrast ? "dark" : "white"}
                        className="position-absolute top-0 end-0 m-2"
                    >
                        {quantityOrdered}
                    </Badge>
                )}
            </div>
            <Card.Body className={`d-flex flex-column align-items-center text-center ${
                isHighContrast ? 'text-white' : ''
            }`}>
                <Card.Title className="fs-5 mb-2">
                    {name}
                </Card.Title>
                <Card.Text className={`fw-bold fs-5 mb-0 ${
                    isHighContrast ? 'text-white' : 'text-danger'
                }`}>
                    ${price.toFixed(2)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ListingCard;