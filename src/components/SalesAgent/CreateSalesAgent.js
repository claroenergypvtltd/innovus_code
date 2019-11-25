import React, { Component } from 'react';
import classnames from 'classnames';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { submitSalesAgent, fetchSalesAgent } from '../../actions/salesAgentAction';
import { connect } from 'react-redux';
import { AGENT_CREATE_SUCCESS, AGENT_UPDATE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import { path } from '../../constants';


class CreateSalesAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobileNumber: '',
            emailId: '',
            editDatas: [],
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.salesAgentId) {
            this.setState({ salesAgentId: this.props.location.state.salesAgentId })
            this.getEditData();
        }
    }

    getEditData = () => {
        let obj = {
            roleId: "4",
            agentId: this.props.location.state.salesAgentId,
            isEdit: true
        }

        this.props.fetchSalesAgent(obj);
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.agentData && newProps.agentData.Lists) {
            let editDatas = newProps.agentData.Lists
            this.setState({ editDatas, name: editDatas.name, mobileNumber: editDatas.mobileNumber, surveyingArea: editDatas.surveyingArea == "undefined" || editDatas.surveyingArea == "null" ? "" : editDatas.surveyingArea, dcCode: editDatas.dcCode, emailId: editDatas.emailId })
        }

        if (newProps.agentData && newProps.agentData.createdStatus == "200") {
            store.dispatch({ type: AGENT_CREATE_SUCCESS, resp: "" })
            this.redirectPage();
        }
        if (newProps.agentData && newProps.agentData.updatedStatus == "200") {
            store.dispatch({ type: AGENT_UPDATE_SUCCESS, resp: "" })
            this.redirectPage();
        }

    }

    handleInputChange = (e) => {
        e.charCode == 32 && e.target.value == ' ' || e.target.value[0] == ' ' ? e.target.value = ''
            : this.setState({ [e.target.name]: e.target.value });
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.user.list, state : {tabNumber: 1, salesAgentSearchDatas: "backTrue"} });
        // this.context.router.history.push({ pathname: path.user.list, state: { retlrbckTrack: "backTrue" } })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (this.state.name && this.state.mobileNumber && this.state.dcCode && this.state.emailId) {
            const formData = new FormData();
            if (this.state.salesAgentId) {
                if (this.state.name != this.state.editDatas.name) {
                    formData.append("name", this.state.name);
                }
            } else {
                formData.append("name", this.state.name);
            }
            formData.append("emailId", this.state.emailId);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("surveyingArea", this.state.surveyingArea ? this.state.surveyingArea : null);
            formData.append("dcCode", this.state.dcCode);
            formData.append("role", "agent");

            let isEdit = false;

            if (this.props.location && this.props.location.state && this.props.location.state.salesAgentId) {
                formData.append("userId", this.props.location.state.salesAgentId);
                isEdit = true
            }

            this.props.submitSalesAgent(formData, isEdit);

        }

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="row clearfix">
                <div className="col-md-12">
                    <h4 className="user-title">{this.state.salesAgentId ? window.strings['SALES_AGENT']['EDIT_AGENT'] : window.strings['SALES_AGENT']['ADD_AGENT']}</h4>
                    <div className="col-md-12 main-wrapper">
                        <div className="create-agent col-md-6">
                            <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">
                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['AGENT_NAME'] + ' *'}</label>

                                    <input
                                        type="text"
                                        placeholder="Agent Name"
                                        className={classnames('form-control', {
                                            'is-invalid': errors.name
                                        })}
                                        name="name"
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleInputChange}
                                        value={this.state.name}
                                        required
                                    />
                                    {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['SALES_AGENT']['AGENT_NAME'] + window.strings['ISREQUIRED']}</div>}
                                </div>

                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['EMAIL'] + ' *'}</label>

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className={classnames('form-control', {
                                            'is-invalid': errors.emailId
                                        })}
                                        name="emailId"
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleInputChange}
                                        value={this.state.emailId}
                                        required
                                    />
                                    {this.state.submitted && !this.state.emailId && <div className="mandatory">{window.strings['SALES_AGENT']['EMAIL'] + window.strings['ISREQUIRED']}</div>}
                                </div>

                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['PHON_NO'] + ' *'}</label>

                                    <input
                                        type="number"
                                        placeholder={window.strings['SALES_AGENT']['PHON_NO']}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.mobileNumber
                                        })}
                                        name="mobileNumber"
                                        onChange={this.handleInputChange}
                                        value={this.state.mobileNumber}
                                        required

                                    />
                                    {this.state.submitted && !this.state.mobileNumber && <div className="mandatory">{window.strings['SALES_AGENT']['PHON_NO'] + window.strings['ISREQUIRED']}</div>}
                                </div>

                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['SURVEY_AREA']}</label>

                                    <input
                                        type="text"
                                        placeholder={window.strings['SALES_AGENT']['SURVEY_AREA']}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.surveyingArea
                                        })}
                                        name="surveyingArea"
                                        onChange={this.handleInputChange}
                                        value={this.state.surveyingArea}
                                        required

                                    />
                                    {/* {this.state.submitted && !this.state.surveyingArea && <div className="mandatory">{window.strings['SALES_AGENT']['SURVEY_AREA'] + window.strings['ISREQUIRED']}</div>} */}
                                </div>

                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['DC_CODE'] + ' *'}</label>

                                    <input
                                        type="text"
                                        placeholder={window.strings['SALES_AGENT']['DC_CODE']}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.dcCode
                                        })}
                                        name="dcCode"
                                        onChange={this.handleInputChange}
                                        value={this.state.dcCode}
                                        required

                                    />
                                    {this.state.submitted && !this.state.dcCode && <div className="mandatory">{window.strings['SALES_AGENT']['DC_CODE'] + window.strings['ISREQUIRED']}</div>}
                                </div>

                            </form>
                        </div>
                        <div className="col-md-12 bottom-section">
                            <button type="button" className="btn btn-default mb-2" onClick={this.redirectPage}>{window.strings.CANCEL}</button>
                            <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    agentData: state.salesAgent
})


export default connect(mapStateToProps, { submitSalesAgent, fetchSalesAgent })(CreateSalesAgent)