import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimePicker from 'rc-time-picker';
import * as moment from 'moment';
import { path } from '../../constants';
import { fetchDcList, SubmitDC, DeleteDC } from '../../actions/dcAction';
import store from '../../store/store';
import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_UPDATE_SUCCESS, DC_DELETE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes'


class CreateDC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},

        }
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.getSpecificDCData();
        } else {
            const now = moment().hour(0).minute(0);
            this.setState({ orderCutOffTime: now });
        }
    }

    getSpecificDCData() {

        // if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
        let id = this.props.location.state.id;
        this.setState({ id }, () => {

            this.props.fetchDcList({ "id": this.state.id });
        });
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dcData && nextProps.dcData.createdStatus == "200") {
            store.dispatch({ type: DC_CREATE_SUCCESS, resp: "" })
            this.props.history.push(path.dc.list);
        }
        if (nextProps.dcData && nextProps.dcData.updatedStatus == "200") {
            store.dispatch({ type: DC_UPDATE_SUCCESS, resp: "" })
            this.props.history.push(path.dc.list)
        }
        if (this.state.id && nextProps.dcData && nextProps.dcData.specificData && nextProps.dcData.specificData.datas && nextProps.dcData.specificData.datas[0]) {
            let Data = nextProps.dcData.specificData.datas[0];
            // let couponDate = Data.startDate

            // "name": this.state.name,
            // "surveyingArea": this.state.surveyingArea,
            // "orderCutOffTime": this.state.orderCutOffTime,
            // "deliverySlot": this.state.deliverySlot,
            // "id": this.state.id
            let getTime = Data.orderCutOffTime;
            let getTimeformat = getTime && getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1].split(' ')
            this.setState({ min: getTimeformat && getTimeformat[0], sec: getHoursFormat && getHoursFormat[0], a: getHoursFormat && getHoursFormat[1], name: Data.name, surveyingArea: Data.surveyingArea, orderCutOffTime: Data.orderCutOffTime, deliverySlot: Data.deliverySlot })
        }

    }


    handleTimePicker = value => {
        if (this.state.id) {
            let getTime = value && value.format('hh:mm a');
            let getTimeformat = getTime && getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1] && getTimeformat[1].split(' ');
            this.setState({ min: getTimeformat && getTimeformat[0], sec: getHoursFormat && getHoursFormat[0], a: getHoursFormat && getHoursFormat[1] });
        } else {
            const format = 'h:mm a';
            this.setState({ orderCutOffTime: value.format(format) })
        }
    };


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // getSpecificCouponData() {

    //     if (this.props.location && this.props.location.state && this.props.location.state.couponId) {
    //         let id = this.props.location.state.couponId;
    //         this.setState({ couponId: id });
    //         this.props.getSpecificCouponData(this.props.location.state.couponId);
    //     }
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.name && this.state.surveyingArea && this.state.orderCutOffTime && this.state.deliverySlot) {

            const formData = new FormData();
            let obj = {
                "name": this.state.name,
                "surveyingArea": this.state.surveyingArea,
                // "orderCutOffTime": this.state.orderCutOffTime,
                "orderCutOffTime": this.state.id ? this.state.min + ':' + this.state.sec + ' ' + this.state.a : this.state.orderCutOffTime,
                "deliverySlot": this.state.deliverySlot,
                "id": this.state.id
            }
            this.props.SubmitDC(obj);
        }

    }

    listPath = () => {
        // this.props.history.push({ pathname: path.dc.list })
        this.props.history.goBack();
    }

    render() {
        const { errors } = this.state;
        const format = 'hh:mm a';
        let timeData = ""
        const now = moment().hour(0).minute(0);
        if (this.state.id) {
            // let data = moment(`${this.state.min}:${this.state.sec}: ${this.state.a}`, format)
            // timeData = "value=" + data
            timeData = moment(`${this.state.min}:${this.state.sec}: ${this.state.a}`, format)
        }
        else {
            timeData = moment().hour(0).minute(0);

            // timeData = "defaultValue={this.state.orderCutOffTime}"
        }
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
                                        'is-invalid': errors.name
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
                                        'is-invalid': errors.surveyingArea
                                    })}
                                    name="surveyingArea"
                                    onChange={this.handleInputChange}
                                    value={this.state.surveyingArea}
                                    required
                                />
                                {this.state.submitted && !this.state.surveyingArea && <div className="mandatory">Surveying Area  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Order Cutoff-time</label>
                                {/* <TimePicker className="dc-time"
                                    value={moment(`${this.state.min}:${this.state.sec}: ${this.state.a}`, format)}
                                    // value={this.state.value}
                                    defaultValue={now}
                                    placeholder="Order Cutoff-time" showSecond={false}
                                    onChange={this.handleTimePicker}
                                    use12Hours
                                    format={format}
                                    inputReadOnly
                                /> */}
                                {this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={timeData}
                                    // value={""}
                                    // value={this.state.orderCutOffTime}
                                    value={timeData}
                                    className="xxx"
                                    onChange={this.handleTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />}

                                {!this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={timeData}
                                    // value={""}
                                    // value={this.state.orderCutOffTime}
                                    className="xxx"
                                    onChange={this.handleTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />
                                }
                                {this.state.submitted && !this.state.orderCutOffTime && <div className="mandatory">Order Cutoff-time{window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Delivery Slot</label>
                                <input
                                    type="text"
                                    placeholder="Delivery Slot"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.deliverySlot
                                    })}
                                    name="deliverySlot"
                                    onChange={this.handleInputChange}
                                    value={this.state.deliverySlot}
                                    required
                                />
                                {this.state.submitted && !this.state.deliverySlot && <div className="mandatory">Delivery Slot{window.strings['ISREQUIRED']}</div>}
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

const mapStatetoProps = (state) => ({
    dcData: state.dc
})

export default connect(mapStatetoProps, { SubmitDC, fetchDcList })(CreateDC)