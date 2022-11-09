import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userInfo from './userInfo';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    userInfo: userInfo
});

export default reducer;
