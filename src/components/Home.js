import React, { Component } from 'react';

export default class Home extends Component {

    listPath = () => {
        this.props.history.push('categoryList');
    }

    render() {
        return (
            <div className="widget-section dashboard-page">
                <div className="row pr-3">
                    <div className="col-md-4 pr-0 dashboard-bx new-order">
                        <a href="#" className="card">
                            <div className="box">
                                <h5>New Orders</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 pr-0 dashboard-bx delivery-order">
                        <a href="#" className="card">
                            <div className="box">
                                <h5>Delivery Orders</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 pr-0 dashboard-bx revenue">
                        <a href="#" className="card">
                            <div className="box">
                                <h5>Revenue</h5>
                                <span>45236</span>
                            </div>
                        </a>
                    </div>

                </div>
                <div className="row dashboard-graph">
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>
                </div>
                <label for="search-bar-0">   
                    <span class="sr-only">Search this table</span>
                    <input id="search-bar-0" type="text" aria-label="enter text you want to search" class="form-control " placeholder="Search" value="" />
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
        </div>
        );
    }
}