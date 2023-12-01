import { Link } from 'react-router-dom';

const Course = ({ book }) => {
    return (
        <Link className="course--module course--link" to={`/courses/${book.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{book.title}</h3>
        </Link>
    )
}

export default Course;