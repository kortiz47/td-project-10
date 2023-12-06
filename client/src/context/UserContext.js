import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";


const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (credentials) => {
        const response = await api("/users", "GET", null, credentials);
        console.log(response)
        if (response.status === 200) {
            const user = await response.json();
            console.log(`${user[0].emailAddress} has been successfully logged in!`);
            setAuthUser(user);
            //Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
            //return user;
        } else if (response.status === 401) {
            console.log('Check that you entered your username and password correctly!');
            return null;
        } else {
            throw new Error();
        }
    }

    const signOut = () => {
        setAuthUser(null);
    }

    return (
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