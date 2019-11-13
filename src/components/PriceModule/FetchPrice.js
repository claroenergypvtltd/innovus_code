import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { getDcCodeData, fetchSalesAgent } from '../../actions/salesAgentAction';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getPriceList } from '../../actions/priceAction'
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import CreatePrice from '../../components/PriceModule/Createprice'
import Store from '../../store/store';
import { PRICE_CREATE_SUCCESS } from '../../constants/actionTypes'
import Select from 'react-select';

class FetchPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Product ID", "Product Name", 'Dc Code', "Total Available quantity(Unit)", "Price(Unit)", "Box Quantity(Unit)", "Actions"], PriceLists: props.getLists,
            CategoryCount: props.getCount,
            search: '',
            dcCode: '',
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }
    componentDidMount() {
        this.getPriceList();
        this.getDCData();
    }
    getDCData = () => {
        let obj = {
            search: this.state.dcCode
        }
        getDcCodeData(obj).then(resp => {
            if (resp) {
                this.setState({ dcCodeData: resp })
            }
        })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dCCode: Data.value }, () => {
            this.getPriceList()
        })
    };
    componentWillReceiveProps(newProps) {
        if (newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData, pageCount: newProps.priceData.Lists.totalCount / this.state.itemPerPage })
        }
    }
    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }
    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
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
        if (this.state.search || this.state.dcCodeObj) {
            this.setState({ search: '', dCCode: '', dcCodeObj: '' }, () => {
                this.getPriceList();
            });
        }
    }
    getPriceList() {
        // {
        //     "pages":"0",
        //     "rows":"10",
        //     "search":"",
        //     "dCCode":""
        //    }
        let obj = {
            "pages": this.state.currentPage ? this.state.currentPage : 0,
            "rows": this.state.itemPerPage,
            "search": this.state.search,
            "dCCode": this.state.dCCode
        }
        this.props.getPriceList(obj)
    }
    itemEdit = (priceId) => {
        this.props.history.push({ pathname: path.price.edit + priceId, state: { priceId: priceId } });
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
        // this.props.DeleteCategory(id)
        // .then(resp => {
        //     if (resp) {
        //         this.getPriceList();
        //     }
        // });
    }

    formPath = () => {
        this.props.history.push(path.price.add);
    }
    onChange = (data) => {

        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getPriceList();
            });
        }
    }
    render() {
        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]
        this.state.dcCodeData && this.state.dcCodeData.map((item) => {
            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })
        let CategoryList = this.state.PriceLists && this.state.PriceLists.map((item, index) => {
            let productId = item.categoryAmount && item.categoryAmount.id;
            let dcCode = item.dcCode ? item.dcCode : '-';
            let productName = item.name;
            let totWeight = ((item.categoryAmount && item.categoryAmount.totalQuantity) + ' / ' + (item.categoryAmount && item.categoryAmount.rupeesize));
            // let weightUnits = item.categoryAmount && item.categoryAmount.totalQuantitySize;
            let amount = ((item.categoryAmount && item.categoryAmount.amount) + " Rs/" + (item.categoryAmount && item.categoryAmount.rupeesize));
            // let priceUnit = item.categoryAmount && item.categoryAmount.rupeesize;
            let boxQuantity = ((item.categoryAmount && item.categoryAmount.boxQuantity) + ' ' + (item.categoryAmount && item.categoryAmount.rupeesize));
            // let boxQuantitySize = item.categoryAmount && item.categoryAmount.boxQuantitySize

            return {
                "itemList": [productId, productName, dcCode,
                    totWeight.includes("null") ? '-' : totWeight,
                    // weightUnits, 
                    amount.includes("null") ? '-' : amount,
                    // priceUnit,
                    boxQuantity.includes("null") ? '-' : boxQuantity,
                    // boxQuantitySize
                ], "itemId": item.id
            }
        })

        return (
            <div className="price">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.PRICE.LIST_PRICE}</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>{window.strings.PRICE.LIST_PRICE}</button> */}
                    </div>
                    <div className="right-title col-md-5">
                        <div className="row">
                            <div className="col-md-7 pr-0">
                                {/* <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} /> */}
                            </div>
                            <div className="col-md-5 pl-0">
                                <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.PRICE.ADD_PRICE}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        <SearchBar searchclassName="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        <button className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Advance Search' : '+  Advance Search'}</button>
                        <div className="retail-reset">
                            <button type="button" className="reset ml-2" onClick={(e) => this.resetSearch()}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="main-filter">
                                <div className="row">
                                    <div className="col-md-4 code-filter"><label className="label-title">DC Code:</label>
                                        {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                        <Select className="state-box ml-4"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            value={this.state.dcCodeObj}
                                            onChange={(e) => this.handleDcCodeChange(e)}
                                            options={dcData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList}
                    //  handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{
                    pageCount: this.state.pageCount, onPageChange: this.onChange,
                    activePage: this.state.currentPage, perPage: this.state.limitValue
                }} />

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

export default connect(mapStateToProps, { getPriceList, DeleteCategory, fetchSalesAgent })(FetchPrice);
