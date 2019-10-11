import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList, getTrackDetails } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { Link } from 'react-router-dom'
import { formatDate } from '../../shared/DateFormat'


class FetchOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Order Id", "Shipping Address", "From Time", "To Time", "Track Orders"],
            TableHeadTrack: ["Data/Time", "Activity", "Location"],
            TableProductHead: ["Product Id", "Product Name", "Quantity", "Order Date", "Order Amount"],
            OrderLists: props.orderData && props.orderData.DetailsList && props.orderData.DetailsList.datas ? props.orderData.DetailsList.datas : [],
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            viewtrack: false,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        this.getOrderList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.orderDetails && newProps.orderDetails.DetailsList && newProps.orderDetails.DetailsList.datas) {
            let respData = newProps.orderDetails.DetailsList.datas;
            this.setState({ OrderLists: respData, productLists: respData[0].items, pageCount: newProps.orderDetails.DetailsList.totalCount / this.state.itemPerPage })
        }
        debugger;
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
        this.setState({ viewtrack: true }, () => {
            this.props.getTrackDetails(Data.orderId)
        })
    }

    productPage = () => {
        this.setState({ viewtrack: false })
    }

    render() {
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let link = <button onClick={() => { this.viewtrack(item) }}>{window.strings.ORDER.TRACK}</button>
            return { "itemList": [item.id, item.shopAddress.address1 + ' ' + item.shopAddress.address2, item.startTime, item.endTime, link], "itemId": item.id }
        })

        let trackList = this.state.trackLists && this.state.trackLists.map((item) => {
            return { "itemList": [formatDate(item.trackTime), item.activity, item.location] }
        })
        let productList = this.state.productLists && this.state.productLists.map((item) => {
            debugger;
            let productname = item.category && item.category.name ? item.category.name : '-';
            let boxAmount = item.categoryAmount && item.categoryAmount.boxQuantity ? item.categoryAmount.boxQuantity : 0;
            let quantity = item.cartproductdetails && item.cartproductdetails.quantity;
            return { "itemList": [item.cartproductdetails && item.cartproductdetails.productId, productname, quantity + ' ' + '( ' + quantity / boxAmount + "box)", item.cartproductdetails && formatDate(item.cartproductdetails.lastModified), item.cartproductdetails && item.cartproductdetails.price] }
        })

        let { status } = this.state;

        return (
            <div className="order-details">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-8">
                        <h4 className="user-title">List Order Details</h4>
                    </div>
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                />

                {this.state.viewtrack && <div className="main-wrapper p-3">
                    <div class="bs-stepper-header">

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 1 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">Order placed</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 2 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">Order Accepted</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 3 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">Order processed</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 4 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">shipped</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 5 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">At distrubed Center</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 6 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">Delivered</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>

                        <div class="step active">
                            <div className="step-trigger">
                                {status == 7 ? <span class="tick-color"></span> : <span class="tick-light"></span>}
                                <span class="bs-stepper-label">cancel</span>
                            </div>
                        </div>
                        <div class="bs-stepper-line"></div>
                    </div>

                    <TableData TableHead={this.state.TableHeadTrack} TableContent={trackList} />
                    <button onClick={this.productPage}>Back To Product List</button>
                </div>}
                {!this.state.viewtrack && <div className="main-wrapper p-3">
                    <h4>Product List</h4>
                    <TableData TableHead={this.state.TableProductHead} TableContent={productList} />
                </div>}
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
