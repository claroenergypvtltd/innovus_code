import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_DELETE_SUCCESS, DC_UPDATE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS, GET_ERRORS } from '../constants/actionTypes';
import { endPoint } from "../constants";

// distributeCentre
// distributeCentres

export const fetchDcList = (dcData, isDc) => dispatch => {
    httpServices.post(endPoint.distributeCentres, dcData).then(resp => {
        if (resp && resp.data) {
            if (dcData && dcData.id && !isDc) {
                dispatch({ type: DC_SPECIFIC_DATA_SUCCESS, Lists: resp.data })
            } else {
                dispatch({ type: DC_FETCH_SUCCESS, Lists: resp.data })
            }
        }
    }).catch((error) => {
        dispatch({ type: GET_ERRORS, payload: error });
    })
}


export const SubmitDC = (dcData) => dispatch => {
    if (dcData && dcData.id) {  // Check whether the Id is empty or not then respectively hit Add and Update
        httpServices.put(endPoint.distributeCentre, dcData).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: DC_UPDATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
        })

    } else {
        httpServices.post(endPoint.distributeCentre, dcData).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: DC_CREATE_SUCCESS, resp: resp.status })
            }
        }).catch(error => {
            dispatch({ type: DC_CREATE_SUCCESS, resp: error.status })
            console.error("error", error);
        })
    }
}

export const DeleteDC = (id) => dispatch => {
    httpServices.remove(endPoint.distributeCentre, id).then(response => {
        if (response) {
            toastr.success(response.message);
            dispatch({ type: DC_DELETE_SUCCESS, resp: response.status })
        }
    }).catch((error) => {
        console.error("Delete :", error.response);
        dispatch({ type: DC_DELETE_SUCCESS, resp: error.status })
    })
}