import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { fetchDcList, SubmitDC, DeleteDC, fetchDcCodeList } from '../../actions/dcAction';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { toastr } from '../../services/toastr.services'
import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_UPDATE_SUCCESS, DC_DELETE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import Select from 'react-select';

class FetchDC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["DC Code", "Name", 'Surveying Area', 'Order Start-time', "Order Cutoff-time", "Delivery Slot", "Action"],
            search: '',
            currentPage: 0,
            id: '',
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            dcList: [],
            dcCode: ''
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state &&
            this.props.location.state.dcSearchDatas == "backTrue" && sessionStorage.dcSearchDatas
            && !this.state.id) {
            var dcSearchDatas = JSON.parse(sessionStorage.dcSearchDatas);
            this.setState({ search: dcSearchDatas.search, advanceSearch: true, currentPage: dcSearchDatas.pages, dcCode: dcSearchDatas.dcCode, dcCodeObj: dcSearchDatas.dcCodeObj }, () => {
                this.getDcList("onSearch");
                this.getDcCodeData()
            });
        } else {
            this.getDcList();
            this.getDcCodeData()
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dcDatas && newProps.dcDatas.Lists && newProps.dcDatas.Lists.datas) {
            let respData = newProps.dcDatas.Lists.datas;
            this.setState({ dcList: respData, pageCount: newProps.dcDatas.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.dcDatas.Lists.totalCount })
        }
        if (newProps.dcDatas && newProps.dcDatas.deletedStatus == "200") {
            store.dispatch({ type: DC_DELETE_SUCCESS, resp: "" })
            this.getDcList();
        }
    }

    getDcList = (type) => {
        let dcSearchId;
        let dcSplit = ''
        let obj = {
            pages: this.state.currentPage,
            row: this.state.itemPerPage,
            search: this.state.search,
            dcCode: this.state.dcCode,
            dcCodeObj: this.state.dcCodeObj
        }
        if (type == "onSearch") {
            dcSplit = this.state.dcCode && this.state.dcCode.split("C")
            dcSearchId = dcSplit[1]
            this.state.dcCode ? obj.pages = 0 : obj.pages = this.state.currentPage
            obj.id = dcSearchId
            this.props.fetchDcList(obj, true)
        } else {
            obj.pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO
            this.props.fetchDcList(obj)
        }
        sessionStorage.setItem('dcSearchDatas', JSON.stringify(obj));
    }
    getDcCodeData = () => {
        let obj = { search: this.state.search }
        fetchDcCodeList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ dcDropData: resp.datas })
            }
        })
    }
    itemEdit = (Data) => {
        let obj = {
            search: this.state.search,
            pages: this.state.currentPage,
            dcCode: this.state.dcCode,
            dcCodeObj: this.state.dcCodeObj
        }
        sessionStorage.setItem('dcSearchDatas', JSON.stringify(obj))
        this.props.history.push({ pathname: path.dc.edit + Data.id, state: { id: Data.id } });
    }
    handleDelete = (data) => {
        let message = '';
        if (data.productCount > 0) {
            message = window.strings.DELETEDC;
        } else {
            message = window.strings.DELETEMESSAGE;
        }
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM)
    }
    itemDelete = (id) => {
        this.props.DeleteDC(id)
    }

    formPath = () => {
        this.props.history.push(path.dc.add);
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getDcList();
            });
        }
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 0 }, () => {
                this.getDcList();
            })
        }
    }
    searchSubmit = (e) => {
        e.preventDefault();
        this.getDcList('onSearch');
    }

    resetSearch = () => {
        this.setState({ search: '', currentPage: 0, dcCodeObj: '', dcCode: '' }, () => {
            this.getDcList();
        });
    }
    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value, currentPage: 0 }, () => {
            // this.getDcList()
        })
    };
    regionPath = () => {
        this.props.history.push({ pathname: path.region.list })
    }
    render() {
        let DcList = this.state.dcList && this.state.dcList.map((item, index) => {
            return {
                "itemList": [item.dcCode, item.name, item.surveyingArea, item.orderStartTime, item.orderCutOffTime, item.deliverySlot], "itemId": { id: item.id, productCount: item.productCount }
            }
        })
        let dcDropData = [];

        this.state.dcDropData && this.state.dcDropData.map((item) => {
            let obj = { "label": item.dcCode, "value": item.dcCode };
            dcDropData.push(obj);
        })

        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">DC MANAGEMENT</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn" onClick={this.regionPath}>{window.strings.DC_MANAGEMENT.REGION}</button>
                            <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add DC</button>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        <button className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                            <span className="tooltip-text">Click to Search</span>
                        </button>
                    </div>
                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="sub-filter ml-4">
                                <div className="row">
                                    <div className="search-tip">
                                        {/* <input type="text" placeholder="Search by Crop Name.."
                                            class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                        /> */}
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Custom Search"
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
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
                                            options={dcDropData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div>
                                    <button type="button" className="data-search" onClick={(e) => this.getDcList("onSearch")}>
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
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={DcList}
                    handleEdit={this.itemEdit}
                />
                <ReactPagination PageDetails={{
                    pageCount: this.state.pageCount, onPageChange: this.onChange,
                    activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount
                }} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        dcDatas: state && state.dc,
    };
}

export default connect(mapStateToProps, { fetchDcList, DeleteDC, fetchDcCodeList })(FetchDC);

