import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimePicker from 'rc-time-picker';
import * as moment from 'moment';


export default class CreateDC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},

        }
    }
    componentDidMount() {
        // this.getShop();
        if (this.props.location && this.props.location.state) {
            let getTime = this.props.location.state.shopAddress && this.props.location.state.shopAddress.shopOpeningTime;
            let getTimeformat = getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1].split(' ')
            // console.log('getTimeformat', getTimeformat);
            // console.log('getTimeformat', getHoursFormat);
            this.setState({
                name: this.props.location.state.name, shopName: this.props.location.state.shopAddress.name, shopAddress: this.props.location.state.shopAddress.address1,
                min: getTimeformat[0], sec: getHoursFormat[0], a: getHoursFormat[1], shopType: this.props.location.state.shopAddress.shopType, userId: this.props.location.state.id
            })
        }
    }
    handleTimePicker = value => {
        let getTime = value && value.format('hh:mm a');
        let getTimeformat = getTime && getTime.split(':');
        console.log('getTimeformat', getTimeformat);
        let getHoursFormat = getTimeformat && getTimeformat[1].split(' ');
        console.log(value && value.format('h:mm a'));
        this.setState({ min: getTimeformat && getTimeformat[0], sec: getHoursFormat && getHoursFormat[0], a: getHoursFormat && getHoursFormat[1] });
    };
    render() {
        const { errors } = this.state;
        const format = 'hh:mm a';


        return (
            <div>
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">ADD DC</h4>
                    </div>
                </div>
                <div className="main-wrapper p-3">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                    required
                                />
                                {this.state.submitted && !this.state.name && <div className="mandatory">Name  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Surveying Area</label>
                                <input
                                    type="text"
                                    placeholder="Surveying Area"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="shopName"
                                    onChange={this.handleInputChange}
                                    value={this.state.shopName}
                                    required
                                />
                                {this.state.submitted && !this.state.shopName && <div className="mandatory">Surveying Area  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Order Cutoff-time</label>
                                <TimePicker className="dc-time"
                                    value={moment(`${this.state.min}:${this.state.sec}: ${this.state.a}`, format)}
                                    // value={this.state.value}
                                    placeholder="Order Cutoff-time" showSecond={false}
                                    onChange={this.handleTimePicker}
                                    use12Hours
                                    format={format}
                                    inputReadOnly
                                />
                                {this.state.submitted && !this.state.min && <div className="mandatory">Order Cutoff-time{window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Delivery Slot</label>
                                <input
                                    type="text"
                                    placeholder="Delivery Slot"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="shopName"
                                    onChange={this.handleInputChange}
                                    value={this.state.shopName}
                                    required
                                />
                                {this.state.submitted && !this.state.shopType && <div className="mandatory">Delivery Slot{window.strings['ISREQUIRED']}</div>}
                            </div>
                        </form>

                    </div>
                    <div className="col-md-12 bottom-section">
                        <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                    </div>

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}