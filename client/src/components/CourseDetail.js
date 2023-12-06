import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { api } from "../utils/apiHelper";

const CourseDetail = () => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api(`/courses/${id}`, "GET", null, null)
            try {
                if (response.status === 200){
                    const courses = await response.json();
                    setCourse(courses);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(`course with id:${id} needs to be deleted with this handle function`)
    }

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

export default CourseDetail;