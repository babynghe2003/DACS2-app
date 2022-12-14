import * as actionTypes from './actions';

export const userInfo = {
    accessToken: '',
    username: '',
    email: '',
    refreshToken: '',
    role: '',
    id: ''
};

const UserInfo = (state = userInfo, action) => {
    let id;
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                accessToken: action.accessToken,
                username: action.username,
                refreshToken: action.refreshToken,
                email: action.email,
                role: action.role,
                id: action.id
            };
        default:
            return state;
    }
};

export default UserInfo;
