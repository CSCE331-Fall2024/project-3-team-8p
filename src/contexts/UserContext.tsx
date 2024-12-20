import React, { createContext, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
    picture: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactElement;
}

/**
 * Provides context about the current logged-in user. Provides {@linkcode UserContext}
 * @param children - The React components to receive the context
 * @constructor
 */
export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUserState] = useState<User | null>(() => {
        // Get user info cached in localStorage to persist their information
        // between page refreshes
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();

    const setUser = (user: User | null) => {
        setUserState(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
            navigate("/");
        }
    }

    const value: UserContextType = {
        user,
        setUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Custom hook to access the {@linkcode UserContext} in React components
 */
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    return context;
}