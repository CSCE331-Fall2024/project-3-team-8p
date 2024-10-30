// ButtonComponent.tsx
import React from 'react';
import '../../Button.css';

interface ButtonComponentProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ label, isActive, onClick }) => {
    return (
        <button className={`custom-button ${isActive ? 'active' : ''}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default ButtonComponent;
