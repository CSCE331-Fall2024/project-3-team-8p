import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Image, Navbar, Row } from 'react-bootstrap';
import MenuItemApi from '../../apis/menu-item-api';
import MenuItem from '../../models/MenuItem';
import { useCart } from '../../contexts/CartContext';
import ListingCard from './components/ListingCard';
import ButtonContainer from './components/ButtonContainer';
import CartPopup from './components/CartPopup';
import AccessibilityModal from './components/AccessibilityModal';
import LoadingView from "../shared/LoadingView";
import { usePreferences } from "../../contexts/PreferencesContext";
import MenuItemCategory from "../../models/enums/MenuItemCategory";

const menuItemApi = new MenuItemApi();

function CustomerView() {
    const [activeTab, setActiveTab] = useState<MenuItemCategory>(MenuItemCategory.Entree);
    const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { isSpanish, setIsSpanish, isHighContrast, setIsHighContrast, textSize, setTextSize } = usePreferences();
    const { cartItems, cartTotal, addToCart, clearCart } = useCart();

    const fetchMenuItems = useCallback(async () => {
        try {
            setLoading(true);
            const items = await menuItemApi.getMenuItems();
            setMenuItems(items);
        } catch (err) {
            console.log("Error in menu item retrieval");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMenuItems();
    }, [fetchMenuItems]);

    const handleTabChange = (tab: MenuItemCategory) => setActiveTab(tab);
    const toggleAccessibilityModal = () => setShowAccessibilityModal(!showAccessibilityModal);
    const increaseTextSize = () => setTextSize(Math.min(textSize + 2, 28));
    const decreaseTextSize = () => setTextSize(Math.max(textSize - 2, 12));
    const toggleLanguage = () => setIsSpanish(!isSpanish);
    const toggleHighContrast = () => setIsHighContrast(!isHighContrast);

    const bgClass = isHighContrast ? 'bg-black' : 'bg-danger';
    const textClass = isHighContrast ? 'text-white' : 'text-white';

    return (
        <div className={`min-vh-100 ${bgClass} ${textClass}`} style={{ fontSize: `${textSize}px` }}>
            {/* Header */}
            <Navbar className="py-3 px-4 shadow-sm">
                <Container fluid className="d-flex justify-content-between align-items-center">
                    <Button
                        variant={isHighContrast ? 'light' : 'dark'}
                        size="lg"
                        className="px-4 py-2"
                        onClick={toggleAccessibilityModal}
                        style={{ fontSize: `${textSize}px` }}
                    >
                        {isSpanish ? "Accesibilidad" : "Accessibility"}
                    </Button>

                    <Image
                        src="/images/POS.png"
                        alt="Panda Express Logo"
                        className={`mx-auto ${isHighContrast ? 'filter-invert' : ''}`}
                        style={{ maxHeight: '80px' }}
                    />

                    <Link to="checkout" state={{ isSpanish: isSpanish }}>
                        <Button
                            variant={isHighContrast ? 'light' : 'dark'}
                            size="lg"
                            className="px-4 py-2"
                            style={{ fontSize: `${textSize}px` }}
                        >
                            {isSpanish ? "Verificar" : "Checkout"}
                        </Button>
                    </Link>
                </Container>
            </Navbar>

            {/* Menu Items Grid */}
            <Container fluid className="p-4">
                {loading && (
                    <div className="h-60-vh">
                        <LoadingView color="white" />
                    </div>
                )}

                {!loading && (
                    <Row xs={2} sm={3} md={4} lg={5} className="g-4 mb-5">
                        {menuItems
                            .filter((menuItem: MenuItem) => menuItem.category === activeTab)
                            .map((menuItem: MenuItem) => {
                                    const cartItem = cartItems.find(
                                        (item) => item.menuItemId === menuItem.menuItemId
                                    );
                                    const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;
                                    return (
                                        <Col key={menuItem.menuItemId}>
                                            <ListingCard
                                                name={isSpanish ? menuItem.translatedItemName : menuItem.itemName}
                                                price={menuItem.price}
                                                imageUrl={`/images/${menuItem.itemName}.png`}
                                                quantityOrdered={quantityOrdered}
                                                onAddToCart={() => addToCart(menuItem)}
                                            />
                                        </Col>
                                    );
                            })
                        }
                    </Row>
                )}
            </Container>

            {/* Navigation Tabs */}
            <Container fluid className="mt-3">
                <ButtonContainer
                    onTabChange={handleTabChange}
                    isHighContrast={isHighContrast}
                    activeTab={activeTab}
                />
            </Container>

            {/* Cart Popup */}
            <CartPopup
                cartItems={cartItems}
                total={cartTotal}
                onClearCart={clearCart}
            />

            {/* Accessibility Modal */}
            {showAccessibilityModal && (
                <AccessibilityModal
                    onClose={toggleAccessibilityModal}
                    onIncreaseTextSize={increaseTextSize}
                    onDecreaseTextSize={decreaseTextSize}
                    onToggleLanguage={toggleLanguage}
                    onToggleHighContrast={toggleHighContrast}
                />
            )}
        </div>
    );
}

export default CustomerView;