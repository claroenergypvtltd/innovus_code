import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'

// import { DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getOrderList } from '../../actions/orderAction'
// import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
// import CreatePrice from '../../components/PriceModule/Createprice'
import Store from '../../store/store';
// import { PRICE_CREATE_SUCCESS } from '../../constants/actionTypes'
import { Link } from 'react-router-dom'

class FetchOrder extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["order No", "Product Items", "Order Date", "Order Amount", "Status", "View Order", "track Order"],
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
        debugger;
        if (newProps.orderData && newProps.orderData.Lists && newProps.orderData.Lists.datas) {
            let respData = newProps.orderData.Lists.datas;
            this.setState({ OrderLists: respData, pageCount: newProps.orderData.Lists.totalCount / this.state.itemPerPage })
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        debugger;
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

    // itemEdit = (priceId) => {
    //     this.props.history.push({ pathname: 'price/edit/' + priceId, state: { priceId: priceId } });
    // }


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

    formPath = () => {
        this.props.history.push('/order/5');
    }

    onChange = (data) => {
        debugger;
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getOrderList();
            });
        }
    }

    render() {
        let OrderList = this.state.OrderLists && this.state.OrderLists.map((item, index) => {
            let link = <Link to={path.order.list + "/" + item.id}>{window.strings.ORDER.VIEWDETAILS}</Link>

            return { "itemList": [item.id, '-', item.created, '-', item.status, link, ''], "itemId": item.id }
        })

        return (
            <div>
                <div>
                    <h2>List Order</h2>
                    <button className="btn btn-warning float-right" onClick={this.formPath}>Add Order</button>
                </div>
                <div className="col-md-6 s-left">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={OrderList}
                // handleDelete={this.handleDelete}
                // handleEdit={this.itemEdit} 
                />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        // getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        orderData: state.order ? state.order : {}
    };
}

export default connect(mapStateToProps, { getOrderList })(FetchOrder);
