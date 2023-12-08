import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";


/**
 * @returns Does not render a visual element, but signs out a user and redirects them to the home page
 */
const UserSignOut = () =>{
    const { actions } = useContext(UserContext);

    useEffect(()=>{
        actions.signOut();
    })
    
    return(<Navigate to="/" replace/>)
}

export default UserSignOut;