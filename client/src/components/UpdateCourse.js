import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";
import ValidationErrors from "../errors/ValidationErrors";


const UpdateCourse = () => {
    const { authUser, userCredentials } = useContext(UserContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET", null, null)
                if (response.status === 200) {
                    const courses = await response.json();
                    setCourse(courses);
                    setUser(courses.User);
                } else if (response.status === 404) {
                    console.log('Course was not found');
                    navigate('/notfound')
                } else {
                    console.log(response.status);
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
                navigate('/error');
            }
        }

        fetchData();
    }, [id, navigate]);

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
            } else if (response.status === 403){
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

    if(authUser.id === user.id){ 
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>

                <ValidationErrors errors={errors}/>

                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={title} />

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} ref={materialsNeeded}></textarea>
                        </div>
                    </div>

                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
    } else{
        return <Navigate to="/forbidden" replace/>
    }
}

export default UpdateCourse;
