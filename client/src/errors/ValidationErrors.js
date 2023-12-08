/**
 * 
 * @param {Array} param0 errors
 * @returns Validation errors to be displayed when a user creates, updates, or deletes a course or user account
 */

const ValidationErrors = ({ errors }) => {
    let errorDisplay = null;
    if (errors) {
        if (errors.length) {
            errorDisplay = (
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            )
        }
    }

    return errorDisplay;
}

export default ValidationErrors;