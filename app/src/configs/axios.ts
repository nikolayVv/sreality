import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';

const url = axios.create({
    baseURL: apiUrl,
});

export default url;