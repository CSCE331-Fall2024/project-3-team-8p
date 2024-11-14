import React, { createContext, useContext, useState, ReactNode } from 'react';
import MenuItem from "../../../models/MenuItem";

// Define the shape of the CartItem, which will have the MenuItem and a quantityOrdered
interface CartItem {
    menuItemId: string;
    price: number;
    itemName: string;
    imageUrl: string;
    quantityOrdered: number;
}

// Define the shape of the CartContext
interface CartContextType {
    cartItems: CartItem[];
    total: number;
    addToCart: (item: MenuItem) => void;
    clearCart: () => void;
}

// Initialize the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap your application
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    const addToCart = (item: MenuItem) => {
        const existingItem = cartItems.find(cartItem => cartItem.menuItemId === item.menuItemId);

        // Update quantity if the item already exists in the cart
        if (existingItem) {
            const updatedItems = cartItems.map(cartItem =>
                cartItem.menuItemId === item.menuItemId
                    ? { ...cartItem, quantityOrdered: cartItem.quantityOrdered + 1 } // Add to quantityOrdered
                    : cartItem
            );
            setCartItems(updatedItems);
        } else {
            // Add new item to the cart with initial quantity 1
            const cartItem: CartItem = {
                menuItemId: item.menuItemId,
                price: item.price,
                itemName: item.itemName,
                imageUrl: item.imageUrl,
                quantityOrdered: 1,  // Initial quantity
            };
            setCartItems([...cartItems, cartItem]);  // Add the new CartItem
        }

        // Update total price
        setTotal(prevTotal => prevTotal + item.price);
    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    };

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, clearCart }}>
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

