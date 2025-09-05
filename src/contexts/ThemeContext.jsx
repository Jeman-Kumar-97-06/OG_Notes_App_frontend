import { useEffect } from "react";
import { createContext,useReducer } from "react";

export const ThemeContext = createContext();

export const themeReducer = (state,action) => {
    switch(action.type){
        case 'DO_DARK':
            localStorage.setItem('theme','dark')
            return {
                theme : "dark"
            }
        case "DO_LIGHT":
            localStorage.setItem('theme','light')
            return {
                theme : "light"
            }
        default:
            return state;
    }
};

export const ThemeContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(themeReducer,{theme:null});
    useEffect(()=>{
        const thme = localStorage.getItem('theme');
        if (thme == 'dark'){
            dispatch({type:'DO_DARK'})
        }
        if (thme == 'light') {
            dispatch({type:"DO_LIGHT"})
        }
    },[])
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}