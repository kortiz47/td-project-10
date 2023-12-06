import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { api } from "../utils/apiHelper";


const UpdateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(title.current.value, description.current.value, estimatedTime.current.value, materialsNeeded.current.value)
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={title}/>

                            <p>By Joe Smith</p>

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
                    <button className="button button-secondary" onClick={(e)=>{e.preventDefault(); navigate('/')}}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;

// onclick="event.preventDefault(); location.href='index.html'"";