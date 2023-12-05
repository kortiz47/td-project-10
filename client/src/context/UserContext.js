import { createContext, useState } from "react";
import axios from "../api/axios";


const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (username, password) =>{
        await axios.get('/users', {
            auth:{
                username,
                password
            }})
    }

    const signOut = () =>{

    }

    return(
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;