import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { ReactPagination } from '../../shared'
import { resorceJSON } from '../../libraries'
import { path } from '../../constants';
import { getRegion } from '../../actions/regionAction'

class FetchRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Region Name", "Dc Code", "Dc Name", "Action"],
            currentPage: 0,
            itemPerPage: resorceJSON.TablePageData.itemPerPage,
            pageCount: resorceJSON.TablePageData.pageCount,
            limitValue: resorceJSON.TablePageData.paginationLength
        }
    }
    componentDidMount() {
        this.getRegionList()
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionList && newProps.regionList.Lists && newProps.regionList.Lists.datas) {
            this.setState({ regionListData: newProps.regionList.Lists.datas })
        }
    }
    getRegionList = () => {
        let obj = {
            page: this.state.currentPage,
            rows: this.state.itemPerPage
        }
        this.props.getRegion(obj)
    }
    itemEdit = (Data) => {
        this.props.history.push({ pathname: path.region.add, state: { regionId: Data } })
    }
    formPath = () => {
        this.props.history.push({ pathname: path.region.add })
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.dc.list })
    }
    onChange = (data) => {
        if (this.state.currentPage != data.selected) {
            this.setState({ currentPage: data.selected })
        }
    }
    render() {
        const regionData = this.state.regionListData && this.state.regionListData.map((item) => {
            let dcCode = item.dcDatas && item.dcDatas.map((item) => {
                return item.dcCode + " "
            })
            let dcName = item.dcDatas && item.dcDatas.map((item) => {
                return item.name + " "
            })
            return { "itemList": [item.name, dcCode, dcName], "itemId": item.id }
        })
        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">REGION</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.formPath}><i className="fa fa-plus sub-plus"></i>{window.strings.DC_MANAGEMENT.ADD_REGION}</button>
                        </div>
                    </div>
                    <div className="col-12">
                        <TableData TableHead={this.state.TableHead} TableContent={regionData} handleEdit={this.itemEdit} />
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
const mapStateToProps = (state) => ({
    regionList: state.region
})
export default connect(mapStateToProps, { getRegion })(FetchRegion)