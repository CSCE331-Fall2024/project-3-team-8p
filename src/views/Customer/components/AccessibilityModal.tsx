import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

interface AccessibilityModalProps {
    onClose: () => void;
    onIncreaseTextSize: () => void;
    onDecreaseTextSize: () => void;
    onToggleLanguage: () => void;
    onToggleHighContrast: () => void;
    isSpanish: boolean;
    isHighContrast: boolean;
}

const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
                                                                   onClose,
                                                                   onIncreaseTextSize,
                                                                   onDecreaseTextSize,
                                                                   onToggleLanguage,
                                                                   onToggleHighContrast,
                                                                   isSpanish,
                                                                   isHighContrast
                                                               }) => {
    return (
        <Modal
            show={true}
            onHide={onClose}
            centered
            backdrop={true}
        >
            <Modal.Header className="border-0 justify-content-center">
                <Modal.Title className="h4">Accessibility Options</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container className="d-flex flex-column gap-2">
                    <Button
                        variant="primary"
                        onClick={onIncreaseTextSize}
                        className="w-100 shadow-sm"
                    >
                        Increase Text Size
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onDecreaseTextSize}
                        className="w-100 shadow-sm"
                    >
                        Decrease Text Size
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onToggleLanguage}
                        className="w-100 shadow-sm"
                    >
                        {isSpanish ? 'Switch to English' : 'Switch to Spanish'}
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onToggleHighContrast}
                        className="w-100 shadow-sm"
                    >
                        {isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
                    </Button>
                </Container>
            </Modal.Body>

            <Modal.Footer className="border-0 justify-content-center">
                <Button
                    variant="danger"
                    onClick={onClose}
                    className="w-100 shadow-sm"
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AccessibilityModal;