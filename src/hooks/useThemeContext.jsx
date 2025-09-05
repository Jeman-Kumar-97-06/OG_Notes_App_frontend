import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw Error("useThemeContext must be used inside components that have access to ThemeContext");
    }
    return context;
}