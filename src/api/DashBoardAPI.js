import axios from 'axios';
import Server from './Server';

export const RegisterAPI = (data) => {
    return Server.post('/auth/register', data);
};

export const LoginAPI = (data) => {
    return Server.post('/auth/login', data);
};

export const TotalUserAPI = (option = 'year') => {
    return Server.get('/dashboard/total-users/' + option, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const AllUserAPI = () => {
    return Server.get('/dashboard/all-users', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const UpdateUser = (id, data) => {
    return Server.patch('/dashboard/update-user/' + id, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
};

export const DeleteUser = (id) => {
    return Server.delete('/dashboard/delete-user/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const DeleteTopic = (id) => {
    return Server.delete('/dashboard/delete-topic/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};
