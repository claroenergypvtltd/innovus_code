import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import store from '../../store/store';
import { fetchRetailers, SubmitRetailer } from '../../actions/SubmitRetailerAction'
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants';


class TransferAgent extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            agentId: '',
            errors: {}
        }
    }

    componentDidMount() {

        this.getAgentList();
    }

    componentWillReceiveProps(newProps) {

        if (newProps && newProps.list && newProps.list.datas) {
            let selectlist = newProps.list.datas;

            this.setState({
                agentData: selectlist
            })

        }

        if (newProps && newProps.status == "200") {
            let redrctpath = path.user.list;
            this.context.router.history.push(redrctpath);
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            // this.props.getRetailerList();
            this.listPath('AgentAssignsuccess');
        }

    }

    getAgentList = () => {
        let user = {};
        user.roleId = 4;
        this.props.fetchRetailers(user);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    listPath = (type) => {
        this.props.onCloseModal(type);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        let userData = [];

        this.props.selectedDatas && this.props.selectedDatas.map(item => {
            userData.push(item.id)
        })

        if (this.state.agentId && userData) {
            const formData = new FormData();
            formData.append("agentId", this.state.agentId);
            formData.append("flag", 1);
            formData.append("userId", userData);
            this.props.SubmitRetailer(formData, true)
        }

    }




    render() {
        const { errors } = this.state;

        const agentDropDown = this.state.agentData && this.state.agentData.map((item, index) => {
            return <option key={index}
                value={item.agentId}> {item.name}</option>
        });

        return (
            <div className="update-agent">
                <div className="p-3">
                    <div className="row">
                        <form onSubmit={this.handleSubmit} noValidate className="col-md-6">

                            <div className="form-group">
                                <label>{window.strings['USERMANAGEMENT']['AGENT_LABEL']}</label>
                                <select required name="agentId" className="form-control" value={this.state.agentId} onChange={this.handleInputChange} >
                                    <option value="0">{window.strings['USERMANAGEMENT']['SELECT_AGENT']}</option>
                                    {agentDropDown}
                                </select>
                                {this.state.submitted && !this.state.agentId && <div className="mandatory">{window.strings['USERMANAGEMENT']['AGENT_LABEL'] + window.strings['ISREQUIRED']}</div>}
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

export default connect(mapStateToProps, { fetchRetailers, SubmitRetailer })(TransferAgent)
