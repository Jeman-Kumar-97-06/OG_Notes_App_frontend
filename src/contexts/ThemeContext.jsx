import { useEffect } from "react";
import { createContext,useReducer } from "react";

export const ThemeContext = createContext();

export const themeReducer = (state,action) => {
    switch(action.type){
        case 'DO_DARK':
            return {
                theme : "dark"
            }
        case "DO_LIGHT":
            return {
                theme : "light"
            }
        default:
            return state;
    }
};

export const ThemeContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(themeReducer,{theme:"light"});
    useEffect(()=>{
        const thme = JSON.parse(localStorage.getItem('theme'));
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