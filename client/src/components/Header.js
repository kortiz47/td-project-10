import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

//TODO - when we refresh the auth user is stored in an object in array which then makes auth user 
//authUser[0] but for just regular logging in it is just authUser
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