import { useContext } from "react";
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import UserContext from "../context/UserContext";

/**
 * PrivateRoute hides the CreateCourse and UpdateCourse components from users if they are not authenticated
 * 
 * @returns If a user is authenticated, the Private Routes, if user not authenticated they are redirected to sign in page
 */

const PrivateRoute = () =>{
    const { authUser } = useContext(UserContext);
    const location = useLocation();
    
    if(authUser){
        return (<Outlet />)
    } else{
        return (<Navigate to='/signin' state={{from: location.pathname}}/>)
    }
}

export default PrivateRoute;