import {
  PERSONAL_INFO,
  CONTACT_DETAILS,
  FARM_DETAILS,
  CROP_DETAILS,
} from '../constants/actionTypes';

const initialstate = {
  formDatas: {},
  cropDetails: {},
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case PERSONAL_INFO:
      return (state = {
        ...state,
        formDatas: action.farmerData,
      });

    case CONTACT_DETAILS:
      return (state = {
        ...state,
        contactDatas: action.contact,
      });

    case FARM_DETAILS:
      return (state = {
        ...state,
        farmDetails: action.farm,
      });

    case CROP_DETAILS:
      return (state = {
        ...state,
        cropDetails: action.crop,
      });

    default:
      return state;
  }
}
