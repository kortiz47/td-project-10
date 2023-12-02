import { Link } from "react-router-dom";
import { useRef } from "react";

const UserSignIn = () => {
    const userPassword = useRef();
    const userEmail = useRef();
    
    const handleSubmit = () =>{
        console.log("password: " + userPassword.current.value);
        console.log("email: " + userEmail.current.value);
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" required ref={userEmail} onChange={handleSubmit}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required ref={userPassword}/>
                    <button className="button" type="submit">Sign In</button>
                    <Link to='/'>
                        <button className="button button-secondary">Cancel</button>
                    </Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignIn;

//onclick="event.preventDefault()"

/** TODO */

//Need to make sure a user can log into the form and be able to submit it/create a post request to the api

//Also need to fix the link a user is directed to after logging into the app