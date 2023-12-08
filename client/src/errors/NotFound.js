/**
 * 
 * @returns Renders user-error message that a page cannot be found if it is not defined
 */

const NotFound = () =>{
    return(
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
    )
}

export default NotFound;