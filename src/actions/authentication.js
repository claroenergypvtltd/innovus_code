import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants/actionTypes';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { endPoint } from '../constants';
import { phaseKey } from "../config/LocalConfig";
import { toastr } from 'react-redux-toastr';
import { path } from '../constants/path'
import CryptoJS from 'crypto-js';

import { history } from '../store/history';
import store from '../store/store';
// import { httpServices } from '../services';




export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => history.push(path.login.login))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
        });
}


export const loginUser = (user) => dispatch => {

    console.log(user);
    axios.post(endPoint.login, user).then(res => {

        console.log(res);
        const token = res.data.token.accessToken;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);

        let Details = res ? Object.assign({}, res) : {};
        // //encrypt the data 
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Details), phaseKey);
        // //set encrypted in localstorage
        localStorage.setItem("user", (ciphertext));
        toastr.success(window.strings.LOGGEDIN_SUCCESSFULLY);

        // console.log(path.dashboard.list);
        // 
        dispatch(setCurrentUser(decoded));
        history.push(path.dashboard.list);
    })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));

    // console.log(store.getState().router );
    // if(location.pathname !== process.env.PUBLIC_URL+'/login')
    // history.push('majhd');

}

