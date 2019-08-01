import axios from "axios";
import baseUrl from "../config/config";
import { userData } from '../libraries/userData';
import { history } from '../store/history';
import PubSub from 'pubsub-js';
import { path } from '../constants';
import { toastr } from 'react-redux-toastr';

export const httpServices = {};

httpServices.get = get;
httpServices.post = post;
httpServices.put = put;
httpServices.remove = remove;
httpServices.uploadImage = uploadImage;

const toast = toastr;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";

axios.interceptors.response.use(
  function (response) {
    return Promise.resolve(response.data);
  },
  function (error) {
    debugger;
    console.log(error);
    if (error.request.status === 403) {
      toast.warning(window.strings['INFORMATION'], error.response.message);
      localStorage.removeItem("user");
      history.push(path.login.add);
      window.location.reload();
    } else if (error.request.status === 401) {
      toast.warning(window.strings['INFORMATION'], error.response.message);
      return Promise.reject(error);
    } else if (error.request.status === 500) {
      toast.error(error.response.message);
      return Promise.reject(error);
    } else if (error.request.status === 409) {
      toast.error(error.response.message);
      return Promise.reject(error);
    } else if (error.request.status === 422) {
      toast.error(error.response.message);
      return Promise.reject(error);
    }else if (error.request.status === 400) {
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
    else {
      toast.error("Network connection failed ");
    }
  }
);

// axios.interceptors.request.use(
//   function (config) {
//     let user = userData();
//     debugger;
//     console.log(user);
//     let token = (user && user.data && user.data.token) ? user.data.token.tokenType +' '+ user.data.token.accessToken : '';

//     config.headers = Object.assign(
//       {
//         Authorization: token
//       },
//       config.headers
//     );
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

function get(url) {
  PubSub.publish('msg', true);
  debugger;
  return axios.get(url).then(response => {
      if(response.data && response.data.count > window.constant.ONE){
        setTimeout(function(){
          PubSub.publish('msg', false);       
        },1000)
      }else{
        PubSub.publish('msg', false);
      }
      
      return response;
  }).catch((error) => {
    console.error("GetError", error);
    PubSub.publish('msg', false);

  });
}

function post(url, params) {
  PubSub.publish('msg', true);
  return axios.post(url, params).then(response => {
    PubSub.publish('msg', false);
    return response;
  }).catch(e => {
    console.log(e);
    PubSub.publish('msg', false);
  })
}

function remove(url, data) {
  PubSub.publish('msg', true);
  return axios.delete(url, { data }).then(response => {
    PubSub.publish('msg', false);
    return response;
  }).catch((error) => {
    PubSub.publish('msg', false);
    return error.response;
  });
}

function put(url, data) {
  PubSub.publish('msg', true);
  return axios.put(url, data).then(response => {
    PubSub.publish('msg', false);
    return response;
  }).catch((error) => {
    PubSub.publish('msg', false);
    return error.response;
  });
}

function uploadImage(params) {
  const { storeId, Type, file } = params;
  var formData = new FormData();
  formData.append("image", file);
  axios.defaults.headers.common["storeid"] = storeId;
  axios.defaults.headers.common["type"] = Type;
  axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  PubSub.publish('msg', true);
  return httpServices.post("uploads/", formData).then(resp => {
    PubSub.publish('msg', false);
    return resp;
  }).catch((error) => {
    PubSub.publish('msg', false);
    return error.response;

  });
}
