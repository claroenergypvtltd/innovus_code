import { FAQ_CREATE_SUCCESS, FAQ_FETCH_SUCCESS, FAQ_UPDATE_SUCCESS, FAQ_FETCH_SPECIFIC_DATA, FAQ_DELETE_SUCCESS } from '../constants/actionTypes'


const initialState = {
    Lists: [],
    count: 0,
    specificData: []
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

        case FAQ_FETCH_SPECIFIC_DATA:
            return state = {
                ...state,
                specificData: action.resp
            }

        case FAQ_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.resp
            }

        case FAQ_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.resp
            }

        default:
            return state;

    }

}