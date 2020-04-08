import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { SubmitOrderCredit } from '../../actions/orderAction'
import { toastr } from '../../services';

class CreateCredit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            reason: '',
            submitted: false
        }
    }

    handleInputChange = (e) => {
        if (e.target.name == "amount") {
            e.target.value < 0 || e.target.value.includes('.') ? this.setState({ [e.target.name]: '' }) : this.setState({ [e.target.name]: e.target.value });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    redirectPage = () => {
        this.props.onCloseModal();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (this.state.amount) {
            if (this.state.amount <= this.props.orderAmount) {
                let obj = {
                    "walletPrice": this.state.amount,
                    "activity": this.state.reason,
                    "userId": this.props.userId,
                    "orderId": this.props.orderId,
                    "orderAmount": this.props.orderAmount
                }
                SubmitOrderCredit(obj).then(resp => {
                    if (resp) {
                        this.props.onCloseModal();
                    }
                });
            } else {
                toastr.error("Invalid Order Credit")
            }
        } else {
            toastr.error('Mandatory Fields are missing')
        }
    }

    render() {
        return (
            <div>
                {/* <h4> ORDER CREDIT </h4> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-9">
                            <form onSubmit={this.handleSubmit} noValidate className="pt-3 m-0">
                                <div className="form-group col-md-12">
                                    <label>{window.strings.ORDER.AMOUNT + ' *'}</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={this.state.amount}
                                        placeholder="Amount"
                                        onChange={this.handleInputChange}
                                        className={classnames('form-control', {
                                        })}
                                    />
                                    {this.state.submitted && !this.state.amount && <div className="mandatory">{window.strings['ORDER']['AMOUNT'] + window.strings['ISREQUIRED']}</div>}
                                    {this.state.submitted && (this.state.amount > this.props.orderAmount) && <div className="mandatory">{window.strings['INVALID'] + ' ' + window.strings['ORDER']['AMOUNT']}</div>}
                                </div>
                                <div className="form-group col-md-12">
                                    <label>{window.strings.ORDER.REASON}</label>
                                    <textarea
                                        type="text"
                                        name="reason"
                                        value={this.state.reason}
                                        placeholder="Reason.."
                                        onChange={this.handleInputChange}
                                        className={classnames('form-control', {
                                        })}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12 bottom-section">
                            <button type="button" className="btn btn-default" onClick={this.redirectPage}>{window.strings.CANCEL}</button>
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    orderDetails: state.order ? state.order : {}
})


export default connect(mapStateToProps)(CreateCredit)