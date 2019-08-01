import CryptoJS from 'crypto-js';
import { phaseKey } from "../config/LocalConfig";

//Decrypt the encoded localstorage data
export const userData = () => {
    let ciphertext = localStorage.getItem('user');
    let user = '';
    if(ciphertext){
        var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), phaseKey);
        user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return user;
}