import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from '../../constants';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
// import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import { TableData } from '../../shared/Table'
import { getVehicleType, submitVehicle, submitType } from '../../actions/VehicleAction'
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import * as moment from 'moment';
import { fetchVehicle } from '../../actions/VehicleAction'
import { resorceJSON, ModalData } from '../../libraries';
import { formatDate } from '../../shared/DateFormat'


class CreateVehicle extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            typeSubmitted: false,
            vehicleName: '',
            vehicleType: '',
            volume: '',
            operatingHour: '',
            vehicleId: '',
            category: '',
            startDate: moment(),
            endDate: moment(),
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.vehicleId) {
            this.setState({ vehicleId: this.props.location.state.vehicleId }, () => { this.getEditData() })
        }
        else {
            this.setState({ transitionTime: undefined }, () => {
                this.getVehicleType()
            })
        }
    }

    getVehicleType = () => {
        getVehicleType().then(resp => {
            if (resp && resp.datas) {
                this.setState({ vehicleTypeDatas: resp.datas })
            }
        });
    }
    componentWillReceiveProps(newProps) {
        if (this.state.vehicleId && newProps.VehicleData && newProps.VehicleData.specificData && newProps.VehicleData.specificData[0]) {
            let respData = newProps.VehicleData.specificData[0];
            let date = respData && respData.operatingHour && respData.operatingHour.split(' ');
            let transitionTime = respData && respData.transitionTime && respData.transitionTime.split(':')
            this.setState({
                vehicleType: { 'label': respData.vehicleCategory.vehicleType, 'value': respData.vehicleCategory.id }, vehicleName: respData.vehiclename, min: transitionTime[0],
                sec: transitionTime[1], volume: respData.volume, transitionTime: respData.transitionTime, startDate: date && date[0], endDate: date && date[2], vehicleId: respData.id
            })
        }
        if (newProps.VehicleData && newProps.VehicleData.createdStatus == "200") {
            store.dispatch({ type: "VEHICLE_CREATE_SUCCESS", createdStatus: "" });
            this.listPath();
        }
        if (newProps.VehicleData && newProps.VehicleData.updatedStatus == "200") {
            store.dispatch({ type: "VEHICLE_UPDATE_SUCCESS", updatedStatus: "" });
            this.listPath();
        }
    }
    getEditData = () => {
        let obj = {
            "id": this.props.location.state.vehicleId
        }
        this.props.fetchVehicle(obj);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTimePicker = (value) => {
        if (this.state.vehicleId) {
            let getTime = value && value.format('HH:mm');
            let getTimeformat = getTime && getTime.split(':');
            this.setState({ min: getTimeformat && getTimeformat[0], sec: getTimeformat && getTimeformat[1], });
        }
        else {
            const format = 'HH:mm ';
            this.setState({ transitionTime: value.format(format) })
        }
    }


    handleStateChange = (e) => {
        this.setState({ stateId: e.target.value }, () => {
            this.getCityList();
        })
    }

    listPath = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        if (this.state.vehicleName && this.state.vehicleType && this.state.volume && this.state.transitionTime && this.state.startDate && this.state.endDate) {

            let obj = {
                "vehicleName": this.state.vehicleName,
                "vehicleType": this.state.vehicleType.value,
                "volume": this.state.volume,
                "transitionTime": this.state.vehicleId ? this.state.min + ":" + this.state.sec : this.state.transitionTime,
                // "operatingHour": this.state.startDate && this.state.startDate.format('DD-MM-YYYY') + ' - ' + this.state.endDate.format('DD-MM-YYYY'),
                "id": this.props.location && this.props.location.state && this.props.location.state.vehicleId
            }

            if (this.state.startDate && this.state.endDate) {
                if (this.state.startDate._locale && this.state.endDate._locale) {
                    obj.operatingHour = this.state.startDate && this.state.startDate.format('DD-MM-YYYY') + ' - ' + this.state.endDate.format('DD-MM-YYYY')
                } else {
                    obj.operatingHour = this.state.startDate + ' - ' + this.state.endDate
                }
            }

            let isUpdate = false;
            if (this.props.location && this.props.location.state && this.props.location.state.vehicleId) {
                isUpdate = true;
            }
            this.props.submitVehicle(obj, isUpdate);
        }
    }

    handleDropDownChange = (Data, name) => {
        if (name == "transitionTime") {
            this.setState({ transitionTime: Data })
        } else if (name == "vehicleType") {
            this.setState({ vehicleType: Data })
        }
    }

    handleApply = (event, picker) => {
        this.setState({
            dateChanged: true,
            startDate: picker.startDate,
            endDate: picker.endDate,
        })
    }

    addNewType = () => {
        this.setState({ open: true, typeSubmitted: false })
    }

    onCloseModal = () => {
        this.setState({ open: false }, () => {
            this.getVehicleType();
        });
    };

    onOpenModal = (e) => {
        e.preventDefault();
        this.setState({ open: true });
    };

    handleTypeSubmit = () => {
        this.setState({ typeSubmitted: true });
        if (this.state.category) {
            const formData = new FormData();
            formData.append("category", this.state.category);
            submitType(formData).then(resp => {
                if (resp) {
                    this.onCloseModal();
                }
            })
        }
    }

    render() {
        const { errors } = this.state;
        const format = 'hh:mm ';
        let vehicleTypeDatas = [];
        let transitionTime = ''
        let transtactionTimeData = [{
            "label": 15,
            "id": "15"
        }];
        let AddType = {
            "label": <button onClick={this.addNewType} className="vehicle-box">+ Add Vehicle Type</button>,
            isDisabled: true
            // "id": ''
        }
        vehicleTypeDatas.push(AddType);
        this.state.vehicleTypeDatas && this.state.vehicleTypeDatas.map((item, index) => {
            let obj = { "label": item.vehicleType, "value": item.id };
            vehicleTypeDatas.push(obj);
        });

        this.state.transtactionTimeData && this.state.transtactionTimeData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        let label;
        if (this.state.startDate && this.state.startDate._locale) {
            let start = this.state.startDate && this.state.startDate.format('DD-MM-YYYY');
            let end = this.state.endDate && this.state.endDate.format('DD-MM-YYYY');
            label = start + ' - ' + end;
            if (start === end) {
                label = '';
            }
        } else {
            label = this.state.startDate + ' - ' + this.state.endDate;
        }
        if (this.state.vehicleId) {
            transitionTime = moment(`${this.state.min}:${this.state.sec}`, format)
        }
        else {
            transitionTime = undefined
        }

        let TypeData = <div>
            <div>
                <label className="label-title">{window.strings['VEHICLE']['VEHICLE_TYPE']}</label>
                <input type="text" placeholder="Vehicle Type"
                    className={classnames('form-control col-md-7', { 'is-invalid': errors.category })}
                    name="category" onChange={this.handleInputChange} value={this.state.category} required
                />
                {this.state.typeSubmitted && !this.state.category && <div className="mandatory">{window.strings['VEHICLE']['VEHICLE_TYPE'] + window.strings['ISREQUIRED']}</div>}

            </div>
            <div className="col-md-12 bottom-section">
                <button type="button" className="btn btn-default mb-2" onClick={this.onCloseModal}>{window.strings.CANCEL}</button>
                <button type="submit" className="btn btn-primary mb-2" disabled={this.state.loading} onClick={this.handleTypeSubmit}>{window.strings.SUBMIT}</button>

            </div>
        </div>

        return (
            <div className="add-vehicle">
                <div className="row clearfix">
                    <div className="col-md-12">
                        {/* <h4 className="user-title">{!this.state.vehicleId ? window.strings.SETTING.ADD_VEHICLE : window.strings.SETTING.EDIT_VEHICLE}</h4> */}
                        <h4 className="user-title">{this.state.vehicleId ? 'EDIT VEHICLE' : 'ADD VEHICLE'}</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-8 ">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VEHICLE_TYPE']}</label>
                                        <Select className="state-box"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }

                                                }),
                                                placeholder: base => ({
                                                    ...base,
                                                    color: '#9EA0B7'
                                                })
                                            }}
                                            value={this.state.vehicleType}
                                            onChange={(e) => this.handleDropDownChange(e, "vehicleType")}
                                            options={vehicleTypeDatas}
                                            placeholder="--Select Vehicle Type--"
                                        />
                                        {this.state.submitted && !this.state.vehicleType && <div className="mandatory">{window.strings['VEHICLE']['VEHICLE_TYPE'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['ESTIMATED_TRANSACTION_TIME']}</label>
                                        {/* <Select className="state-box ml-1"
                                            value={this.state.transitionTime}
                                            onChange={(e) => this.handleDropDownChange(e, "transitionTime")}
                                            options={transtactionTimeData}
                                            placeholder="--Select Transaction Time--"
                                        /> */}
                                        {this.state.vehicleId && <TimePicker className="time-pick"
                                            placeholder="--Transaction Time--" defaultValue={transitionTime} value={transitionTime} showSecond={false}
                                            minuteStep={15} onChange={this.handleTimePicker}
                                        />}
                                        {!this.state.vehicleId && <TimePicker className="time-pick"
                                            placeholder="--Transaction Time--" defaultValue={transitionTime} showSecond={false} minuteStep={15}
                                            onChange={this.handleTimePicker}
                                        />}
                                        {this.state.submitted && !this.state.transitionTime && <div className="mandatory">{window.strings['VEHICLE']['TRANSACTION_TIME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VEHICLE_NAME']}</label>
                                        <input
                                            type="text"
                                            placeholder="Vehicle Name"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.vehicleName
                                            })}
                                            name="vehicleName"
                                            onChange={this.handleInputChange}
                                            value={this.state.vehicleName}
                                            required
                                        />
                                        {this.state.submitted && !this.state.vehicleName && <div className="mandatory">{window.strings['VEHICLE']['VEHICLE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6 date-vehicle">
                                        <label>{window.strings['VEHICLE']['TIME_WINDOW_AT_OPERATION']}</label>
                                        <DateRangePicker className="daterange"
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
                                            placeholder="Date"
                                        >  <div className="date-box">
                                                <input type="text" className="form-control date-form ml-1" value={label} />
                                                <span className="date-group">
                                                    <i className="date-btn fa fa-calendar" />
                                                </span>
                                            </div>
                                        </DateRangePicker>
                                        {this.state.submitted && (!this.state.startDate || !this.state.endDate) && <div className="mandatory">{window.strings['VEHICLE']['VOLUME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VOLUME']}</label>
                                        <input
                                            type="number"
                                            placeholder="Volume"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.volume
                                            })}
                                            name="volume"
                                            onChange={this.handleInputChange}
                                            value={this.state.volume}
                                            required
                                        />
                                        {this.state.submitted && !this.state.volume && <div className="mandatory">{window.strings['VEHICLE']['VOLUME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-12 bottom-section">
                                <button type="button" className="btn btn-default mb-2" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                <button type="submit" className="btn btn-primary mb-2" disabled={this.state.loading} onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>

                            </div>

                            <ModalData show={this.state.open} onHide={this.onCloseModal} modalData={TypeData} ModalTitle="Add Vehicle Type" />

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    VehicleData: state.Vehicle ? state.Vehicle : {}
})

export default connect(mapStateToProps, { submitVehicle, fetchVehicle })(CreateVehicle)
