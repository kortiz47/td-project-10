import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const signIn = () =>{

    }

    const signOut = () =>{

    }

    return(
        <UserContext.Provider value={{
            user,
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