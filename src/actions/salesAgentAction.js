import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
// import { ORDER_FETCH_SUCCESS, ORDERDETAILS_FETCH_SUCCESS, GET_ERRORS } from '../constants/actionTypes';
import {
    AGENT_FETCH_SUCCESS, AGENT_SPECIFIC_DATA_SUCCESS,
    AGENT_CREATE_SUCCESS, AGENT_UPDATE_SUCCESS,
    AGENT_DELETE_SUCCESS, GET_ERRORS
} from '../constants/actionTypes'

import { endPoint } from "../constants";

export const fetchSalesAgent = (user) => dispatch => {
    let httpMethod = "";
    if (user.isEdit) {
        httpMethod = httpServices.get(endPoint.user + '?userId=' + user.agentId);
    } else {
        httpMethod = httpServices.post(endPoint.user, user);
    }
    httpMethod.then(resp => {
        if (resp && resp.data) {
            dispatch({ type: AGENT_FETCH_SUCCESS, Lists: resp.data })
        }
    }).catch((error) => {
        dispatch({ type: GET_ERRORS, payload: error });
    })
}


// export const DeleteIrrigationSetting = (id) => dispatch => {
//     httpServices.remove("irrigationcost", id).then(response => {
//         if (response) {
//             toastr.success(response.message);
//             dispatch({ type: AGENT_DELETE_SUCCESS, deletedStatus: response.status })
//         }
//     }).catch((error) => {
//         console.error("Delete :", error.response);
//         dispatch({ type: GET_ERRORS, payload: error });
//     })
// }


export const submitSalesAgent = (formData, isEdit) => dispatch => {
    let httpMethod = "";

    if (isEdit) {
        httpMethod = httpServices.put(endPoint.user, formData);
    } else {
        httpMethod = httpServices.post(endPoint.signup, formData)
    }

    httpMethod.then(resp => {
        if (resp && resp.message) {
            toastr.success(resp && resp.message);

            if (isEdit) {
                dispatch({ type: AGENT_UPDATE_SUCCESS, updatedStatus: resp.status })
            } else {
                dispatch({ type: AGENT_CREATE_SUCCESS, createdStatus: resp.status })
            }
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
}

export const getDcCodeData = (dcData) => {
    return httpServices.get(endPoint.dcCodeSearch + '?search=' + dcData.search).then(resp => {
        if (resp && resp.data) {
            return resp.data
        }
    }).catch((error) => {
        console.error("error", error);
    })
}
