import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableData } from '../../shared/Table'
import { getFaqList, DeleteFaq } from '../../actions/faqAction'
import { path } from '../../constants/path'
import { toastr } from '../../services/toastr.services'
import { FAQ_DELETE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import { SearchBar, ReactPagination } from '../../shared'
import { resorceJSON } from '../../libraries'

class FetchFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Title", "Description", "Actions"],
            FaqListDatas: [],
            FaqCount: props.getCount,
            search: '',
            currentPage: 1,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength

        }
    }

    componentDidMount() {
        this.getFaqList();

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.faqData && nextProps.faqData.Lists.data && nextProps.faqData.Lists.data.datas) {

            let Data = nextProps.faqData.Lists.data.datas;
            this.setState({ FaqListDatas: Data, pageCount: nextProps.faqData.Lists.data.totalCount / this.state.itemPerPage })
        }



        if (nextProps.faqData && nextProps.faqData.deletedStatus == "200") {
            store.dispatch({ type: FAQ_DELETE_SUCCESS, resp: "" })
            this.getFaqList();
        }


    }

    handleDelete = (data) => {
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }

    itemDelete = (id) => {
        this.props.DeleteFaq(id);
    }



    itemEdit = (Data) => {

        this.props.history.push({ pathname: path.faq.edit + Data, state: { instructionId: Data } })
    }



    formPath = () => {
        this.props.history.push(path.faq.add)
    }

    //Search

    handleChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchResult = (e) => {
        e.preventDefault();
        if (this.state.search) {
            let serObj = {
                "search": this.state.search
            };
            this.getFaqList(serObj);
        }
    }


    getFaqList() {
        let obj = {
            "search": this.state.search,
            "page": this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            "limit": this.state.itemPerPage
        };
        // user.search = this.props.searchText;
        this.props.getFaqList(obj);
    }

    resetSearch = () => {
        if (this.state.search) {
            this.setState({ search: '' }, () => {
                this.getFaqList();
            });
        }
    }

    onChange = (data) => {

        if (this.state.currentPage !== (data.selected + 1)) {
            this.setState({ currentPage: data.selected + 1 }, () => {
                this.getFaqList();
            });
        }
    }


    render() {

        let FaqList = this.state.FaqListDatas && this.state.FaqListDatas.map((item, index) => {
            return { "itemList": [item.title, item.description], "itemId": item.id }
        })


        return (
            <div className="faq-table">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">FAQ LIST</h4>
                    </div>
                    <div className="row right-title col-md-5">
                        <SearchBar SearchDetails={{ filterText: this.state.search, onChange: this.handleChange, onClickSearch: this.searchResult, onClickReset: this.resetSearch }} />
                        <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                            {window.strings.FAQ.ADD_FAQ}</button>
                    </div>
                </div>
                <div className="sub-category">
                    <TableData TableHead={this.state.TableHead} TableContent={FaqList} handleDelete={this.handleDelete}
                        handleEdit={this.itemEdit} />
                    <ReactPagination PageDetails={{
                        pageCount: this.state.pageCount, onPageChange: this.onChange,
                        activePage: this.state.currentPage, perPage: this.state.limitValue
                    }} />
                </div>
            </div>

        );
    }

}


const mapStateToProps = (state) => ({
    faqData: state.faq,
    // getLists: state && state.faq && state.faq.Lists ? state.faq.Lists : [],
})



export default connect(mapStateToProps, { getFaqList, DeleteFaq })(FetchFAQ)