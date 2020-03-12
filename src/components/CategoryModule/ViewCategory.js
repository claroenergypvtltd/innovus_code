import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteCategory, getSpecificCategory, getCategoryDCCode, SubmitCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../../constants/actionTypes';
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { fetchSalesAgent, getDcCodeData } from '../../actions/salesAgentAction';

class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Crop Name", "Image", "Quality", "DC Code", "status", "Action"],
            // CategoryListDatas: props.getLists.datas,
            CategoryCount: props.getCount,
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            categoryId: '',
            dcCode: '',
            ParentCategoryHeading: ''
        }
    }
    componentWillMount() {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.categoryName) {
            this.setState({ ParentCategoryHeading: this.props.location.state.categoryName })
        }
    }
    componentDidMount() {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.categoryId
            && this.props.location.state.cropSessionData == 'cropSessionBack') {
            var subCatSessData = sessionStorage && sessionStorage.subCatSessionData && JSON.parse(sessionStorage.subCatSessionData)
            let data = subCatSessData.search || subCatSessData.dcCode ? true : false;
            this.setState({ categoryId: this.props.location.state.categoryId, ParentCategoryHeading: subCatSessData.parentCatName, currentPage: subCatSessData.page, itemPerPage: subCatSessData.limit, search: subCatSessData.search, advanceSearch: data, dcCodeObj: subCatSessData.dcCodeObj, dcCode: subCatSessData.dcCode }, () => {
                this.getDCData();
                this.getSpecificData();
            })
        }
        else {
            sessionStorage.removeItem('subCatSessionData')
            this.setState({ categoryId: this.props.location.state.categoryId }, () => {
                this.getDCData();
                this.getSpecificData();
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryData.deletedStatus == "200") {
            store.dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: "" })
            this.getSpecificData();
        }
        if (nextProps.categoryData && nextProps.categoryData.specificData && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas) {
            let Data = nextProps.categoryData.specificData.data;
            this.setState({ CategoryListDatas: Data.datas, pageCount: Data.totalCount / this.state.itemPerPage, totalCount: Data.totalCount })
        }
        if (nextProps.categoryData && nextProps.categoryData.updatedStatus == "200") {
            store.dispatch({ type: CATEGORY_UPDATE_SUCCESS, resp: "" })
            // this.redirectPage();
        }
    }

    getSpecificData(type) {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            let page = "page"

            let obj = {
                page: this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
                search: this.state.search,
                limit: this.state.itemPerPage,
                categoryId: this.props.location.state.categoryId,
                dcCode: this.state.dcCode,
                name: "subCategory"
            }
            if (type == "onSearch") {
                this.setState({ currentPage: 0 })
                obj.page = 0
            }
            else {
                obj.page = this.state.currentPage ? this.state.currentPage : window.constant.ZERO;
            }
            this.props.getSpecificCategory(obj, true);
        }
    }

    getDCData = () => {
        let dcCode = this.props.location.state.categoryId
        getCategoryDCCode(dcCode).then(resp => {
            if (resp && resp.data && resp.data.datas) {
                this.setState({ dcCodeData: resp.data.datas })
            }
        });
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 0 }, () => {
                this.getSpecificData();
            })
        }
    }
    resetSearch = () => {
        this.setState({ search: '', dcCodeObj: '', dcCode: '', currentPage: 0 }, () => {
            this.getSpecificData();
        });
    }

    itemEdit = (catId) => {
        let obj = {
            "page": this.state.currentPage,
            "limit": this.state.itemPerPage,
            "search": this.state.search,
            "dcCode": this.state.dcCode,
            "dcCodeObj": this.state.dcCodeObj,
            "parentCatName": this.state.ParentCategoryHeading
        }
        sessionStorage.setItem('subCatSessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.crop.edit + catId, state: { categoryId: catId, cropId: this.state.categoryId } });
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
        this.props.DeleteCategory(id);
    }

    formPath = () => {
        let obj = {
            "page": this.state.currentPage,
            "limit": this.state.itemPerPage,
            "search": this.state.search,
            "dcCode": this.state.dcCode,
            "dcCodeObj": this.state.dcCodeObj,
            "parentCatName": this.state.ParentCategoryHeading
        }
        sessionStorage.setItem('subCatSessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.crop.add, state: { cropId: this.state.categoryId } });
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getSpecificData();
            });
        }
    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.category.list, state: { categoryBack: 'categorySessionBack' } });
    }

    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    searchSubmit = (e) => {
        e.preventDefault();
        this.getSpecificData('onSearch');
    }

    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value, currentPage: 0 }, () => {
            //  this.getSpecificData() 
        })
    };

    handleStatusUpdate = (isActive, subcategoryId, dcCode) => {
        let parentId = this.props.location && this.props.location.state && this.props.location.state.categoryId

        const formData = new FormData();
        formData.append("isActive", isActive);
        // formData.append("parentId", parentId);
        formData.append("id", subcategoryId);
        formData.append("dcCode", dcCode);
        this.props.SubmitCategory(formData, parentId, "isProduct")
    }

    handleStatusChange = (e, data, dcCode) => {
        let message = "Are you sure you want to update ?";
        var statusValue = e.target.name
        let value = e.target.value
        const toastrConfirmOptions = {
            onOk: () => { this.handleStatusUpdate(value, data, dcCode) },
            onCancel: () => {
                // if (statusValue == data) {
                //     this.state.status == 0 ? this.setState({ status: 0 }) : this.setState({ status: 1 })
                // }
                this.props.history.push(path.category.list)
                this.props.history.goBack()
            }
        };
        toastr.confirm(message, toastrConfirmOptions, "Update Status")
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.setState({ search: e.target.value })
    }

    render() {
        let dcData = [];

        this.state.dcCodeData && this.state.dcCodeData.map((item) => {
            if (item.dcCode) {
                let obj = { "label": item.dcCode, "value": item.dcCode };
                dcData.push(obj);
            }
        })

        let CategoryList = this.state.CategoryListDatas && this.state.CategoryListDatas.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />

            let selectedValue = item.isActive;
            let status = item.id;
            const statusDropdown = resorceJSON.cropStatusOptions.map((item, index) => {
                return <option value={index} selected={selectedValue == index ? true : false} className="drop-option">{item}</option>
            })
            let dcCode = item.dcCode && item.productDetailsao.dcCode == '' ? '-' : item.productDetailsao.dcCode;
            let statusChange = <select className="active-inactive" value={this.state.status} name={status} onChange={(e) => this.handleStatusChange(e, item.id, dcCode)}>
                {statusDropdown}
                {/* <option value="0" selected={selectedValue}>Active</option>
                <option value="1" selected={selectedValue}>In Active</option> */}
            </select >
            let quality = item.quality == '' ? '-' : item.quality;
            return { "itemList": [item.name, catImg, quality, dcCode, statusChange], "itemId": item.id }
        })

        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">VIEW CROP - {this.state.ParentCategoryHeading} </h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Crop</button>
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
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Search by Crop Name.."
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
                                        <span className="tooltip-text">Search Crop</span>
                                    </div>
                                    <div className="col-md-4 code-filter"><label className="label-title">DC Code:</label>
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
                                    <button type="button" className="data-search" onClick={(e) => this.getSpecificData("onSearch")}>
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
                    // handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit}
                // handleStatusChange={this.handleStatusChange}
                />
                <div className="row">
                    <div className="back-btn col-md-2"><button class="common-btn" onClick={this.redirectPage}>Back</button></div>
                    <div className="col-md-10">
                        {this.state.CategoryListDatas && this.state.CategoryListDatas.length != 0 && < ReactPagination className="m-0" PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />}
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        categoryData: state.category,
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        // getCount: state && state.category && state.category.count ? state.category.count : 1
    };
}

const defaultProps = {
    getLists: [],
    getCount: 1
}

ViewCategory.defaultProps = defaultProps;

export default connect(mapStateToProps, { DeleteCategory, getSpecificCategory, fetchSalesAgent, SubmitCategory })(ViewCategory);
