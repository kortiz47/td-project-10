import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

/**
 * A dynamic Header that displays Sign In and Sign Out when user is not 
 * authenticated and their Name and Sign Out when user is authenticated
 * 
 * @returns The Header Component dynamically displays the header based on whether a user is logged in or not
 */
const Header = () => {
    const { authUser } = useContext(UserContext);
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {authUser === null ?
                        <ul className="header--signedout">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                        :
                        <ul className="header--signedin">
                            <li>Welcome, {authUser.firstName}!</li>
                            <li><Link to='/signout'>Sign Out</Link></li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;