import { REGION_FETCH_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    specificData: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGION_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List
            }
        default:
            return state;
    }
}