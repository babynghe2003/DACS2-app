import axios from 'axios';
import Server from './Server';

export const RegisterAPI = (data) => {
    return Server.post('/auth/register', data);
};

export const LoginAPI = (data) => {
    return Server.post('/auth/login', data);
};

export const MeAPI = () => {
    console.log(localStorage.getItem('accessToken'));
    return Server.get('/auth/me');
};
