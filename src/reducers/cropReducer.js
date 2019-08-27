import { GET_CROP_LIST } from '../constants/actionTypes';


const initialState = {
    crop: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CROP_LIST:
            return {
                ...state,
                crop: action.payload
            }
        default:
            return state;
    }
}