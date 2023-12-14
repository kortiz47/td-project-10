/**
 * 
 * @param {string} path 
 * @param {string} method 
 * @param {object} body 
 * @param {object} credentials 
 * @returns our apiHelper reduces code redundancy and allows a user to make CRUD requests through 
 * the application
 */

export const api = (path, method = "GET", body = null, credentials = null) => {
    //http://localhost:5000/api
    const url = `https://td-project-10-production.up.railway.app/api${path}`;

    const options = {
        method,
        headers: {},
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (credentials) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options)
}



