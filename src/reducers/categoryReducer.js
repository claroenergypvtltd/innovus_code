import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    count: 0,
    specificData: [],
    createdData: "",
    updatedData: [],
    deletedData: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case CATEGORY_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.List,
                count: action.count
            }

        case CATEGORY_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.resp
            }

        case CATEGORY_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.resp
            }

        case CATEGORY_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.resp
            }

        case CATEGORY_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.resp
            }

        default:
            return state;

    }
}
