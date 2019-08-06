import React, { Component } from 'react';

export default class Home extends Component {
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
               
            </div>
        );
    }
}