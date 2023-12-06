import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import UserErrors from '../errors/UserErrors';
import { api } from '../utils/apiHelper';

const UserSignUp = () => {
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

        try {
            const response = await api('/users', "POST", user);

            if(response.status === 201){
                console.log(`${user.firstName} ${user.lastName}'s account has been successfully created!`)
            } else if (response.status === 400){
                const data = await response.json();
                setErrors(data);
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

                <UserErrors errors={errors} />

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
