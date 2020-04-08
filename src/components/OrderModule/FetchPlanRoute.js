import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderList, customerIDList } from '../../actions/orderAction'
import DataTableDynamic from '../../shared/DataTableDynamic';
import { resorceJSON, ModalData } from '../../libraries';
import { path } from '../../constants';
import * as moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import Select from 'react-select';
import PropTypes from "prop-types";

class FetchPlanRoute extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.PlanrouteOrderslistCols,
            dateChanged: false,
            startDate: moment(),
            endDate: moment()
        }
    }
    componentDidMount() {
        this.getOrderList();
        this.customerIDList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.orderData && newProps.orderData.Lists && newProps.orderData.Lists.datas) {
            let respData = newProps.orderData.Lists.datas;
            let Lists = respData && respData.map(item => {
                item.viewpage = this.viewCrop(item.orderId);
                return item;
            })
            this.setState({ OrderLists: Lists })
        }
        if (newProps.orderData && newProps.orderData.CusIdLists) {
            let CusIdListsData = newProps.orderData.CusIdLists;
            this.setState({ CusIdListsData: CusIdListsData })
        }
    }
    viewCrop(ordId) {
        let ViewPage = <button onClick={e => this.handleView(e, ordId)} className="btn-view">
            <i className="fa fa-eye" aria-hidden="true" />
            <span className="tooltip-text">View</span>
        </button>
        return ViewPage;
    }
    handleView(e, viewOrdId) {
        e.preventDefault();
        this.context.router.history.push({ pathname: path.order.list + '/' + viewOrdId, state: { viewOrdId: viewOrdId } });
    }
    getOrderList(status) {
        let obj = {}
        if (status == 'reset') {
            obj = {};
            this.props.getOrderList(obj, 'filter');
            this.resetState();
        }
        if (this.state.cusId) {
            obj.cusId = this.state.cusId;
        }
        if (this.state.orderId) {
            obj.orderId = this.state.orderId;
        }
        if (this.state.dateChanged) {
            obj.startTime = this.state.startDate.format('YYYY-MM-DD');
            obj.endTime = this.state.endDate.format('YYYY-MM-DD');
        }
        if (status != 'reset') { this.props.getOrderList(obj, 'filter') }
    }
    resetState() {
        this.setState({
            startDate: moment(),
            endDate: moment(),
            dateChanged: false,
            selectedcusIdOption: '',
            cusId: '',
            selectedordIdOption: '',
            orderId: ''
        }, () => {
        })
    }
    customerIDList() {
        this.props.customerIDList()
    }
    handleApply = (event, picker) => {
        this.setState({
            dateChanged: true,
            startDate: picker.startDate,
            endDate: picker.endDate,
        }, () => {
            this.getOrderList()
        })
    }
    handleChange = (e) => {
        if (e.name == "cusId") {
            this.setState({ selectedcusIdOption: e, cusId: e.value }, () => {
                this.getOrderList();
            })
        }
        if (e.name == "orderId") {
            this.setState({ selectedordIdOption: e, orderId: e.value }, () => {
                this.getOrderList();
            })
        }
    }
    render() {
        let CusIdlists = [];
        let OrderIdLists = [];
        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = '';
        }
        this.state.CusIdListsData && this.state.CusIdListsData.map((item) => {
            let obj = { "label": item, "value": item, "name": "cusId" };
            CusIdlists.push(obj);
        })
        this.state.OrderLists && this.state.OrderLists.map((item) => {
            let obj = { "label": item.orderId, "value": item.orderId, "name": "orderId" };
            OrderIdLists.push(obj);
        })

        let orderDatas = []
        this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let orderlist = {}
            let add1, add2 = '';
            orderlist.orderID = item && item.orderId;
            orderlist.customerId = item && item.itemsUser && item.itemsUser.cusId;
            orderlist.shopName = item && item.shopAddress && item.shopAddress.name ? item.shopAddress.name : '';
            if (item.shopAddress && item.shopAddress.address1) {
                add1 = item.shopAddress.address1
            } else {
                add1 = '-'
            }
            if (item.shopAddress && item.shopAddress.address2) {
                add2 = ',' + item.shopAddress.address2
            }
            else {
                add2 = '-'
            }
            orderlist.shopAddrss = add1 + add2;
            orderlist.shopAddressDataCountry = item.shopAddressData && item.shopAddressData.countrys && item.shopAddressData.countrys.name;
            orderlist.shopAddressDataState = item.shopAddressData && item.shopAddressData.states && item.shopAddressData.states.name
            orderlist.shopAddressDataCity = item.shopAddressData && item.shopAddressData.cities && item.shopAddressData.cities.name;
            if (orderlist.shopAddrss && orderlist.shopAddressDataCity && orderlist.shopAddressDataState && orderlist.shopAddressDataCountry) {
                orderlist.fullShopAddrss = orderlist.shopAddrss + orderlist.shopAddressDataCity + ',' + orderlist.shopAddressDataState + ',' + orderlist.shopAddressDataCountry + '.';
            } else {
                orderlist.fullShopAddrss = '-'
            }
            orderlist.shopAddressDataState = orderlist.shopAddressDataState
            // orderlist.contactno = item && item.itemsUser && item.itemsUser.mobileNumber;
            // orderlist.totalAmount = item && item.orderAmount ? 'Rs. ' + '' + item.orderAmount : '-';
            // orderlist.agentId = item && item.itemsUser && item.itemsUser.agentId ? item.itemsUser.agentId : '-';
            orderDatas.push(orderlist)
        })
        return (
            <div>
                <div className="main-wrapper d-flex mt-3 p-3">
                    <p className="order-text">  No vehicle assigned yet! Click the button to assign vehicle</p>
                    <div className="flex-grow-1 text-right">
                        <button className="common-btn">Assign Vehicle</button>
                    </div>
                </div>
                <div className="plan-table">
                </div>
                <div className="mt-3 text-center">
                    <button className="common-btn"><i class="fa fa-plus sub-plus"></i>Add Vehicle</button>
                </div>
                <div className="text-right mt-3">
                    <button className="common-btn">Next<i class="fa fa-arrow-right"></i></button>
                </div>
                <div className="">
                    <div className="main-filter">
                        <div className="row">
                            <div className="col-md-4 date-range">
                                <DateRangePicker
                                    placeholder="-- Date -- "
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onApply={this.handleApply}
                                >  <div className="date-box">
                                        <input type="text" className="form-control date-form ml-1"
                                            value={label}
                                        />
                                        <span className="date-group">
                                            <i className="date-btn fa fa-calendar" />
                                        </span>
                                    </div>
                                </DateRangePicker>
                            </div>
                            <div className="col-md-3 state-filter">
                                <Select className="state-box ml-1"
                                    value={this.state.selectedcusIdOption}
                                    onChange={(e) => this.handleChange(e)}
                                    options={CusIdlists}
                                    placeholder="--Customer ID--"
                                /></div>
                            <div className="col-md-3 city-filter">
                                <Select className="city-box ml-1"
                                    value={this.state.selectedordIdOption}
                                    onChange={(e) => this.handleChange(e)}
                                    options={OrderIdLists}
                                    placeholder="--Order ID--"
                                />
                            </div>
                            <div className="col-md-2 city-filter">
                                <div className="back-btn">
                                    <button type="button" className="common-btn" onClick={(e) => this.getOrderList('reset')}><i className="fa fa-refresh mrr5" aria-hidden="true"></i>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DataTableDynamic
                    tableHead={this.state.columns}
                    tableDatas={orderDatas}
                    orderReceivedpage='false'
                    customCss="fetchretailer"
                    // handleEdit={this.itemEdit}
                    // handleView={this.itemView}
                    // handleDelete={this.handleDelete}
                    pagination={true}
                    onRowSelected={this.handleRowChange}
                    handleRowChange={this.handleRowChange}
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        orderData: state.order ? state.order : {}
    };
}
export default connect(mapStateToProps, { getOrderList, customerIDList })(FetchPlanRoute);
