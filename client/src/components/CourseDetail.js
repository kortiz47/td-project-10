import { useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import FetchDataContext from "../context/FetchDataContext";

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
    const { actions, data } = useContext(FetchDataContext);
    const { authUser, userCredentials } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchData(`/courses/${id}`);
    }, [id, data]);

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await api(`/courses/${id}`, "DELETE", data, userCredentials);

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

    if (data && data.User) {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {authUser ?
                            <>
                                {authUser && authUser.id === data.userId ? 
                                    <>
                                        <Link className="button" to={`/courses/${data.id}/update`}>Update Course</Link>
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
                                <h4 className="course--name">{data.title}</h4>

                                <p>By {data.User.firstName} {data.User.lastName}</p>

                                <ReactMarkdown>{data.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{data.estimatedTime ? data.estimatedTime : 'No Current Estimate'}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ReactMarkdown className="course--detail--list">
                                    {data.materialsNeeded}
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