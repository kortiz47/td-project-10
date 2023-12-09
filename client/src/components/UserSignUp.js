import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import ValidationErrors from '../errors/ValidationErrors';
import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';

/**
 * Renders the Sign Up form and once a user is able to sign up they are automatically 
 * signed in and automatically taken to the home page
 * 
 * @returns Renders the Sign Up form, creates a new user, and logs them in
 */

const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const [errors, setErrors] = useState([]);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: email.current.value,
            password: password.current.value
        }

        const credentials = {
            username: email.current.value,
            password: password.current.value
        }

        try {
            const response = await api('/users', "POST", user);

            if (response.status === 201) {
                console.log(`${user.firstName} ${user.lastName}'s account has been successfully created!`);
                actions.signIn(credentials);
                navigate('/');
            } else if (response.status === 400) {
                const valErrors = [];
                let data = await response.json();
                console.log(data);
                if (data[0]) {
                    valErrors.push (data[0]);
                    console.log(valErrors);
                }
                if (data.errors) {
                    valErrors.push(...data.errors);
                    console.log(valErrors);
                }
                if (!password.current.value) {
                    valErrors.push("Please provide a value for 'password'");
                    console.log(valErrors);
                }
                console.log(valErrors);
                setErrors(valErrors);
            } else {
                throw new Error();
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
                <h2>Sign Up</h2>

                <ValidationErrors errors={errors} />

                <form onSubmit={handleSubmit}>

                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} />

                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} />

                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />

                    <button className="button" type="submit" onSubmit={handleSubmit}>Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>

                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;
