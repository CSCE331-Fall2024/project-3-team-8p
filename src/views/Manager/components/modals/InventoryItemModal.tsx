import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import InventoryItemApi from "../../../../apis/inventory-item-api";
import InventoryItem from "../../../../models/InventoryItem";

interface ModalProps {
    currItem: InventoryItem | undefined;
    showModal: boolean;
    onClose: (didUpdate: boolean) => void;
    api: InventoryItemApi;
}

type FormData = {
    inventoryItemId: string,
    availableStock: number,
    cost: number
    itemName: string,
};

const getInitialFormData = (currItem?: InventoryItem) => ({
    inventoryItemId: currItem?.inventoryItemId ?? uuidv4(),
    availableStock: currItem?.availableStock ?? 0,
    cost: currItem?.cost ?? 0.0,
    itemName: currItem?.itemName ?? ""
});

/**
 * The MenuItemModal component allows for adding or editing an inventory item.
 * It displays a form where the user can input item details such as name, available stock, and cost.
 *
 * @param currItem - The current inventory item being edited, or undefined if adding a new item.
 * @param showModal - A flag indicating whether the modal should be visible.
 * @param onClose - Callback function to handle closing the modal, passing a flag indicating whether the data was updated.
 * @param api - The API instance used for interacting with inventory item data (e.g., adding or updating inventory items).
 * @constructor
 */
function MenuItemModal({ currItem, showModal, onClose, api }: ModalProps) {
    const [formData, setFormData] = useState<FormData>(getInitialFormData(currItem));

    useEffect(() => {
        // Update the form data whenever we close/reopen the modal
        if (showModal) {
            setFormData(getInitialFormData(currItem));
        }
    }, [currItem, showModal]);

    const handleSaveChanges = async () => {
        try {
            const itemToSave = new InventoryItem(
                formData.inventoryItemId,
                formData.cost,
                formData.availableStock,
                formData.itemName
            );

            if (currItem) {
                await api.updateInventoryItem(itemToSave);
            } else {
                await api.addInventoryItem(itemToSave)
            }

            onClose(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancelChanges = () => onClose(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    return (
        <Modal show={showModal} onHide={handleCancelChanges}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currItem ? "Edit" : "Add"} Inventory Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className={"mb-3"} controlId={"formName"}>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            name={"itemName"}
                            type={"text"}
                            value={formData.itemName}
                            placeholder={"Enter item name"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className={"mb-3"} controlId={"formAvailableStock"}>
                        <Form.Label>Available Stock</Form.Label>
                        <Form.Control
                            name={"availableStock"}
                            type={"number"}
                            value={formData.availableStock}
                            placeholder={"Enter Available Stock"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className={"mb-3"} controlId={"formCost"}>
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            name={"cost"}
                            type={"number"}
                            value={formData.cost}
                            placeholder={"Enter Cost"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"secondary"} onClick={handleCancelChanges}>
                    Close
                </Button>
                <Button variant={"primary"} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MenuItemModal;