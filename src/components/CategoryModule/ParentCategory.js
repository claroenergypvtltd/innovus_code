import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { getCategoryList, getParentCategoryList, DeleteCategory } from '../../actions/categoryAction';
import { SearchBar, ReactPagination } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS } from '../../constants/actionTypes';
import { Form, Row, Col } from 'react-bootstrap';
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { resorceJSON } from '../../libraries'
import { TableData } from '../../shared/Table'

class ParentCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.CategoryList,
            TableHead: ["Category Name", "Image", 'Description', "Crop"],
            CategoryCount: props.getCount,
            search: '',
            dcCode: '',
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
            // PriceLists: props.getLists,
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
            this.setState({ currentPage: categorySesData.page, search: categorySesData.search, itemPerPage: categorySesData.limit },
                () => { this.getCategoryList() })

        }
        else {
            this.getCategoryList()
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
        if (newProps.getLists) {
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
    itemEdit = (itemId) => {
        let obj = {
            "page": this.state.currentPage,
            "search": this.state.search,
            "limit": this.state.itemPerPage
        }
        sessionStorage.setItem('categorySessionData', JSON.stringify(obj))
        this.props.history.push({ pathname: path.category.edit + itemId, state: { categoryId: itemId } });
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
    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }
    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getCategoryList();
            });
        }
    }
    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.setState({ currentPage: 0 }, () => {
                let serObj = {
                    "page": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
                    "search": this.state.search,
                    "limit": this.state.itemPerPage,
                };
                this.props.getParentCategoryList(serObj);
            })
        }
    }
    resetSearch = () => {
        if (this.state.search || (!this.state.search)) {
            sessionStorage.removeItem('categorySessionData')
            this.setState({ search: '', currentPage: 0 }, () => {
                let serObj = {
                    "page": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
                    "search": this.state.search,
                    "limit": this.state.itemPerPage,
                };
                this.props.getParentCategoryList(serObj);
            });
        }
    }
    itemDelete = (id) => {
        this.props.DeleteCategory(id);
    }

    formPath = () => {
        this.props.history.push(path.category.add);
    }
    render() {
        let CategoryList = this.state.data && this.state.data.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />
            let viewCrop = <button className="common-btn px-2" onClick={() => this.itemView(item)}>View Sub Category</button>
            return { "itemList": [item.name, catImg, item.description ? item.description : '-', viewCrop], "itemId": item.id }
        })

        return (
            <div className="category-table">
                <Row className="clearfix title-section">
                    <Col md={7} className="title-card ">
                        <h4 className="user-title">{window.strings.CATEGORY.PARENT_CATEGORY}</h4>
                    </Col>
                    <Col md={5} className="right-title">
                        <Row className="m-0">
                            <Col md={12} className="pr-0">
                                <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            </Col>
                            {/* <Col md={5} className="pl-0">
                                <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                                    {window.strings.CATEGORY.ADDBUTTON}</button>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>

                <div className="sub-category">
                    <TableData TableHead={this.state.TableHead} TableContent={CategoryList} />
                    {CategoryList.length > 0 && < ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />}

                </div>
            </div>

        );
    }
}



function mapStateToProps(state) {
    return {
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        categoryData: state.category
    };
}

export default connect(mapStateToProps, { getParentCategoryList, DeleteCategory })(ParentCategory);