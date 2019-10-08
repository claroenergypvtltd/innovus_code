import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, ORDERTRACK_FETCH_SUCCESS } from '../constants/actionTypes';


const initialState = {
    Lists: {},
    DetailsList: {},
    trackLists: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ORDER_FETCH_SUCCESS:
            return {
                ...state,
                Lists: action.Lists
            }

        case ORDERDETAILS_FETCH_SUCCESS:
            return {
                ...state,
                DetailsList: action.Lists
            }

        case ORDERTRACK_FETCH_SUCCESS:
            return {
                ...state,
                trackLists: action.trackLists
            }

        default:
            return state;
    }
}