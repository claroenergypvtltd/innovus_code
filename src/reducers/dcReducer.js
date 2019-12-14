import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_UPDATE_SUCCESS, DC_DELETE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS } from '../constants/actionTypes'

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

        case DC_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists,
                count: action.count
            }

        case DC_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.Lists
            }

        case DC_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.resp
            }

        case DC_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.resp
            }

        case DC_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.resp
            }

        default:
            return state;

    }
}
