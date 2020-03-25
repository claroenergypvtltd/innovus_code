import React, { Component } from 'react';
import classnames from 'classnames';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { submitSalesAgent, fetchSalesAgent, DisableAgent } from '../../actions/salesAgentAction';
import { connect } from 'react-redux';
import { AGENT_CREATE_SUCCESS, AGENT_UPDATE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import { path } from '../../constants';
import { toastr } from '../../services';
import { validation } from '../../libraries/formValidation'
import { fetchDcList } from '../../actions/dcAction'
import Select from 'react-select';

class CreateSalesAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobileNumber: '',
            emailId: '',
            surveyingArea: '',
            editDatas: [],
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.salesAgentId) {
            this.setState({ salesAgentId: this.props.location.state.salesAgentId })
            this.getEditData();
        }
        this.getDcData()
    }

    getEditData = () => {
        let obj = {
            roleId: "4",
            agentId: this.props.location.state.salesAgentId,
            isEdit: true
        }

        this.props.fetchSalesAgent(obj);
    }
    getDcData = () => {
        let pages = 0
        let obj = {
            pages: pages
        }
        this.props.fetchDcList(obj)
    }

    componentWillReceiveProps(newProps) {
        if (this.state.salesAgentId && newProps && newProps.agentData && newProps.agentData.Lists) {
            let editDatas = newProps.agentData.Lists
            let dcCodeObj = { "label": editDatas.dcCode, "value": editDatas.dcCode }
            this.setState({
                editDatas, name: editDatas.name, mobileNumber: editDatas.mobileNumber,
                surveyingArea: (!editDatas.surveyingArea) ? "" : editDatas.surveyingArea,
                dcCodeObj: dcCodeObj, dcCode: editDatas.dcCode, emailId: editDatas.emailId, agentId: editDatas.agentId
            })
        }

        if (newProps.agentData && newProps.agentData.createdStatus == "200") {
            store.dispatch({ type: AGENT_CREATE_SUCCESS, resp: "" })
            this.redirectPage();
        }
        if (newProps.agentData && newProps.agentData.updatedStatus == "200") {
            store.dispatch({ type: AGENT_UPDATE_SUCCESS, resp: "" })
            this.redirectPage();
        }
        if (newProps && newProps.dcData && newProps.dcData.Lists && newProps.dcData.Lists.datas) {
            this.setState({ dcCodeData: newProps.dcData.Lists.datas })
        }

    }

    handleInputChange = (e) => {
        if (e.target.name == "mobileNumber") {
            let mNo = e.target.value > 0 ? e.target.value : '';
            this.setState({ [e.target.name]: mNo })
        } else {
            e.target.value && e.target.value[0].includes(" ") ? e.target.value = '' : this.setState({ [e.target.name]: e.target.value });
        }
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.user.list, state: { tabNumber: 1, salesAgentSearchDatas: "backTrue" } });
    }

    handleDisable = (data) => {
        let message = window.strings.DISABLE_AGENT;
        const toastrConfirmOptions = {
            onOk: () => { this.disableAgent(data) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DISABLE_CONFIRM);
    }

    disableAgent = (id) => {
        DisableAgent(id).then(resp => {
            if (resp && resp.status) {
                this.redirectPage();
            }
        });
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value })
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
            formData.append("surveyingArea", this.state.surveyingArea);
            formData.append("dcCode", this.state.dcCode);
            formData.append("role", "agent");
            let isEdit = false;

            if (this.props.location && this.props.location.state && this.props.location.state.salesAgentId) {
                formData.append("userId", this.props.location.state.salesAgentId);
                isEdit = true
            }
            if (validation.checkValidation('email', this.state.emailId) && validation.checkValidation('mobile', this.state.mobileNumber)) {
                this.props.submitSalesAgent(formData, isEdit);
            }
        }
    }

    render() {
        const { errors } = this.state;
        let dcData = []
        this.state.dcCodeData && this.state.dcCodeData.map(item => {
            let obj = { "label": item.dcCode, "value": item.dcCode }
            dcData.push(obj)
        })
        return (
            <div className="clearfix">
                <div >
                    <div className="row">
                        <div className="col-md-9">
                            <h4 className="user-title">{this.state.salesAgentId ? window.strings['SALES_AGENT']['EDIT_AGENT'] : window.strings['SALES_AGENT']['ADD_AGENT']}</h4>
                        </div>
                        {this.state.salesAgentId && <div className="col-md-3 text-right">
                            <button className="disable-btn" onClick={() => this.handleDisable(this.state.agentId)} > Disable</button>
                        </div>
                        }
                    </div>
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
                                        maxLength='50'
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
                                        value={this.state.emailId}
                                        required
                                    />
                                    {this.state.submitted && !this.state.emailId && <div className="mandatory">{window.strings['SALES_AGENT']['EMAIL'] + window.strings['ISREQUIRED']}</div>}
                                    {/* {this.state.validation == false && <div className="mandatory">Enter valid Email </div>} */}
                                    {this.state.submitted && this.state.emailId && !validation.checkValidation("email", this.state.emailId) && <div className="mandatory">Email is Invalid</div>}
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
                                    {this.state.submitted && this.state.mobileNumber && !validation.checkValidation("mobile", this.state.mobileNumber) && <div className="mandatory">Mobile Number Invalid</div>}
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

                                    <Select className="state-box"
                                        styles={{
                                            control: base => ({
                                                ...base,
                                                borderColor: 'hsl(0,0%,80%)',
                                                boxShadow: '#FE988D',
                                                '&:hover': {
                                                    borderColor: '#FE988D'
                                                }
                                            }),
                                            placeholder: base => ({
                                                color: '#9EA0B7'
                                            })
                                        }}
                                        value={this.state.dcCodeObj}
                                        onChange={(e) => this.handleDcCodeChange(e)}
                                        options={dcData}
                                        placeholder="--Select DC Code--"
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
    agentData: state.salesAgent,
    dcData: state.dc
})

export default connect(mapStateToProps, { submitSalesAgent, fetchSalesAgent, fetchDcList })(CreateSalesAgent)