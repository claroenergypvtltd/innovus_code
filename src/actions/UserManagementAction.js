// import axios from 'axios';
import { GET_ERRORS, SET_USERS_LIST } from '../constants/actionTypes';
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


