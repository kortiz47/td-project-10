import { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from "../context/UserContext";


const PrivateRoute = () =>{
    const { authUser } = useContext(UserContext);
    console.log(authUser)
    
    if(authUser){
        return (<Outlet />)
    } else{
        return (<Navigate to='/signin'/>)
    }
}

export default PrivateRoute;