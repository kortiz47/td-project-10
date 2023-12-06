import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        const response = await api('/courses', "POST", user, null)
            .then(response => response.json())
            .catch(error => console.log(error));
        console.log(response);
    }

    const handleCancel = (e) =>{
        e.preventDefault(); 
        navigate('/');
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>

                {/* <CourseErrors errors={errors}/> */}

                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default CreateCourse;