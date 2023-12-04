//performs a GET request to check if the user email and password is in the data base in order to sign in someone
/** Still need to figure out how to authenticate the user */

import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const UserSignIn = () => {
    const userPassword = useRef();
    const userEmail = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("password: " + userPassword.current.value);
        console.log("email: " + userEmail.current.value);
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form method="GET" action="http://localhost:5000/api/users">
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" required ref={userEmail} onChange={handleSubmit} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required ref={userPassword} />

                    <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
                    <button className="button button-secondary" onClick={(e) => {e.preventDefault(); navigate('/')}}>Cancel</button>
                
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignIn;


/** TODO */

//Need to make sure a user can log into the form and be able to submit it/create a post request to the api

//Also need to fix the link a user is directed to after logging into the app