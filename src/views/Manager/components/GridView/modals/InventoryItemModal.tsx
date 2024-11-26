import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import InventoryItemApi from "../../../../../apis/inventory-item-api";
import InventoryItem from "../../../../../models/InventoryItem";
import { v4 as uuidv4 } from "uuid";

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
    itemName: currItem?.itemName ?? "",
});

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
            [name]: name === "cost" ? parseFloat(value) || 0 : value
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
                            step={"0.01"}
                            value={formData.availableStock}
                            placeholder={"Enter Available Stock"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className={"mb-3"} controlId={"formCost"}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            name={"cost"}
                            type={"number"}
                            step={"0.01"}
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