import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "../Contexts/AuthenticationContext";

export const User = () =>{
    const {username, isLoggedIn, logout} = useContext(AuthenticationContext);

    return(
        isLoggedIn ? 
            <span>Welcome {username} <a href="#" onClick={() => logout()}>Logout</a></span>
            :
            <NavLink to="/login">Login</NavLink>
    );
}