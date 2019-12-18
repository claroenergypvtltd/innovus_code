import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON, ModalData } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap';
import { formatDate } from '../../shared/DateFormat'
import StatusUpdate from './statusUpdate'
import { getTwoToneColor } from 'antd/lib/icon/twoTonePrimaryColor';
import PropTypes from 'prop-types';

class FetchOrder extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Order No", "No of Product Items", "Order Date", "Order Amount", "Status", "View Order"],
            OrderLists: props.orderData && props.orderData.Lists && props.orderData.Lists.datas ? props.orderData.Lists.datas : [],
            CategoryCount: props.getCount,
            search: '',
            currentPage: 0,
            orderId: '',
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        if (this.context.router.route.location && this.context.router.route.location.state && this.context.router.route.location.state.orderData == 'orderBack') {
            var data = JSON.parse(sessionStorage.orderData)
            this.setState({ currentPage: data.page, search: data.search }, () => {
                this.getOrderList();
            })
        } else {
            this.getOrderList();
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.orderData && newProps.orderData.Lists && newProps.orderData.Lists.datas) {
            let respData = newProps.orderData.Lists.datas;
            this.setState({ OrderLists: respData, pageCount: newProps.orderData.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.orderData.Lists.totalCount })
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {

        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 0 }, () => {
                let serObj = {
                    "search": this.state.search
                };
                this.getOrderList(serObj);
            })

        }
    }

    resetSearch = () => {
        if (this.state.search || !this.state.search) {
            sessionStorage.removeItem('orderData')
            this.setState({ search: '' }, () => {
                this.getOrderList();
            });
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    getOrderList() {
        let obj = {
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
            "search": this.state.search,
            "limit": this.state.itemPerPage
        }
        sessionStorage.setItem('orderData', JSON.stringify(obj))
        this.props.getOrderList(obj)
    }

    // handleDelete = (data) => {
    //     let message = window.strings.DELETEMESSAGE;
    //     const toastrConfirmOptions = {
    //         onOk: () => { this.itemDelete(data) },
    //         onCancel: () => console.log('CANCEL: clicked')
    //     };
    //     toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM)
    // }

    // itemDelete = (id) => {
    //     this.props.DeleteCategory(id)
    //         .then(resp => {
    //             if (resp) {
    //                 this.getOrderList();
    //             }
    //         });
    // }

    onChange = (data) => {

        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getOrderList();
            });
        }
    }

    getStatusName = (Data) => {
        switch (Data) {
            case 1: return "Order placed";
            case 2: return "Order Accepted";
            case 3: return "Order processed";
            case 4: return "shipped";
            case 5: return "At distrubed Center";
            case 6: return "Delivered";
            case 7: return "Order cancelled";
        }
    }

    getClassNames = (ClsName) => {
        switch (ClsName) {
            case 1: return "place-color";
            case 2: return "accept-color";
            case 3: return "process-color";
            case 4: return "ship-color";
            case 5: return "center-color";
            case 6: return "delivered-color";
            case 7: return "cancel-color";
        }
    }

    onOpenModal = (orderId) => {
        this.setState({ open: true, orderId: orderId });
    };

    onCloseModal = () => {
        this.getOrderList();
        this.setState({ open: false });
    };

    detailsPage = (orderId, userId) => {
        this.props.history.push({ pathname: path.order.list + orderId, state: { orderId: orderId, userId: userId } });
    }

    render() {
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let link = <button className="order-btn" onClick={() => this.detailsPage(item.orderId, item.userId)}>{window.strings.ORDER.VIEWDETAILS}</button>
            // <Link to={path.order.list + "/" + item.orderId} Data={{ orderId: item.orderId, userId: item.userId }} className="order-btn">{window.strings.ORDER.VIEWDETAILS}</Link>

            // let link = <button className="view-btn">{window.strings.ORDER.VIEWDETAILS}</button>
            let clasName = this.getClassNames(item.status);
            let status = <div>
                <button className={"update-btn" + ' ' + clasName} onClick={() => { this.onOpenModal(item.orderId) }} disabled={item.status == 7}>{this.getStatusName(item.status)}</button>
            </div>


            return { "itemList": [item.orderId, item.items && item.items.length, formatDate(item.created), ' RS. ' + item.orderAmount, status, link], "itemId": { orderId: item.id, userId: item.userId } }
        })

        let statusUpdataData = < StatusUpdate orderId={this.state.orderId} onCloseModal={this.onCloseModal} />

        let { OrderLists } = this.state;

        return (
            <div className="order">
                <div className="order-board">
                    <div className=" row pr-3">
                        <div className="col-md-4 pr-0 dashboard-bx ship-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Orders to Ship</h5>
                                    <span> {OrderLists && OrderLists[0] && OrderLists[0].totalorders ? OrderLists[0].totalorders : 0}</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 pr-0 dashboard-bx overdue-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Overdue Shipments</h5>
                                    <span> {OrderLists && OrderLists[0] && OrderLists[0].orderdue ? OrderLists[0].orderdue : 0}</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 pr-0 dashboard-bx pending-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Pending Shipments</h5>
                                    <span>{OrderLists && OrderLists[0] && OrderLists[0].orderspending ? OrderLists[0].orderspending : 0}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <Row className="clearfix title-section pb-3">
                        <Col md={8} className="title-card">
                            <h4 className="user-title">ORDER</h4>
                        </Col>
                        <Col md={4} className="pl-5">
                            <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        </Col>
                    </Row>
                </div>

                <TableData TableHead={this.state.TableHead} TableContent={OrderList} />
                <ModalData show={this.state.open} onHide={this.onCloseModal} onClick={this.handleSubmit} modalData={statusUpdataData} ModalTitle="UPDATE TRACK" />

                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orderData: state.order ? state.order : {}
    };
}

export default connect(mapStateToProps, { getOrderList })(FetchOrder);
