import { createContext, PropsWithChildren, useState } from "react";
import { LoginModel } from "../Models/LoginModel";

export interface AuthenticationData{
    username?: string;
    login?: (model: LoginModel) => Promise<Date>;
    isLoggedIn: boolean;   
    logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationData>({isLoggedIn : false, logout: ()=>{}});

// function jwtToUsername(jwt?: string): string {
//     if (jwt){
//         const payload = jwt.split('.')[1];
//         const asJson = atob(payload);
//         const asObj = JSON.parse(asJson);

//         return asObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
//     }
//     else{
//         return '';
//     }
// }

export const AuthenticationProvider = ({children}: PropsWithChildren) => {
    // const JWT_KEY = 'JWT_KEY';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const login = async (model: LoginModel):Promise<Date> => {
        console.log('AuthenticationService.login called');

        setIsLoggedIn(true);
        setUsername('Dummy User');

        return new Date('2023-08-01T14:40:22Z');
    }

    const logout = () =>{
        setIsLoggedIn(false);
        setUsername('');
    }

    return (
        <AuthenticationContext.Provider value={{login, isLoggedIn, username, logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
};