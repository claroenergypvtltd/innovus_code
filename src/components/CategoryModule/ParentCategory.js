import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getParentCategoryList, DeleteCategory, getSpecificCategory, SubmitCategory } from '../../actions/categoryAction';
import { ReactPagination } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS, CATEGORY_FETCH_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import { Row, Col } from 'react-bootstrap';
import { resorceJSON } from '../../libraries'
import { TableData } from '../../shared/Table'
import Select from 'react-select';
import { fetchDcCodeList } from '../../actions/dcAction';

class ParentCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.CategoryList,
            TableHead: ["Category Name", "Image", 'Description', "Crop"],
            TableHead1: ["Sub Category", "Crop Name", "Image", "Quality", "DC Code", "status", "Action"],
            CategoryCount: props.getCount,
            search: '',
            dcCode: '',
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            searchCrop: false,
            data: [],
        }
    }
    componentWillMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.retlrbckTrack == "backTrue") {
            this.props.history.push({ pathname: path.user.list, state: { retlrbckTrack: "backTrue" } })
        }
    }
    componentDidMount() {
        if (sessionStorage.categorySessionData && this.props.location && this.props.location.state &&
            this.props.location.state.categoryBack == "categorySessionBack") {
            var categorySesData = JSON.parse(sessionStorage.categorySessionData)
            this.setState({ currentPage: categorySesData.page, search: categorySesData.search, dcCode: categorySesData.dcCode, itemPerPage: categorySesData.limit },
                () => {
                    if (this.state.search || this.state.dcCode) {
                        this.getCropList();
                        this.setState({ searchCrop: true, advanceSearch: true })
                    } else {
                        this.getCategoryList()
                    }
                    this.getDcCodeData()
                })
        }
        else {
            if (this.state.search || this.state.dcCode) {
                this.getCropList()
                this.setState({ searchCrop: true, advanceSearch: true })
            } else {
                this.getCategoryList()
            }
            this.getDcCodeData()

        }
    }
    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }
    viewCrop(Data) {
        let ViewPage = <button className="common-btn" onClick={() => this.itemView(Data)}>View Sub Category</button>
        return ViewPage;
    }
    componentWillReceiveProps(newProps) {
        if (newProps.categoryData && newProps.categoryData.specificData && newProps.categoryData.specificData.data && newProps.categoryData.specificData.data.datas) {
            store.dispatch({ type: CATEGORY_SPECIFIC_DATA_SUCCESS, resp: [] })
            let Data = newProps.categoryData.specificData.data;
            this.setState({ CategoryListDatas: Data.datas, pageCount: Data.totalCount / this.state.itemPerPage, totalCount: Data.totalCount })
        }

        if (newProps.getLists && newProps.getLists.datas) {
            store.dispatch({ type: CATEGORY_FETCH_SUCCESS, List: [] })
            this.setState({ data: newProps.getLists.datas, pageCount: newProps.getLists.totalCount / this.state.itemPerPage, totalCount: newProps.getLists.totalCount });
        }
        if (newProps.categoryData && newProps.categoryData.deletedStatus == "200") {
            store.dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: "" })
            this.getCategoryList();
        }
    }
    getCategoryList = () => {
        let obj = {
            "isallcrop": true,
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
        }
        this.props.getParentCategoryList(obj);
    }

    getCropList = () => {
        let obj = {
            page: this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
            search: this.state.search,
            limit: this.state.itemPerPage,
            categoryId: '',
            dcCode: this.state.dcCode,
            name: "subCategory",
            "flag": 3
        }
        this.props.getSpecificCategory(obj, true);
    }

    itemEdit = (catId) => {
        let obj = {
            "page": this.state.currentPage,
            "search": this.state.search,
            "dcCode": this.state.dcCode,
            "limit": this.state.itemPerPage,
        }
        sessionStorage.setItem('categorySessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.crop.edit + catId, state: { categoryId: catId, parentCrop: true } });
    }

    itemView = (Data) => {
        let obj = {
            "page": this.state.currentPage,
            "search": this.state.search,
            "limit": this.state.itemPerPage
        }
        sessionStorage.setItem('categorySessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.category.list, state: { parentCategoryId: Data.id, parentCategoryName: Data.name } });
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getCategoryList();
            });
        }
    }

    cropOnChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getCropList();
            });
        }
    }

    searchResult = (e) => {
        e.preventDefault();
        this.getCropList();
        this.setState({ searchCrop: true })
    }

    handleStatusUpdate = (isActive, subcategoryId, dcCode, parentId) => {
        const formData = new FormData();
        formData.append("isActive", isActive);
        formData.append("id", subcategoryId);
        formData.append("dcCode", dcCode);
        this.props.SubmitCategory(formData, parentId, "isProduct")
    }

    handleStatusChange = (e, data, dcCode, parentId) => {
        let message = "Are you sure you want to update ?";
        var statusValue = e.target.name
        let value = e.target.value
        const toastrConfirmOptions = {
            onOk: () => { this.handleStatusUpdate(value, data, dcCode, parentId) },
            onCancel: () => {
                let obj = {
                    "page": this.state.currentPage,
                    "search": this.state.search,
                    "dcCode": this.state.dcCode,
                    "limit": this.state.itemPerPage,
                }
                sessionStorage.setItem('categorySessionData', JSON.stringify(obj))
                this.props.history.push({ pathname: path.category.list, state: { parentCropActive: "categorySessionBack" } })
                this.props.history.goBack()
            }
        };
        toastr.confirm(message, toastrConfirmOptions, "Update Status")
    }

    resetSearch = () => {
        if (this.state.search || (!this.state.search)) {
            sessionStorage.removeItem('categorySessionData')
            this.setState({ search: '', currentPage: 0, dcCodeObj: '', dcCode: '' }, () => {
                let serObj = {
                    "page": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
                    "search": this.state.search,
                    "limit": this.state.itemPerPage,
                };
                this.props.getParentCategoryList(serObj);
                this.setState({ searchCrop: false })
            });
        }
    }
    itemDelete = (id) => {
        this.props.DeleteCategory(id);
    }

    formPath = () => {
        this.props.history.push(path.category.add);
    }
    getDcCodeData = () => {
        let obj = { search: this.state.search }
        fetchDcCodeList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ dcDropData: resp.datas })
            }
        })
    }
    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value, currentPage: 0 }, () => {
        })
    };
    render() {
        let CategoryList = this.state.data && this.state.data.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />
            let viewCrop = <button className="common-btn px-2" onClick={() => this.itemView(item)}>View Sub Category</button>
            return { "itemList": [item.name, catImg, item.description ? item.description : '-', viewCrop], "itemId": item.id }
        })
        let dcDropData = [];
        this.state.dcDropData && this.state.dcDropData.map((item) => {
            let obj = { "label": item.dcCode, "value": item.dcCode };
            dcDropData.push(obj);
        })

        let cropList = this.state.CategoryListDatas && this.state.CategoryListDatas.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />

            let selectedValue = item.isActive;
            let status = item.id;
            const statusDropdown = resorceJSON.cropStatusOptions.map((item, index) => {
                return <option value={index} selected={selectedValue == index ? true : false} className="drop-option">{item}</option>
            })
            let dcCode = item.dcCode && item.productDetailsao.dcCode == '' ? '-' : item.productDetailsao.dcCode;
            let statusChange = <select className="active-inactive" value={this.state.status} name={status} onChange={(e) => this.handleStatusChange(e, item.id, dcCode, item.parentId)}>
                {statusDropdown}
            </select >
            let quality = item.quality == '' ? '-' : item.quality;
            return { "itemList": [item.categoryName, item.name, catImg, quality, dcCode, statusChange], "itemId": item.id }
        })

        return (
            <div className="category-table">
                <Row className="clearfix title-section">
                    <Col md={7} className="title-card ">
                        <h4 className="user-title">{window.strings.CATEGORY.PARENT_CATEGORY}</h4>
                    </Col>
                </Row>
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
                                        <form onSubmit={(e) => this.searchResult(e)}>
                                            <input placeholder="Search by Crop Name"
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
                                            options={dcDropData}
                                            placeholder="--Select DC Code--"
                                        />
                                    </div>
                                    <button type="button" className="data-search" onClick={(e) => this.searchResult(e)}>
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
                {!this.state.searchCrop && <div className="sub-category">
                    <TableData TableHead={this.state.TableHead} TableContent={CategoryList} />
                    {CategoryList && CategoryList.length > 0 && < ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />}

                </div>}
                {this.state.searchCrop &&
                    <div className="sub-category">
                        <TableData TableHead={this.state.TableHead1} TableContent={cropList}
                            handleEdit={this.itemEdit}
                        />
                        {this.state.CategoryListDatas && this.state.CategoryListDatas.length != 0 && < ReactPagination className="m-0" PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.cropOnChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />}
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        categoryData: state.category,
        cropData: state.crop,
    };
}

export default connect(mapStateToProps, { getParentCategoryList, DeleteCategory, getSpecificCategory, SubmitCategory })(ParentCategory);