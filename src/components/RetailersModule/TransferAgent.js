import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import store from '../../store/store';
import { fetchRetailers, SubmitRetailer } from '../../actions/SubmitRetailerAction'
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { toastr } from '../../services/toastr.services'


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
        debugger;
        this.getAgentList();
    }

    componentWillReceiveProps(newProps) {
        debugger;
        if (newProps && newProps.list && newProps.list.datas) {
            let selectlist = newProps.list.datas;

            this.setState({
                agentData: selectlist
            })

        }

        if (newProps && newProps.status == "200") {
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            this.props.onCloseModal();
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

    listPath = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        let userData = [];

        this.props.selectedDatas && this.props.selectedDatas.map(item => {
            userData.push(item.id)
        })

        debugger;


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
                value={item.id}> {item.name}</option>
        });

        return (
            <div className="irrigation-setting">
                {/* <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">Transfer Agent</h4>
                    </div>
                </div> */}
                <div className="main-wrapper p-3">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                            <div className="form-group col-md-6">
                                <label>{window.strings['SETTING']['STATE_LABEL']}</label>
                                <select required name="agentId" className="form-control" value={this.state.agentId} onChange={this.handleInputChange} >
                                    <option value="0">{window.strings['SETTING']['SELECT_STATE']}</option>
                                    {agentDropDown}
                                </select>
                                {this.state.submitted && !this.state.agentId && <div className="mandatory">{window.strings['SETTING']['STATE_LABEL'] + window.strings['ISREQUIRED']}</div>}
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
