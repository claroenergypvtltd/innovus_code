import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitPersonalAndContactInfo } from '../../actions/FarmersAction'
import PropTypes from "prop-types";
import { fetchUsers } from '../../actions/UserAction';
import store from '../../store/store'
import { CONTACT_DETAILS, UPDATE_CONTACT_DETAILS } from '../../constants/actionTypes';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services';
import { utils } from '../../services/utils.services';
import { validation } from '../../libraries/formValidation'

class PersonalAndContactInfo extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            name: '',
            address1: '',
            address2: '',
            image: '',
            tabKey: 1,
            file: {},
            email: '',
            mobileNumber: '',
            city: '',
            state: '',
            pinCode: '',
            imagePreviewUrl: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.farmerId) {
            this.getUserList();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.signUpData && newProps.signUpData.contactDatas == "200") {
            store.dispatch({ type: CONTACT_DETAILS, contact: "" })
            this.listPage();
        }

        if (newProps.signUpData && newProps.signUpData.updateContactDatas == "200") {
            store.dispatch({ type: UPDATE_CONTACT_DETAILS, contact: "" })
            this.listPage();
        }

        if (newProps.userData && newProps.userData.userList) {
            let resData = newProps.userData.userList;
            let resAddr = newProps.userData.userList.address;
            if (resData && resAddr) {
                this.setState({
                    userId: resData.id, name: resData.name, email: resData.emailId, address1: resAddr.address1,
                    address2: resAddr.address2, image: resData.image, mobileNumber: resData.mobileNumber,
                    city: resAddr.city, state: resAddr.state, pinCode: resAddr.zipcode
                })
            }
        }
    }

    getUserList = () => {
        if (this.props.location && this.props.location.state && this.props.location.state.farmerId) {
            let user = {};
            user.userId = this.props.location.state.farmerId;
            user.isEdit = true;
            this.props.fetchUsers(user);
        }
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onhandleChangeImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                image: file.name,
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    listPage = () => {
        this.context.router.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            const formData = new FormData();

            formData.append("userId", this.state.userId);
            formData.append("city", this.state.city);
            formData.append("emailId", this.state.email);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("state", this.state.state);
            formData.append("pincode", this.state.pinCode);
            formData.append("role", "farmer");
            formData.append("name", this.state.name);
            formData.append("address1", this.state.address1);
            formData.append("address2", this.state.address2);
            if (this.state.file) {
                formData.append("image", this.state.file);
            }

            let stateForm = this.state;
            if (stateForm.city && stateForm.email && stateForm.mobileNumber && stateForm.state && stateForm.pinCode && stateForm.name &&
                stateForm.address1 && stateForm.address2 && stateForm.file) {
                if (validation.checkValidation("mobile", stateForm.mobileNumber) && validation.checkValidation("email", stateForm.email)) {
                    let updateUser = false;
                    debugger;
                    if (stateForm.userId) {
                        updateUser = true;
                    }
                    this.props.SubmitPersonalAndContactInfo(formData, updateUser)
                }
            }
        })

    }

    render() {
        const { errors, imagePreviewUrl } = this.state;

        let imagePreview;
        if (imagePreviewUrl) {
            imagePreview = <img className="pre-view" src={imagePreviewUrl} />
        } else {
            imagePreview = <img className="pre-view" src={imageBaseUrl + this.state.image} />
        }

        return (
            <div className="clearfix">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4>{window.strings['FARMERS']['PERS_AND_CONTACT']}</h4>
                        <div className="main-wrapper main-contact">
                            <h4 className="color-title sub-contact">Personal Information</h4>
                            <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                <div className="personal-info  col-md-6">
                                    <div className="row contact ">
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['NAME']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['NAME']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required
                                            />
                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['FARMERS']['NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['EMAIL']}</label>
                                            <input
                                                type="email"
                                                placeholder={window.strings['FARMERS']['EMAIL']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.email
                                                })}
                                                name="email"
                                                onChange={this.handleInputChange}
                                                value={this.state.email}
                                                required
                                            />
                                            {this.state.submitted && !this.state.email && <div className="mandatory">{window.strings['FARMERS']['EMAIL'] + window.strings['ISREQUIRED']}</div>}
                                            {/* !validation.checkValidation("mobile", this.state.mobileNumber) */}
                                            {this.state.submitted && this.state.email && !validation.checkValidation("email", this.state.email) && <div className="mandatory">Email is Invalid</div>}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['PHON_NO']}</label>
                                            <input
                                                type="number"
                                                placeholder={window.strings['FARMERS']['PHON_NO']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.mobileNumber
                                                })}
                                                name="mobileNumber"
                                                onChange={this.handleInputChange}
                                                value={this.state.mobileNumber}
                                                required
                                            />
                                            {this.state.submitted && !this.state.mobileNumber && <div className="mandatory">{window.strings['FARMERS']['PHON_NO'] + window.strings['ISREQUIRED']}</div>}
                                            {/* {this.state.submitted && this.state.mobileNumber && !this.state.mobileNumberValidate && <div className="mandatory">Mobile Number Invalid</div>} */}
                                            {this.state.mobileNumber && !validation.checkValidation("mobile", this.state.mobileNumber) && <div className="mandatory">Mobile Number Invalid</div>}
                                        </div>

                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['IMAGE']}</label>

                                            <input
                                                type="file"
                                                placeholder={window.strings['FARMERS']['IMAGE']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleChangeImage}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                            {imagePreview}
                                        </div>
                                        <div className="form-group col-md-6">
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-info col-md-6">
                                    <div className="row contact">
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['ADDR_1']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_1']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.address1
                                                })}
                                                name="address1"
                                                onChange={this.handleInputChange}
                                                value={this.state.address1}
                                                required
                                            />
                                            {this.state.submitted && !this.state.address1 && <div className="mandatory">{window.strings['FARMERS']['ADDR_1'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['ADDR_2']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_2']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.address2
                                                })}
                                                name="address2"
                                                onChange={this.handleInputChange}
                                                value={this.state.address2}
                                                required
                                            />
                                            {this.state.submitted && !this.state.address2 && <div className="mandatory">{window.strings['FARMERS']['ADDR_2'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['AREA']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['AREA']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.area
                                                })}
                                                name="area"
                                                onChange={this.handleInputChange}
                                                value={this.state.area}
                                                required
                                            />
                                            {this.state.submitted && !this.state.area && <div className="mandatory">{window.strings['FARMERS']['AREA'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['CITY']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['CITY']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.city
                                                })}
                                                name="city"
                                                onChange={this.handleInputChange}
                                                value={this.state.city}
                                                required
                                            />
                                            {this.state.submitted && !this.state.city && <div className="mandatory">{window.strings['FARMERS']['CITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['STATE']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['STATE']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.state
                                                })}
                                                name="state"
                                                onChange={this.handleInputChange}
                                                value={this.state.state}
                                                required
                                            />
                                            {this.state.submitted && !this.state.state && <div className="mandatory">{window.strings['FARMERS']['STATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>{window.strings['FARMERS']['POST_CODE']}</label>
                                            <input
                                                type="number"
                                                placeholder={window.strings['FARMERS']['POST_CODE']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.postCode
                                                })}
                                                name="pinCode"
                                                onChange={this.handleInputChange}
                                                value={this.state.pinCode}
                                                required
                                            />
                                            {this.state.submitted && !this.state.pinCode && <div className="mandatory">{window.strings['FARMERS']['POST_CODE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 bottom-section">
                                    <button type="button" className="btn btn-default" onClick={this.listPage}>{window.strings.CANCEL}</button>
                                    <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        signUpData: state.farmer,
        userData: state.user
    };
}



export default connect(mapStateToProps, { SubmitPersonalAndContactInfo, fetchUsers })(PersonalAndContactInfo)