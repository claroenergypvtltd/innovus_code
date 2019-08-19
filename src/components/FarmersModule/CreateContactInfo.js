import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitContactInfo } from '../../actions/FarmersAction'
import { toastr } from 'react-redux-toastr'


class CreateContactInfo extends Component {

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            email: '',
            mobileNumber: '',
            area: '',
            city: '',
            state: '',
            postCode: '',
            errors: {},
            personalInfoData: this.props.getPersonalInfoData
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
            formData.append("name", this.state.personalInfoData.name);
            formData.append("address1", this.state.personalInfoData.address1);
            formData.append("address2", this.state.personalInfoData.address2);
            formData.append("image", this.state.personalInfoData.file);

            let stateForm = this.state;
            let statepersonalInfoData = this.state.personalInfoData;
            let self = this;

            if (stateForm.area && stateForm.city && stateForm.email && stateForm.mobileNumber && stateForm.state && stateForm.postCode && statepersonalInfoData.name &&
                statepersonalInfoData.address1 && statepersonalInfoData.address2 && statepersonalInfoData.file) {
                this.props.dispatch(SubmitContactInfo(formData)).then(resp => {
                    if (resp) {
                        self.props.childData(2);
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
                        <h3>{window.strings['FARMERS']['CONTACT_INFORMATION']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
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
                                                <button type="submit" className="btn btn-primary">Next Step</button>
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
        getPersonalInfoData: state && state.farmer && state.farmer.formDatas ? state.farmer.formDatas : []
    };
}



export default connect(mapStateToProps)(CreateContactInfo)