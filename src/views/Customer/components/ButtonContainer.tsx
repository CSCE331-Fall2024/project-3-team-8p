import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Tabs } from "../TabsEnum";

interface ButtonContainerProps {
    onTabChange: (tab: Tabs) => void;
    isHighContrast?: boolean;
    activeTab: Tabs;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
                                                             onTabChange,
                                                             isHighContrast = false,
                                                             activeTab
                                                         }) => {
    const buttonLabels: Tabs[] = [Tabs.Entrees, Tabs.Sides, Tabs.Drinks, Tabs.Desserts];

    return (
        <Container fluid className="fixed-bottom p-0">
            <Nav
                className="w-100 shadow-lg"
                variant={isHighContrast ? "pills" : "tabs"}
                style={{ backgroundColor: '#212529' }}
            >
                {buttonLabels.map((label) => (
                    <Nav.Item key={label} className="flex-fill position-relative">
                        <Nav.Link
                            onClick={() => onTabChange(label)}
                            active={activeTab === label}
                            className={`text-center py-3 rounded-0 ${
                                activeTab === label
                                    ? 'text-danger fw-bold'
                                    : 'text-light'
                            }`}
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                border: 'none',
                                transition: 'all 0.2s ease-in-out',
                                borderBottom: activeTab === label ? '3px solid #dc3545' : 'none',
                                transform: activeTab === label ? 'scale(1.05)' : 'scale(1)'
                            }}
                        >
                            {label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </Container>
    );
};

export default ButtonContainer;