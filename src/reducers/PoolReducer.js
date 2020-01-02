import { POOL_CREATE_SUCCESS, POOL_DELETE_SUCCESS, POOL_UPDATE_SUCCESS, POOL_FETCH_SUCCESS, POOL_FETCH_SPECIFIC_DATA } from '../constants/actionTypes'

const initialState = {
    Lists: {},
    specificData: {},
    createdStatus: '',
    updateStatus: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POOL_FETCH_SUCCESS:
            return state = {
                ...state,
                Lists: action.Lists
            }
        case POOL_UPDATE_SUCCESS:
            return state = {
                ...state,
                updateStatus: action.resp
            }
        case POOL_CREATE_SUCCESS:
            return state = {
                ...state,
                createdStatus: action.createdStatus
            }
        case POOL_FETCH_SPECIFIC_DATA:
            return state = {
                ...state,
                specificData: action.specificData
            }
        default:
            return state
    }
}