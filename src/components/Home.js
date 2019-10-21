import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactBarChart, ReactPieChart } from '../shared/Reactgraphcharts';
import { getUsersDetails, getOrderReports } from '../actions/SubmitRetailerAction';
import DatesCalculation from '../shared/DatesCalculation'

class Home extends Component {
    constructor(props, context) {
        super(props);
        this.state = { Userlist: [] }
    }
    componentDidMount() {
        this.props.getUsersDetails();
    }
    componentWillReceiveProps(newProps) {
        this.setState({ Userlist: newProps.Userlist });
    }

    listPath = () => {
        this.props.history.push('categoryList');
    }
    getDateType = (e) => {
        this.props.getOrderReports(e.target.value)
        //let X_axis_format = DatesCalculation.dateType(e.target.value);
        // console.log('X_axis_format', X_axis_format);
    }

    render() {
        return (
            <div className="widget-section dashboard-page">
                <div className="row pr-3">
                    <div className="col-md-4 pr-0 dashboard-bx new-order">
                        <a href="#" className="card">
                            <div className="box">
                                <h5 className="dashboard-title">New Orders</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 pr-0 dashboard-bx delivery-order">
                        <a href="#" className="card">
                            <div className="box">
                                <h5 className="dashboard-title">Delivery Orders</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 pr-0 dashboard-bx revenue">
                        <a href="#" className="card">
                            <div className="box">
                                <h5 className="dashboard-title">Revenue</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>
                    <div className="LineChart main-wrapper chart-box">
                        <div className="main-graph">
                            <span className="graph-title">User Analytics</span>
                            <span className="graph-label">This Week</span>
                        </div>
                        <div className="sub-graph">
                            <span className="farm-graph">Farmer</span>
                            <span className="chart-graph">Retailer</span>
                        </div>
                        <ReactPieChart userdata={this.state.Userlist} />
                    </div>
                    <div className="LineChart main-wrapper chart-box">
                        <div className="main-graph">
                            <span className="graph-title">Delivery Orders</span>
                            {/* <span className="graph-label">This Week</span> */}
                            <select className="drop-select" onChange={(e) => this.getDateType(e)}>
                                <option value="week" className="drop-option" >This Week</option>
                                <option value="month" className="drop-option">This Month</option>
                                <option value="year" className="drop-option">This Year</option>
                            </select>
                        </div>
                        <div className="sub-graph pb-4">
                            <span className="order-graph">Orders</span>
                            <span className="chart-graph">Estimate</span>
                        </div>
                        <ReactBarChart />
                    </div>
                </div>
                <div className="row dashboard-graph">
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                </div>
                <label for="search-bar-0">
                    <span class="sr-only">Search this table</span>
                    <input id="search-bar-0" type="text" aria-label="enter text you want to search" className="form-control " placeholder="Search" value="" />
                    <button className="reset-btn"><i className="fa fa-refresh mrr5" aria-hidden="true"></i></button>

                </label>
                <h4>New Orders</h4>

                <div class="react-bootstrap-table main-wrapper">
                    {/*  <div className="dashboard-table main-wrapper">*/}
                    <div className="dashboard-tables">
                        <div className="sub-dashboard">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Received Date</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>12345</td>
                                        <td>rice</td>
                                        <td>2019</td>
                                        <td>1 ton</td>
                                        <td>pending</td>
                                    </tr>
                                    <tr>
                                        <td>36745</td>
                                        <td>wheat</td>
                                        <td>2019</td>
                                        <td>1 ton</td>
                                        <td>completed</td>
                                    </tr>
                                    <tr>
                                        <td>12345</td>
                                        <td>rice</td>
                                        <td>2019</td>
                                        <td>1 ton</td>
                                        <td>completed</td>
                                    </tr>
                                    <tr>
                                        <td>12345</td>
                                        <td>rice</td>
                                        <td>2019</td>
                                        <td>1 ton</td>
                                        <td>completed</td>
                                    </tr>
                                    <tr>
                                        <td>12345</td>
                                        <td>rice</td>
                                        <td>2019</td>
                                        <td>1 ton</td>
                                        <td>completed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = state => ({
    Userlist: state.retailer.Userlist ? state.retailer.Userlist : [],
    // deletedData: state.retailer.deletedData
});

export default connect(
    mapStateToProps,
    { getUsersDetails },
)(Home);