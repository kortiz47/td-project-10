//Creates a POST request to /api/users api route - i.e. creates a new user with a full name, email, and password
/**Still need to figure out how to link the post request of the form to api */

import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const UserSignUp = () =>{
    const fname = useRef();
    const lname = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`${fname}, ${lname}, ${email}, ${password}`)
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form method='POST' action='http://localhost:5000/api/users'>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" required ref={fname}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" required ref={lname} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" required ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required ref={password}/>

                    <button className="button" type="submit" onSubmit={handleSubmit}>Sign Up</button>
                    <button className="button button-secondary" onClick={(e)=>{e.preventDefault(); navigate('/')}}>Cancel</button>

                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;

//onclick="event.preventDefault(); location.href='index.html';"