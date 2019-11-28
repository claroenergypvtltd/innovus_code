import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'

import { DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getPriceList } from '../../actions/priceAction'
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import CreatePrice from '../../components/PriceModule/Createprice'
import Store from '../../store/store';
import { PRICE_CREATE_SUCCESS } from '../../constants/actionTypes'

class FetchCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Product ID", "Product Name", "Units", "Price"],
            PriceLists: props.getLists,
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        this.getPriceList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData, pageCount: respData.totalCount / this.state.itemPerPage, totalCount: respData.totalCount })
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
            this.getPriceList(serObj);
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getPriceList();
            });
        }
    }

    getPriceList() {
        let obj = {
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
            "categoryId": ""
        }

        this.props.getPriceList(obj)
    }

    itemEdit = (priceId) => {
        this.props.history.push({ pathname: 'price/edit/' + priceId, state: { priceId: priceId } });
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
                    this.getPriceList();
                }
            });
    }

    formPath = () => {
        this.props.history.push('/price/add');
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getPriceList();
            });
        }
    }

    render() {
        let CategoryList = this.state.PriceLists && this.state.PriceLists.map((item, index) => {
            return { "itemList": [item.categoryAmount && item.categoryAmount.id, item.name, item.categoryAmount && item.categoryAmount.discountUnit, item.categoryAmount && item.categoryAmount.amount], "itemId": item.id }
        })

        return (
            <div>
                <div>
                    <h2>List Price</h2>
                    <button className="btn btn-warning float-right" onClick={this.formPath}>Add Price</button>
                </div>
                <div className="col-md-6 s-left">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList} handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        priceData: state.price ? state.price : {}
    };
}

export default connect(mapStateToProps, { getPriceList, DeleteCategory })(FetchCart);
