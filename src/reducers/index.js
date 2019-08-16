import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import UserManagementReducer from './userManagementReducer'

import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toastr:toastrReducer,
    user:UserManagementReducer
});

