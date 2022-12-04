import Server from './Server';

export const AllTopicAPI = () => {
    return Server.get('/topics/all-topics');
};

export const MyTopicAPI = () => {
    return Server.get('/topics/my-topics', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const CreateTopicAPI = (data) => {
    return Server.post('/topics/create-topic', data);
};

export const GetTopic = (id) => {
    return Server.get('/topics/topic/' + `${id}`);
};

export const CommentAPI = (data) => {
    return Server.post('/topics/comment', data, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const DeleteTopic = (id) => {
    return Server.delete('/topics/delete-topic/' + id, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const UpdateTopic = (id, data) => {
    return Server.patch('/topics/update-topic/' + id, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
};

export const VoteTopicAPI = (data) => {
    return Server.post('/topics/vote', data, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};
