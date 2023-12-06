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
        .then(response => {
            if(response.status === 200){
                console.log(`Login Successful! ${username} was logged in successfully`)
                setAuthUser(response.data[0]);
                //setAuthUser(response.config.auth);
            } else if (response.status === 401){
                console.log("Auth was not successful " + response)
            } 
        })
        .catch(error => console.log("ERROR from UserContext: "+ error))
    }

    const signOut = () =>{
        setAuthUser(null);
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