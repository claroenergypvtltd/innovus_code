import { IRRIGATION_SETTING_FETCH_SUCCESS, IRRIGATION_SETTING_SPECIFIC_DATA_SUCCESS, IRRIGATION_SETTING_CREATE_SUCCESS, IRRIGATION_SETTING_UPDATE_SUCCESS, IRRIGATION_SETTING_DELETE_SUCCESS } from '../constants/actionTypes'

const initialState = {
    Lists: [],
    specificData: [],
    createdStatus: "",
    updatedStatus: "",
    deletedStatus: ""
}
export default function (state = initialState, action) {

    switch (action.type) {

        case IRRIGATION_SETTING_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists
            }

        case IRRIGATION_SETTING_SPECIFIC_DATA_SUCCESS:
            return state = {
                ...state,
                specificData: action.editList
            }

        case IRRIGATION_SETTING_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.createdStatus
            }

        case IRRIGATION_SETTING_UPDATE_SUCCESS:
            return state = {
                ...state,
                updatedStatus: action.updatedStatus
            }

        case IRRIGATION_SETTING_DELETE_SUCCESS:
            return state = {
                ...state,
                deletedStatus: action.deletedStatus
            }

        default:
            return state;

    }
}