import CryptoJS from 'crypto-js';
import { resorceJSON } from '../libraries';
import { toastr } from './toastr.services'
import { phaseKey } from "../scripts/LocalConfig";

export const utils = {};
utils.insertOptionValue = insertOptionValue;
utils.checkFormValidation = checkFormValidation;
utils.getStoreId = getStoreId;
utils.ajaxParamsObject = ajaxParamsObject;
utils.enableRollAccessPermission = enableRollAccessPermission;
utils.insertDisabledInSelect = insertDisabledInSelect;
utils.insertEnabledInSelect = insertEnabledInSelect;
utils.getStoreCode = getStoreCode;
utils.getRoleId = getRoleId;
utils.permissionData = permissionData;
utils.getSubStore = getSubStore;
utils.godAdminCheck = godAdminCheck;
utils.mainStoreCheck = mainStoreCheck;
utils.fileSizeValitation = fileSizeValitation;
utils.fileIsInvalid = fileIsInvalid;
utils.handleSorting = handleSorting;
utils.getParentStoreId = getParentStoreId;
utils.getParentStoreData = getParentStoreData;
utils.superAdminCheck = superAdminCheck;
utils.settingsCheck = settingsCheck;
//insert option value
function insertOptionValue(formArr, optValue, inkey, optLabel) {
        try {
                let result = [];
                if (!Array.isArray(formArr) || !Array.isArray(optValue) || !typeof inkey === 'string' || !typeof optLabel === 'object')
                        throw { 'msg': 'Invalid Data' }


                result = formArr.map((item) => {
                        if (item.name === inkey && item.type === 'select') {
                                let options = optValue.length ? optValue.map((optitem) => {
                                        let value = {};
                                        value = optitem;
                                        value.id = optitem[optLabel.id];
                                        value.label = optitem[optLabel.label] ;
                                        value.title = (optitem[optLabel.label] !== 'imageName') ? optLabel.imagePath+optitem[optLabel.imageName] : '';                                        
                                        return value;
                                }) : [];
                                item.option = options;
                        }
                        return item;
                });

                return result;
        }
        catch (e) {
                console.log(e);
        }
}


//check form  all  fields is valid
function checkFormValidation(formArr, formValue) {
        let valid = true;
        formArr && formArr.forEach((item, index) => {
                if (item.props && item.props.required) {
                        if (!formValue[item.name]) {
                                valid = false;
                        }
                }
        });
        return valid;
}

function getStoreId() {
        let ciphertext = localStorage.getItem('user');

        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                let userData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                const UserDataCheck = userData && userData.data && userData.data.UserStore && userData.data.UserStore[0];
                if( UserDataCheck && UserDataCheck.Store && UserDataCheck.Store.parentStoreId && UserDataCheck.Store.parentStoreId >= window.constant.ONE){
                        user = UserDataCheck.Store.parentStoreId
                }
                else if (UserDataCheck && UserDataCheck.storeId) {
                        user = UserDataCheck.storeId;
                }
        }
        return user;
}

function getSubStore() {
        let ciphertext = localStorage.getItem('user');

        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (user && user.data && user.data.subStores) {
                        user = user.data.subStores.map(item => {
                                return item.storeId
                        });
                }
                else {
                        user = [];
                }
        }
        return user;
}

function getStoreCode() {
        let ciphertext = localStorage.getItem('user');
        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (user) {
                        user = user.data.UserStore[0].Store.storeCode;
                }
        }
        return user;
}

function permissionData() {
        let ciphertext = localStorage.getItem('user');
        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (user) {
                        user = user.data.UserPermission.permissionData;
                }
        }
        return user;
}

function getRoleId() {
        let ciphertext = localStorage.getItem('user');
        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                console.log("getrole", user);
                if (user) {
                        user = user.data.role.id;
                }
        }
        return user;
}

function ajaxParamsObject(Obj) {
        try {
                let result = '';
                if (Obj && Object.keys(Obj).length) {
                        let replaceStr = {
                                ',': '&',
                                ':': '=',
                                '"': ''
                        }
                        let val = (JSON.stringify(Obj)).replace(/,|:|"/gi, function (mat) {
                                return replaceStr[mat]
                        });
                        result = val.substr(1).slice(0, -1);
                }
                return result;
        }
        catch (e) {
                console.log(e);
        }
}


