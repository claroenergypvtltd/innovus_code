import validationRules from './validationRules'

export const validation = {};
validation.checkValidation = checkValidation;

const FormErrors = {
    cPasswordValid: true,
    passwordValid: true,
    emailValid: true,
    phoneNumValid: true,
    userName: true,
    email: true,
    password: true,
    mobile: true,
    confirmPassword: true,
    city: true,
    state: true,
    postalCode: true,
    storeName: true,
    storeImage: true,
    code: true
};

function checkValidation(fieldName, value, state) {
    switch (fieldName) {
        case 'password':
            let cpvalid = state.password === state.confirmPassword ? true : false;
            let pvalid = value ? validationRules.validationPasswordRegx(value) : false;
            FormErrors.cPasswordValid = cpvalid;
            FormErrors.passwordValid = pvalid;
            FormErrors.password = state.password !== '' ? true : false;

            // return FormErrors;
            break;
        case 'confirmPassword':
            let valid = state.password === state.confirmPassword ? true : false;
            FormErrors.cPasswordValid = valid;
            FormErrors.confirmPassword = state.confirmPassword !== '' ? true : false;
            // return FormErrors;
            break;
        case 'email':
            let email = value ? validationRules.email(value) : 'invalidEmial';
            let evalid = email === "invalidEmial" ? false : true;
            FormErrors.emailValid = evalid;
            // FormErrors.email = state.email !== '' ? true : false;
            return evalid;
            break;
        case 'mobile':
            let phoneNum = value.replace("+", "");
            debugger;
            let phoneNumValid = phoneNum ? (value.length === 10 ? true : false) : false;
            FormErrors.phoneNumValid = phoneNumValid;
            // FormErrors.mobile = state.mobile !== '' ? true : false;
            return phoneNumValid;
            break;
        case 'city':
            FormErrors.city = state.Address.city !== '' ? true : false;
            //  return FormErrors;
            break;
        case 'state':
            FormErrors.state = state.Address.state !== '' ? true : false;
            //  return FormErrors;
            break;
        case 'postalCode':
            FormErrors.postalCode = state.postalCode !== '' ? true : false;
            //  return FormErrors;
            break;
        case 'userName':
            FormErrors.userName = state.userName !== '' ? true : false;
            return FormErrors;
            break;
        case 'storeName':
            FormErrors.storeName = state.storeName !== '' ? true : false;
            let errors = {
                storeName: FormErrors.storeName,
                storeImage: FormErrors.storeImage
            }
            //  return errors;
            break;
        case 'storeImage':
            FormErrors.storeImage = state.storeImage !== '' ? true : false;
            let error = {
                storeName: FormErrors.storeName,
                storeImage: FormErrors.storeImage
            }
            //  return error;
            break;
        case 'code':
            FormErrors.code = state.code !== '' ? true : false;
            // return FormErrors;
            break;
        default:
            return FormErrors;
    }
    return FormErrors;
}
