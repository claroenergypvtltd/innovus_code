import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_DELETE_SUCCESS } from '../constants/actionTypes'

const initialstate = {
    Lists: [],
    count: 0,
    createdData: [],
    updatedData: [],
    deletedData: []
}

export default function (state = initialstate, action) {

    switch (action.type) {

        case CATEGORY_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List,
                count: action.count
            }

        case CATEGORY_CREATE_SUCCESS:
            return state = {
                ...state,
                createdData: action.resp
            }

        case CATEGORY_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedData: action.resp
            }

        case CATEGORY_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedData: action.resp
            }

        default:
            return state;


    }
}
