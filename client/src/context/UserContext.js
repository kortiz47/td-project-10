import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";
import Cookies from 'js-cookie';

/**
 * The UserContext component holds our authUser state, userCredentials state, and signIn and signOut functions
 * to be made globally available to other parts of our application through the 
 * useContext React Hook
 */

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const authCookie = Cookies.get("authenticatedUser");
    const credentialsCookie = Cookies.get("userCredentials");

    const [authUser, setAuthUser] = useState(authCookie ? JSON.parse(authCookie) : null);
    const [userCredentials, setUserCredentials] = useState(credentialsCookie ? JSON.parse(credentialsCookie) : null);

    const signIn = async (credentials) => {
        
        const response = await api("/users", "GET", null, credentials);
        if (response.status === 200) {
            let user = await response.json();
            user = user[0];
            console.log(`${user.emailAddress} has been successfully logged in!`);

            setAuthUser(user);
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });

            setUserCredentials(credentials);
            Cookies.set("userCredentials", JSON.stringify(credentials), { expires: 1 })

            return user;
        } else if (response.status === 401) {
            console.log('Check that you entered your username and password correctly!');
            return null;
        }
    }

    const signOut = () => {
        setAuthUser(null);
        setUserCredentials(null);

        Cookies.remove("authenticatedUser");
        Cookies.remove("userCredentials");
    }

    return (
        <UserContext.Provider value={{
            authUser,
            userCredentials,
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