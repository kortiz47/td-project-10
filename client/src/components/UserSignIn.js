import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import axios from "../api/axios";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const [errors, setErrors] = useState([]);

    const userPassword = useRef(null);
    const userEmail = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = userEmail.current.value;
        const password = userPassword.current.value;

        try {
            await actions.signIn(username, password);
        } catch (error) {
            console.log('ERROR from UserSignIn ' + error)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" required ref={userEmail} />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required ref={userPassword} />

                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>

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