export const api = (path, method = "GET", body = null, credentials = null) => {
    
    const url = `http://localhost:5000/api${path}`;

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

    const fetchData = fetch(url, options)
        .then(response => response)
        .catch(error => {
            console.log('Sorry! There was an error connecting to the server');
            console.log(error);
        });
        
    return fetchData;
}



