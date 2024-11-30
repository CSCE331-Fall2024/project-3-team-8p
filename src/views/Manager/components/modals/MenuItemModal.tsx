import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Row } from "react-bootstrap";
import MenuItemApi from "../../../../apis/menu-item-api";
import MenuItem from "../../../../models/MenuItem";
import { v4 as uuidv4 } from "uuid";
import InventoryItem from "../../../../models/InventoryItem";
import "../../css/MenuItemModal.css";
import { SearchableMultiSelect } from "./SearchableMultiSelect";
import NutritionInfoDict from "../../../../models/dict-types/NutritionInfoDict";

interface ModalProps {
    currMenuItem: MenuItem | undefined;
    allInventoryItems: InventoryItem[];
    showModal: boolean;
    onClose: (didUpdate: boolean) => void;
    api: MenuItemApi;
}

type FormData = {
    menuItemId: string,
    itemName: string,
    price: number,
    nutritionInfo: NutritionInfoDict
};

const getInitialFormData = (menuItem?: MenuItem): FormData => ({
    menuItemId: menuItem?.menuItemId ?? uuidv4(),
    itemName: menuItem?.itemName ?? "",
    price: menuItem?.price ?? 0.0,
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
                formData.nutritionInfo
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
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
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

                    <Form.Group className="mb-3" controlId="inventoryItems">
                        <Form.Label>Associated Inventory Items</Form.Label>
                        <SearchableMultiSelect
                            items={allInventoryItems}
                            selectedValues={selectedInventoryItems}
                            getItemValue={(item: InventoryItem): string => item.itemName}
                            onChange={setSelectedInventoryItems}
                            placeholder="Select inventory items..."
                        />
                    </Form.Group>

                    <h5>Nutrition Info</h5>
                    <Form.Group className="mb-3" controlId="formAllergens">
                        <Form.Label>Allergens</Form.Label>
                        <Form.Control
                            name="allergens"
                            type="text"
                            value={formData.nutritionInfo.allergens?.join(", ") || ''}
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

                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formIsPremium">
                                <Form.Check
                                    name="isPremium"
                                    type="checkbox"
                                    label="Is Premium"
                                    checked={formData.nutritionInfo.isPremium}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formIsSpicy">
                                <Form.Check
                                    name="isSpicy"
                                    type="checkbox"
                                    label="Is Spicy"
                                    checked={formData.nutritionInfo.isSpicy}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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