import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import MenuItemApi from "../../../../apis/menu-item-api";
import MenuItem from "../../../../models/MenuItem";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
    currMenuItem: MenuItem | undefined;
    showModal: boolean;
    onClose: (didUpdate: boolean) => void;
    api: MenuItemApi;
}

type FormData = {
    menuItemId: string,
    itemName: string,
    price: number
};

const getInitialFormData = (menuItem?: MenuItem) => ({
    menuItemId: menuItem?.menuItemId ?? uuidv4(),
    itemName: menuItem?.itemName ?? "",
    price: menuItem?.price ?? 0.0,
});

function MenuItemModal({ currMenuItem, showModal, onClose, api }: ModalProps) {
    const [formData, setFormData] = useState<FormData>(getInitialFormData(currMenuItem));

    useEffect(() => {
        // Update the form data whenever we close/reopen the modal
        if (showModal) {
            setFormData(getInitialFormData(currMenuItem));
        }
    }, [currMenuItem, showModal]);

    const handleSaveChanges = async () => {
        try {
            const itemToSave = new MenuItem(
                formData.menuItemId,
                formData.price,
                formData.itemName
            );

            if (currMenuItem) {
                await api.updateMenuItem(itemToSave);
            } else {
                await api.addMenuItem(itemToSave)
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
            [name]: name === "price" ? parseFloat(value) || 0 : value
        }));
    }

    return (
        <Modal show={showModal} onHide={handleCancelChanges}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currMenuItem ? "Edit" : "Add"} Menu Item
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

                    <Form.Group className={"mb-3"} controlId={"formPrice"}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            name={"price"}
                            type={"number"}
                            step={"0.01"}
                            value={formData.price}
                            placeholder={"Enter Price"}
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