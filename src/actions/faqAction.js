import { httpServices } from '../services/http.services'
import { endPoint } from "../constants";
import { toastr } from 'react-redux-toastr'
import { FAQ_CREATE_SUCCESS, FAQ_FETCH_SUCCESS, FAQ_UPDATE_SUCCESS, FAQ_FETCH_SPECIFIC_DATA, FAQ_DELETE_SUCCESS } from '../constants/actionTypes'


export const SubmitFaq = (instruction, Id) => dispatch => {

    if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
        httpServices.put(endPoint.instruction, instruction).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: FAQ_UPDATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({ type: FAQ_CREATE_SUCCESS, resp: error.status })
        })

    } else {
        httpServices.post(endPoint.instruction, instruction).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: FAQ_CREATE_SUCCESS, resp: resp.status })
            }
        }).catch(error => {
            dispatch({ type: FAQ_CREATE_SUCCESS, resp: error.status })
            console.error("error", error);
        })
    }


}

export const getSpecificFaq = (faqId) => dispatch => {

    return httpServices.get(endPoint.instruction + '?title=Profit&' + endPoint.instructionId + '=' + faqId).then(resp => {
        if (resp.data) {
            dispatch({ type: FAQ_FETCH_SPECIFIC_DATA, resp })
            return resp;
        }
    })

}


export const DeleteFaq = (id) => dispatch => {

    httpServices.remove(endPoint.instruction, id).then(response => {

        if (response) {
            toastr.success(response.message);
            dispatch({ type: FAQ_DELETE_SUCCESS, resp: response.status })
        }
    }).catch((error) => {
        console.error("Delete :", error.response);
        dispatch({ type: FAQ_DELETE_SUCCESS, resp: error.status })
    })
}


export const getFaqList = () => dispatch => {

    httpServices.get(endPoint.instruction + '?title=Profit').then(resp => {

        if (resp && resp.data) {
            dispatch({ type: FAQ_FETCH_SUCCESS, Lists: resp.data, count: resp.data.totalCount })
        } else {
            console.error("Error when getting FaqList");
        }
    }).catch((error) => {
        console.error("error", error);
    })

}
