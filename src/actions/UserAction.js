import {
  GET_ERRORS,
  USER_FETCH_SUCCESS,
  FARMS_FETCH_SUCCESS,
  FETCH_FARMS_DETAILS,
  FARMER_DELETE_SUCCESS,
  KYC_FETCH_SUCCESS
} from '../constants/actionTypes';
import { endPoint } from '../constants';
import { httpServices } from '../services/http.services';
import { toastr } from 'react-redux-toastr';

export const fetchUsers = (user) => dispatch => {

  let httpMethod = "";

  if (user.isEdit) {
    httpMethod = httpServices.get(endPoint.user + '?userId=' + user.userId);
  } else {
    httpMethod = httpServices.post(endPoint.user, user);
  }

  httpMethod
    .then(res => {
      if (res) {
        // res.message && toastr.success(res.message);
        dispatch({ type: USER_FETCH_SUCCESS, payload: res.data });
      }
    }).catch(err => {
      console.error(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const deleteUser = (deleteId) => dispatch => {
  httpServices.remove(endPoint.user, deleteId).then(res => {
    if (res) {
      toastr.success(res.message);
      dispatch({ type: FARMER_DELETE_SUCCESS, resp: res.status })
    }
  }).catch((e) => {
    console.error(e);
    dispatch({
      type: GET_ERRORS,
      payload: e,
    });
  });
};

export const fetchFarmList = farmerId => dispatch => {
  if (farmerId) {
    let params = endPoint.farm + '?userId=' + farmerId;
    return httpServices
      .get(params)
      .then(res => {
        let farmerListData = res.data;
        dispatch({
          type: FARMS_FETCH_SUCCESS,
          payload: farmerListData,
        });
        return farmerListData;
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  }
};

export const getFarmDetailData = farmId => dispatch => {

  if (farmId) {
    let params = endPoint.farmDetails + '?farmId=' + farmId;
    return httpServices
      .get(params)
      .then(res => {
        if (res) {
          console.log('res', res);
          let getFarmDetailData = res.data;
          dispatch({
            type: FETCH_FARMS_DETAILS,
            payload: getFarmDetailData,
          });
          return getFarmDetailData;
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  }
};

export const deleteIrrigation = (deleteId) => {
  return httpServices.remove(endPoint.irrigation, deleteId).then(res => {
    toastr.success(res.message);
    return res;
  });
}

export const getKycDetails = userId => dispatch => {
  let params = endPoint.kyc + '?userId=' + userId;
  return httpServices.get(params).then(res => {
    let kycDetails = res.data;
    dispatch({ type: KYC_FETCH_SUCCESS, resp: kycDetails});
  }).catch(err => {
    console.error(err);
    dispatch({ type: GET_ERRORS, payload: err });
  });
};
