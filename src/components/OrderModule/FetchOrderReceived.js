import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderList } from '../../actions/orderAction'
import DataTableDynamic from '../../shared/DataTableDynamic';
import { resorceJSON, ModalData } from '../../libraries';
import { path } from '../../constants';
import * as moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Select from 'react-select';
import PropTypes from "prop-types";

class FetchOrderReceived extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.OrderlistCols,
            dateChanged: false,
            startDate: moment(),
            endDate: moment()
        }
    }
    componentDidMount() {
        this.getOrderList();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.orderData && newProps.orderData.Lists && newProps.orderData.Lists.datas) {
            let respData = newProps.orderData.Lists.datas;
            let Lists = respData && respData.map(item => {
                item.viewpage = this.viewCrop(item.id);
                return item;
            })
            this.setState({ OrderLists: Lists })
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
    getOrderList() {
        this.props.getOrderList()
    }
    handleApply = (event, picker) => {
        this.setState({
            dateChanged: true,
            startDate: picker.startDate,
            endDate: picker.endDate,
        }, () => {
            // this.getRetailerList()
        })
    }
    render() {
        let start = this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = '';
        }
        let orderDatas = []
        this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let orderlist = {}
            let add1, add2 = ''
            orderlist.orderID = item && item.orderId;
            orderlist.customerId = item && item.itemsUser && item.itemsUser.cusId;
            orderlist.shopName = item && item.shopAddress && item.shopAddress.name ? item.shopAddress.name : '';
            if (item.shopAddress && item.shopAddress.address1) {
                add1 = item.shopAddress.address1
            }
            if (item.shopAddress && item.shopAddress.address2) {
                add2 = ',' + item.shopAddress.address2
            }
            orderlist.shopAddrss = item.shopAddress.address1 + item.shopAddress.address2
            orderlist.shopAddressDataCountry = item.shopAddressData && item.shopAddressData.countrys && item.shopAddressData.countrys.name;
            orderlist.shopAddressDataState = item.shopAddressData && item.shopAddressData.states && item.shopAddressData.states.name
            orderlist.shopAddressDataCity = item.shopAddressData && item.shopAddressData.cities && item.shopAddressData.cities.name;
            if (orderlist.shopAddrss && orderlist.shopAddressDataCity && orderlist.shopAddressDataState && orderlist.shopAddressDataCountry) {
                orderlist.fullShopAddrss = orderlist.shopAddrss + orderlist.shopAddressDataCity + ',' + orderlist.shopAddressDataState + ',' + orderlist.shopAddressDataCountry + '.';
            } else {
                orderlist.fullShopAddrss = ''
            }
            orderlist.viewpage = item.viewpage
            orderlist.contactno = item && item.itemsUser && item.itemsUser.mobileNumber;
            orderlist.totalAmount = item && item.orderAmount ? 'Rs. ' + '' + item.orderAmount : '';
            orderlist.agentId = item && item.itemsUser && item.itemsUser.agentId;
            orderDatas.push(orderlist)
        })
        return (
            <div>
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
                                    // value={this.state.selectedStateOption}
                                    // onChange={(e) => this.handleStateChange(e)}
                                    // options={stateDropDown}
                                    placeholder="--Customer ID--"
                                /></div>
                            <div className="col-md-3 city-filter">
                                <Select className="city-box ml-1"
                                    // value={this.state.selectedCityOption}
                                    // onChange={(e) => this.handleStateChange(e)}
                                    // options={cityDropDown}
                                    placeholder="--Order ID--"
                                />
                            </div>
                            <div className="col-md-2 city-filter">
                                <div className="back-btn">
                                    <button className="common-btn"><i className="fa fa-refresh mrr5" aria-hidden="true"></i>Reset</button>
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
export default connect(mapStateToProps, { getOrderList })(FetchOrderReceived);
