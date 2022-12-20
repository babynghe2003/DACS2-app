import Server from './Server';

export const AllTopicAPI = () => {
    return Server.get('/topics/all-topics', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
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

export const LikeTopic = (id) => {
    return Server.post('/topics/like-topic/' + id, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const DislikeTopic = (id) => {
    return Server.post('/topics/dislike-topic/' + id, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const LikeComment = (id) => {
    return Server.post('/topics/like-comment/' + id, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};

export const DislikeComment = (id) => {
    return Server.post(
        '/topics/dislike-comment/' + id,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
    );
};

export const SearchTopic = (value) => {
    return Server.get('/topics/search?keyword=' + value);
};

export const ReportTopic = (id) => {
    return Server.post('/topics/report-topic/' + id, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
};
