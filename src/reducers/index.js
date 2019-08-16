import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import UserManagementReducer from './userManagementReducer'
import FarmerReducer from './FarmerReducer'
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    toastr: toastrReducer,
    category: categoryReducer,
    farmer: FarmerReducer,
    user: UserManagementReducer
});

