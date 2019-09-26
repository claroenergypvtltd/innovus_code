import {
    CONTACT_DETAILS,
    FARM_DETAILS,
    CROP_DETAILS,
    UPDATE_CONTACT_DETAILS,
    KYC_DETAILS,
    IRRIGATION_SCHEDULE,
    ADD_FARMDETAILS,
    UPDATE_FARMDETAILS
} from '../constants/actionTypes';

const initialState = {
    formDatas: {},
    cropDetails: {},
    contactDatas: '',
    updateContactDatas: '',
    cropAddStatus: '',
    kycStatus: '',
    irrigationStatus: '',
    addFarmStatus: '',
    updateFarmStatus: ''
};


export default function (state = initialState, action) {
    switch (action.type) {
        case CONTACT_DETAILS:
            return state = {
                ...state,
                contactDatas: action.contact
            }

        case UPDATE_CONTACT_DETAILS:
            return state = {
                ...state,
                updateContactDatas: action.updateStatus
            }

        case FARM_DETAILS:
            return state = {
                ...state,
                farmDetails: action.farm
            }

        case CROP_DETAILS:
            return state = {
                ...state,
                cropAddStatus: action.cropAddStatus
            }

        case KYC_DETAILS:
            return state = {
                ...state,
                kycStatus: action.kycStatus
            }

        case IRRIGATION_SCHEDULE:
            return state = {
                ...state,
                irrigationStatus: action.irrigationStatus
            }

        case ADD_FARMDETAILS:
            return state = {
                ...state,
                addFarmStatus: action.addFarmStatus
            }

        case UPDATE_FARMDETAILS:
            return state = {
                ...state,
                updateFarmStatus: action.updateFarmStatus
            }

        default:
            return state;
    }
}
