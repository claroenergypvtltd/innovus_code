import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { path } from '../../constants/path'
import { getPoolList } from '../../actions/poolAction'
import { ReactPagination } from '../../shared'
import { resorceJSON } from '../../libraries'

class FetchPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Pool ID", "Pool Name", "Total Available quantity (Set)", "Number of Item", "Actions"],
            advanceSearch: false,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            currentPage: 0,
            limitValue: resorceJSON.TablePageData.paginationLength,
            pageCount: resorceJSON.TablePageData.pageCount

        }
    }
    componentDidMount() {
        if (sessionStorage.poolSessionData && this.props && this.props.location && this.props.location.state && this.props.location.state.poolSessionData == 'poolSessionBack') {
            var poolSessData = JSON.parse(sessionStorage.poolSessionData)
            this.setState({ currentPage: poolSessData.page, search: poolSessData.search, advanceSearch: true }, () => { this.getPoolList() })
        }
        else {
            this.getPoolList();
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.poolData && newProps.poolData.Lists.datas) {
            let poolRespData = newProps.poolData.Lists;
            this.setState({ poolListData: poolRespData.datas, pageCount: poolRespData.totalCount / this.state.itemPerPage, totalCount: poolRespData.totalCount })
        }
    }
    getPoolList = () => {
        let obj = {
            "pages": this.state.currentPage ? this.state.currentPage : 0,
            "row": 10,
            "search": this.state.search
        }
        this.props.getPoolList(obj)
    }
    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    addPath = () => {
        this.props.history.push(path.pool.add)
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.price.list, state: { priceSearchDatas: "backTrue" } });
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    }
    getPoolsearch = (Data) => {
        if (Data == 'search') {
            let obj = {
                "pages": 0,
                "row": 10,
                "search": this.state.search
            }
            this.props.getPoolList(obj)
        }
    }
    itemEdit = (itemId) => {
        let obj = {
            "page": this.state.currentPage,
            "search": this.state.search
        }
        sessionStorage.setItem('poolSessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.pool.edit + itemId, state: { poolId: itemId } })
    }
    searchSubmit = (e) => {
        e.preventDefault();
        this.getPoolsearch('search');
    }
    resetSearch = () => {
        sessionStorage.removeItem('poolSessionData')
        this.setState({ search: '', currentPage: 0 }, () => { this.getPoolList() })
    }
    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getPoolList();
            });
        }
    }
    render() {
        const poolList = this.state.poolListData && this.state.poolListData.map(item => {
            let data = item.rupeesUnits && item.rupeesUnits.name ? item.rupeesUnits.name.split('/') : [];
            let quantitySet = ' (' + item.quantity + ' set )'
            let totQuantity = item.boxQuantity * item.quantity
            return { "itemList": [item.id, item.name, totQuantity + ' ' + data[1] + quantitySet, item.pools.length], "itemId": item.id }
        })
        return (
            <div className="pool">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.PRICE.POOL_LIST}</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>{window.strings.PRICE.LIST_PRICE}</button> */}
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.addPath}><i className="fa fa-plus sub-plus"></i>{window.strings.PRICE.ADDPOOL}</button>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        <button type="button" className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                            <span className="tooltip-text">Click to Search</span>
                        </button>
                    </div>
                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="sub-filter ml-4">
                                <div className="row">
                                    <div className="search-tip">
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Key Search.."
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
                                        <span className="tooltip-text">Key Search</span>
                                    </div>
                                    <div className="ml-2">
                                        <button type="button" className="data-search" onClick={(e) => this.getPoolsearch('search')}>
                                            <i className="fa fa-search" aria-hidden="true"></i>Search
                                            <span className="tooltip-text">Click to Search</span>
                                        </button>
                                    </div>
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
                <TableData TableHead={this.state.TableHead} TableContent={poolList}
                    handleEdit={this.itemEdit} />
                <div className="row">
                    <div className="back-btn col-md-2"><button class="common-btn" onClick={this.redirectPage}>Back</button></div>
                    <div className="col-md-10">
                        < ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        poolData: state.pool
    };
}

export default connect(mapStateToProps, { getPoolList })(FetchPool);