import React from 'react';
import '../css/AccessibilityModal.css';

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
                                                                   isHighContrast,
                                                               }) => {
    return (
        <div className="accessibility-modal">
            <div className="modal-content">
                <h3>Accessibility Options</h3>
                <button className="modal-button" onClick={onIncreaseTextSize}>
                    Increase Text Size
                </button>
                <button className="modal-button" onClick={onDecreaseTextSize}>
                    Decrease Text Size
                </button>
                <button className="modal-button" onClick={onToggleLanguage}>
                    {isSpanish ? 'Switch to English' : 'Switch to Spanish'}
                </button>
                <button className="modal-button" onClick={onToggleHighContrast}>
                    {isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
                </button>
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AccessibilityModal;
