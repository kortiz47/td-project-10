import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";

/**
 * CourseDetails Component retrieves data from our REST API, sets the data returned 
 * to our Course State, and uses user credentials and authorization
 * via the useContext hook to dynamically display course details, our Update and 
 * Delete buttons for each individual course.
 * 
 * Additionally, it handles errors based on status returned by our REST API
 * 
 * @returns Course Detail Pages for /courses/:id
 */




const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const { authUser, userCredentials } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET", null, null);
                if (response.status === 200) {
                    const course = await response.json();
                    setCourse(course);
                    setUser(course.User);
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
                navigate('/error', { replace: true });
            }
        }

        fetchData();
    }, [id, navigate]);

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await api(`/courses/${id}`, "DELETE", course, userCredentials);

        if (response.status === 204) {
            console.log('Course has been deleted!');
            navigate('/');
        } else if (response.status === 401) {
            console.log('Unauthorized: Please login in order to delete a course');
            navigate('/signin');
        } else if (response.status === 403) {
            console.log('you are not the creator of this course so you cannot delete it');
            navigate('/forbidden');
        }
    }

    if (course) {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {authUser ?
                            <>
                                {authUser.id === user.id ?
                                    <>
                                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                        <Link className="button" onClick={handleDelete}>Delete Course</Link>
                                    </>
                                    :
                                    <></>
                                }
                            </>
                            :
                            null
                        }
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                {/* TODO: get the firstName and lastName of the user into the created by section */}

                                <p>By {user.firstName} {user.lastName}</p>

                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime ? course.estimatedTime : 'No Current Estimate'}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ReactMarkdown className="course--detail--list">
                                    {course.materialsNeeded}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default CourseDetail;