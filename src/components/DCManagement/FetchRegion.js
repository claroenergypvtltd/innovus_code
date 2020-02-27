import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { ReactPagination } from '../../shared'
import { resorceJSON } from '../../libraries'
import { path } from '../../constants';
import { getRegion } from '../../actions/regionAction'
import Select from 'react-select';
import { fetchDcCodeList } from '../../actions/dcAction';

class FetchRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Region Name", "Dc Code", "Dc Name", "Action"],
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            search: '',
            dcCode: ''
        }
    }
    componentDidMount() {
        this.getRegionList()
        this.getDcCodeData()
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas, pageCount: newProps.regionList.Lists.totalCount / this.state.itemPerPage, totalCount: newProps.regionList.Lists.totalCount })
        }
    }
    getRegionList = () => {
        let obj = {
            page: this.state.currentPage,
            rows: this.state.itemPerPage,
            search: this.state.search,
            dcCode: this.state.dcCode
        }
        this.props.getRegion(obj)
    }
    getDcCodeData = () => {
        let obj = { search: this.state.search }
        fetchDcCodeList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ dcDropData: resp.datas })
            }
        })
    }
    itemEdit = (Data) => {
        this.props.history.push({ pathname: path.region.edit + Data, state: { id: Data } })
    }
    formPath = () => {
        this.props.history.push({ pathname: path.region.add })
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.dc.list })
    }
    onChange = (data) => {
        if (this.state.currentPage != data.selected) {
            this.setState({ currentPage: data.selected }, () => { this.getRegionList() })
        }
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value, currentPage: 0 }, () => {
            // this.getDcList()
        })
    };
    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }
    searchSubmit = (e) => {
        e.preventDefault();
        this.getRegionList()
    }
    resetSearch = () => {
        this.setState({ search: '', currentPage: 0, dcCodeObj: '', dcCode: '' }, () => {
            this.getRegionList();
        });
    }
    render() {
        const regionData = this.state.regionListData && this.state.regionListData.map((item) => {
            let dcCode = item.dcDatas && item.dcDatas.map((item) => {
                return item.dcCode + ", "
            })
            let dcName = item.dcDatas && item.dcDatas.map((item) => {
                return item.name + ", "
            })
            return { "itemList": [item.name, dcCode, dcName], "itemId": item.id }
        })
        let dcDropData = [];

        this.state.dcDropData && this.state.dcDropData.map((item) => {
            let obj = { "label": item.dcCode, "value": item.dcCode };
            dcDropData.push(obj);
        })
        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">REGION</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.DC_MANAGEMENT.ADD_REGION}</button>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        <button className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                            <span className="tooltip-text">Click to Search</span>
                        </button>
                    </div>

                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="sub-filter ml-4">
                                <div className="row">
                                    <div className="search-tip">
                                        {/* <input type="text" placeholder="Search by Crop Name.."
                                            class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                        /> */}
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Custom Search"
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
                                        <span className="tooltip-text">Custom Search</span>
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
                                            options={dcDropData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div>
                                    <button type="button" className="data-search" onClick={(e) => this.getRegionList()}>
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
                <TableData TableHead={this.state.TableHead} TableContent={regionData} handleEdit={this.itemEdit} />
                <div className="row">
                    <div className="back-btn col-md-2"><button class="common-btn" onClick={this.redirectPage}>Back</button></div>
                    <div className="col-md-10">
                        < ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getRegion })(FetchRegion)