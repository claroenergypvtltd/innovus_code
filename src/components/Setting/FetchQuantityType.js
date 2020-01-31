import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { ReactPagination } from '../../shared'
import { resorceJSON } from '../../libraries'
import { path } from '../../constants';

class FetchQuantityType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["QUANTITY TYPE CONTROL"],
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }
    formPath = () => {
        this.props.history.push('/setting/createquantitytype')
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.appSetting.list })
    }
    render() {
        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.APPSETTING.QUANTITY_TYPE_CONTROL}</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.APPSETTING.ADD_QUANTITY_TYPE_CONTROL}</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <TableData TableHead={this.state.TableHead} handleEdit={this.itemEdit} />
                        <div className="row">
                            <div className="back-btn col-md-2"><button class="common-btn" onClick={this.redirectPage}>Back</button></div>
                            <div className="col-md-10">
                                < ReactPagination PageDetails={{ pageCount: this.state.pageCount, onPageChange: this.onChange, activePage: this.state.currentPage, perPage: this.state.limitValue, totalCount: this.state.totalCount }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = () => {

}
export default connect(mapStateToProps, {})(FetchQuantityType)