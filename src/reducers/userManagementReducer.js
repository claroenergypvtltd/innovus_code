import { SET_USERS_LIST,SET_FARMS_LIST,SET_FARMS_DETAILS} from '../constants/actionTypes';

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
        case SET_FARMS_LIST:
                return {
                    ...state,
                    farmsList:action.payload       
                }

        case SET_FARMS_DETAILS:
            return {
                ...state,
                farmDetails:action.payload
            }
        default: 
            return state;
    }
}