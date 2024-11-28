import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import EmployeeApi from "../../../../apis/employee-api";
import Employee from "../../../../models/Employee";
import { v4 as uuidv4 } from "uuid";


interface ModalProps {
    currEmployee: Employee | undefined;
    showModal: boolean;
    onClose: (didUpdate: boolean) => void;
    api: EmployeeApi;
}

type FormData = {
    employeeId: string,
    name: string,
    isManager: boolean,
};

const getInitialFormData = (currEmployee?: Employee) => ({
    employeeId: currEmployee?.employeeId ?? uuidv4(),
    name: currEmployee?.name ?? "",
    isManager: currEmployee?.isManager ?? false,
});

function MenuItemModal({ currEmployee, showModal, onClose, api }: ModalProps) {
    const [formData, setFormData] = useState<FormData>(getInitialFormData(currEmployee));

    useEffect(() => {
        // Update the form data whenever we close/reopen the modal
        if (showModal) {
            setFormData(getInitialFormData(currEmployee));
        }
    }, [currEmployee, showModal]);

    const handleSaveChanges = async () => {
        try {
            const employeeToSave = new Employee(
                formData.employeeId,
                formData.name,
                formData.isManager
            );

            if (currEmployee) {
                await api.updateEmployee(employeeToSave);
            } else {
                await api.addEmployee(employeeToSave)
            }

            onClose(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancelChanges = () => onClose(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Modal show={showModal} onHide={handleCancelChanges}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currEmployee ? "Edit" : "Add"} Inventory Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className={"mb-3"} controlId={"formName"}>
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control
                            name={"name"}
                            type={"text"}
                            value={formData.name}
                            placeholder={"Enter employee name"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsManager">
                        <Form.Check
                            name={"isManager"}
                            type="checkbox"
                            checked={formData.isManager}
                            label="Is Manager"
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