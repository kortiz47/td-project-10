import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(error => console.log(error));
    }, [id]);

    const materialsArray = () => {
        if (course.materialsNeeded) {
            const materials = course.materialsNeeded;
            const list = materials.split('* ');
            list.shift();
            return list.map(material => <li key={Math.random()}>{material}</li>)
        }
    }
    const materials = materialsArray();
    // if (course){
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
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

                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime ? course.estimatedTime : 'No Current Estimate'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {materials ? materials : <li>None Required</li>}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
//}

export default CourseDetail;