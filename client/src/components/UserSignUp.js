//Creates a POST request to /api/users api route - i.e. creates a new user with a full name, email, and password
/**Still need to figure out how to link the post request of the form to api */

import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

const UserSignUp = () => {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: email.current.value,
            password: password.current.value
        }

        await axios.post('http://localhost:5000/api/users', data, {
            headers:{
                "Content-Type": "application/json; charset=utf-8"
            }})
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" required ref={firstName} />

                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" required ref={lastName} />

                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" required ref={email} />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required ref={password} />

                    <button className="button" type="submit" onSubmit={handleSubmit}>Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>

                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;

//onclick="event.preventDefault(); location.href='index.html';"