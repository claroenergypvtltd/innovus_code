import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { getCategoryList, DeleteCategory } from '../../actions/categoryAction';
import { resorceJSON } from '../../libraries'
import { SearchBar } from '../../shared'
import { path } from '../../constants';
import { imageBaseUrl } from '../../config'
import { toastr } from '../../services/toastr.services'
import store from '../../store/store';
import { CATEGORY_DELETE_SUCCESS } from '../../constants/actionTypes';
import { Form, Row, Col } from 'react-bootstrap';


class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: resorceJSON.CategoryList,
            search: '',
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

    handleChange = (e) => {
        this.setState({ search: e.target.value })
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
        this.props.getCategoryList();
    }


    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            let serObj = {
                "search": this.state.search
            };
            this.props.getCategoryList(serObj);
        }
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.props.getCategoryList();
            });
        }
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
                {/* <div className="category-title right-title">
                    <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />

                    <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                        {window.strings.CATEGORY.ADDBUTTON}</button>
                </div> */}



                <Row className="clearfix title-section">
                    <Col md={7} className="title-card ">
                        <h4 className="user-title">{window.strings.CATEGORY.LISTTITLE}</h4>
                    </Col>
                    <Col md={5} className="right-title row pr-0 pb-3">
                        <Col md={8} className="p-0">
                            <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        </Col>
                        <Col md={4} >
                            <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                                {window.strings.CATEGORY.ADDBUTTON}</button>
                        </Col>
                    </Col>

                </Row>



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
