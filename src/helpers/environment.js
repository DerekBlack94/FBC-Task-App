let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'https://fbc-task-server.herokuapp.com';
        break;
    case 'fbc-task-server.herokuapp.com':
        APIURL = 'https://fbc-task-server.herokuapp.com'
        // APIURL = 'http://localhost:3000';
}

export default APIURL;