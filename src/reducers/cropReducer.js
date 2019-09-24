import { GET_CROP_LIST } from '../constants/actionTypes';


const initialState = {
    List: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CROP_LIST:
            return {
                ...state,
                List: action.payload
            }
        default:
            return state;
    }
}