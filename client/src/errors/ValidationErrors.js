const ValidationErrors = ({ errors }) => {
    let errorDisplay = null;
    console.log(errors);
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