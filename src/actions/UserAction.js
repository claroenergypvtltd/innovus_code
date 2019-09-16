import {
  GET_ERRORS,
  USER_FETCH_SUCCESS,
  FARMS_FETCH_SUCCESS,
  FETCH_FARMS_DETAILS,
} from '../constants/actionTypes';
import { endPoint } from '../constants';
import { httpServices } from '../services/http.services';
import { toastr } from 'react-redux-toastr';

export const fetchUsers = (user, userId) => dispatch => {
  console.log('endPoint.userList', endPoint.userList);
  // user.search = "Agro_123"

  let httpMethod = "";

  if (user.isEdit) {
    httpMethod = httpServices.get(endPoint.user + '?userId=' + user.userId);
  } else {
    if (userId) {
      httpMethod = httpServices.put(endPoint.user, user);
    } else {
      httpMethod = httpServices.post(endPoint.user, user);
    }

  }

  return httpMethod
    .then(res => {
      if (res) {
        res.message && toastr.success(res.message);
        let userListData = res.data && res.data.datas;
        dispatch({ type: USER_FETCH_SUCCESS, payload: userListData });
        return res
      }
    }).catch(err => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const deleteUser = (deleteId) => {
  return httpServices.remove(endPoint.user, deleteId).then(res => {
    if (res) {
      toastr.success(res.message);
      return res;
    }
  }).catch((e) => {
    console.log(e);
  });
};

export const fetchFarmList = farmerId => dispatch => {
  if (farmerId) {
    let params = endPoint.farm + '?userId=' + farmerId;
    return httpServices
      .get(params)
      .then(res => {
        let farmerListData = res.data;
        console.log('farmerListData', farmerListData);
        dispatch({
          type: FARMS_FETCH_SUCCESS,
          payload: farmerListData,
        });
        return farmerListData;
      })
      .catch(err => {
        console.log(err);
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
          // console.log("farmerListData",farmerListData);
          dispatch({
            type: FETCH_FARMS_DETAILS,
            payload: getFarmDetailData,
          });
          return getFarmDetailData;
        }
      })

      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  }
};


// export const fetchUsers = user => dispatch => {
//   console.log('endPoint.userList', endPoint.userList);
//   // user.search = "Agro_123"
//   return httpServices
//     .post(endPoint.user, user)
//     .then(res => {
//       let userListData = res.data.datas;
//       dispatch({
//         type: USER_FETCH_SUCCESS,
//         payload: userListData,
//       });
//       return res
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         type: GET_ERRORS,
//         payload: err,
//       });
//     });
// };
