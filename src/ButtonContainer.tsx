// ButtonContainer.tsx
import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import './Button.css';

interface ButtonContainerProps {
    onTabChange: (tab: 'Entrees' | 'Sides' | 'Drinks' | 'Desserts') => void; // Use specific tab keys
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ onTabChange }) => {
    const [activeButton, setActiveButton] = useState<'Entrees' | 'Sides' | 'Drinks' | 'Desserts'>('Entrees');

    const buttonLabels: ('Entrees' | 'Sides' | 'Drinks' | 'Desserts')[] = ['Entrees', 'Sides', 'Drinks', 'Desserts'];

    const handleClick = (label: 'Entrees' | 'Sides' | 'Drinks' | 'Desserts') => {
        setActiveButton(label);
        onTabChange(label); // Call onTabChange with the label
    };

    return (
        <div className="button-container-bottom">
            {buttonLabels.map((label) => (
                <ButtonComponent
                    key={label}
                    label={label}
                    isActive={activeButton === label}
                    onClick={() => handleClick(label)}
                />
            ))}
        </div>
    );
};

export default ButtonContainer;
