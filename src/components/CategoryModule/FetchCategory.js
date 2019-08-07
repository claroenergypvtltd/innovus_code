import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'

import { CategoryAction } from '../../actions/CategoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';

class CategoryList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            page: {
                "itemPerPage": 5,
                "current_page": 1
            },
            TableHead: ["Name", "Description", "Image"],
            CategoryListDatas: props.getLists,
            CategoryCount: props.getCount,
        }
    }

    componentDidMount() {
        debugger;
        this.CategoryDatas(this.state.page);
    }

    componentWillUpdate(newProps, newState) {
        this.state.CategoryListDatas = newProps.getLists;
    }

    componentWillReceiveProps(nextProps) {
        this.state.CategoryListDatas = nextProps.getLists;
    }

    CategoryDatas(pageDetails) {
        this.props.dispatch(CategoryAction.getCategoryList(pageDetails));
    }

    itemEdit = (catId) => {
        debugger;
        this.props.history.push({ pathname: '/category/edit/' + catId, state: { categoryId: catId } });
    }

    customConfirm(message, props, title) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='deletepopup'>
                        <h4 className="delete_popup_header">{title}</h4>
                        <div className="delete_popup_message">
                            <p>{message}</p>
                            <button className="btn btn-default pull-right mrr10" onClick={() => {
                                props.onCancel()
                                onClose()
                            }}><i className="fa fa-close mr15"></i>{window.strings.CANCEL}</button>
                            <button className="btn btn-primary pull-right mrr10" onClick={() => {
                                props.onOk()
                                onClose()
                            }}><i className="fa fa-send-o mr15"></i>{window.strings.OK}</button>
                        </div>
                    </div>
                )
            }
        })
    }


    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        this.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }

    itemDelete = (id) => {
        CategoryAction.DeleteCategory(id);
    }

    formPath = () => {
        this.props.history.push('/category/add');
    }


    render() {



        let CategoryData = this.state.CategoryListDatas ? this.state.CategoryListDatas : [];
        let CategoryList = this.state.CategoryListDatas && this.state.CategoryListDatas.map((item, index) => {
            return { "itemList": [item.name, item.description, item.image], "itemId": item.id }
        })

        return (
            <div>
                <div>
                    <button onClick={this.formPath}>{window.strings.CATEGORY.ADDBUTTON}</button>
                </div>
                <TableData TableHead={this.state.TableHead} TableContent={CategoryList} handleDelete={this.handleDelete}
                    handleEdit={this.itemEdit} />
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

CategoryList.defaultProps = defaultProps;



export default connect(mapStateToProps)(CategoryList);
