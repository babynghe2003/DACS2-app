import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8090/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export default instance;
