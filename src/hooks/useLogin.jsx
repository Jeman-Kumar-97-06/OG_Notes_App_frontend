import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isloading, setIsloading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async (email,pwd) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('http://localhost:3000/api/users/login',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,pwd})
        })
        const json = await resp.json();
        console.log(json)
        if (!resp.ok) {
            setIsloading(false);
            setError(json.error);
        }
        if (resp.ok)  {
            localStorage.setItem('journal_user',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
            setIsloading(false);
            setError(null);
        }
    }
    return {error,isloading,login};
}