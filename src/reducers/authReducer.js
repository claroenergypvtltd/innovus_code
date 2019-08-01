import { SET_CURRENT_USER } from '../constants/actionTypes';
import isEmpty from '../constants/is-empty';
import { debug } from 'util';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action ) {
    debugger;
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}
