import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList } from '../../actions/orderAction'
import { toastr } from '../../services/toastr.services'
import Store from '../../store/store';
import { Link } from 'react-router-dom'


class FetchOrderDetails extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["shippingAddress id", "From time", "To time", "Track Orders"],
            OrderLists: props.orderData && props.orderData.DetailsList && props.orderData.DetailsList.datas ? props.orderData.DetailsList.datas : [],
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

        if (newProps.orderDetails && newProps.orderDetails.DetailsList && newProps.orderDetails.DetailsList.datas) {
            let respData = newProps.orderDetails.DetailsList.datas;
            this.setState({ OrderLists: respData, pageCount: newProps.orderDetails.DetailsList.totalCount / this.state.itemPerPage })
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
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
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

    render() {
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let link = <Link to={path.order.list + "/" + item.id}>{window.strings.ORDER.VIEWDETAILS}</Link>
            return { "itemList": [item.shippingAddress, item.startTime, item.endTime, link], "itemId": item.id }
        })

        return (
            <div className="order-details">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-8">
                         <h4 className="user-title">List Order Details</h4>
                    </div>
            
                <div className="right-title row col-md-4 pl-5">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                </div>
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                />
                <div className="main-wrapper p-3">
                    <div className="tick-section row m-0 pt-3">
                     <span className="tick-color col-md-2"> Production<span className="sub-tick"></span></span>
                     <span className="tick-color col-md-2">Shipped<span className="sub-tick"></span></span>
                     <span className="tick-color col-md-2">In Transit<span className="sub-tick"></span></span>
                     <span className="tick-color col-md-2">Shipped<span className="sub-tick"></span></span>
                     <span className="tick-color col-md-2"> Production<span className="sub-tick"></span></span>
                     <span className="tick-light col-md-2">Delivered<span className="sub-tick"></span></span>
                    </div>
                    <table className="table table-borderless mt-3">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Activity</th>
                                <th>Location</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>act1</td>
                                <td>loc1</td>
                              
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>act2</td>
                                <td>loc2</td>
                                
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>act3</td>
                                <td>loc3</td>
                              
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        orderDetails: state.order ? state.order : {}
    };
}

export default connect(mapStateToProps, { getOrderList })(FetchOrderDetails);
