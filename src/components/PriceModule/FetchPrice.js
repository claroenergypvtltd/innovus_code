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
            TableHead: ["Product ID", "Product Name", 'DC Code', "Total Available quantity(Set)", "Set Price(Set)", "Set Quantity(Unit)", "Actions"], PriceLists: props.getLists,
            search: '',
            dcCode: '',
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            PriceLists: []
        }
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state &&
            this.props.location.state.priceSearchDatas == "backTrue" && sessionStorage.priceSearchDatas
            && !this.state.priceId) {
            var priceSearchDatas = JSON.parse(sessionStorage.priceSearchDatas);
            this.setState({ dcCodeObj: priceSearchDatas.dcCodeObj, dCCode: priceSearchDatas.dCCode, search: priceSearchDatas.search, advanceSearch: true, currentPage: priceSearchDatas.pages }, () => {
                this.getPriceList();
                this.getDCData();
            });
        } else {
            this.getPriceList();
            this.getDCData();
        }

    }
    getDCData = () => {
        let obj = {
            flag: 1,
            search: this.state.dcCode
        }
        getDcCodeData(obj, 'price').then(resp => {
            if (resp) {
                this.setState({ dcCodeData: resp })
            }
        })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dCCode: Data.value, currentPage: 0 }, () => {
            // this.getPriceList()
        })
    };
    componentWillReceiveProps(newProps) {
        if (newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData, pageCount: newProps.priceData.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.priceData.Lists.totalCount })
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
    searchSubmit = (e) => {
        e.preventDefault();
        this.getPriceList("onSearch");
    }
    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search || this.state.dCCode) {
            this.setState({ currentPage: 0 }, () => {
                let serObj = {
                    "search": this.state.search
                };
                this.getPriceList(serObj);
            });

        }
    }
    resetSearch = () => {
        this.setState({ search: '', dCCode: '', dcCodeObj: '', currentPage: 0 }, () => {
            this.getPriceList();
        });
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    }
    getPriceList(type) {
        let pages = 0;
        if (type == "onSearch") {
            this.setState({ currentPage: 0 }, () => {
                pages = pages
            })
        } else {
            pages = this.state.currentPage ? this.state.currentPage : window.constant.ZERO
        }
        let obj = {
            pages: pages,
            rows: this.state.itemPerPage,
            search: this.state.search,
            dCCode: this.state.dCCode,
            dcCodeObj: this.state.dcCodeObj
        }
        sessionStorage.setItem('priceSearchDatas', JSON.stringify(obj));

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

        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getPriceList();
            });
        }
    }
    poolPath = () => {
        this.props.history.push(path.pool.list)
    }
    render() {
        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]
        this.state.dcCodeData && this.state.dcCodeData.map((item) => {
            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })
        let CategoryList = this.state.PriceLists && this.state.PriceLists.map((item, index) => {
            let productId = item.productDetail && item.productDetail.id;
            let dcCode = item.productDetail && item.productDetail.dcCode ? item.productDetail.dcCode : '-';
            let productName = item.name;
            // let totSet = (item.productDetail.totalQuantity / item.productDetail.boxQuantity)
            // let totWeight = ((item.productDetail && item.productDetail.totalQuantity) + ' ' + (item.productDetail && item.productDetail.rupeesize) + ' (' + parseInt(totSet) + ' set)');
            let totWeight = (item.productDetail.totalQuantity * item.productDetail.boxQuantity) + ' ' + (item.productDetail && item.productDetail.rupeesize) + " (" + (item.productDetail && item.productDetail.totalQuantity) + " set)"
            let amount = ((item.productDetail && item.productDetail.amount) + " Rs/set");
            // " Rs/" + (item.productDetail && item.productDetail.rupeesize));
            let boxQuantity = ((item.productDetail && item.productDetail.boxQuantity) + ' ' + (item.productDetail && item.productDetail.rupeesize));
            return {
                "itemList": [productId, productName, dcCode,
                    totWeight.includes("null") ? '-' : totWeight,
                    amount.includes("null") ? '-' : amount,
                    boxQuantity.includes("null") ? '-' : boxQuantity,
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
                        <div className="d-flex justify-content-end">
                            <button className="common-btn" onClick={this.poolPath}><i class="fa fa-users sub-plus" aria-hidden="true" ></i>{window.strings.PRICE.POOL_NAME}</button>
                            <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.PRICE.ADD_PRICE}</button>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        {/* <SearchBar searchclassName="Retailersearch" SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} /> */}
                        <button type="button" className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                            <span className="tooltip-text">Click to Search</span>
                        </button>
                        {/* <div className="retail-reset">
                            <button type="button" className="reset ml-2" onClick={(e) => this.resetSearch()}><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>
                        </div> */}
                    </div>
                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="sub-filter ml-4">
                                <div className="row">
                                    <div className="search-tip">
                                        {/* <input type="text" placeholder="Custom Search.."
                                            class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                        /> */}
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Key Search.."
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
                                        <span className="tooltip-text">Key Search</span>
                                    </div>
                                    <div className="col-md-4 code-filter"><label className="label-title">DC Code:</label>
                                        {/* <ReactMultiSelectCheckboxes options={dropDownData} onChange={this.checkbox} /> */}
                                        <Select className="state-box"
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
                                    <button type="button" className="data-search" onClick={(e) => this.getPriceList("onSearch")}>
                                        <i className="fa fa-search" aria-hidden="true"></i>Search
                                        <span className="tooltip-text">Click to Search</span>
                                    </button>
                                    <div className="retail-reset">
                                        <button type="button" className="reset ml-2" onClick={this.resetSearch}>
                                            <i className="fa fa-refresh mrr5" aria-hidden="true"></i>
                                            <span className="tooltip-text">Reset</span>
                                        </button>
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
                    activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount
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
