import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) => {
    //Initial value of 'user' set to 'null'
    const [state,dispatch] = useReducer(authReducer,{user:null});
    //The following sees if localStorage has 'journal_user' and logs in:
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('journal_user'));
        if (user) {
            dispatch({type:"LOGIN",payload:user});
        }
    },[]);
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}