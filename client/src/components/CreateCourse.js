import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const CreateCourse = () => {
    const [errors, setErrors] = useState([]);

    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    const navigate = useNavigate();



    // const [course, setCourse] = useState[{
    //     title: '',
    //     description: '',
    //     estimatedTime: '',
    //     materialsNeeded: ''
    // }]

    const handleSubmit = (e) => {
        e.preventDefault();
    //     //when the form is submitted we want to make a post request to the /api/courses route to add a course
        console.log(title.current.value, description.current.value, estimatedTime.current.value, materialsNeeded.current.value)
    //     axios.post('http://localhost:5000/api/courses', {
    //         title: title.current.value,
    //         description: description.current.value,
    //         estimatedTime: estimatedTime.current.value,
    //         materialsNeeded: materialsNeeded.current.value
    //     })
    //         .then(response => console.log(response))
    //         .catch(err => console.log('Error: ' + err))
        //navigate('/');
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
                    <button className="button button-secondary" onClick={(e) => { e.preventDefault(); navigate('/') }}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default CreateCourse;