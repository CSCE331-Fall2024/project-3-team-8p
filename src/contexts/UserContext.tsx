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

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    return context;
}