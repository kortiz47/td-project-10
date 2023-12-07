import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";

const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const { userCredentials } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET", null, null);
                if (response.status === 200) {
                    const courses = await response.json();
                    setCourse(courses);
                } else if(response.status === 500) {
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
        console.log(course)
        console.log(userCredentials)
        const response = await api(`/courses/${id}`, "DELETE", course, userCredentials)
        console.log(response)
    }

    if (course) {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                        <Link className="button" onClick={handleDelete}>Delete Course</Link>
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
                                {/* {console.log(course.User["firstName"])} */}
                                {/* TODO: get the firstName and lastName of the user into the created by section */}
                                <p>By Joe Smith</p>

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