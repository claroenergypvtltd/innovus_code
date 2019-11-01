import React, { Component } from 'react';
import { TableData } from '../../shared/Table'
import { path } from '../../constants';
import PropTypes from 'prop-types';
import { fetchSalesAgent } from '../../actions/salesAgentAction';
import { connect } from 'react-redux';
import { ReactPagination, SearchBar } from '../../shared'
import { resorceJSON } from '../../libraries'


class FetchSalesAgent extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            currentPage: 1,
            itemPerPage: 3,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            TableHead: ["Created On", "Agent ID", "Agent Name", "Phone Number", "Surveying Area", "dcCode", "Actions"]
        }
    }

    componentDidMount() {
        this.getSalesAgentList();
    }

    getSalesAgentList = () => {
        let obj = {
            roleId: "4",
            pages: this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            row: this.state.itemPerPage,
            search: this.state.search
        }

        this.props.fetchSalesAgent(obj);
    }

    componentWillReceiveProps(newProps) {
        debugger;
        if (newProps && newProps.agentData && newProps.agentData.Lists.datas) {
            this.setState({
                salesAgentData: newProps.agentData.Lists.datas, pageCount: newProps.agentData.Lists.totalCount / this.state.itemPerPage
            })
        }
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getSalesAgentList();
            });
        }
    }

    formPath = () => {
        // this.props.history.push(path.crop.add);
        this.context.router.history.push('user/salesAgent/add');

    }


    searchResult = (e) => {

        e.preventDefault();
        if (this.state.search) {
            // let serObj = {
            //     "search": this.state.search
            // };
            this.getSalesAgentList();
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getSalesAgentList();
            });
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    itemEdit = (id) => {
        debugger;
        this.context.router.history.push({ pathname: 'user/salesAgent/edit/' + id, state: { salesAgentId: id } });
    }

    render() {

        let salesAgentList = this.state.salesAgentData && this.state.salesAgentData.map((item, index) => {
            let createdDate = item.created.split("T");
            return { "itemList": [createdDate[0], item.agentId, item.name, item.mobileNumber, item.surveyingArea, item.dcCode], "itemId": item.id }
        })

        return (
            <div>
                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                <button className="common-btn col-md-4" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Sales Agent</button>
                <TableData TableHead={this.state.TableHead} TableContent={salesAgentList} handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    agentData: state.salesAgent
})


export default connect(mapStateToProps, { fetchSalesAgent })(FetchSalesAgent)