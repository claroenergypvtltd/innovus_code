import React, { Component } from 'react';
import { TableData } from '../../shared/Table'
import { path } from '../../constants';
import PropTypes from 'prop-types';
import { fetchSalesAgent, getDcCodeData } from '../../actions/salesAgentAction';
import { connect } from 'react-redux';
import { ReactPagination, SearchBar } from '../../shared'
import { resorceJSON } from '../../libraries'
import Select from 'react-select';


class FetchSalesAgent extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            advanceSearch: false,
            dcCode: '',
            TableHead: ["Created On", "Agent ID", "Agent Name", "Phone Number", "Surveying Area", "DC Code", "Actions"]
        }
    }

    componentDidMount() {
        this.getDCData();
        this.getSalesAgentList();
    }

    getSalesAgentList = () => {
        let obj = {
            roleId: "4",
            pages: this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            row: this.state.itemPerPage,
            search: this.state.search,
            dcCode: this.state.dcCode
        }

        this.props.fetchSalesAgent(obj);
    }

    getDCData = () => {

        let obj = {
            search: this.state.dcCode
        }
        getDcCodeData(obj).then(resp => {
            if (resp) {

                this.setState({ dcCodeData: resp })
            }
        })
    }

    componentWillReceiveProps(newProps) {
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
            this.setState({ currentPage: 1 }, () => {
                this.getSalesAgentList();
            })
        }
    }

    resetSearch = () => {
        if (this.state.search || this.state.dcCodeObj || this.state.search == '') {
            this.setState({ search: '', dcCodeObj: '', dcCode: '' }, () => {
                this.getSalesAgentList();
            });
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    itemEdit = (id) => {
        this.context.router.history.push({ pathname: 'user/salesAgent/edit/' + id, state: { salesAgentId: id } });
    }

    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }

    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value, currentPage: 1 }, () => { this.getSalesAgentList() })
    };

    render() {
        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]

        this.state.dcCodeData && this.state.dcCodeData.map((item) => {

            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })

        let salesAgentList = this.state.salesAgentData && this.state.salesAgentData.map((item, index) => {
            let createdDate = item.created.split("T");
            return { "itemList": [createdDate[0], item.agentId, item.name, item.mobileNumber, item.surveyingArea == "undefined" || item.surveyingArea == "" ? '-' : item.surveyingArea, item.dcCode], "itemId": item.id }
        })

        return (
            <div className="mt-4">
                <div className="retailersearchdiv">
                    {/* <div d-flex justify-content-end> */}
                    <SearchBar searchclassName="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                    <button className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Advance Search' : '+  Advance Search'}</button>
                    <div className="retail-reset">
                        <button type="button" className="reset ml-2" onClick={this.resetSearch}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div id="menu">
                    <div className="assign-box">
                        {/* <button className="assign-btn" onClick={this.onOpenModal} ><i className="fa fa-plus sub-plus"></i>
                            {window.strings.USERMANAGEMENT.ASSIGN_TRANSFER_AGENT} */}
                        <button className="assign-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Sales Agent</button>
                        {/* </button> */}
                    </div>

                    {this.state.advanceSearch &&
                        <div className="main-filter">
                            <div className="row">
                                <div className="col-md-4 code-filter"><label className="label-title">DC Code:</label>
                                    {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                    <Select className="state-box ml-4"
                                        styles={{
                                            control: base => ({
                                                ...base,
                                                borderColor: 'hsl(0,0%,80%)',
                                                boxShadow: '#FE988D',
                                                '&:hover': {
                                                    borderColor: '#FE988D'
                                                }
                                            })
                                        }}
                                        value={this.state.dcCodeObj}
                                        onChange={(e) => this.handleDcCodeChange(e)}
                                        options={dcData}
                                        placeholder="--Select DC Code--"
                                    />
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <TableData TableHead={this.state.TableHead} TableContent={salesAgentList} handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
                {/* </div> */}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    agentData: state.salesAgent
})


export default connect(mapStateToProps, { fetchSalesAgent })(FetchSalesAgent)