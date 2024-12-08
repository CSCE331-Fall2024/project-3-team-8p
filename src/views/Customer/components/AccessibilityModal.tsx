import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { usePreferences } from "../../../contexts/PreferencesContext";

interface AccessibilityModalProps {
    onClose: () => void;
    onIncreaseTextSize: () => void;
    onDecreaseTextSize: () => void;
    onToggleLanguage: () => void;
    onToggleHighContrast: () => void;
}

/**
 * Modal that displays accessibility options (change text size, toggle high contrast, change language)
 * @param onClose - Callback called when the modal closes
 * @param onIncreaseTextSize - Callback called when the user increases text size
 * @param onDecreaseTextSize - Callback called when user decreases text size
 * @param onToggleLanguage - Callback called when user switches language
 * @param onToggleHighContrast - Callback called when user toggles high contrast
 * @constructor
 */
const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
                                                                   onClose,
                                                                   onIncreaseTextSize,
                                                                   onDecreaseTextSize,
                                                                   onToggleLanguage,
                                                                   onToggleHighContrast,
                                                               }) => {
    const { isSpanish, isHighContrast } = usePreferences();

    return (
        <Modal
            show={true}
            onHide={onClose}
            centered
            backdrop={true}
        >
            <Modal.Header className="border-0 justify-content-center">
                <Modal.Title className="h4">
                    {isSpanish ? "Opciones de Accesibilidad" : "Accessibility Options"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container className="d-flex flex-column gap-2">
                    <Button
                        variant="primary"
                        onClick={onIncreaseTextSize}
                        className="w-100 shadow-sm"
                    >
                        {isSpanish ? "Aumentar el Tamaño del Texto" : "Increase Text Size"}
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onDecreaseTextSize}
                        className="w-100 shadow-sm"
                    >
                        {isSpanish ? "Disminuir el Tamaño del Texto" : "Decrease Text Size"}
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onToggleLanguage}
                        className="w-100 shadow-sm"
                    >
                        {isSpanish ? "Cambiar a Inglés" : "Switch to Spanish"}
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onToggleHighContrast}
                        className="w-100 shadow-sm"
                    >
                        {isHighContrast
                            ? (isSpanish ? "Desactivar el Alto Contraste" : "Disable High Contrast")
                            : (isSpanish ? "Habilitar Alto Contraste" : "Enable High Contrast")}
                    </Button>
                </Container>
            </Modal.Body>

            <Modal.Footer className="border-0 justify-content-center">
                <Button
                    variant="danger"
                    onClick={onClose}
                    className="w-100 shadow-sm"
                >
                    {isSpanish ? "Cerca" : "Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AccessibilityModal;