import { GET_ERRORS, SET_USERS_LIST,SET_FARMS_LIST,SET_FARMS_DETAILS } from '../constants/actionTypes';
import { endPoint } from '../constants';
import {httpServices} from '../services/http.services'
import { toastr } from 'react-redux-toastr';

export const fetchUsers = (user) => dispatch => {
    console.log("endPoint.userList",endPoint.userList);
    httpServices.post(endPoint.user, user).then(res => {
        let userListData = res.data.datas;
            dispatch(setUserList(userListData));
        })
        .catch(err => {
          console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export  const deleteUser = (deleteId)  =>  {
  return httpServices.remove(endPoint.user,deleteId).then(res =>{
        toastr.success(res.message);
        return res;
    });
}

export const setUserList = userData => {
    return {
        type: SET_USERS_LIST,
        payload: userData
    }
}

export const fetchFarmList = (farmerId)=>  (dispatch) =>{
    if(farmerId){
let params = endPoint.farm + '?userId=' + farmerId;
  return  httpServices.get(params).then(res => {
        let farmerListData = res.data;
        console.log("farmerListData",farmerListData);
            dispatch(setFarmerList(farmerListData));
            return farmerListData;
        })
        .catch(err => {
          console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
    }
}

export const setFarmerList = farmsData =>{
    return {
        type: SET_FARMS_LIST,
        payload: farmsData
    }
}

export const getFarmDetailData = (farmId)=>  (dispatch) =>{
    debugger;
    if(farmId){
let params = endPoint.farmDetails + '?farmId=' + farmId;
  return  httpServices.get(params).then(res => {
      console.log("res",res);
         let getFarmDetailData = res.data;
        // console.log("farmerListData",farmerListData);
             dispatch(setFarmDetails(getFarmDetailData));
        //     return farmerListData;
        })
        .catch(err => {
          console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
    }

}

export const setFarmDetails = formDetails => {
  return {
    type: SET_FARMS_DETAILS,
    payload: formDetails

  }
}









