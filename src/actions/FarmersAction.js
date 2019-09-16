import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { PERSONAL_INFO, CONTACT_DETAILS, FARM_DETAILS, CROP_DETAILS } from '../constants/actionTypes';
import { endPoint } from "../constants";

export const SubmitPersonalInformation = (farmer) => {

    return (dispatch) => {
        dispatch({ type: PERSONAL_INFO, farmerData: farmer });
    }

}



export const SubmitPersonalAndContactInfo = (formData) => dispatch => {
    return httpServices.post(endPoint.signup, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            dispatch({ type: CONTACT_DETAILS, contact: resp.data })
            return resp;
        }
    }).catch((error) => {
        console.log("error", error);
    })
}


export const SubmitFarmDetails = (formData, isEdit) => {

    return (dispatch) => {
        if (isEdit) {
            return httpServices.put(endPoint.farm, formData).then(resp => {
                if (resp) {
                    toastr.success(resp && resp.message);
                    // dispatch(farmInfo(resp.data));
                    dispatch({ type: FARM_DETAILS, farm: resp.data });
                    return resp
                }
            }).catch((error) => {
                console.log("error", error);
            })
        } else {
            return httpServices.post(endPoint.farm, formData).then(resp => {
                if (resp) {
                    toastr.success(resp && resp.message);
                    // dispatch(farmInfo(resp.data));
                    dispatch({ type: FARM_DETAILS, farm: resp.data });
                    return resp
                }
            }).catch((error) => {
                console.log("error", error);
            })
        }
    }
}


export const SubmitCropDetails = (formData) => {

    return (dispatch) => {
        return httpServices.post(endPoint.crop, formData).then(resp => {
            if (resp) {
                toastr.success(resp && resp.message);
                dispatch({ type: CROP_DETAILS, crop: resp.data });
                return resp
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}



export const SubmitIrregationSchedule = (formData) => {
    // let irrigationData = { "irrigation": formData }

    return httpServices.post(endPoint.irrigation, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            return resp
        }
    }).catch((error) => {
        console.log("error", error);
    })

}


export const SubmitKYCDetails = (formData) => {
    return httpServices.post(endPoint.kyc, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            return resp
        }
    }).catch((error) => {
        console.log("error", error);
    })

}



