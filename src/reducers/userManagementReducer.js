import {
  USER_FETCH_SUCCESS,
  FARMS_FETCH_SUCCESS,
  FETCH_FARMS_DETAILS,
  FARMER_DELETE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  userList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        userList: action.payload,
      };

    case FARMS_FETCH_SUCCESS:
      return {
        ...state,
        farmsList: action.payload,
      };

    case FETCH_FARMS_DETAILS:
      return {
        ...state,
        farmDetails: action.payload,
      };

    case FARMER_DELETE_SUCCESS:
      return {
        ...state,
        deletedStatus: action.resp
      }
    default:
      return state;
  }
}
