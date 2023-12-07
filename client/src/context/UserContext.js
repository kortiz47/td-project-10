import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";
import Cookies from 'js-cookie';


const UserContext = createContext(null);

export const UserProvider = (props) => {
    //const cookie = Cookies.get()

    const [authUser, setAuthUser] = useState(null);
    const [userCredentials, setUserCredentials] = useState(null);

    const signIn = async (credentials) => {
        setUserCredentials(credentials);
        Cookies.set("userCredentials", JSON.stringify(credentials), { expires: 1 })
        const response = await api("/users", "GET", null, credentials);
        if (response.status === 200) {
            const user = await response.json();
            console.log(`${user[0].emailAddress} has been successfully logged in!`);
            setAuthUser(user[0]);
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
            return user;
        } else if (response.status === 401) {
            console.log('Check that you entered your username and password correctly!');
            return null;
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthUser(null);
        setUserCredentials(null);
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