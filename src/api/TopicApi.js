import Server from './Server';

export const AllTopicAPI = () => {
    return Server.get('/topics/all-topics');
};
