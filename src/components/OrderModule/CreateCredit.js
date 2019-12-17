import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';


export default class CreateCredit extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h4> ORDER CREDIT </h4>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit} noValidate className="pt-3 m-0">
                            <div className="form-group col-md-12">
                                <label>Amount</label>
                                <input
                                    type=""
                                    placeholder="Amount"
                                    className={classnames('form-control', {
                                    })}
                                />
                            </div>
                            <div className="form-group col-md-12">
                                <label>Reason</label>
                                <textarea
                                    type="text"
                                    placeholder="Reason.."
                                    className={classnames('form-control', {
                                    })}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}