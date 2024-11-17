import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
import { Tabs } from "../TabsEnum";

interface ButtonContainerProps {
    onTabChange: (tab: Tabs) => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ onTabChange }) => {
    const [activeButton, setActiveButton] = useState<Tabs>(Tabs.Entrees);

    const buttonLabels: Tabs[] = [Tabs.Entrees, Tabs.Sides, Tabs.Drinks, Tabs.Desserts];

    const handleClick = (label: Tabs) => {
        setActiveButton(label);
        onTabChange(label);
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
