// ButtonContainer.tsx
import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import './Button.css';

const ButtonContainer: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string>('Entrees');

    const buttonLabels = ['Entrees', 'Sides', 'Drinks', 'Desserts', 'Leave a Review'];

    const handleClick = (label: string) => {
        setActiveButton(label);
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
