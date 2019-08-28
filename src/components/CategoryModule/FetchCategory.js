import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import DataTableDynamic from '../../shared/DataTableDynamic';
import { getCategoryList, DeleteCategory } from '../../actions/categoryAction';
import { TableData } from '../../shared/Table'
import { confirmAlert } from 'react-confirm-alert';
import { resorceJSON } from '../../libraries'
import { ReactPagination, SearchBar } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'

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

    // componentWillUpdate(newProps, newState) {
    //     this.state.CategoryListDatas = newProps.getLists;
    // }

    viewCrop(Data) {
        let ViewPage = <button onClick={() => this.itemView(Data)}>View Crop</button>
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
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        this.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }

    itemDelete = (id) => {
        this.props.DeleteCategory(id).then(resp => {
            if (resp) {
                this.getCategoryList();
            }
        });
    }

    formPath = () => {
        this.props.history.push(path.category.add);
    }


    render() {
        return (
            <div>
                <div>
                    <button className="btn btn-warning" onClick={this.formPath}>{window.strings.CATEGORY.ADDBUTTON}</button>
                </div>
                <DataTableDynamic title="Category List" tableHead={this.state.columns} tableDatas={this.state.data} handleEdit={this.itemEdit} handleDelete={this.handleDelete} pagination={true} />
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



export default connect(mapStateToProps, { getCategoryList, DeleteCategory })(CategoryList);
