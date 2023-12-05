const UserErrors = ({ errors }) => {
    let errorDisplay = null;

    if (errors.length > 0) {
        errorDisplay = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i)=> <li key={i}>{error}</li>)}
                </ul>
            </div>
        )
    }

    return errorDisplay;
}

export default UserErrors;