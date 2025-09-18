import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error,setError] = useState(null);
    const [isloading,setIsloading]= useState(null);
    const {dispatch} = useAuthContext();
    const signup = async (fulln, usrn, email, pwd, pfp) => {
        setIsloading(true);
        setError(null);
        const fData = new FormData();
        fData.append('fulln',fulln);
        fData.append('usrn',usrn);
        fData.append('email',email);
        fData.append('pwd',pwd)
        fData.append('pFp',pfp);
        const resp = await fetch('http://localhost:3000/api/users/signup',{
            method:"POST",
            body:fData
        })
        const json = await resp.json();
        if (!resp.ok) {
            setIsloading(false);
            setError(json.error);
        }
        if (resp.ok) {
            localStorage.setItem('journal_user',JSON.stringify(json));
            dispatch({type:'LOGIN',payload:json});
            setIsloading(false);
            setError(null);
        }
    }
    return {error,isloading,signup};
}