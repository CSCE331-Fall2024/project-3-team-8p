import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Listing } from '../components/customer/types'; // Make sure to import the Listing type

// Define the shape of the CartContext
interface CartContextType {
    cartItems: Listing[];
    total: number;
    addToCart: (listing: Listing) => void;
    clearCart: () => void;
    setCartItems: React.Dispatch<React.SetStateAction<Listing[]>>; // Optional, if you want to directly set cart items
    setTotal: React.Dispatch<React.SetStateAction<number>>; // Optional, if you want to directly set total
}

// Initialize the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap your application
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Listing[]>([]);
    const [total, setTotal] = useState(0);

    const addToCart = (listing: Listing) => {
        const existingItem = cartItems.find(item => item.name === listing.name);
        if (existingItem) {
            const updatedItems = cartItems.map(item =>
                item.name === listing.name
                    ? { ...item, quantityOrdered: item.quantityOrdered + 1 }
                    : item
            );
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...listing, quantityOrdered: 1 }]);
        }
        setTotal(prevTotal => prevTotal + listing.price);
    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    };

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, clearCart, setCartItems, setTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext in other components
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
