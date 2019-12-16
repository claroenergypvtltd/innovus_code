import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getIrrigationSettingList, DeleteIrrigationSetting } from '../../actions/IrrigationSettingAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { IRRIGATION_SETTING_DELETE_SUCCESS } from '../../constants/actionTypes'

class FetchIrrigationSetting extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["State", "City", "Price", "Area Feet", "Actions"],
            irrigationSettingLists: [],
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        this.getPriceList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.Lists && newProps.IrrigationSettingData.Lists.datas) {
            let respData = newProps.IrrigationSettingData.Lists.datas;
            this.setState({ irrigationSettingLists: respData, pageCount: newProps.IrrigationSettingData.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.IrrigationSettingData.Lists.totalCount })
        }

        if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.deletedStatus == "200") {
            Store.dispatch({ type: IRRIGATION_SETTING_DELETE_SUCCESS, deletedStatus: "" })

            this.getPriceList();
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 1 }, () => {
                let serObj = {
                    "search": this.state.search
                };
                this.getPriceList(serObj);
            })
        }
    }

    resetSearch = () => {
        if (this.state.search || !this.state.search) {
            this.setState({ search: '' }, () => {
                this.getPriceList();
            });
        }
    }

    getPriceList() {
        let obj = {
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
            "categoryId": ""
        }

        this.props.getIrrigationSettingList(obj)
    }

    itemEdit = (id) => {
        this.props.history.push({ pathname: path.setting.edit + id, state: { irrigationCostId: id } });
    }


    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM)
    }

    itemDelete = (id) => {
        this.props.DeleteIrrigationSetting(id)
    }

    formPath = () => {
        this.props.history.push(path.setting.add);
    }

    onChange = (data) => {

        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getPriceList();
            });
        }
    }

    render() {
        let CategoryList = this.state.irrigationSettingLists && this.state.irrigationSettingLists.map((item, index) => {
            return { "itemList": [item.states && item.states.name ? item.states.name : '-', item.cities && item.cities.name ? item.cities.name : '-', item.amount ? item.amount : '-', item.areasize ? item.areasize : '-'], "itemId": item.id }
        })

        return (
            <div className="fetch-irrigation">
                <div className="clearfix title-section row ">
                    <div className="title-card col-md-6">
                        <h4 className="user-title">{window.strings.SETTING.LIST_IRRIGATION}</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>{window.strings.PRICE.LIST_PRICE}</button> */}
                    </div>
                    <div className="right-title col-md-6 ">
                        <div className="row">
                            <div className="col-md-7 pr-0">
                                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            </div>
                            <div className="col-md-5 pl-0">
                                <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.SETTING.ADD_IRRIGATION}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList}
                    // handleDelete={this.handleDelete} 
                    handleEdit={this.itemEdit}
                />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        // getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        IrrigationSettingData: state.irrigationSetting ? state.irrigationSetting : {}
    };
}

export default connect(mapStateToProps, { getIrrigationSettingList, DeleteIrrigationSetting })(FetchIrrigationSetting);
