import React, { Component } from 'react';
import { TableData } from '../../shared/Table'
import { path } from '../../constants';
import PropTypes from 'prop-types';
import { fetchSalesAgent, getDcCodeData } from '../../actions/salesAgentAction';
import { connect } from 'react-redux';
import { ReactPagination, SearchBar } from '../../shared'
import { resorceJSON } from '../../libraries'
import Select from 'react-select';
import { toastr } from '../../services/toastr.services'


class ViewSecondary extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Secondary Name", "Secondary Phone"]
        }
    }

    componentDidMount() {
        this.setState({ secondaryData: this.props.Data })
    }

    componentWillReceiveProps(newProps) {
        // if (newProps && newProps.agentData && newProps.agentData.Lists.datas) {
        //     this.setState({
        //         salesAgentData: newProps.agentData.Lists.datas, pageCount: newProps.agentData.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.agentData.Lists.totalCount
        //     })
        // }
    }

    removeSecondary = (userId, Id) => {
        let message = "Are you sure you want to Remove ?";
        const toastrConfirmOptions = {
            onOk: () => { this.removeRetailer(userId, Id) },
            onCancel: () => {
            }
        };
        toastr.confirm(message, toastrConfirmOptions, "Remove")
    }

    removeRetailer = (userId, Id) => {
        const formData = new FormData();
        formData.append("mobileNumbers", '');
        formData.append("names", '');
        formData.append("userId", Id);
        formData.append("flag", 5);
        formData.append("id", userId);
        this.props.SubmitRetailer(formData, true);
    }

    render() {
        let secondaryList = this.state.secondaryData && this.state.secondaryData.map((item, index) => {
            return { "itemList": [item.name, item.mobileNumber], "itemId": item.id }
        })

        return (
            <div className="mt-4">
                <TableData TableHead={this.state.TableHead} TableContent={secondaryList} handleEdit={this.itemEdit} handleDelete={this.removeSecondary} />
                {/* <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} /> */}
                {/* </div> */}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    // agentData: state.salesAgent
})


export default connect(mapStateToProps)(ViewSecondary)