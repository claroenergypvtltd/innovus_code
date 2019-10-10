import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap';
import { formatDate } from '../../shared/DateFormat'

class FetchOrder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["order No", "Product Items", "Order Date", "Order Amount", "Status", "View Order"],
            OrderLists: props.orderData && props.orderData.Lists && props.orderData.Lists.datas ? props.orderData.Lists.datas : [],
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        this.getOrderList();
    }

    componentWillReceiveProps(newProps) {

        if (newProps.orderData && newProps.orderData.Lists && newProps.orderData.Lists.datas) {
            let respData = newProps.orderData.Lists.datas;
            this.setState({ OrderLists: respData, pageCount: newProps.orderData.Lists.totalCount / this.state.itemPerPage })
        }
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
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage
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

    getStatusName = (Data) => {
        switch (Data) {
            case 1: return "Order placed";
            case 2: return "Order Accepted";
            case 3: return "Order processed";
            case 4: return "shipped";
            case 5: return "At distrubed Center";
            case 6: return "Delivered";
            case 7: return "cancel";
        }
    }

    render() {
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let link = <Link to={path.order.list + "/" + item.id}>{window.strings.ORDER.VIEWDETAILS}</Link>

            let status = this.getStatusName(item.status)

            return { "itemList": [item.orderId, item.items && item.items.length, formatDate(item.created), item.items && item.items[0] && item.items[0].cartproductdetails && item.items[0].cartproductdetails.price, status, link], "itemId": item.id }
        })

        let { OrderLists } = this.state;

        return (
            <div className="order">
                <div className="order-board">
                    <div className=" row pr-3">
                        <div className="col-md-4 pr-0 dashboard-bx ship-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Orders to Ship</h5>
                                    <span> {OrderLists && OrderLists[0] && OrderLists[0].totalorders}</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 pr-0 dashboard-bx overdue-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Overdue Shipments</h5>
                                    <span> {OrderLists && OrderLists[0] && OrderLists[0].orderdue}</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 pr-0 dashboard-bx pending-order">
                            <a href="#" className="card">
                                <div className="box">
                                    <h5 className="dashboard-title">Pending Shipments</h5>
                                    <span>{OrderLists && OrderLists[0] && OrderLists[0].orderspending}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <Row className="clearfix title-section pb-3">
                        <Col md={8} className="title-card">
                            <h4 className="user-title">Orders </h4>
                        </Col>
                        <Col md={4} className="pl-5">
                            <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleSearch, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        </Col>
                    </Row>
                </div>

                <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
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
