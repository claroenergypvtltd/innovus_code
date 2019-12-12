import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'


export default class FetchDC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["DC Code", "Name", 'Surveying Area', "Order Cutoff-time", "Delivery Slot"]
        }
    }
    render() {
        return (
            <div>
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">DC MANAGEMENT</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="row">
                            <div className="col-md-7 pr-0">
                            </div>
                            <div className="col-md-5 pl-0">
                                <button className="common-btn float-right">
                                    <i className="fa fa-plus sub-plus"></i>Add DC
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableData TableHead={this.state.TableHead}
                    handleEdit={this.itemEdit} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}
