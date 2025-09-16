import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isloading, setIsloading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async (usrn,pwd) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('/api/users/login',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({usrn,pwd})
        })
        const json = await resp.json();
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