import { httpServices } from '../services/http.services'
import { endPoint } from "../constants";
import { toastr } from 'react-redux-toastr'
import { FAQ_CREATE_SUCCESS, FAQ_FETCH_SUCCESS, FAQ_UPDATE_SUCCESS, FAQ_FETCH_SPECIFIC_DATA, FAQ_DELETE_SUCCESS, GET_ERRORS } from '../constants/actionTypes'


export const SubmitFaq = (instruction, Id) => dispatch => {
    if (Id) {  // Check whether the Id is empty or not then respectively hit Add and Update
        httpServices.put(endPoint.instruction, instruction).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: FAQ_UPDATE_SUCCESS, resp: resp.status })
            }
        }).catch((error) => {
            console.error("error", error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })

    } else {
        httpServices.post(endPoint.instruction, instruction).then(resp => {
            if (resp) {
                toastr.success(resp.message);
                dispatch({ type: FAQ_CREATE_SUCCESS, resp: resp.status })
            }
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
            console.error("error", error);
        })
    }


}

export const getSpecificFaq = (faqId) => dispatch => {
    httpServices.get(endPoint.instruction + '?title=Profit&' + endPoint.instructionId + '=' + faqId).then(resp => {
        if (resp.data) {
            dispatch({ type: FAQ_FETCH_SPECIFIC_DATA, specificData: resp.data })

        }
    }).catch(error => {
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
        console.error("error", error);
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
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })
}


export const getFaqList = (Data) => dispatch => {

    let search = "";
    let page, rows = "";
    if (Data) {
        search = Data.search ? Data.search : '';
        page = Data.page ? (Data.page - 1) : '';
        rows = Data.limit ? Data.limit : '';
    }

    httpServices.get(endPoint.instruction + '?title=Profit' + '&search=' + search + "&page=" + page + '&rows=' + rows).then(resp => {

        if (resp) {
            dispatch({ type: FAQ_FETCH_SUCCESS, Lists: resp })
        } else {
            console.error("Error when getting FaqList");
        }


    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })

}
