import { NavLink } from "react-router-dom";
import { User } from "../User/User";

export const Menu = () =>
{
    return(
        <nav>
             <NavLink to="/all-reviews">All Reviews</NavLink>{" | "}
             <NavLink to="/summary">Summary</NavLink>{" | "}
             <User />
        </nav>
    );
}