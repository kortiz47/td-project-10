import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import FetchDataContext from "../context/FetchDataContext";
import { api } from "../utils/apiHelper";
import ValidationErrors from "../errors/ValidationErrors";

/**
 * The UpdateCourse component is only accessible if a user is authenticated and is the owner of a course
 * It allows a user to update a course they made and handles any validation errors for updating a course
 * 
 * @returns Renders the Update Course page /courses/:id/update and sends PUT request to REST API
 */

const UpdateCourse = () => {
    const { authUser, userCredentials } = useContext(UserContext);
    const { data, actions } = useContext(FetchDataContext);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    useEffect(() => {
        actions.fetchData(`/courses/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //warning for prev line: React Hook useEffect has missing dependencies: 'actions' and 'id'. Either include them or remove the dependency array.

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
            const response = await api(`/courses/${id}`, "PUT", course, userCredentials);
            if (response.status === 204) {
                console.log('Course was successfully updated!');
                navigate('/');
            } else if (response.status === 401) {
                console.log('Unauthorized: Log in before updating course');
                navigate('/signin');
            } else if (response.status === 400) {
                const errs = [];
                if (!title.current.value) {
                    errs.push('Please provide a Title')
                }
                if (!description.current.value) {
                    errs.push('Please provide a Description')
                }
                setErrors(errs);
            } else if (response.status === 403) {
                console.log('You are not the owner of this course, so you are unable to update it');
                navigate('/forbidden');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }


    if (data && data.User) {
        if (data.User.id === authUser.id) {
            return (
                <main>
                    <div className="wrap">
                        <h2>Update Course</h2>

                        <ValidationErrors errors={errors} />

                        <form onSubmit={handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" defaultValue={data.title} ref={title} />
                                    <p>By {data.User.firstName} {data.User.lastName}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" defaultValue={data.description} ref={description}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={data.estimatedTime} ref={estimatedTime} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={data.materialsNeeded} ref={materialsNeeded}></textarea>
                                </div>
                            </div>

                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                </main>
            )
        } else {
            return (<Navigate to='/forbidden' replace />)
        }
    }
}

export default UpdateCourse;
