import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { api } from "../utils/apiHelper";


const UpdateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title.current.value, description.current.value, estimatedTime.current.value, materialsNeeded.current.value)

        //Handle submit errors

        // else if (response.status === 400){
        //     const errs = [];
        //     if (!title.current.value) {
        //         errs.push('Please provide a Title')
        //     }
        //     if (!description.current.value) {
        //         errs.push('Please provide a Description')
        //     }
        // } else if (response.status === 404){
        //     console.log('The course you are looking for was not found');
        //     navigate('/notfound');
        // } else if (response.status === 403){
        //     console.log('403 Forbidden');
        //     navigate('/forbidden');
        // } else if(response.status === 401){
        //     console.log('401 unauthorized')
        // }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
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
}

export default UpdateCourse;
