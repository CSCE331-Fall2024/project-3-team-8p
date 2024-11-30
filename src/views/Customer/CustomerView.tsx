import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Image } from 'react-bootstrap';
import MenuItemApi from '../../apis/menu-item-api';
import { Tabs } from './TabsEnum';
import MenuItem from '../../models/MenuItem';
import { useCart } from '../../contexts/CartContext';
import ListingCard from './components/ListingCard';
import ButtonContainer from './components/ButtonContainer';
import CartPopup from './components/CartPopup';
import AccessibilityModal from './components/AccessibilityModal';
import LoadingView from "../shared/LoadingView";
import TranslateApi from "../../apis/translate-api";

const menuItemApi = new MenuItemApi();
const translateApi = new TranslateApi();

function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
    const [textSize, setTextSize] = useState<number>(16);
    const [isSpanish, setIsSpanish] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { cartItems, cartTotal, addToCart, clearCart } = useCart();

    const fetchMenuItems = useCallback(async (includeTranslation: boolean) => {
        try {
            setLoading(true);
            const items = await menuItemApi.getMenuItems(includeTranslation);
            setMenuItems(items);
        } catch (err) {
            console.log("Error in menu item retrieval");
        } finally {
            setLoading(false);
        }
    }, []);

    const location = useLocation();
    useEffect(() => {
        // If we're navigating back from the checkout page, we want to save the language preference
        if (location.state?.isSpanish) {
            setIsSpanish(location.state.isSpanish);
            fetchMenuItems(true);
        } else {
            fetchMenuItems(false);
        }
    }, [location.state, fetchMenuItems])

    const handleTabChange = (tab: Tabs) => setActiveTab(tab);
    const toggleAccessibilityModal = () => setShowAccessibilityModal(!showAccessibilityModal);
    const increaseTextSize = () => setTextSize((prev) => Math.min(prev + 2, 20));
    const decreaseTextSize = () => setTextSize((prev) => Math.max(prev - 2, 12));
    const toggleLanguage = () => {
        setIsSpanish((prev) => !prev);
        fetchMenuItems(true);
    }
    const toggleHighContrast = () => setIsHighContrast((prev) => !prev);

    const bgClass = isHighContrast ? 'bg-dark' : 'bg-danger';
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
                    <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                        {menuItems.map((listing: MenuItem) => {
                            const cartItem = cartItems.find(
                                (item) => item.menuItemId === listing.menuItemId
                            );
                            const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;
                            return (
                                <Col key={listing.menuItemId}>
                                    <ListingCard
                                        name={isSpanish ? listing.translatedItemName : listing.itemName}
                                        price={listing.price}
                                        imageUrl={`/images/${listing.itemName}.png`}
                                        quantityOrdered={quantityOrdered}
                                        onAddToCart={() => addToCart(listing)}
                                        isHighContrast={isHighContrast}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>

            {/* Navigation Tabs */}
            <Container fluid className="mt-3">
                <ButtonContainer
                    onTabChange={handleTabChange}
                    isHighContrast={isHighContrast}
                    activeTab={activeTab}
                    isSpanish={isSpanish}
                />
            </Container>

            {/* Cart Popup */}
            <CartPopup
                cartItems={cartItems}
                total={cartTotal}
                onClearCart={clearCart}
                isSpanish={isSpanish}
                isHighContrast={isHighContrast}
            />

            {/* Accessibility Modal */}
            {showAccessibilityModal && (
                <AccessibilityModal
                    onClose={toggleAccessibilityModal}
                    onIncreaseTextSize={increaseTextSize}
                    onDecreaseTextSize={decreaseTextSize}
                    onToggleLanguage={toggleLanguage}
                    onToggleHighContrast={toggleHighContrast}
                    isSpanish={isSpanish}
                    isHighContrast={isHighContrast}
                />
            )}
        </div>
    );
}

export default CustomerView;