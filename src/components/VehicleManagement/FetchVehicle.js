import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { fetchVehicle } from '../../actions/VehicleAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { IRRIGATION_SETTING_DELETE_SUCCESS } from '../../constants/actionTypes'
import DataTableDynamic from '../../shared/DataTableDynamic';

class FetchVehicle extends Component {

    constructor(props) {

        super(props);
        this.state = {
            // TableHead: ["Vehicle Type", "Vehicle Name", "Volme(mc)", "Transaction Time", "Operating Hours", "Actions"],
            TableHead: resorceJSON.VehicleList,
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
        let obj = {
            search: ""
        }
        this.props.fetchVehicle(obj);
        // this.getVehicleList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.VehicleData && newProps.VehicleData.Lists && newProps.VehicleData.Lists.datas) {
            let respData = newProps.VehicleData.Lists.datas;
            this.setState({ data: respData, pageCount: newProps.VehicleData.Lists.totalCount / this.state.itemPerPage })
        }

        // if (newProps.VehicleData && newProps.VehicleData.deletedStatus == "200") {
        //     Store.dispatch({ type: IRRIGATION_SETTING_DELETE_SUCCESS, deletedStatus: "" })

        //     this.getVehicleList();
        // }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            let serObj = {
                "search": this.state.search
            };
            this.getVehicleList(serObj);
        }
    }

    resetSearch = () => {
        let obj = {
            search: ""
        }
        this.setState({ search: '' }, () => { this.props.fetchVehicle(obj); })
    }

    getVehicleList() {
        let obj = {
            search: this.state.search
        }
        this.props.fetchVehicle(obj);
    }

    itemEdit = (Data) => {
        this.props.history.push({ pathname: path.vehicle.edit + Data.id, state: { vehicleId: Data.id } });
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
        this.props.history.push(path.vehicle.add);
    }

    onChange = (data) => {

        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getVehicleList();
            });
        }
    }

    render() {
        // let CategoryList = this.state.irrigationSettingLists && this.state.irrigationSettingLists.map((item, index) => {
        //     return { "itemList": [item && item.vehicleType ? item.vehicleType : '-', item.vehiclename && item.vehiclename ? item.vehiclename : '-', item.volume ? item.volume : '-', item.transitionTime ? item.transitionTime : '-', item.operatingHour ? item.operatingHour : '-'], "itemId": item.id }
        // })

        return (
            <div className="fetch-vehicle">
                <div className="clearfix title-section row mr-0">
                    <div className="title-card col-md-8">
                        <h4 className="user-title">{window.strings.VEHICLE.VEHICLE_MANAGEMENT}</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>{window.strings.PRICE.LIST_PRICE}</button> */}
                    </div>
                    <div className="right-title col-md-4">
                        <div className="row m-0">
                            <div className="col-md-7">
                                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            </div>
                            <div className="col-md-5">
                                <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.VEHICLE.ADD_VEHICLE}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <TableData TableHead={this.state.TableHead} TableContent={CategoryList}
                    // handleDelete={this.handleDelete} 
                    handleEdit={this.itemEdit}
                />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} /> */}
                <DataTableDynamic title="Vehicle List" tableHead={this.state.TableHead} tableDatas={this.state.data} handleEdit={this.itemEdit} pagination={true} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        VehicleData: state.Vehicle ? state.Vehicle : {}
    };
}

export default connect(mapStateToProps, { fetchVehicle })(FetchVehicle);
