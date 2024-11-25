import React, { createContext, useContext, useState, ReactElement } from 'react';
import MenuItem from "../models/MenuItem";
import CartItem from "../models/interfaces/CartItem";


interface CartContextType {
    cartItems: CartItem[];
    cartTotal: number;
    addToCart: (item: MenuItem) => void;
    clearCart: () => void;
}

interface CartProviderProps {
    children: ReactElement;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    const addToCart = (item: MenuItem) => {
        const existingItem: CartItem | undefined = cartItems.find(cartItem => cartItem.menuItemId === item.menuItemId);

        // Increment quantity by 1 if the item already exists in the cart
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
                imageUrl: "images/"+item.itemName+".png",
                quantityOrdered: 1,  // Initial quantity
            };
            setCartItems([...cartItems, cartItem]);  // Add the new CartItem
        }

        setCartTotal(prevTotal => prevTotal + item.price);
    };

    const clearCart = () => {
        setCartItems([]);
        setCartTotal(0);
    };

    const value: CartContextType = {
        cartItems,
        cartTotal,
        addToCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext in other components
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};