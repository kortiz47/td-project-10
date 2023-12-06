import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import axios from "../api/axios";

const CourseDetail = () => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(error => console.log(error));
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(id);
        axios.delete(`/courses/${id}`)
            .then(response => { console.log(response); console.log(`${id} deleted`) })
            .catch(error => console.log(error))
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