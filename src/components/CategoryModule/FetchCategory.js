import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { getCategoryList, DeleteCategory } from '../../actions/categoryAction';
import { resorceJSON } from '../../libraries'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS } from '../../constants/actionTypes';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.CategoryList,
            data: [],
        }
    }

    componentDidMount() {
        this.getCategoryList();

    }

    viewCrop(Data) {
        let ViewPage = <button className="view-btn" onClick={() => this.itemView(Data)}>View Crop</button>
        return ViewPage;
    }

    componentWillReceiveProps(newProps) {

        if (newProps.getLists) {
            let Lists = newProps.getLists.map(item => {
                item.cropButton = this.viewCrop(item);
                item.image = <img src={imageBaseUrl + item.image} height="30px" width="30px" />
                return item;
            })

            this.setState({ data: Lists });
        }


        if (newProps.categoryData && newProps.categoryData.deletedStatus == "200") {
            store.dispatch({ type: CATEGORY_DELETE_SUCCESS, resp: "" })
            this.getCategoryList();
        }
    }


    getCategoryList = () => {
        let user = {};
        user.search = this.props.searchText;
        this.props.getCategoryList(user);
    }


    itemEdit = (Data) => {
        this.props.history.push({ pathname: path.category.edit + Data.id, state: { categoryId: Data.id } });
    }

    itemView = (Data) => {
        this.props.history.push({ pathname: path.category.view + Data.id, state: { categoryId: Data.id } });
    }


    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }

    itemDelete = (id) => {
        this.props.DeleteCategory(id);
    }

    formPath = () => {
        this.props.history.push(path.category.add);
    }

    render() {
        return (
            <div className="category-table">
                <div className="category-title right-title">
                    <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                    {window.strings.CATEGORY.ADDBUTTON}</button>
                </div>
               <div className="sub-category">
                <DataTableDynamic title="Category List" tableHead={this.state.columns} tableDatas={this.state.data} handleEdit={this.itemEdit} handleDelete={this.handleDelete} pagination={true} />
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

export default connect(mapStateToProps, { getCategoryList, DeleteCategory })(CategoryList);
