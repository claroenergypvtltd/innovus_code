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
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            advanceSearch: false,
            dcCode: '',
            TableHead: ["Created On", "Agent ID", "Agent Name", "Phone Number", "Surveying Area", "Email", "DC Code", "Actions"]
        }
    }

    componentDidMount() {
        if (this.context.router.route.location && this.context.router.route.location.state &&
            this.context.router.route.location.state.salesAgentSearchDatas == "backTrue" && sessionStorage.salesAgentSearchDatas
            && !this.state.salesAgentId) {
            var salesAgentSearchDatas = JSON.parse(sessionStorage.salesAgentSearchDatas);
            this.setState({ dcCodeObj: salesAgentSearchDatas.dcCodeObj, dcCode: salesAgentSearchDatas.dcCode, search: salesAgentSearchDatas.search, advanceSearch: true, currentPage: salesAgentSearchDatas.pages }, () => {
                this.getDCData();
                this.getSalesAgentList();
            });
        } else {
            this.getDCData();
            this.getSalesAgentList();
        }
    }

    getSalesAgentList = (type) => {
        let pages = 0;
        if (type == "onSearch") {
            this.setState({ currentPage: 0 }, () => {
                pages = pages
            })
        } else {
            pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO
        }
        let obj = {
            roleId: "4",
            pages: pages,
            row: this.state.itemPerPage,
            search: this.state.search,
            dcCode: this.state.dcCode,
            dcCodeObj: this.state.dcCodeObj
        }
        sessionStorage.setItem('salesAgentSearchDatas', JSON.stringify(obj));

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
                salesAgentData: newProps.agentData.Lists.datas, pageCount: newProps.agentData.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.agentData.Lists.totalCount
            })
        }
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
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
            this.setState({ currentPage: 0 }, () => {
                this.getSalesAgentList();
            })
        }
    }

    resetSearch = () => {
        if (this.state.search || this.state.dcCodeObj || this.state.search == '') {
            sessionStorage.removeItem('salesAgentSearchDatas');
            this.setState({ search: '', dcCodeObj: '', dcCode: '', currentPage: 0 }, () => {
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
        this.setState({ dcCodeObj: Data, dcCode: Data.value }, () => {
            //this.getSalesAgentList() 
        })
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    }

    render() {
        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]

        this.state.dcCodeData && this.state.dcCodeData.map((item) => {

            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })

        let salesAgentList = this.state.salesAgentData && this.state.salesAgentData.map((item, index) => {
            let createdDate = item.created.split("T");
            return { "itemList": [createdDate[0], item.agentId, item.name, item.mobileNumber, item.surveyingArea == "undefined" || item.surveyingArea == "null" ? '-' : item.surveyingArea, item.emailId, item.dcCode], "itemId": item.id }
        })

        return (
            <div className="mt-4">
                <div className="retailersearchdiv">
                    {/* <div d-flex justify-content-end> */}
                    {/* <SearchBar searchclassName="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} /> */}
                    <button className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                        <span className="tooltip-text">Click to Search</span>
                    </button>
                    {/* <div className="retail-reset">
                        <button type="button" className="reset ml-2" onClick={this.resetSearch}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                    </div> */}
                </div>
                <div id="menu">
                    <div className="assign-box">
                        {/* <button className="assign-btn" onClick={this.onOpenModal} ><i className="fa fa-plus sub-plus"></i>
                            {window.strings.USERMANAGEMENT.ASSIGN_TRANSFER_AGENT} */}
                        <button className="sales-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Sales Agent</button>
                        {/* </button> */}
                    </div>

                    {this.state.advanceSearch &&
                        <div className="sub-filter">
                            <div className="row">
                                <div className="input-tip">
                                    <input type="text" placeholder="Custom Search.."
                                        class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                    />
                                    <span className="tooltip-text">Custom Search</span>
                                </div>
                                <div className="col-md-4 code-filter"><label className="label-title">DC Code:</label>
                                    {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                    <Select className="state-box"
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
                                <button type="button" className="data-search" onClick={(e) => this.getSalesAgentList("onSearch")}>
                                    <i className="fa fa-search" aria-hidden="true"></i>Search
                                        <span className="tooltip-text">Click to Search</span>
                                </button>
                                <div className="retail-reset">
                                    <button type="button" className="reset ml-2" onClick={this.resetSearch}>
                                        <i className="fa fa-refresh mrr5" aria-hidden="true"></i>
                                        <span className="tooltip-text">Reset</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <TableData TableHead={this.state.TableHead} TableContent={salesAgentList} handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
                {/* </div> */}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    agentData: state.salesAgent
})


export default connect(mapStateToProps, { fetchSalesAgent })(FetchSalesAgent)