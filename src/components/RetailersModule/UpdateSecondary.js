import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/login.scss';
import { Form, Row } from 'react-bootstrap';
import { path } from '../../constants';
import { updateStatusRetailer, SubmitRetailer, otpAuthentication } from '../../actions/SubmitRetailerAction';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import '../../assets/css/login.scss'
import classnames from 'classnames';
import { toastr } from '../../services/toastr.services'
import { validation } from '../../libraries/formValidation'

class UpdateSecondary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            instructionId: '',
            agentName: '',
            mobileNumbers: '',
            otp: '',
            verifyDone: false,
            errors: {}
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.status == 200) {
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            toastr.success(newProps.message);
            this.props.redirect()
            // this.props.onHide();
        }
    }
    handleChange = (e) => {
        e.target.name == "mobileNumbers" && e.target.value < 0 ? e.target.value = '' : this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        if (this.state.agentName && this.state.mobileNumbers && this.state.otp) {
            const formData = new FormData();
            formData.append("names", this.state.agentName);
            formData.append("mobileNumbers", this.state.mobileNumbers); //secondary Number
            formData.append("userId", this.props.Data.userId);
            formData.append("otp", this.state.otp);
            let obj = {
                userId: this.props.Data.userId,
                otp: this.state.otp,
                flag: 2
            }
            otpAuthentication(obj, "otpVerify").then(resp => {
                if (resp && resp.status == "200") {
                    if (validation.checkValidation('mobile', this.state.mobileNumbers)) {
                        this.props.SubmitRetailer(formData, true);
                    }
                }
            })
        }
    }
    listPath = (e) => {
        this.props.onCloseModal();
    }
    getOtpData = () => {
        let obj = {
            userId: this.props.Data.userId,
            mobileNumbers: this.state.mobileNumbers,
            flag: 2
        }
        otpAuthentication(obj, "resendOTP").then(resp => {
            if (resp && resp.data) {
                this.setState({ otpValue: resp.data.otp, otpText: true });
            }
        })
    }
    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="col-md-12 content form-adjust">
                    <div className="col-md-10">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group col-md-10">
                                <label>{window.strings.USERMANAGEMENT.SECONDARY_NAME}</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.agentName
                                    })}
                                    name="agentName"
                                    onChange={this.handleChange}
                                    value={this.state.agentName}
                                    required
                                />
                                {this.state.submitted && !this.state.agentName && <div className="mandatory">{window.strings['USERMANAGEMENT']['AGENT_NAME'] + window.strings['ISREQUIRED']}</div>}
                            </div>
                            <div className="d-flex">
                                <div className="form-group col-md-10 pt-2">
                                    <label>{window.strings.USERMANAGEMENT.SECONDARY_PHONE}</label>
                                    <input type="number"
                                        placeholder="Phone Number"
                                        className={classnames('form-control', {
                                            'is-invalid': errors.mobileNumbers
                                        })}
                                        rows="5"
                                        name="mobileNumbers"
                                        onChange={this.handleChange}
                                        value={this.state.mobileNumbers}
                                        required
                                    />
                                    {this.state.submitted && !this.state.mobileNumbers && <div className="mandatory">{window.strings['USERMANAGEMENT']['SECONDARY_PHONE'] + window.strings['ISREQUIRED']}</div>}
                                    {this.state.submitted && this.state.mobileNumbers && !validation.checkValidation('mobile', this.state.mobileNumbers) && <div className="mandatory">{window.strings['USERMANAGEMENT']['SECONDARY_PHONE'] + ' is Invalid'}</div>}
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-default otp-btn" onClick={this.getOtpData}>{window.strings.USERMANAGEMENT.SEND_OTP}</button>
                                </div>
                            </div>
                            {
                                this.state.otpText &&
                                <div className="form-group col-md-10 pt-2">
                                    <label>{window.strings.USERMANAGEMENT.ENTER_OTP}</label>
                                    <input type="number"
                                        placeholder="Enter OTP"
                                        className={classnames('form-control', {
                                            'is-invalid': errors.otp
                                        })}
                                        name="otp"
                                        onChange={this.handleChange}
                                        value={this.state.otp}
                                        required
                                    />
                                    {this.state.submitted && !this.state.otp && <div className="mandatory">{window.strings['USERMANAGEMENT']['ENTER_OTP'] + window.strings['ISREQUIRED']}</div>}
                                </div>
                            }
                        </form>
                    </div>
                    <div className="col-md-12 bottom-section">
                        <button type="button" className="btn btn-default mb-2" onClick={this.listPath}>{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    status: state.retailer.status,
    message: state.retailer.message
})

export default connect(mapStateToProps, { SubmitRetailer })(UpdateSecondary)