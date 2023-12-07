import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import ValidationErrors from "../errors/ValidationErrors";
import { api } from "../utils/apiHelper";

const CreateCourse = () => {
    const { authUser, userCredentials } = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: (authUser ? authUser.id : null)
        }

        try {
            const response = await api('/courses', "POST", course, userCredentials)
            if (response.status === 201) {
                console.log('Course has been created!');
                navigate('/');
            } else if (response.status === 400) {
                const errs = [];
                if (!title.current.value) {
                    errs.push('Please provide a Title')
                }
                if (!description.current.value) {
                    errs.push('Please provide a Description')
                }
                setErrors(errs);
            } else if (response.status === 401) {
                setErrors(['ACCESS DENIED: Must Sign In Before Creating A Course'])
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

    //if (authUser) {
        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>

                    <ValidationErrors errors={errors} />

                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                                {/* <p>By {authUser.firstName} {authUser.lastName}</p> */}

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </main>
        );
   // }
}

export default CreateCourse;