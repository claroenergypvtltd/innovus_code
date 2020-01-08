import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { fetchDcList, SubmitDC, DeleteDC } from '../../actions/dcAction';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { toastr } from '../../services/toastr.services'
import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_UPDATE_SUCCESS, DC_DELETE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';


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
            dcList: []
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state &&
            this.props.location.state.dcSearchDatas == "backTrue" && sessionStorage.dcSearchDatas
            && !this.state.id) {
            var dcSearchDatas = JSON.parse(sessionStorage.dcSearchDatas);
            this.setState({ search: dcSearchDatas.search, advanceSearch: true, currentPage: dcSearchDatas.pages }, () => {
                this.getDcList();
            });
        } else {
            this.getDcList();
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
        let pages = 0;
        if (type == "onSearch") {
            this.setState({ currentPage: 0 }, () => {
                pages = pages
            })
        } else {
            pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO
        }
        let obj = {
            pages: pages,
            row: this.state.itemPerPage,
            search: this.state.search,
        }
        sessionStorage.setItem('dcSearchDatas', JSON.stringify(obj));
        this.props.fetchDcList(obj)
    }

    itemEdit = (Data) => {
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

    handleChange = (e) => {

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

    resetSearch = () => {
        this.setState({ search: '', currentPage: 0 }, () => {
            this.getDcList();
        });
    }

    render() {
        let DcList = this.state.dcList && this.state.dcList.map((item, index) => {
            return {
                "itemList": [item.dcCode, item.name, item.surveyingArea, item.orderStartTime, item.orderCutOffTime, item.deliverySlot], "itemId": { id: item.id, productCount: item.productCount }
            }
        })

        return (
            <div>
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">DC MANAGEMENT</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="row">
                            <div className="col-md-7 pr-0">
                                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            </div>
                            <div className="col-md-5 pl-0">
                                <button className="common-btn float-right" onClick={this.formPath}>
                                    <i className="fa fa-plus sub-plus"></i>Add DC
                                </button>
                            </div>
                        </div>
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

export default connect(mapStateToProps, { fetchDcList, DeleteDC })(FetchDC);

