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
import { SubmitRetailer } from '../../actions/SubmitRetailerAction';


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

    removeSecondary = (data) => {
        let message = "Are you sure you want to Remove ?";
        const toastrConfirmOptions = {
            onOk: () => { this.removeRetailer(data.userId, data.id) },
            onCancel: () => {
            }
        };
        toastr.confirm(message, toastrConfirmOptions, "Remove")
    }

    removeRetailer = (userId, Id) => {
        const formData = new FormData();
        formData.append("mobileNumbers", '');
        formData.append("names", '');
        formData.append("userId", userId);
        formData.append("flag", 5);
        formData.append("id", Id);
        this.props.SubmitRetailer(formData, true);
    }
    render() {
        let secondaryList = this.state.secondaryData && this.state.secondaryData.map((item, index) => {
            return { "itemList": [item.name, item.mobileNumber], "itemId": { userId: item.userId, id: item.id } }
        })
        return (
            <div className="mt-4">
                <TableData TableHead={this.state.TableHead} TableContent={secondaryList} handleDelete={this.removeSecondary} />
                {/* <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} /> */}
                {/* </div> */}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    // agentData: state.salesAgent
})


export default connect(mapStateToProps, { SubmitRetailer })(ViewSecondary)