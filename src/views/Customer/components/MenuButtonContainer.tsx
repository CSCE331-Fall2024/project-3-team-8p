import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import MenuItemCategory from "../../../models/enums/MenuItemCategory";
import capitalizeString from "../../../utils/capitalizeString";
import { usePreferences } from "../../../contexts/PreferencesContext";
import "../css/ButtonContainer.css";

interface ButtonContainerProps {
    onTabChange: (tab: MenuItemCategory) => void;
    isHighContrast?: boolean;
    activeTab: MenuItemCategory;
}

const getSpanishLabel = (label: MenuItemCategory) => {
    switch (label) {
        case MenuItemCategory.Entree:
            return "Entrada";
        case MenuItemCategory.Side:
            return "Lado";
        case MenuItemCategory.Drink:
            return "Bebida";
        case MenuItemCategory.Appetizer:
            return "Aperitivo";
    }
};

/**
 * Bottom menu bar in kiosk view to switch between item types (entrée, side, drink, appetizer)
 * @param onTabChange - Callback called when tab changes
 * @param isHighContrast - Boolean that is `true` when high contrast is on, otherwise `false`
 * @param activeTab - {@linkcode MenuItemCategory} value indicating the currently selected tab
 * @constructor
 */
const MenuButtonContainer: React.FC<ButtonContainerProps> = ({
                                                             onTabChange,
                                                             isHighContrast = false,
                                                             activeTab,
                                                         }) => {
    const { isSpanish, textSize } = usePreferences();

    return (
        <Container fluid className="fixed-bottom p-0">
            <Nav
                className={`w-100 shadow-lg ${isHighContrast && "border-top border-bottom border-white"}`}
                variant={isHighContrast ? "pills" : "tabs"}
                style={{ backgroundColor: isHighContrast ? "black" : "#212529" }}
            >
                {Object.entries(MenuItemCategory).map(([_, label]) => (
                    <Nav.Item key={label} className="flex-fill position-relative">
                        <Nav.Link
                            onClick={() => onTabChange(label)}
                            active={activeTab === label}
                            className={`text-center py-3 rounded-0 ${
                                activeTab === label
                                    ? 'text-danger fw-bold hover-active'
                                    : 'text-light'
                            }`}
                            style={{
                                fontSize: `${textSize}px`,
                                fontWeight: 500,
                                border: 'none',
                                transition: 'all 0.2s ease-in-out',
                                borderBottom: activeTab === label ? '3px solid #dc3545' : 'none',
                                transform: activeTab === label ? 'scale(1.05)' : 'scale(1)',
                            }}
                        >
                            {isSpanish ? getSpanishLabel(label) : capitalizeString(label)}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </Container>
    );
};

export default MenuButtonContainer;