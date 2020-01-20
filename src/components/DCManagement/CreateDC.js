import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TimePicker from 'rc-time-picker';
import * as moment from 'moment';
import { path } from '../../constants';
import { fetchDcList, SubmitDC, DeleteDC } from '../../actions/dcAction';
import store from '../../store/store';
import { DC_FETCH_SUCCESS, DC_CREATE_SUCCESS, DC_UPDATE_SUCCESS, DC_DELETE_SUCCESS, DC_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes'
import { toastr } from 'react-redux-toastr'
import Select, { components } from "react-select";

class CreateDC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            orderStartTime: undefined,
            orderCutOffTime: undefined
        }
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.getSpecificDCData();
        } else {
            // const now = moment().hour(0).minute(0);
            this.setState({ orderCutOffTime: undefined, orderStartTime: undefined });
        }
        this.getTimeList();
    }
    getTimeList = () => {
        let timeList = [
            {
                time: "1:00 Hour"
            },
            {
                time: "1:30 Hour"
            },
            {
                time: "2:00 Hour"
            },
            {
                time: "2:30 Hour"
            },
            {
                time: "3:00 Hour"
            },
        ]
        this.setState({ timeList: timeList })
    }


    getSpecificDCData() {
        let id = this.props.location.state.id;
        this.setState({ id }, () => {

            this.props.fetchDcList({ "id": this.state.id });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dcData && nextProps.dcData.createdStatus == "200") {
            store.dispatch({ type: DC_CREATE_SUCCESS, resp: "" })
            this.props.history.push(path.dc.list);
        }
        if (nextProps.dcData && nextProps.dcData.updatedStatus == "200") {
            store.dispatch({ type: DC_UPDATE_SUCCESS, resp: "" })
            this.props.history.push({ pathname: path.dc.list, state: { dcSearchDatas: "backTrue" } })
        }
        if (this.state.id && nextProps.dcData && nextProps.dcData.specificData && nextProps.dcData.specificData.datas && nextProps.dcData.specificData.datas[0]) {
            let Data = nextProps.dcData.specificData.datas[0];
            let getTime = Data.orderStartTime;
            let getTimeformat = getTime && getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1] && getTimeformat[1].split(' ')
            let getTimeOne = Data.orderCutOffTime;
            let getTimeFormatOne = getTimeOne && getTimeOne.split(':');
            let getHoursFormatOne = getTimeFormatOne && getTimeFormatOne[1].split(' ')
            let deliverySlot = { label: Data.deliverySlot, value: Data.deliverySlot }
            this.setState({
                minOne: getTimeFormatOne && getTimeFormatOne[0], secOne: getHoursFormatOne && getHoursFormatOne[0], aOne: getHoursFormatOne && getHoursFormatOne[1], name: Data.name, surveyingArea: Data.surveyingArea, orderCutOffTime: Data.orderCutOffTime,
                orderStartTime: Data.orderStartTime, deliverySlot, min: getTimeformat && getTimeformat[0], sec: getHoursFormat && getHoursFormat[0], a: getHoursFormat && getHoursFormat[1]
            })
        }
    }
    handleStartTimePicker = value => {
        if (this.state.id) {
            let getTime = value && value.format('hh:mm a');
            let getTimeformat = getTime && getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1] && getTimeformat[1].split(' ');
            this.setState({ min: getTimeformat && getTimeformat[0], sec: getHoursFormat && getHoursFormat[0], a: getHoursFormat && getHoursFormat[1] });
        } else {
            const format = 'h:mm a';
            this.setState({ orderStartTime: value.format(format) })
        }
    };

    handleCutTimePicker = value => {
        if (this.state.id) {
            let getTime = value && value.format('hh:mm a');
            let getTimeformat = getTime && getTime.split(':');
            let getHoursFormat = getTimeformat && getTimeformat[1] && getTimeformat[1].split(' ');
            this.setState({ minOne: getTimeformat && getTimeformat[0], secOne: getHoursFormat && getHoursFormat[0], aOne: getHoursFormat && getHoursFormat[1] });
        } else {
            const format = 'h:mm a';
            this.setState({ orderCutOffTime: value.format(format) })
        }
    };

    handleInputChange = (e) => {
        e.target.value && e.target.value[0].includes(" ") ? e.target.value = '' : this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.name && this.state.surveyingArea && this.state.orderCutOffTime && this.state.orderStartTime && this.state.deliverySlot) {
            let startTimeData = ""
            let cutOffTimeData = ""
            if (typeof this.state.orderStartTime != "string") {
                const format = 'h:mm a';
                startTimeData = this.state.orderStartTime.format(format)
            }
            if (typeof this.state.orderCutOffTime != "string") {
                const format = 'h:mm a';
                cutOffTimeData = this.state.orderCutOffTime.format(format)
            } else {
                startTimeData = this.state.id ? this.state.min + ':' + this.state.sec + ' ' + this.state.a : this.state.orderStartTime
                cutOffTimeData = this.state.id ? this.state.minOne + ':' + this.state.secOne + ' ' + this.state.aOne : this.state.orderCutOffTime
            }

            // let fromTime = startTimeData && startTimeData.split(' ');
            // let toTime = cutOffTimeData && cutOffTimeData.split(' ');
            // if ((fromTime[1] == "am" && toTime[1] == "am") || (fromTime[1] == "pm" && toTime[1] == "pm") || (fromTime[1] == "am" && toTime[1] == "pm")) {
            //     if (fromTime[0] <= toTime[0]) {
            //         let obj = {
            //             "name": this.state.name,
            //             "surveyingArea": this.state.surveyingArea,
            //             "orderStartTime": startTimeData,
            //             "orderCutOffTime": cutOffTimeData,
            //             "deliverySlot": this.state.deliverySlot,
            //             "id": this.state.id
            //         }
            //         this.props.SubmitDC(obj);
            //     } else {
            //         toastr.error("please select valid time")
            //     }
            // } else {
            //     if ((fromTime[1] == "pm" && toTime[1] == "am")) {
            //         debugger;
            //         if (toTime[0] >= "12:00") {
            //             let obj = {
            //                 "name": this.state.name,
            //                 "surveyingArea": this.state.surveyingArea,
            //                 "orderStartTime": startTimeData,
            //                 "orderCutOffTime": cutOffTimeData,
            //                 "deliverySlot": this.state.deliverySlot,
            //                 "id": this.state.id
            //             }
            //             this.props.SubmitDC(obj);
            //         } else {
            //             toastr.error("Cut-off time will be in same day")
            //         }
            //     }
            // }

            let obj = {
                "name": this.state.name,
                "surveyingArea": this.state.surveyingArea,
                "orderStartTime": startTimeData,
                "orderCutOffTime": cutOffTimeData,
                "deliverySlot": this.state.deliverySlot.value,
                "id": this.state.id
            }
            this.props.SubmitDC(obj);
        }
    }

    listPath = () => {
        this.props.history.push({ pathname: path.dc.list, state: { dcSearchDatas: "backTrue" } })
    }

    handleTimeChange = (Data) => {
        this.setState({ deliverySlot: Data });
    }

    render() {
        const { errors } = this.state;
        const format = 'hh:mm a';
        let startTimeData = undefined
        let cutOffTimeData = undefined
        const now = moment().hour(0).minute(0);
        if (this.state.id) {
            startTimeData = moment(`${this.state.min}:${this.state.sec}: ${this.state.a}`, format)
            cutOffTimeData = moment(`${this.state.minOne}:${this.state.secOne}: ${this.state.aOne}`, format)
        }
        else {
            startTimeData = undefined
            cutOffTimeData = undefined
        }
        let timeData = [];
        this.state.timeList && this.state.timeList.map((item) => {
            let obj = { "label": item.time, "value": item.time, indeterminate: true };
            timeData.push(obj);
        })

        return (
            <div>
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{!this.state.id ? window.strings.DC_MANAGEMENT.ADD_DC : window.strings.DC_MANAGEMENT.EDIT_DC}</h4>

                    </div>
                </div>
                <div className="main-wrapper p-3">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                            <div className="form-group col-md-6">
                                <label>{window.strings.FARMERS.NAME + ' *'}</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={classnames('form-control time-form', {
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
                                <label>{window.strings.SALES_AGENT.SURVEY_AREA + ' *'}</label>
                                <input
                                    type="text"
                                    placeholder="Surveying Area"
                                    className={classnames('form-control time-form', {
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
                                <label>{window.strings.DC_MANAGEMENT.STARTING_TIME + ' *'}</label>
                                {this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={startTimeData}
                                    value={startTimeData}
                                    placeholder="Select Start Time"
                                    className="xxx shop-time"
                                    onChange={this.handleStartTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />}

                                {!this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={startTimeData}
                                    className="xxx shop-time"
                                    placeholder="Select Start Time"
                                    onChange={this.handleStartTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />
                                }
                                {this.state.submitted && this.state.orderStartTime == undefined && <div className="mandatory">Order Start-time{window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>{window.strings.DC_MANAGEMENT.CUTOFF_TIME + ' *'}</label>
                                {this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={cutOffTimeData}
                                    value={cutOffTimeData}
                                    placeholder="Select CutOff Time"
                                    className="xxx shop-time"
                                    onChange={this.handleCutTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />}

                                {!this.state.id && <TimePicker
                                    showSecond={false}
                                    defaultValue={cutOffTimeData}
                                    placeholder="Select CutOff Time"
                                    className="xxx shop-time"
                                    onChange={this.handleCutTimePicker}
                                    format={format}
                                    use12Hours
                                    inputReadOnly
                                />
                                }
                                {this.state.submitted && this.state.orderCutOffTime == undefined && <div className="mandatory">Order Cutoff-time{window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>{window.strings.DC_MANAGEMENT.DELIVERY_SLOT + ' *'}</label>
                                <Select
                                    styles={{
                                        control: base => ({
                                            ...base,
                                            borderColor: 'hsl(0,0%,80%)',
                                            boxShadow: '#FE988D',
                                            '&:hover': {
                                                borderColor: '#FE988D'
                                            }
                                        })
                                    }}
                                    closeMenuOnSelect={false}
                                    options={timeData}
                                    hideSelectedOptions={false}
                                    value={this.state.deliverySlot}
                                    backspaceRemovesValue={false}
                                    onChange={(e) => this.handleTimeChange(e)}
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