import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitPersonalAndContactInfo } from '../../actions/FarmersAction'
import { toastr } from 'react-redux-toastr'
import { path } from '../../constants'
import PropTypes from "prop-types";

class PersonalAndContactInfo extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            firstName: '',
            name: '',
            lastName: '',
            address1: '',
            address2: '',
            image: '',
            errors: {},
            tabKey: 1,
            file: {},
            email: '',
            mobileNumber: '',
            area: '',
            city: '',
            state: '',
            postCode: '',
            errors: {}
        }
    }

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
                image: file.name
            })
        }
        reader.readAsDataURL(file);
    }

    listPage = () => {
        this.context.router.history.push(path.user.list)
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            const formData = new FormData();

            formData.append("area", this.state.area);
            formData.append("city", this.state.city);
            formData.append("emailId", this.state.email);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("state", this.state.state);
            formData.append("postCode", this.state.postCode);
            formData.append("role", "farmer");
            formData.append("name", this.state.name);
            formData.append("address1", this.state.address1);
            formData.append("address2", this.state.address2);
            formData.append("image", this.state.file);

            let stateForm = this.state;
            // let statepersonalInfoData = this.state.personalInfoData;
            let self = this;

            if (stateForm.area && stateForm.city && stateForm.email && stateForm.mobileNumber && stateForm.state && stateForm.postCode && stateForm.name &&
                stateForm.address1 && stateForm.address2 && stateForm.file) {
                // this.props.dispatch(SubmitPersonalAndContactInfo(formData)).then(resp => {
                this.props.SubmitPersonalAndContactInfo(formData).then(resp => {
                    if (resp) {
                        // self.props.childData(2);
                        this.listPage();
                    }
                })
            } else {
                toastr.error(window.strings.MANDATORYFIELDSTEXT_PERSONAL_INFO);
            }
        })

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['PERS_AND_CONTACT']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">
                                            <label>{window.strings['FARMERS']['NAME']}</label>
                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />
                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['FARMERS']['NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_1']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_1']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address1
                                                })}
                                                name="address1"
                                                onChange={this.handleInputChange}
                                                value={this.state.address1}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address1 && <div className="mandatory">{window.strings['FARMERS']['ADDR_1'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_2']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_2']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address2
                                                })}
                                                name="address2"
                                                onChange={this.handleInputChange}
                                                value={this.state.address2}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address2 && <div className="mandatory">{window.strings['FARMERS']['ADDR_2'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['IMAGE']}</label>

                                            <input
                                                type="file"
                                                placeholder={window.strings['FARMERS']['IMAGE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleChangeImage}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['EMAIL']}</label>

                                            <input
                                                type="email"
                                                placeholder={window.strings['FARMERS']['EMAIL']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.email
                                                })}
                                                name="email"
                                                onChange={this.handleInputChange}
                                                value={this.state.email}
                                                required

                                            />

                                            {this.state.submitted && !this.state.email && <div className="mandatory">{window.strings['FARMERS']['EMAIL'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['PHON_NO']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['PHON_NO']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.mobileNumber
                                                })}
                                                name="mobileNumber"
                                                onChange={this.handleInputChange}
                                                value={this.state.mobileNumber}
                                                required

                                            />
                                            {this.state.submitted && !this.state.mobileNumber && <div className="mandatory">{window.strings['FARMERS']['PHON_NO'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['AREA']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['AREA']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.area
                                                })}
                                                name="area"
                                                onChange={this.handleInputChange}
                                                value={this.state.area}
                                                required

                                            />
                                            {this.state.submitted && !this.state.area && <div className="mandatory">{window.strings['FARMERS']['AREA'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['CITY']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['CITY']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.city
                                                })}
                                                name="city"
                                                onChange={this.handleInputChange}
                                                value={this.state.city}
                                                required

                                            />
                                            {this.state.submitted && !this.state.city && <div className="mandatory">{window.strings['FARMERS']['CITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['STATE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['STATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.state
                                                })}
                                                name="state"
                                                onChange={this.handleInputChange}
                                                value={this.state.state}
                                                required

                                            />
                                            {this.state.submitted && !this.state.state && <div className="mandatory">{window.strings['FARMERS']['STATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['POST_CODE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['POST_CODE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.postCode
                                                })}
                                                name="postCode"
                                                onChange={this.handleInputChange}
                                                value={this.state.postCode}
                                                required

                                            />
                                            {this.state.submitted && !this.state.postCode && <div className="mandatory">{window.strings['FARMERS']['POST_CODE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="button" className="btn btn-warning" onClick={this.listPage}>{window.strings.CANCEL}</button>
                                                <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    };
}



export default connect(mapStateToProps, { SubmitPersonalAndContactInfo })(PersonalAndContactInfo)