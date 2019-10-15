import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DataTableDynamic from '../../shared/DataTableDynamic';
import { fetchRetailers, deleteRetailer } from '../../actions/SubmitRetailerAction';
import { RETAILER_DELETE_SUCCESS } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import { resorceJSON } from '../../libraries';
import PropTypes from 'prop-types';
import { toastr } from '../../services/toastr.services'
// import GoogleMapPage from '../../shared/GoogleMapPage';
import { DynamicTable } from '../../../src/shared/DynamicTable'
import { path } from '../../constants';
import store from '../../store/store';

class FetchRetailer extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props, context) {
        super(props);
        this.state = {
            roleId: props.roleId,
            retailerId: "",
            columns: resorceJSON.RetailerList,
            data: [],
            products: [{
                id: 1,
                name: "Product1",
                price: 120
            }, {
                id: 2,
                name: "Product2",
                price: 100
            }]
        }
    }
    componentWillMount() {
        this.getRetailerList();
    }
    getRetailerList = () => {
        let user = {};
        user.roleId = 2;
        user.search = this.props.searchText;
        this.props.fetchRetailers(user);
    };
    handlePageChange = e => {
        e.preventDefault();
        let redrctpath = path.retailer.add;
        this.context.router.history.push(redrctpath);
        // this.props.history.push(path.farmer.add);
    };
    componentWillReceiveProps(newProps) {
        if (newProps.list.datas) {
            let selectlist = newProps.list.datas;
            let Lists = selectlist && selectlist.map(item => {
                item.selectBox = this.viewCrop(item.id);
                return item;
            })
            this.setState({ data: Lists });
        }
        if (newProps.deletedData && newProps.deletedData == "200") {
            store.dispatch({ type: RETAILER_DELETE_SUCCESS, resp: "" })
            this.getRetailerList();
        }
    }
    viewCrop(RetstatusId) {
        let ViewPage = <select className="drop-select" onChange={(e) => this.statusChange(e, RetstatusId)} selected={RetstatusId}>
            {/* onChange={() => this.statusChange(RetstatusId)} selected={RetstatusId}*/}
            <option value="0" className="drop-option" >{window.strings.RETAILERS.PENDING}</option>
            <option value="1" className="drop-option">{window.strings.RETAILERS.ACCEPTED}</option>
            <option value="2" className="drop-option">{window.strings.RETAILERS.REJECTED}</option>
        </select>
        return ViewPage;
    }
    statusChange(e, RetstatusId) {
        console.log("RetstatusId", RetstatusId);
        console.log("status", e.target.value);
        // e.preventDefault();
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { //this.statusUpdate(e.target.value, RetstatusId) 
            },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }
    statusUpdate = (id) => {
        //this.props.updateStatusRetailer(id)
    };
    handleDelete = (data, e) => {
        e.preventDefault();
        let message = window.strings.DELETEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => { this.itemDelete(data.id) },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.DELETE_CONFIRM);
    }
    itemDelete = (id) => {
        this.props.deleteRetailer(id)
    };
    // Actions() {
    //     let actions = <div>

    //         <button onClick={e => this.handleView(e)}>
    //             <i className="fa fa-eye" aria-hidden="true" />
    //         </button>


    //         <button onClick={(e) => this.handleEdit(e)}>
    //             <i className="fal fa-pencil-square-o edit_icon" />
    //         </button>


    //         <button onClick={(e) => this.handleDelete(e)}>
    //             <i className="fas fa-trash-alt" />
    //         </button>

    //     </div>
    //     return actions;
    // }
    // componentWillReceiveProps(newProps) {
    //     if (newProps.list) {
    //         let selectlist = newProps.list;
    //         let Lists = selectlist && selectlist.map(item => {
    //             // item.selectBox = this.viewCrop();
    //             //item.actions = this.Actions();
    //             return item;
    //         })
    //         this.setState({ data: Lists });
    //     }
    // }

    itemView = (e, item) => {
        let retailerId = item.id;
        this.context.router.history.push({
            pathname: path.retailer.view + retailerId,
            data: { farmerData: item },
        });
    };
    itemEdit = (Data) => {
        this.context.router.history.push({
            pathname: path.retailer.edit + Data.id,
            state: { retailerId: Data.id }
        })
    };
    render() {
        return (
            <div>
                {/* <Row className="clearfix title-section">
                    <Col md={5} className="title-card user-board">
                        <h4 className="user-title">{window.strings.USERMANAGEMENT.USER}</h4>
                    </Col>
                    <Col md={7} className="right-title row pr-0 pb-3">
                        <Col md={6} className="user-board add-user">
                            <i className="fa fa-search search-icon"></i><input type="text" className="search-btn" placeholder="Search.." />
                        </Col>
                        <Col md={3} className="user-board add-user">
                            <button type="submit" className="filter-btn"><i className="fa fa-filter filter-icon"></i>Filter by</button>
                        </Col>
                        <Col md={3} className="user-board add-user">
                            <button className="common-btn" onClick={this.handlePageChange} ><i className="fa fa-plus sub-plus"></i>{window.strings.USERMANAGEMENT.ADDRETAIL}
                            </button>
                        </Col>
                    </Col>

                </Row> */}
                {/* <DynamicTable tableDatas={this.state.data} tableHead={this.state.columns} handleEdit={this.itemEdit}
                    handleView={this.itemView}
                    handleDelete={this.itemDelete} /> */}
                <DataTableDynamic
                    title="Category List"
                    tableHead={this.state.columns}
                    tableDatas={this.state.data}
                    handleEdit={this.itemEdit}
                    handleView={this.itemView}
                    handleDelete={this.handleDelete}
                    pagination={true}
                />
                {/* <GoogleMapPage /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.retailer.Lists ? state.retailer.Lists : [],
    deletedData: state.retailer.deletedData
});

export default connect(
    mapStateToProps,
    { fetchRetailers, deleteRetailer },
)(FetchRetailer);
