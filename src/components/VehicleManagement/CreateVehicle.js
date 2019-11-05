import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from '../../constants';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import { TableData } from '../../shared/Table'
import { getVehicleType, submitVehicle } from '../../actions/VehicleAction'
import Select from 'react-select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import * as moment from 'moment';
import { fetchVehicle } from '../../actions/VehicleAction'

class CreateVehicle extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            vehicleName: '',
            vehicleType: '',
            volume: '',
            transitionTime: '',
            operatingHour: '',
            vehicleId: '',
            startDate: moment(),
            endDate: moment(),
            errors: {}
        }
    }

    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.vehicleId) {
            this.getEditData();
        }

        this.getVehicleType();
    }

    getVehicleType = () => {
        getVehicleType().then(resp => {
            if (resp && resp.datas) {
                this.setState({ vehicleTypeDatas: resp.datas })
            }
        });
    }

    componentWillReceiveProps(newProps) {

        // vehicleName: '',
        // vehicleType: '',
        // volume: '',
        // transitionTime: '',
        // operatingHour: '',
        debugger;
        if (newProps.VehicleData && newProps.VehicleData.specificData && newProps.VehicleData.specificData[0]) {
            let respData = newProps.VehicleData.specificData[0];
            this.setState({ vehicleName: respData.vehiclename, vehicleType: respData.vehicleType, volume: respData.volume, transitionTime: respData.transitionTime })
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

    // getStateList() {
    //     getLocation({}).then(resp => {
    //         this.setState({ stateData: resp && resp.data })
    //     })
    // }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
        debugger;
        if (this.state.vehicleName && this.state.vehicleType && this.state.volume && this.state.transitionTime && this.state.startDate && this.state.endDate) {
            let obj = {
                "vehicleName": this.state.vehicleName,
                "vehicleType": this.state.vehicleType.value,
                "volume": this.state.volume + "sq.ft",
                "transitionTime": this.state.transitionTime.id,
                "operatingHour": this.state.startDate + ' - ' + this.state.endDate,
                "vehicleId": this.props.location && this.props.location.state && this.props.location.state.vehicleId
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

    getTransactionList = () => {
        let traData = [
            {
                "name": "jhj",
                "id": "lklk"
            }
        ];
    }

    handleApply = (event, picker) => {
        this.setState({
            dateChanged: true,
            startDate: picker.startDate,
            endDate: picker.endDate,
        })
    }

    addNewType = () => {
        debugger;
        this.setState({})
    }

    render() {
        const { errors } = this.state;

        let vehicleTypeDatas = [];

        let transtactionTimeData = [{
            "label": 15,
            "id": "15"
        }];
        let AddType = {
            "label": <button onClick={this.addNewType}>+ Add Vehicle Type</button>,
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

        let start = this.state.startDate && this.state.startDate.format('DD-MM-YYYY');
        let end = this.state.endDate && this.state.endDate.format('DD-MM-YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = '';
        }

        // <div>
        //      <label>{window.strings['VEHICLE']['VEHICLE_NAME']}</label>
        //       <input type="text" placeholder="Vehicle Type" 
        //         className={classnames('form-control', { 'is-invalid': errors.vehicleName })}
        //         name="vehicleName" onChange={this.handleInputChange} value={this.state.vehicleName} required
        //       />
        // </div>

        return (
            <div className="add-vehicle">
                <div className="row clearfix">
                    <div className="col-md-12">
                        {/* <h4 className="user-title">{!this.state.vehicleId ? window.strings.SETTING.ADD_VEHICLE : window.strings.SETTING.EDIT_VEHICLE}</h4> */}
                        <h4 className="user-title">ADD VEHICLE</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-8 ">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VEHICLE_TYPE']}</label>
                                        <Select className="state-box ml-1"
                                            value={this.state.vehicleType}
                                            onChange={(e) => this.handleDropDownChange(e, "vehicleType")}
                                            options={vehicleTypeDatas}
                                            placeholder="--Select Vehicle Type--"
                                        />
                                        {this.state.submitted && !this.state.vehicleType && <div className="mandatory">{window.strings['VEHICLE']['VEHICLE_TYPE'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['TRANSACTION_TIME']}</label>
                                        <Select className="state-box ml-1"
                                            value={this.state.transitionTime}
                                            onChange={(e) => this.handleDropDownChange(e, "transitionTime")}
                                            options={transtactionTimeData}
                                            placeholder="--Select Transaction Time--"
                                        />
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

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['OPERATING_HOURS']}</label>
                                        <DateRangePicker
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
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
