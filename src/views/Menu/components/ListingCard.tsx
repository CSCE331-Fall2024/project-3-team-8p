import React, { useState } from 'react';
import { Card, Image, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NutritionInfoDict from "../../../models/dict-types/NutritionInfoDict";

interface ListingCardProps {
    menuItemId: string;
    price: number;
    itemName: string;
    imageUrl: string;
    nutritionInfo: NutritionInfoDict;
}

/**
 * The `ListingCard` component displays a card representing a menu item. It includes information about the item such as its name, price, calories, and badges for whether it is "premium" or "spicy".
 * Additionally, it features a clickable icon to show a popup with more detailed nutrition information, including fat, protein, sugar, carbohydrates, and allergens.
 *
 * @param menuItemId - The unique identifier for the menu item.
 * @param price - The price of the menu item.
 * @param itemName - The name of the menu item.
 * @param imageUrl - The URL of the image to display for the menu item.
 * @param nutritionInfo - An object containing nutritional details for the menu item (e.g., calories, fat, protein, etc.).
 *
 * @returns A `Card` component displaying the menu item with an image, name, price, and nutritional information. Clicking the nutrition icon opens a modal displaying more details.
 * @constructor
 */

const ListingCard: React.FC<ListingCardProps> = ({ itemName, price, imageUrl, nutritionInfo }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleNutritionClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <Card className="mb-4" style={{ width: '18rem' }}>
            {/* Tooltip for Nutrition Info */}
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="nutrition-tooltip">Click for Nutrition Info</Tooltip>}
            >
                <Button variant="link" onClick={handleNutritionClick}
                        style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Image src={'images/information.png'} alt="Nutrition Info" width={25} height={25} />
                </Button>
            </OverlayTrigger>

            {/* Item Image */}
            <Card.Img
                variant="top"
                src={imageUrl}
                alt={itemName}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/sample_image.png";
                }}
                style={{ height: '200px', objectFit: 'contain' }}
            />

            <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>{itemName}</Card.Title>
                <p>${price.toFixed(2)}</p>
                <div>Calories: {nutritionInfo.calories} cal</div>

                {/* Premium Badge */}
                {nutritionInfo.isPremium && (
                    <Image src={'images/premium.png'} alt="Premium" width={100} height="auto" className="mt-2" />
                )}

                {/* Spicy Badge */}
                {nutritionInfo.isSpicy && (
                    <Image src={'images/spicy.png'} alt="Spicy" width={75} height="auto" className="mt-2" />
                )}
            </Card.Body>

            {/* Nutrition Information Popup */}
            <Modal show={showPopup} onHide={handleClosePopup} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{itemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default ListingCard;
