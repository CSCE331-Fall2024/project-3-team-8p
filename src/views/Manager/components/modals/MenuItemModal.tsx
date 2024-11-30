import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import MenuItemApi from "../../../../apis/menu-item-api";
import MenuItem from "../../../../models/MenuItem";
import { v4 as uuidv4 } from "uuid";
import InventoryItem from "../../../../models/InventoryItem";
import "../../css/MenuItemModal.css";
import { SearchableMultiSelect } from "./SearchableMultiSelect";

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
    price: number
};

const getInitialFormData = (menuItem?: MenuItem): FormData => ({
    menuItemId: menuItem?.menuItemId ?? uuidv4(),
    itemName: menuItem?.itemName ?? "",
    price: menuItem?.price ?? 0.0,
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
                formData.itemName
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

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            name="price"
                            type="number"
                            value={formData.price}
                            placeholder="Enter Price"
                            onChange={handleInputChange}
                        />
                    </Form.Group>

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