import { createContext, ReactElement, useContext, useState } from "react";

interface PreferencesContextType {
    isSpanish: boolean;
    setIsSpanish: (isSpanish: boolean) => void;
    isHighContrast: boolean;
    setIsHighContrast: (isHighContrast: boolean) => void;
    textSize: number;
    setTextSize: (textSize: number) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

interface PreferencesProviderProps {
    children: ReactElement;
}

/**
 * Provides context for user preference options. Provides {@linkcode PreferencesContext}
 * @param children - The React children to receive the context
 * @constructor
 */
export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const [isSpanish, setIsSpanish] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [textSize, setTextSize] = useState(16);

    return (
        <PreferencesContext.Provider value={{ isSpanish, setIsSpanish, isHighContrast, setIsHighContrast, textSize, setTextSize }}>
            {children}
        </PreferencesContext.Provider>
    )
};

/**
 * Custom hook to access {@linkcode PreferencesContext} in React components
 */
export const usePreferences = (): PreferencesContextType => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error("PreferencesContext must be used within a PreferencesContextProvider");
    }
    return context;
};