import { PERSONAL_INFO, CONTACT_DETAILS, FARM_DETAILS, CROP_DETAILS } from '../constants/actionTypes';

const initialstate = {
    formDatas: {},
    cropDetails: {}
}

export default function (state = initialstate, action) {
    debugger;
    switch (action.type) {
        case PERSONAL_INFO:

            return state = {
                ...state,
                formDatas: action.farmerData
            }
            break;

        case CONTACT_DETAILS:
            return state = {
                ...state,
                contactDatas: action.contact
            }
            break;

        case FARM_DETAILS:
            return state = {
                ...state,
                farmDetails: action.farm
            }
            break;

        case CROP_DETAILS:
            return state = {
                ...state,
                cropDetails: action.crop
            }
            break;

        default:
            return state;




    }
    return state;
}