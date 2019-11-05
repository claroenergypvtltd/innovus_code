import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import { TableData } from '../../shared/Table'
import { getLocation, submitIrrigationSetting, getIrrigationSettingList } from '../../actions/IrrigationSettingAction'

class CreateVehicle extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            cityId: '',
            stateId: '',
            amount: '',
            areaSize: '',
            irrigationCostId: '',
            errors: {}
        }
    }

    componentDidMount() {
        // this.getStateList();
        // if (this.props.location && this.props.location.state && this.props.location.state.irrigationCostId) {
        //     this.setState({ irrigationCostId: this.props.location.state.irrigationCostId }, () => {
        //         this.getEditData();
        //     })
        // }
    }

    componentWillReceiveProps(newProps) {
        // if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.specificData && newProps.IrrigationSettingData.specificData[0]) {
        //     let respData = newProps.IrrigationSettingData.specificData[0];
        //     this.setState({ amount: respData.amount, areaSize: respData.areasize, stateId: respData.stateId, cityId: respData.cityId }, () => {
        //         this.getCityList();
        //     })
        // }

        // if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.createdStatus == "200") {
        //     store.dispatch({ type: "IRRIGATION_SETTING_CREATE_SUCCESS", createdStatus: "" });
        //     this.listPath();
        // }

        // if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.updatedStatus == "200") {
        //     store.dispatch({ type: "IRRIGATION_SETTING_UPDATE_SUCCESS", updatedStatus: "" });
        //     this.listPath();
        // }

    }


    getEditData = () => {
        // irrigationCostId
        // let obj = {
        //     "irrigationCostId": this.props.location.state.irrigationCostId
        // }
        // this.props.getIrrigationSettingList(obj);
    }

    getStateList() {
        getLocation({}).then(resp => {
            this.setState({ stateData: resp && resp.data })
        })
    }

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


    getCityList = () => {

        let obj = {
            "stateId": this.state.stateId
        }
        getLocation(obj).then(resp => {
            if (resp) {
                this.setState({ cityData: resp.data })

            }
        })
    }


    listPath = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({ submitted: true })
        if (this.state.cityId && this.state.amount && this.state.areaSize) {


            let obj = {
                "irrigationCostId": this.state.irrigationCostId,
                "cityId": this.state.cityId,
                "amount": this.state.amount,
                "areasize": this.state.areaSize
            }
            let isUpdate = false;
            if (this.state.irrigationCostId) {
                isUpdate = true;
            }
            this.props.submitIrrigationSetting(obj, isUpdate);

            // this.props.submitPrice(obj, isUpdate);
        }
    }




    render() {
        const { errors } = this.state;

        const stateDropDown = this.state.stateData && this.state.stateData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        const cityDropDown = this.state.cityData && this.state.cityData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        // const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
        //     return <option key={index}
        //         value={item.id}> {item.name}</option>
        // });

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
                                        <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                            <option value="0">Select Vehicle Type</option>
                                            {/* {categoryDropDown} */}
                                        </select>
                                        {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['TRANSACTION_TIME']}</label>
                                        <input
                                            type="number"
                                            placeholder="Transaction Time"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.weight
                                            })}
                                            name="weight"
                                            onChange={this.handleInputChange}
                                            value={this.state.weight}
                                            required
                                        />
                                        {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VEHICLE_NAME']}</label>
                                        <input
                                            type="number"
                                            placeholder="Vehicle Name"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.weight
                                            })}
                                            name="weight"
                                            onChange={this.handleInputChange}
                                            value={this.state.weight}
                                            required
                                        />
                                        {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['OPERATING_HOURS']}</label>
                                        <input
                                            type="number"
                                            placeholder="Operating Hours"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.weight
                                            })}
                                            name="weight"
                                            onChange={this.handleInputChange}
                                            value={this.state.weight}
                                            required
                                        />
                                        {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>{window.strings['VEHICLE']['VOLUME']}</label>
                                        <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                            <option value="0">Select Vehicle Volume</option>
                                            {/* {categoryDropDown} */}
                                        </select>
                                        {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
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
    IrrigationSettingData: state.irrigationSetting ? state.irrigationSetting : {}
})

export default connect(mapStateToProps, { submitIrrigationSetting, getIrrigationSettingList })(CreateVehicle)
