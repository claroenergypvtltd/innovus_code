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
        this.getAgentList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.status == "200") {
            let redrctpath = path.user.list;
            this.context.router.history.push(redrctpath);
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            this.listPath('AgentAssignsuccess');
        }
    }

    getAgentList = () => {
        let user = {};
        user.roleId = 4;
        fetchAgent(user).then(resp => {
            if (resp && resp.datas) {
                this.setState({
                    agentData: resp.datas
                })
            }
        });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    listPath = (e) => {
        this.props.history.push(path.appSetting.listTollFree);
    }

    handleSubmit = () => {
        this.setState({ submitted: true })
        if (this.state.phoneNumber) {
            // if (this.state.phoneNumber.length = 10) {
            const formData = new FormData();
            formData.append("type", "contact");
            formData.append("fileName", "contact");
            formData.append("file", this.state.phoneNumber);
            SubmitEcom(formData).then(resp => {
                if (resp) {
                    toastr.success(resp.message);
                    this.listPath();
                }
            })
            // } else {
            //     toastr.error("Phone number must be 10 Digit")
            // }
        } else {
            toastr.error("Mandatory Field Missing")
        }
    }

    render() {
        const { errors } = this.state;

        const agentDropDown = this.state.agentData && this.state.agentData.map((item, index) => {
            return <option key={index}
                value={item.agentId}> {item.name}</option>
        });

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
    list: state.retailer.Lists ? state.retailer.Lists : [],
    status: state.retailer.status,
})

export default connect(mapStateToProps, { fetchRetailers, SubmitRetailer, fetchAgent })(CreateTollFree)
