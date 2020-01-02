import { httpServices } from "../services/http.services"
import { GET_ERRORS, POOL_CREATE_SUCCESS, POOL_FETCH_SUCCESS, POOL_DELETE_SUCCESS, POOL_UPDATE_SUCCESS, POOL_FETCH_SPECIFIC_DATA } from '../constants/actionTypes'

export const submitPool = (Id) => dispatch => {
    if (Id) {
        httpServices.put().then(resp => {
            if (resp) {
                // dispatch({type: POOL_UPDATE_SUCCESS , updateStatus : resp})
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: GET_ERRORS, payload: error });
        })
    }
    else {
        httpServices.post().then(resp => {
            if (resp) {
                // toastr.success(resp.message);
                // dispatch({ type : POOL_CREATE_SUCCESS ,  createdStatus: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: GET_ERRORS, payload: error });
        })
    }
}

export const getPoolList = () => dispatch => {
    httpServices.get().then(resp => {
        if (resp) {
            //  dispatch({type :POOL_FETCH_SUCCESS, Lists : resp })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}

export const getSpecificData = () => dispatch => {
    httpServices.get().then(resp => {
        if (resp) {
            //  dispatch({type :POOL_FETCH_SPECIFIC_DATA, Lists : resp })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({ type: GET_ERRORS, payload: error });
    })
}