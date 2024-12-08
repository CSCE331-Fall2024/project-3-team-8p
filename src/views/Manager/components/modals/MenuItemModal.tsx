import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import MenuItemApi from "../../../../apis/menu-item-api";
import MenuItem from "../../../../models/MenuItem";
import InventoryItem from "../../../../models/InventoryItem";
import { SearchableMultiSelect } from "./SearchableMultiSelect";
import NutritionInfoDict from "../../../../models/dict-types/NutritionInfoDict";
import MenuItemCategory from "../../../../models/enums/MenuItemCategory";
import "../../css/MenuItemModal.css";

interface ModalProps {
    currMenuItem: MenuItem | undefined;
    allInventoryItems: InventoryItem[];
    showModal: boolean;
    onClose: (didUpdate: boolean) => void;
    api: MenuItemApi;
}

type FormData = {
    menuItemId: string,
    price: number,
    itemName: string,
    category: MenuItemCategory,
    isDiscounted: boolean,
    nutritionInfo: NutritionInfoDict
};

const getInitialFormData = (menuItem?: MenuItem): FormData => ({
    menuItemId: menuItem?.menuItemId ?? uuidv4(),
    price: menuItem?.price ?? 0.0,
    itemName: menuItem?.itemName ?? "",
    category: menuItem?.category ?? MenuItemCategory.Entree,
    isDiscounted: menuItem?.isDiscounted ?? false,
    nutritionInfo:
        menuItem?.nutritionInfo ??
        {
            allergens: [],
            calories: 0,
            fat: 0,
            protein: 0,
            sugar: 0,
            carbohydrates: 0,
            isPremium: false,
            isSpicy: false
        }
});

const getInitialInventoryItems = (menuItem?: MenuItem): string[] => (
    menuItem?.inventoryItems?.map((item: InventoryItem): string => item.itemName) ?? []
);

/**
 * The MenuItemModal component allows for adding or editing a menu item.
 * It displays a form where the user can input item details such as name, price, category, associated inventory items, and nutrition information.
 *
 * @param currMenuItem - The current menu item being edited, or undefined if adding a new menu item.
 * @param allInventoryItems - A list of all inventory items to be selected from.
 * @param showModal - A flag indicating whether the modal should be visible.
 * @param onClose - Callback function to handle closing the modal, passing a flag indicating whether the data was updated.
 * @param api - The API instance used for interacting with menu item data (e.g., adding or updating menu items).
 * @constructor
 */
function MenuItemModal({ currMenuItem, allInventoryItems, showModal, onClose, api }: ModalProps) {
    const [formData, setFormData] = useState<FormData>(getInitialFormData(currMenuItem));
    const [selectedInventoryItems, setSelectedInventoryItems] = useState<string[]>(
        getInitialInventoryItems(currMenuItem)
    );

    useEffect(() => {
        if (showModal) {
            setFormData(getInitialFormData(currMenuItem));
            setSelectedInventoryItems(getInitialInventoryItems(currMenuItem));
        }
    }, [currMenuItem, showModal]);

    const handleSaveChanges = async () => {
        try {
            const itemToSave = new MenuItem(
                formData.menuItemId,
                formData.price,
                formData.itemName,
                formData.category,
                formData.isDiscounted,
                formData.nutritionInfo,
            );
            selectedInventoryItems.forEach((itemName: string) => {
                const inventoryItem = allInventoryItems.find(
                    (item) => item.itemName === itemName
                )!;
                itemToSave.addInventoryItem(inventoryItem);
            });

            if (currMenuItem) {
                await api.updateMenuItem(itemToSave);
            } else {
                await api.addMenuItem(itemToSave);
            }
            onClose(true);
        } catch (e) {
            console.error(e);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const newValue: string | boolean = type === 'checkbox' ? checked : value;

        if (name === "allergens") {
            setFormData(prevFormData => ({
                ...prevFormData,
                nutritionInfo: {
                    ...prevFormData.nutritionInfo,
                    allergens: value.trim() === ""
                        ? []
                        : value.split(",").map(allergen => allergen.trim())
                }
            }));
        } else if (name in formData.nutritionInfo) {
            setFormData(prevFormData => ({
                ...prevFormData,
                nutritionInfo: {
                    ...prevFormData.nutritionInfo,
                    [name]: newValue
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: newValue
            }));
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            category: value as MenuItemCategory,
        }));
    };

    return (
        <Modal show={showModal} onHide={() => onClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currMenuItem ? "Edit" : "Add"} Menu Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    name="itemName"
                                    type="text"
                                    value={formData.itemName}
                                    placeholder="Enter item name"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    placeholder="Enter Price"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formInventoryItems">
                        <Form.Label>Associated Inventory Items</Form.Label>
                        <SearchableMultiSelect
                            items={allInventoryItems}
                            selectedValues={selectedInventoryItems}
                            onChange={setSelectedInventoryItems}
                            placeholder="Select inventory items..."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleSelectChange}
                        >
                            {Object.entries(MenuItemCategory).map(([key, value]) => (
                                <option key={value} value={value}>{key}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsDiscounted">
                        <Form.Check
                            name="isDiscounted"
                            type="checkbox"
                            label="Is Discounted"
                            checked={formData.isDiscounted}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <h5>Nutrition Info</h5>
                    <Form.Group className="mb-3" controlId="formAllergens">
                        <Form.Label>Allergens</Form.Label>
                        <Form.Control
                            name="allergens"
                            type="text"
                            value={formData.nutritionInfo.allergens}
                            placeholder="Enter allergens, separated by commas"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formCalories">
                                <Form.Label>Calories</Form.Label>
                                <Form.Control
                                    name="calories"
                                    type="number"
                                    value={formData.nutritionInfo.calories}
                                    placeholder="Enter calories"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formFat">
                                <Form.Label>Fat</Form.Label>
                                <Form.Control
                                    name="fat"
                                    type="number"
                                    value={formData.nutritionInfo.fat}
                                    placeholder="Enter fat"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formProtein">
                                <Form.Label>Protein</Form.Label>
                                <Form.Control
                                    name="protein"
                                    type="number"
                                    value={formData.nutritionInfo.protein}
                                    placeholder="Enter protein"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formSugar">
                                <Form.Label>Sugar</Form.Label>
                                <Form.Control
                                    name="sugar"
                                    type="number"
                                    value={formData.nutritionInfo.sugar}
                                    placeholder="Enter sugar"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formCarbohydrates">
                        <Form.Label>Carbohydrates</Form.Label>
                        <Form.Control
                            name="carbohydrates"
                            type="number"
                            value={formData.nutritionInfo.carbohydrates}
                            placeholder="Enter carbohydrates"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsPremium">
                        <Form.Check
                            name="isPremium"
                            type="checkbox"
                            label="Is Premium"
                            checked={formData.nutritionInfo.isPremium}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsSpicy">
                        <Form.Check
                            name="isSpicy"
                            type="checkbox"
                            label="Is Spicy"
                            checked={formData.nutritionInfo.isSpicy}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MenuItemModal;