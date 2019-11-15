import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableData } from '../../shared/Table'
import { getCouponList, DeleteCoupon } from '../../actions/couponAction'
import { ReactPagination, SearchBar } from '../../shared'
import '../../assets/css/login.scss'
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants/path'
import { COUPON_DELETE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import { resorceJSON } from '../../libraries'
import { formatDate } from '../../shared/DateFormat'

class FetchCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Name", "Description", "Coupon Type", "Amount", "Start Date", "Expiry Date", "Actions"],
            CouponData: [],
            search: '',
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }

    componentDidMount() {
        this.getCouponList();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.couponList && nextProps.couponList.Lists && nextProps.couponList.Lists.datas) {
            let Data = nextProps.couponList.Lists;
            this.setState({ CouponData: Data.datas, pageCount: nextProps.couponList.Lists.totalCount / this.state.itemPerPage })
        }

        if (nextProps.couponList && nextProps.couponList.deletedStatus == "200") {
            store.dispatch({ type: COUPON_DELETE_SUCCESS, resp: "" })
            this.getCouponList();
        }

    }

    handleChange = (e) => {

        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 1 }, () => {
                let serObj = {
                    "search": this.state.search
                };
                this.getCouponList(serObj);
            })
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getCouponList();
            });
        }
    }

    getCouponList() {
        let obj = {
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage
        }
        this.props.getCouponList(obj)
    }

    onChange = (data) => {

        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getCouponList();
            });
        }
    }


    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }

    itemDelete = (id) => {
        this.props.DeleteCoupon(id);
    }

    itemEdit = (Data) => {

        this.props.history.push({ pathname: path.coupons.edit + Data, state: { couponId: Data } })
    }

    formPath = () => {
        this.props.history.push({ pathname: path.coupons.add })
    }




    render() {

        let coupondata = this.state.CouponData.length !== 0 && this.state.CouponData.map((item, index) => {
            let discountUnit = item.discountUnit == 1 ? 'Percentage' : 'Discount';
            return { "itemList": [item.name, item.description, discountUnit, 'Rs. ' + item.discountValue, formatDate(item.startDate), formatDate(item.expiryDate)], "itemId": item.id }
        })

        return (
            <div className="coupon-table">
                <div className="clearfix title-section row">
                    <div class="title-card col-md-7">
                        <h4 class="user-title">COUPON LIST</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="row">
                            <div className="col-md-7 pr-0">
                                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            </div>
                            <div className=" col-md-5 pl-0">
                                <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                                    {window.strings.COUPON.ADD_COUPON}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub-category">
                    <TableData TableHead={this.state.TableHead} TableContent={coupondata} handleDelete={this.handleDelete}
                        handleEdit={this.itemEdit} />
                    <ReactPagination PageDetails={{
                        pageCount: this.state.pageCount, onPageChange: this.onChange,
                        activePage: this.state.currentPage, perPage: this.state.limitValue
                    }} />

                </div>
            </div>

        )
    }
}

const mapStatetoProps = (state) => ({

    couponList: state.coupon,
    // getCoupondata: state && state.coupon && state.coupon.Lists ? state.coupon.Lists : []
})

export default connect(mapStatetoProps, { getCouponList, DeleteCoupon })(FetchCoupon);