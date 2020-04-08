import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import store from '../../store/store';
import { fetchRetailers, SubmitRetailer, fetchAgent } from '../../actions/SubmitRetailerAction'
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { toastr } from 'react-redux-toastr'
import { path } from '../../constants';
import { SubmitEcom, getEcom } from '../../actions/appSettingAction'


class CreateTollFree extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            agentId: '',
            phoneNumber: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.getTollFreeData(this.props.location.state.id);
        }

    }

    getTollFreeData = (id) => {
        getEcom('contact', id).then(resp => {
            if (resp && resp.data) {
                this.setState({ phoneNumber: resp.data.description })
            }
        })
    }

    handleInputChange = (e) => {
        if (e.target.value > 0) {
            this.setState({ [e.target.name]: e.target.value })
        } else {
            this.setState({ [e.target.name]: '' })
        }

    }


    listPath = (e) => {
        this.props.history.push(path.appSetting.listTollFree);
    }

    handleSubmit = () => {
        this.setState({ submitted: true })
        if (this.state.phoneNumber) {
            var phNumber = this.state.phoneNumber;
            let edit = false
            if (phNumber.length == 10) {
                const formData = new FormData();
                formData.append("type", "contact");
                formData.append("fileName", this.state.phoneNumber);
                if (this.props.location && this.props.location.state && this.props.location.state.id) {
                    formData.append("id", this.props.location.state.id);
                    edit = true;
                }
                SubmitEcom(formData, edit).then(resp => {
                    if (resp) {
                        toastr.success(resp.message);
                        this.listPath();
                    }
                })
            } else {
                toastr.error("Phone number must be 10 Digit")
            }
        } else {
            toastr.error("Mandatory Field Missing")
        }
    }

    render() {

        return (
            <div>
                <h4 className="user-title">{window.strings.APPSETTING.ADDTOLLFREENUMBER}</h4>
                <div className="main-wrapper p-3">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                            <div className="form-group col-md-6">
                                <label>{window.strings['USERMANAGEMENT']['PHONE_NUMBER']}</label>
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    className={classnames('form-control')}
                                    name="phoneNumber"
                                    onChange={this.handleInputChange}
                                    value={this.state.phoneNumber}
                                    required
                                />
                                {this.state.submitted && !this.state.phoneNumber && <div className="mandatory">{window.strings['USERMANAGEMENT']['PHONE_NUMBER'] + window.strings['ISREQUIRED']}</div>}
                            </div>
                        </form>

                    </div>
                    <div className="col-md-12 bottom-section">
                        <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    // list: state.retailer.Lists ? state.retailer.Lists : [],
    // status: state.retailer.status,
})

export default connect(mapStateToProps, { fetchRetailers, SubmitRetailer, fetchAgent })(CreateTollFree)
