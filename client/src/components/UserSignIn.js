import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import ValidationErrors from "../errors/ValidationErrors";

/**
 * The UserSignIn component requires a user to use existing credentials to log into the app
 * once a user is signed in, they are redirected to the previous page they were on
 * 
 * @returns Renders the sign in page and authenticates a user if credentials match database records
 */

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const [errors, setErrors] = useState([]);

    const userPassword = useRef(null);
    const userEmail = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let from = '/';

        if (location.state) {
            from = location.state.from
        }

        const credentials = {
            username: userEmail.current.value,
            password: userPassword.current.value
        }

        try {
            const user = await actions.signIn(credentials);
            if (user.message === 'Access Denied') {
                const errs = [];
                if (!userEmail.current.value) {
                    errs.push("Please provide a value for 'email'")
                }
                if (!userPassword.current.value) {
                    errs.push("Please provide a value for 'password'")
                }
                if (userEmail.current.value && userPassword.current.value) {
                    errs.push('Sign in was unsuccessful')
                }
                setErrors(errs);
            } else {
                navigate(from);
            }
        } catch (error) {
            console.log(error);
            navigate('/error');
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

                <ValidationErrors errors={errors} />

                <form onSubmit={handleSubmit}>

                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={userEmail} />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={userPassword} />

                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>

                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignIn;