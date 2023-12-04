import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const UpdateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form method="PUT" action="">
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue="Build a Basic Bookcase" />

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue='course description'></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="14 hours" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue="materials"></textarea>
                        </div>
                    </div>

                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={(e)=>{e.preventDefault(); navigate('/')}}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;

// onclick="event.preventDefault(); location.href='index.html'"";