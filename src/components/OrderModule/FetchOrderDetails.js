import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON, ModalData } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList, getTrackDetails, updateOrderStatus } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { Link } from 'react-router-dom'
import { formatDate, timeformat, dateformat, StampTimeFormat } from '../../shared/DateFormat'
import * as moment from 'moment';
import PropTypes from 'prop-types';
// import StatusUpdate from './statusUpdate'
import CreateCredit from './CreateCredit'



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
            TableHead: ["Order Id", "Shipping Address", "Order Amount", "Redeem", "Ordered Date", "Expected Delivery Time", "Track Orders"],
            // TableHeadTwo: ["Order Id", "Shipping Address", "From Time", "To Time"],
            TableHeadTwo: ["Order Id", "Shipping Address", "Order Amount", "Redeem", "Ordered Date", "Expected Delivery Time"],
            TableHeadTrack: ["Date/Time", "Activity", "Location"],
            TableProductHead: ["Product Id", "Product Name", "Quantity", "Product Amount", "Offer", "Total Amount"],
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
            this.setState({
                OrderLists: respData, productLists: respData[0] && respData[0].items,
                pageCount: newProps.orderDetails.DetailsList.totalCount / this.state.itemPerPage,
                userId: respData[0] && respData[0].userId, creditStatus: respData[0] && respData[0].creditStatus,
                orderStatus: respData[0] && respData[0].status
            })
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
            "orderId": this.props.location.state.orderId,
            "userId": this.props.location.state.userId
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
        let message = window.strings.DELETE_ORDERDETAILSS;
        const toastrConfirmOptions = {
            onOk: () => {
                let statusobj = {
                    "orderId": ordId,
                    "status": statusVal
                }
                updateOrderStatus(statusobj).then(resp => {
                    // resp && resp.status == 200 ? toastr.success(resp.message) : toastr.failure(resp.message);
                    this.context.router.history.push({ pathname: path.order.list, state: { orderData: 'orderBack' } })
                })
            },
            onCancel: () => { }
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.ORDER_POPUP);
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

    getRupeeSymbol = (value) => {
        if (value == "1") {
            return "₹"
        } else if (value == "2") {
            return "%"
        }
    }

    onOpenModal = (orderId) => {
        this.setState({ open: true, orderId: orderId });
    };

    onCloseModal = () => {
        this.getOrderList();
        this.setState({ open: false });
    };

    render() {
        var orderTotalAmount = "";
        var credits = "";
        let ordId = this.props && this.props.match && this.props.match && this.props.location.state && this.props.location.state.orderId;
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
            let orderRedeem = item.orderRedeem ? item.orderRedeem : 0
            orderTotalAmount = item.orderAmount + orderRedeem;
            credits = (item.orderCredit || item.orderCredit == 0) ? item.orderCredit : '';
            return {
                "itemList": [item.orderId, shopAddrss, "RS. " + item.orderAmount, "RS. " + item.orderRedeem, formatDate(item.created),
                item.deliveryTime, link], "itemId": item.id
            }
        })
        let trackList = this.state.trackLists && this.state.trackLists.map((item) => {
            let location = item.location ? (item.location == "0.0" ? '-' : item.location) : '-';
            return { "itemList": [item.trackTime ? formatDate(item.trackTime) + " " + ' / ' + StampTimeFormat(item.trackTime) : '-', item.activity ? item.activity : '-', location] }
        })

        let productList = this.state.productLists && this.state.productLists.map((item) => {
            let productname = item.category && item.category.name ? item.category.name : '-';
            let boxAmount = item.productDetails && item.productDetails.boxQuantity ? item.productDetails.boxQuantity : 0;


            let quantity = item.cartDetails && item.cartDetails.quantity + ' ' + item.quantityUnits.name + '( ' + (item.cartDetails.quantity / item.cartDetails.boxQuantity).toFixed(0) + " set)";
            // let totalAmount = item.cartDetails && item.cartDetails.totalAmount ? item.cartDetails.totalAmount : 0;

            let offerValue = item.cartDetails && item.cartDetails.discountValue ? (item.cartDetails.discountValue + ' ' + this.getRupeeSymbol(item.cartDetails.discountUnit)) : '-';

            let orderAmount = item.productDetails && item.productDetails.amount ? item.productDetails.amount : '-';
            let discountAmount = item.cartDetails && item.cartDetails.amount ? item.cartDetails.amount : '-'
            // let discountAmount = (item.cartDetails.discountValue != "0") ? item.cartDetails.totalAmount : item.cartDetails.amount;

            return { "itemList": [item.productDetails && item.productDetails.id, productname, quantity, item.productDetails && 'Rs. ' + orderAmount, offerValue, 'Rs. ' + discountAmount] }
        })
        let { status } = this.state;
        let statusUpdataData = < CreateCredit userId={this.state.userId} orderId={this.props.location.state.orderId} orderAmount={orderTotalAmount} onCloseModal={this.onCloseModal} />

        return (
            <div className="order-details">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-8">
                        <h4 className="user-title">LIST ORDER DETAIL</h4>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        {!this.state.creditStatus && this.state.orderStatus == 6 && <div className="">
                            <button className="credit-btn" onClick={() => this.onOpenModal(2)} >Order Credit</button>
                        </div>}
                        {(this.state.creditStatus && (credits || credits == 0)) ?
                            <div className="credit-count">
                                <h4> Credits : {credits}</h4>
                            </div> : ''
                        }
                        {this.state.OrderLists && this.state.OrderLists[0] && this.state.OrderLists[0].status != '7' && this.state.OrderLists[0].status != '6'
                            && <div className="pl-3">
                                <button className="cancel-btn" onClick={(e) => this.statusChange(ordId, 7)}>Order Cancel</button>
                            </div>
                        }

                        {/* {(this.state.creditStatus && credits) ?
                            <div className="pl-3">
                                "Hoiiii"
                                <h4> Credits : {credits}</h4>
                            </div> : ''
                        } */}
                    </div>
                </div>
                {this.state.trackDetails === false ? <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                /> : <TableData TableHead={this.state.TableHeadTwo} TableContent={OrderList}
                    />}

                <ModalData show={this.state.open} onHide={this.onCloseModal} onClick={this.handleSubmit} modalData={statusUpdataData} ModalTitle="ORDER CREDIT" />

                {this.state.viewtrack && <div className="pt-3">
                    <h4 className="user-title">TRACKING LIST<br /></h4>
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
