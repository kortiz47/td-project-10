/**
 * 
 * @returns Renders user-error message that a page is not accessible by the current authenticated User
 */
const Forbidden = () =>{
    return(
        <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
            </div>
        </main>
    )
}

export default Forbidden;