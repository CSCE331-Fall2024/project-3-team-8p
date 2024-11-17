import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import MenuItemApi from "../../../apis/menu-item-api";
import MenuItem from "../../../models/MenuItem";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
    currMenuItem: MenuItem | undefined;
    showModal: boolean;
    onClose: (didAddOrUpdate: boolean) => void;
    menuItemApi: MenuItemApi;
}

function MenuItemModal({ currMenuItem, showModal, onClose, menuItemApi }: ModalProps) {
    const [formData, setFormData] = useState({
        menuItemId: currMenuItem?.menuItemId ?? uuidv4(),
        itemName: currMenuItem?.itemName ?? "",
        price: currMenuItem?.price ?? 0.0,
    });

    useEffect(() => {
        if (showModal) {  // Only update when modal is shown
            setFormData({
                menuItemId: currMenuItem?.menuItemId ?? uuidv4(),
                itemName: currMenuItem?.itemName ?? "",
                price: currMenuItem?.price ?? 0.0,
            });
        }
    }, [currMenuItem, showModal]);

    const handleCancelChanges = () => onClose(false);

    const handleSaveChanges = async () => {
        try {
            if (currMenuItem) {
                await menuItemApi.updateMenuItem(new MenuItem(
                    formData.menuItemId,
                    formData.price,
                    formData.itemName,
                    `images/${formData.itemName}.png`
                ));
            } else {
                await menuItemApi.addMenuItem(new MenuItem(
                    formData.menuItemId,
                    formData.price,
                    formData.itemName,
                    `images/${formData.itemName}.png`
                ));
            }
            onClose(true);
        } catch (e) {
            console.log(e);
        }
    };

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
                    {currMenuItem ? "Add" : "Edit"} Menu Item
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