import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Image } from 'react-bootstrap';
import MenuItemApi from '../../apis/menu-item-api';
import { Tabs } from './TabsEnum';
import MenuItem from '../../models/MenuItem';
import { useCart } from '../../contexts/CartContext';
import ListingCard from './components/ListingCard';
import ButtonContainer from './components/ButtonContainer';
import CartPopup from './components/CartPopup';
import AccessibilityModal from './components/AccessibilityModal';


function CustomerView() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Entrees);
    const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
    const [textSize, setTextSize] = useState<number>(16);
    const [isSpanish, setIsSpanish] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
    const { cartItems, cartTotal, addToCart, clearCart } = useCart();
    const menuItemApi = new MenuItemApi();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await menuItemApi.getMenuItems();
                setMenuItems(items);
            } catch (err) {
                console.log("Error in menu item retrieval");
            }
        };

        fetchMenuItems();
    }, []);

    const handleTabChange = (tab: Tabs) => setActiveTab(tab);
    const toggleAccessibilityModal = () => setShowAccessibilityModal(!showAccessibilityModal);
    const increaseTextSize = () => setTextSize((prev) => Math.min(prev + 2, 20));
    const decreaseTextSize = () => setTextSize((prev) => Math.max(prev - 2, 12));
    const toggleLanguage = () => setIsSpanish((prev) => !prev);
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
                        Accessibility
                    </Button>

                    <Image
                        src="/images/POS.png"
                        alt="Panda Express Logo"
                        className={`mx-auto ${isHighContrast ? 'filter-invert' : ''}`}
                        style={{ maxHeight: '80px' }}
                    />

                    <Link to="/customer/checkout">
                        <Button
                            variant={isHighContrast ? 'light' : 'dark'}
                            size="lg"
                            className="px-4 py-2"
                        >
                            Checkout
                        </Button>
                    </Link>
                </Container>
            </Navbar>

            {/* Menu Items Grid */}
            <Container fluid className="py-4">
                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                    {menuItems.map((listing: MenuItem) => {
                        const cartItem = cartItems.find(
                            (item) => item.menuItemId === listing.menuItemId
                        );
                        const quantityOrdered = cartItem ? cartItem.quantityOrdered : 0;
                        return (
                            <Col key={listing.menuItemId}>
                                <ListingCard
                                    name={isSpanish ? listing.itemName : listing.itemName}
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