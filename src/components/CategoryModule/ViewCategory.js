import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteCategory, getSpecificCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS } from '../../constants/actionTypes';

class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Crop Name", "Image", "Description", "Action"],
            CategoryListDatas: props.getLists,
            CategoryCount: props.getCount,
            currentPage: resorceJSON.TablePageData.currentPage,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            categoryId: ''
        }
    }

    componentDidMount() {
        this.getSpecificData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryData.deletedStatus == "200") {
            store.dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: "" })
            this.getSpecificData();
        }

        if (nextProps.categoryData.specificData.data.datas) {
            let Data = nextProps.categoryData.specificData.data;
            this.setState({ CategoryListDatas: Data.datas, pageCount: Data.totalCount / this.state.itemPerPage })
        }
    }

    getSpecificData() {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            this.setState({ categoryId: this.props.location.state.categoryId });

            let obj = {
                "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
                "search": this.state.search,
                "limit": this.state.itemPerPage,
                "categoryId": this.props.location.state.categoryId
            }

            this.props.getSpecificCategory(obj, true);
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.getSpecificData();
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getSpecificData();
            });
        }
    }


    itemEdit = (catId) => {
        this.props.history.push({ pathname: path.category.edit + catId, state: { categoryId: catId } });
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
        this.props.history.push({ pathname: path.crop.add, state: { cropId: this.state.categoryId } });
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getSpecificData();
            });
        }
    }

    redirectPage = () => {
        this.props.history.goBack();
    }


    render() {
        let CategoryList = this.state.CategoryListDatas && this.state.CategoryListDatas.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />
            return { "itemList": [item.name, catImg, item.description], "itemId": item.id }
        })

        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        {/* <h2>{window.strings.CATEGORY.VIEWTITLE}</h2> */}
                        <h4 className="user-title">VIEW CROP</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>Add Crop</button> */}
                    </div>
                    <div className="right-title row col-md-5">
                        <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        <button className="common-btn col-md-4" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Crop</button>

                    </div>
                </div>
                {/* <div>
                    <h2>List Crop</h2>
                    <button className="btn btn-warning float-right" onClick={this.formPath}>Add Crop</button>
                </div>
                <div className="col-md-6 s-left">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                </div> */}
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList} handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit} />
                <div className="row">
                    <div className="back-btn col-md-2"><button class="common-btn" onClick={this.redirectPage}>Back</button></div>
                    <div className="col-md-10">
                        {this.state.CategoryListDatas && this.state.CategoryListDatas.length != 0 && < ReactPagination className="m-0" PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />}
                    </div>
                </div>
            </div>
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



export default connect(mapStateToProps, { DeleteCategory, getSpecificCategory })(ViewCategory);
