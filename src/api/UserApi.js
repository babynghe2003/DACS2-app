import axios from 'axios';
import Server from './Server';

export const RegisterAPI = (data) => {
    return Server.post('/auth/register', data);
};

export const LoginAPI = (data) => {
    return Server.post('/auth/login', data);
};

export const MeAPI = () => {
    return Server.get('/auth/me', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const getProfileAPI = (id) => {
    return Server.get('/auth/profile/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};
