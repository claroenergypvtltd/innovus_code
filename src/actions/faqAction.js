import { httpServices } from '../services/http.services'
import { endPoint } from "../constants";
import { toastr } from 'react-redux-toastr'
import { FAQ_CREATE_SUCCESS, FAQ_FETCH_SUCCESS } from '../constants/actionTypes'


export const SubmitFaq = (formData, Id) => dispatch => {

    if (Id) {
        httpServices.post(endPoint.instruction, formData).then(resp => {
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
