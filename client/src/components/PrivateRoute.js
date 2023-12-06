import { useContext } from "react";
import UserContext from "../context/UserContext";
const PrivateRoute = () =>{
    const { authUser } = useContext(UserContext);
    
}

export default PrivateRoute;