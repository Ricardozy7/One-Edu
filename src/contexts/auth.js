import React, { createContext, useContext, useEffect, useState } from "react";
import { RemoteServices } from "services"


export const AuthManager = createContext({});
const useAuth = () => useContext(AuthManager);

export const AuthProvider = ({ children }) => {

    const [perfil, setPerfil] = useState('')
    const [user, setUser] = useState(false);
    const [me, setMe] = useState({
        personal_data: {
            photo_uri: ''
        }
    })

    const logout = () => {
        localStorage.removeItem('@onetkn');
        setUser(null);
    }

    const makeLogin = async (data, navigateAtRoot = true) => {
        if(data){
            localStorage.setItem('@onetkn',JSON.stringify(data));
            setUser(data);
            // console.log(data)
        } 
    }


    useEffect(() => {
        const token = localStorage.getItem('@onetkn');
        if (token) {
            makeLogin(JSON.parse(token), false);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <AuthManager.Provider value={{
            makeLogin,
            user,
            logout,
            perfil,
            setPerfil,
            me, 
            setMe
        }}>
            {children}
        </AuthManager.Provider>
    )
}

export default useAuth;