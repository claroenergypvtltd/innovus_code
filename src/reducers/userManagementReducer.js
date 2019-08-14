import { SET_USERS_LIST } from '../constants/actionTypes';

const initialState = {
  userList:[],
}

export default function(state = initialState, action ) {
    console.log("action",action);
    console.log("action.type",action.type);
    debugger;
    switch(action.type) {
        case SET_USERS_LIST:
            return {
                ...state,
                userList:action.payload
                
            }
        default: 
            return state;
    }
}