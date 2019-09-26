import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { PERSONAL_INFO, CONTACT_DETAILS, FARM_DETAILS, CROP_DETAILS, UPDATE_CONTACT_DETAILS, KYC_DETAILS, IRRIGATION_SCHEDULE, ADD_FARMDETAILS, UPDATE_FARMDETAILS, GET_ERRORS } from '../constants/actionTypes';
import { endPoint } from "../constants";


export const SubmitPersonalAndContactInfo = (formData, isEdit) => dispatch => {

    let httpMethod = "";

    if (isEdit) {
        httpMethod = httpServices.put(endPoint.user, formData);
    } else {
        httpMethod = httpServices.post(endPoint.signup, formData)
    }

    httpMethod.then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);

            if (isEdit) {
                dispatch({ type: UPDATE_CONTACT_DETAILS, updateStatus: resp.status })
            } else {
                dispatch({ type: CONTACT_DETAILS, contact: resp.status })
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


export const SubmitFarmDetails = (formData, isEdit) => {

    return (dispatch) => {
        if (isEdit) {
            httpServices.put(endPoint.farm, formData).then(resp => {
                if (resp) {
                    toastr.success(resp && resp.message);
                    dispatch({ type: UPDATE_FARMDETAILS, updateFarmStatus: resp.status });
                }
            }).catch((error) => {
                console.error("error", error);
                dispatch({
                    type: GET_ERRORS,
                    payload: error
                });
            })
        } else {
            httpServices.post(endPoint.farm, formData).then(resp => {
                if (resp) {
                    toastr.success(resp && resp.message);
                    dispatch({ type: ADD_FARMDETAILS, addFarmStatus: resp.status });
                }
            }).catch((error) => {
                console.error("error", error);
                dispatch({
                    type: GET_ERRORS,
                    payload: error
                });
            })
        }
    }
}


export const SubmitCropDetails = (formData) => {

    return (dispatch) => {
        httpServices.post(endPoint.crop, formData).then(resp => {
            if (resp) {
                toastr.success(resp && resp.message);
                dispatch({ type: CROP_DETAILS, cropAddStatus: resp.status });
            }
        }).catch((error) => {
            console.error(error);
            dispatch({
                type: GET_ERRORS,
                payload: error
            });
        })
    }
}



export const SubmitIrregationSchedule = (formData) => dispatch => {

    httpServices.post(endPoint.irrigation, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            dispatch({ type: IRRIGATION_SCHEDULE, irrigationStatus: resp.status })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })

}


export const SubmitKYCDetails = (formData) => dispatch => {
    httpServices.post(endPoint.kyc, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            dispatch({ type: KYC_DETAILS, kycStatus: resp.status })
        }
    }).catch((error) => {
        console.error("error", error);
        dispatch({
            type: GET_ERRORS,
            payload: error
        });
    })

}



