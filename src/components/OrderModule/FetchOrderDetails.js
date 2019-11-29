import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList, getTrackDetails, updateOrderStatus } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { Link } from 'react-router-dom'
import { formatDate, timeformat, dateformat } from '../../shared/DateFormat'
import * as moment from 'moment';
import PropTypes from 'prop-types';
class FetchOrderDetails extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            // TableHead: ["Order Id", "Shipping Address", "Order Date", "Expected Delivery Date/Time", "Track Orders"],
            //TableHeadTrack: ["Data/Time", "Activity", "Location"],
            //TableProductHead: ["Product Id", "Product Name", "Quantity", "Discount Value", "Offer Price", "Order Date", "Order Amount"],
            TableHead: ["Order Id", "Shipping Address", "Ordered Date", "Expected Delivery Time", "Track Orders"],
            // TableHeadTwo: ["Order Id", "Shipping Address", "From Time", "To Time"],
            TableHeadTwo: ["Order Id", "Shipping Address", "Ordered Date", "Expected Delivery Time"],
            TableHeadTrack: ["Date/Time", "Activity", "Location"],
            TableProductHead: ["Product Id", "Product Name", "Quantity", "Order Amount"],
            OrderLists: props.orderData && props.orderData.DetailsList && props.orderData.DetailsList.datas ? props.orderData.DetailsList.datas : [],
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            viewtrack: false,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            trackDetails: false
        }
    }

    componentDidMount() {
        this.getOrderList();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.orderDetails && newProps.orderDetails.DetailsList && newProps.orderDetails.DetailsList.datas) {
            let respData = newProps.orderDetails.DetailsList.datas;
            this.setState({ OrderLists: respData, productLists: respData[0] && respData[0].items, pageCount: newProps.orderDetails.DetailsList.totalCount / this.state.itemPerPage })
        }

        if (newProps.orderDetails && newProps.orderDetails.trackLists) {
            this.setState({ trackLists: newProps.orderDetails.trackLists.orderWareHouse, status: newProps.orderDetails.trackLists.status })
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            let serObj = {
                "search": this.state.search,
            };
            this.getOrderList(serObj);
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getOrderList();
            });
        }
    }

    getOrderList() {
        let obj = {
            "orderId": this.props.match.params.id
        }
        this.props.getOrderList(obj)
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
        this.props.DeleteCategory(id)
            .then(resp => {
                if (resp) {
                    this.getOrderList();
                }
            });
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getOrderList();
            });
        }
    }

    viewtrack = (Data) => {
        this.setState({ viewtrack: true, trackDetails: true }, () => {
            this.props.getTrackDetails(Data.orderId)
        })
    }

    productPage = () => {
        this.setState({ viewtrack: false, trackDetails: false })
    }

    redirectPage = () => {
        this.context.router.history.push({ pathname: path.order.list, state: { orderData: 'orderBack' } })
    }
    statusChange(ordId, status) {

        let statusVal = status;
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                let statusobj = {
                    "orderId": ordId,
                    "status": statusVal
                }
                updateOrderStatus(statusobj).then(resp => {
                    // resp && resp.status == 200 ? toastr.success(resp.message) : toastr.failure(resp.message);
                    this.props.history.goBack();
                })
            },
            onCancel: () => { }
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
    }

    weightConversion = (Data) => {
        if (Data == 1) {
            return "Quindal"
        } else if (Data == 2) {
            return "Kg"
        } else if (Data == 3) {
            return "Ton"
        }
    }

    render() {
        let ordId = this.props && this.props.match && this.props.match && this.props.match.params && this.props.match.params.id;
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let fullShopAddrss;
            let add1;
            let add2;
            let link = this.state.trackDetails === false ? <button className="track-btn" onClick={() => { this.viewtrack(item) }}>{window.strings.ORDER.TRACK}</button> : "";
            // let shipaddrss = item.shopAddress && item.shopAddress.address1 + item.shopAddress.address2;
            if (item.shopAddress && item.shopAddress.address1) {
                add1 = item.shopAddress.address1
            } else {
                add1 = ''
            }
            if (item.shopAddress && item.shopAddress.address2) {
                add2 = ',' + item.shopAddress.address2
            }
            else {
                add2 = ''
            }
            let shopAddrss = add1 + add2;
            let shopAddressDataCountry = item.shopAddressData && item.shopAddressData.countrys && item.shopAddressData.countrys.name;
            let shopAddressDataState = item.shopAddressData && item.shopAddressData.states && item.shopAddressData.states.name
            let shopAddressDataCity = item.shopAddressData && item.shopAddressData.cities && item.shopAddressData.cities.name;
            if (shopAddrss && shopAddressDataCity && shopAddressDataState && shopAddressDataCountry) {
                fullShopAddrss = shopAddrss + ',' + shopAddressDataCity + ',' + shopAddressDataState + ',' + shopAddressDataCountry + '.';
            } else {
                fullShopAddrss = ''
            }
            return {
                "itemList": [item.orderId, shopAddrss, formatDate(item.created),
                timeformat(item.startTime) + ' - ' + timeformat(item.endTime), link], "itemId": item.id
            }
        })
        let trackList = this.state.trackLists && this.state.trackLists.map((item) => {
            return { "itemList": [item.trackTime ? formatDate(item.trackTime) : '-', item.activity ? item.activity : '-', item.location ? item.location : "-"] }
        })
        let productList = this.state.productLists && this.state.productLists.map((item) => {
            let productname = item.category && item.category.name ? item.category.name : '-';
            let boxAmount = item.productDetails && item.productDetails.boxQuantity ? item.productDetails.boxQuantity : 0;


            let quantity = item.cartDetails && item.cartDetails.quantity + ' ' + this.weightConversion(item.cartDetails.totalQuantityUnit) + '( ' + (item.cartDetails.quantity / item.cartDetails.boxQuantity) + "box)";


            let orderAmount = item.cartDetails && item.cartDetails.amount;
            return { "itemList": [item.productDetails && item.productDetails.id, productname, quantity, item.productDetails && 'Rs. ' + orderAmount] }
        })
        let { status } = this.state;
        return (
            <div className="order-details">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-8">
                        <h4 className="user-title">LIST ORDER DETAIL</h4>
                    </div>
                    {this.state.OrderLists && this.state.OrderLists[0] && this.state.OrderLists[0].status != '7'
                        && <div className="text-right col-md-4">
                            <button className="cancel-btn" onClick={(e) => this.statusChange(ordId, 7)}>Order Cancel</button>
                        </div>
                    }
                </div>
                {this.state.trackDetails === false ? <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                /> : <TableData TableHead={this.state.TableHeadTwo} TableContent={OrderList}
                    />}


                {this.state.viewtrack && <div className="pt-3">
                    <div class="bs-stepper-header">

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 1 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">Order placed</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 2 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">Order Accepted</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 3 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">Order processed</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 4 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">shipped</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 5 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">At distrubed Center</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 6 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">Delivered</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 7 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label m-0">cancel</span>
                            </div>
                        </div>
                        {/* <div class="bs-stepper-line"></div> */}
                    </div>

                    <TableData TableHead={this.state.TableHeadTrack} TableContent={trackList} />
                    {this.state.viewtrack && <button className="common-btn" onClick={this.productPage}>Back To Product List</button>}
                </div>}
                {!this.state.viewtrack && <div className="pt-3">
                    <h4 className="user-title">PRODUCT LIST</h4>
                    <TableData TableHead={this.state.TableProductHead} TableContent={productList} />
                </div>}
                <div className="back-btn">
                    {!this.state.viewtrack && <button className="common-btn" onClick={this.redirectPage}>Back</button>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orderDetails: state.order ? state.order : {}
    };
}

export default connect(mapStateToProps, { getOrderList, getTrackDetails })(FetchOrderDetails);
