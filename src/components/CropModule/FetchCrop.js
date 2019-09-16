import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'

import { DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { getCropList } from '../../actions/cropAction'
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'

class FetchCrop extends Component {

    constructor(props) {

        super(props);
        this.state = {
            TableHead: ["Crop Name", "Image", "Description"],
            CropLists: props.getLists,
            CategoryCount: props.getCount,
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength,
        }
    }

    componentDidMount() {
        this.getCropList();
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
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getCropList();
            });
        }
    }

    getCropList() {
        let obj = {
            "isallcrop": true,
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "search": this.state.search,
            "limit": this.state.itemPerPage,
        }

        this.props.getCropList(obj).then(resp => {
            if (resp && resp.data && resp.data.datas) {
                this.setState({ CropLists: resp.data.datas, pageCount: resp.data.totalCount / this.state.itemPerPage })
            }

        })
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
        this.props.DeleteCategory(id).then(resp => {
            if (resp) {
                this.getCropList();
            }
        });
    }

    formPath = () => {
        this.props.history.push(path.crop.add);
    }

    onChange = (data) => {
        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getCropList();
            });
        }
    }


    render() {

        let CategoryData = this.state.CropLists ? this.state.CropLists : [];
        let CategoryList = this.state.CropLists && this.state.CropLists.map((item, index) => {
            let catImg = <img src={imageBaseUrl + item.image} height="30px" width="30px" />
            return { "itemList": [item.name, catImg, item.description], "itemId": item.id }
        })

        return (
            <div>
                <div>
                    {/* <h2>{window.strings.CATEGORY.VIEWTITLE}</h2> */}
                    <h2>List Crop</h2>
                    <button className="btn btn-warning float-right" onClick={this.formPath}>Add Crop</button>
                </div>
                <div className="col-md-6 s-left">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList} handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit} />
                <ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue }} />
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        getLists: state && state.category && state.category.Lists ? state.category.Lists : [],
        getCount: state && state.category && state.category.count ? state.category.count : 1
    };
}

const defaultProps = {
    getLists: [],
    getCount: 1
}

FetchCrop.defaultProps = defaultProps;



export default connect(mapStateToProps, { getCropList, DeleteCategory })(FetchCrop);
