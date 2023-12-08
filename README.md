# Treehouse Tech Degree Project 10
***Treehouse Tech Degree Project 10: Full Stack App with React and a REST API***

This project is going for Exceeds Expectations and is a full-stack JavaScript application using React to create the client and a REST API for the server using Express.js. 

This application displays courses that can be read by any user that visits the page. Once a user creates an account and logs into the application, they are able to read all courses, create their own courses, and update and delete courses they have created. Application display is responsive to whether a user is logged in and uses cookies to keep a user logged in.

## How It's Made
**Tech Used:** HTML, CSS, React, React Router, React Markdown, Cookies-JS, SQL, Sequelize, SQLite, Express.JS

**Additional Features:** This project is going for exceeds expectations, and a couple of added features are:

* **Display User Friendly Messages** 
    * If a user tries to visit an undefined route or a course that does not exist within the database, a Not Found page will be rendered
    * If a user tries to visit the update course page for a course they do not own when logged in, they will be redirected to the Forbidden page
    * If a user is logged out when trying to visit a protected route page, they will be redirected to the sign in page 
    * If there is an error with the server, then the Error page will be rendered telling the user there is an error with the server
* **Persist User Credentials** 
    * This application uses cookies in order to store and persist the user credentials as well as their information across re-renders of the application
* **Redirect User After Successful Login** 
    * If a user tries to visit a page that is within a protected route and sign in after visiting that route, they will be redirected to the previous page after logging in