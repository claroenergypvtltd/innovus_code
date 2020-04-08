import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getCropList } from '../../actions/cropAction'
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import { CATEGORY_DELETE_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';

class FetchCrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["Crop Name", "Image", "Description", "DC Code"],
            CropLists: props.getLists,
            CategoryCount: props.getCount,
            search: '',
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
        }
    }

    componentDidMount() {
        this.getCropList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.categoryData.deletedStatus == "200") {
            store.dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: "" })
            this.getCropList();
        }

        if (newProps.cropData.List) {
            let Data = newProps.cropData.List;
            this.setState({ CropLists: Data.datas, pageCount: Data.totalCount / this.state.itemPerPage, totalCount: Data.totalCount })
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.getCropList();
        }
    }

    resetSearch = () => {
        // if (this.state.search) {
        this.setState({ search: '' }, () => {
            this.getCropList();
        });
        // }
    }

    getCropList() {
        let obj = {
            "isallcrop": true,
            "pages": this.state.currentPage ? this.state.currentPage : window.constant.ZERO,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
        }

        this.props.getCropList(obj);
    }

    itemEdit = (catId) => {
        this.props.history.push({ pathname: path.crop.edit + catId, state: { categoryId: catId } });
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
        this.props.history.push(path.crop.add);
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected)) {
            this.setState({ currentPage: data.selected }, () => {
                this.getCropList();
            });
        }
    }


    render() {

        let CategoryData = this.state.CropLists ? this.state.CropLists : [];
        let CategoryList = this.state.CropLists && this.state.CropLists.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} className="table-img" />
            return { "itemList": [item.name, catImg, item.description, item.dcCode], "itemId": item.id }
        })
        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        {/* <h2>{window.strings.CATEGORY.VIEWTITLE}</h2> */}
                        <h4 className="user-title">List Crop</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>Add Crop</button> */}
                    </div>
                    <div className="right-title col-md-5">
                        <div className="row">
                            <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                            <button className="common-btn col-md-4" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>Add Crop</button>
                        </div>
                    </div>
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
        categoryData: state.category,
        cropData: state.crop,
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        getCount: state && state.category && state.category.count ? state.category.count : 1
    };
}

export default connect(mapStateToProps, { getCropList, DeleteCategory })(FetchCrop);
