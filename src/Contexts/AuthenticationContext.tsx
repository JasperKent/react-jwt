import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { LoginModel } from "../Models/LoginModel";
import axios from "axios";
import { LoginResponse } from "../Models/LoginResponse";
import config from '../Config.json'

export interface AuthenticationData{
    username?: string;
    login?: (model: LoginModel) => Promise<Date>;
    isLoggedIn: boolean;   
    logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationData>({isLoggedIn : false, logout: ()=>{}});

function jwtToUsername(jwt?: string): string {
    if (jwt){
        const payload = jwt.split('.')[1];
        const asJson = atob(payload);
        const asObj = JSON.parse(asJson);

        return asObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    else{
        return '';
    }
}

export const AuthenticationProvider = ({children}: PropsWithChildren) => {
    const JWT_KEY = 'JWT_KEY';

    const [jwt, setJwt] = useState(sessionStorage.getItem(JWT_KEY) ?? undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(!!jwt);
    const [username, setUsername] = useState(jwtToUsername(jwt));

    useEffect(()=>{
        if(isLoggedIn){
            axios.interceptors.request.use(req =>{
                const isToServer = req.url?.startsWith(config.serverUrl);

                if (isToServer){
                    req.headers['Authorization'] = `Bearer ${jwt}`;
                }

                return req;
            });
        }
        else{
            axios.interceptors.request.clear();
        }    
    }, [isLoggedIn,jwt]);

    const login = async (model: LoginModel):Promise<Date> => {
        const response = await axios.post<LoginResponse>(`${config.serverUrl}/api/authentication/login`, model);

        if (response.status !== 200){
            throw new Error('Login failed.');
        }

        sessionStorage.setItem(JWT_KEY, response.data.jwtToken);
        setJwt(response.data.jwtToken);
        setIsLoggedIn(true);
        setUsername(jwtToUsername(response.data.jwtToken));

        return new Date(response.data.expiration);
    }

    const logout = () =>{
        setIsLoggedIn(false);
        setUsername('');
        setJwt(undefined);
        sessionStorage.removeItem(JWT_KEY);
    }

    return (
        <AuthenticationContext.Provider value={{login, isLoggedIn, username, logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
};