import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableData } from '../../shared/Table'
import { getFaqList, DeleteFaq } from '../../actions/faqAction'
import { path } from '../../constants/path'
import { toastr } from '../../services/toastr.services'
import { FAQ_DELETE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';

class FetchFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Title", "Description", "Actions"],
            FaqListDatas: props.getLists,
            FaqCount: props.getCount

        }
    }

    componentDidMount() {
        this.getFaqList();

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.faqData && nextProps.faqData.Lists) {

            let Data = nextProps.faqData.Lists;
            this.setState({ FaqListDatas: Data })
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


    getFaqList = () => {
        let user = {};
        user.search = this.props.searchText;
        this.props.getFaqList(user);
    }

    formPath = () => {
        this.props.history.push(path.faq.add)
    }


    render() {

        let FaqList = this.state.FaqListDatas && this.state.FaqListDatas.map((item, index) => {
            return { "itemList": [item.title, item.description], "itemId": item.id }
        })

        return (
            <div className="category-table">
                <div className="category-title right-title">
                    <button className="common-btn" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>
                        {window.strings.FAQ.ADD_FAQ}</button>
                </div>
                <div className="sub-category">
                    <TableData TableHead={this.state.TableHead} TableContent={FaqList} handleDelete={this.handleDelete}
                        handleEdit={this.itemEdit} />
                </div>
            </div>

        );
    }

}


const mapStateToProps = (state) => ({
    faqData: state.faq,
    getLists: state && state.faq && state.faq.Lists ? state.faq.Lists : [],
})



export default connect(mapStateToProps, { getFaqList, DeleteFaq })(FetchFAQ)