
import { httpServices } from '../services/http.services'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { PERSONAL_INFO, CONTACT_DETAILS, FARM_DETAILS, CROP_DETAILS } from '../constants/actionTypes';
import { endPoint } from "../constants";

export function SubmitPersonalInformation(farmer) {

    return (dispatch) => {
        dispatch(setData(farmer));
    }

    function setData(farmer) {
        return { type: PERSONAL_INFO, farmerData: farmer }
    }
}

export function SubmitContactInfo(formData) {

    return (dispatch) => {
        return httpServices.post(endPoint.signup, formData).then(resp => {
            if (resp) {
                toastr.success(resp && resp.message);
                dispatch(contactInfo(resp.data))
                return resp;
            }
        }).catch((error) => {
            console.log("error", error);
        })
    }

    function contactInfo(contact) {
        return { type: CONTACT_DETAILS, contact }
    }

}


export function SubmitFarmDetails(formData) {

    return (dispatch) => {
        return httpServices.post(endPoint.farm, formData).then(resp => {
            if (resp) {
                toastr.success(resp && resp.message);
                dispatch(farmInfo(resp.data));
                return resp
            }
        }).catch((error) => {
            console.log("error", error);
        })
    }

    function farmInfo(farm) {
        return { type: FARM_DETAILS, farm }
    }

}


export function SubmitCropDetails(formData) {

    return (dispatch) => {
        return httpServices.post(endPoint.crop, formData).then(resp => {
            if (resp) {
                toastr.success(resp && resp.message);
                dispatch(cropInfo(resp.data));
                return resp
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    function cropInfo(crop) {
        return { type: CROP_DETAILS, crop }
    }

}


export function SubmitIrregationSchedule(formData) {

    return httpServices.post(endPoint.irrigation, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            return resp
        }
    }).catch((error) => {
        console.log("error", error);
    })

}


export function SubmitKYCDetails(formData) {
    return httpServices.post(endPoint.kyc, formData).then(resp => {
        if (resp) {
            toastr.success(resp && resp.message);
            return resp
        }
    }).catch((error) => {
        console.log("error", error);
    })

}