function enableRollAccessPermission(item) {
        let ciphertext = localStorage.getItem('user');
        let valid = true;
        if (ciphertext && item.permissionData) {
                let token = (JSON.parse((CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey)).toString(CryptoJS.enc.Utf8)));
                console.log("token", token);
                // let userPermission = token.data && token.data.UserPermission && token.data.UserPermission.permissionData;
                // userPermission.templates = this.mainStoreCheck() ? "" : window.constant.ZERO;
                // userPermission.bulkUpload =  utils.godAdminCheck() ? window.constant.ZERO : "";
                // valid = enableRollConfig(userPermission[item['permissionData']]);
                valid = true;
        }
        return valid;
}

function enableRollConfig(item) {

        let data = parseInt(item)
        switch (data) {
                case 1:
                case 2:
                        return true;
                case 0:
                        return false;
                default:
                        return true;
        }
}
function insertDisabledInSelect(FormArr, inkey, value) {
        try {
                let result = [];
                if (!Array.isArray(FormArr) || !typeof inkey === 'string' || !typeof value == 'boolean') {
                        throw { 'msg': 'Invalid Data' }
                }
                result = FormArr.map((item) => {
                        if (item.name == inkey) {
                                item.props = Object.assign({}, { ...item.props }, { "disabled": value });
                        }
                        return item;
                });

                return result;
        }
        catch (e) {
                console.log(e);
        }
}

function insertEnabledInSelect(FormArr, inkey, value) {
        try {
                let result = [];
                if (!Array.isArray(FormArr) || !typeof value == 'boolean') {
                        throw { 'msg': 'Invalid Data' }
                }
                result = FormArr.map((item) => {
                        if ((item.name == inkey && typeof inkey === 'string') || (Array.isArray(inkey) && (inkey.includes(item.name)))) {
                                item.props = Object.assign({}, { ...item.props }, { "disabled": !value });
                        }
                        return item;
                });

                return result;
        }
        catch (e) {
                console.log(e);
        }
}

function godAdminCheck() {
        let roleId = this.getRoleId();
        if (roleId === resorceJSON.UserRole.godAdmin) {
                return true
        } else {
                return false
        }
}


function superAdminCheck() {
        let roleId = this.getRoleId();
        if (roleId === resorceJSON.UserRole.superAdmin) {
                return true
        } else {
                return false
        }
}

function mainStoreCheck() {
        let roleId = this.getRoleId();
        if (roleId === resorceJSON.UserRole.owner) {
                return true
        } else {
                return false
        }
}


function fileSizeValitation(file) {
        let constant = window.constant;
        let fileSize = file.size / 1024 / 1024;
        if (/\.(jpe?g|png|gif)$/i.test(file.name) && fileSize <= constant.FILESIZE) {
                return true;
        }
        else {
                return false;
        }

}

function fileIsInvalid(file) {
        let constant = window.constant;
        let fileSize = file.size / 1024 / 1024;
        if (!(/\.(jpe?g|png|gif)$/i.test(file.name))) {
                toastr.warning(window.strings.JEWEL.IMAGE_TYPE)
        }
        if (fileSize >= constant.FILESIZE) {
                toastr.warning(window.strings.JEWEL.JEWEL_IMAGE_SIZE);
        }
}


function handleSorting(sortingEnable, sortField) {
        let sortingObj = {};
        sortingObj.sortType = sortingEnable ? "ASC" : "DESC";
        sortingObj.fieldName = sortField ? sortField : '';
        return sortingObj;
}

function getParentStoreId() {
        let ciphertext = localStorage.getItem('user');
        let user = '';
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (user && user.data && user.data.UserStore[0] && user.data.UserStore[0].Store.parentStoreId) {
                        user = user.data.UserStore[0].Store.parentStoreId;
                } else {
                        user = "";
                }
        }
        return user;
}

function getParentStoreData() {
        let ciphertext = localStorage.getItem('user');
        let user = '';
        let parentStoreData = {};
        if (ciphertext) {
                var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
                user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (user) {
                        parentStoreData.storeId = user.data.UserStore[0].storeId;
                        //console.log("user",storeId);
                        parentStoreData.storeName = user.data.UserStore[0].Store.storeName;
                        //console.log("storeName",storeName);
                }
        }
        return parentStoreData;
}



function settingsCheck() {
        let roleId = this.getRoleId();
        if (roleId == this.godAdminCheck() || this.superAdminCheck()) {
                return true;
        } else {
                return false;
        }
}



