import { FAQ_CREATE_SUCCESS, FAQ_FETCH_SUCCESS } from '../constants/actionTypes'


const initialState = {

    
    Lists: [],
    count: 0

}

export default function (state = initialState, action) {

    switch (action.type) {
        case FAQ_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.resp
            }

        case FAQ_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists,
                count: action.count
            }
        default:
            return state;

    }

}