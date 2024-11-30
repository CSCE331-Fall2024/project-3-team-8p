import React from 'react';
import Button from 'react-bootstrap/Button';

interface ButtonComponentProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ label, isActive, onClick }) => {
    return (
        <Button
            variant="dark"
            onClick={onClick}
            className="m-1 flex-grow-1 py-2"
            style={{
                transition: 'background-color 0.3s',
                backgroundColor: isActive ? '#000000' : '#333333',
            }}
            active={isActive}
        >
            <span className={"fs-5"}>{label}</span>
        </Button>
    );
};

export default ButtonComponent;