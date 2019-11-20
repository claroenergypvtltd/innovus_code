import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { toastr } from 'react-redux-toastr'
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import { TableData } from '../../shared/Table'
import { getLocation, submitIrrigationSetting, getIrrigationSettingList, getShopType } from '../../actions/IrrigationSettingAction'
import { SubmitRetailer, } from '../../actions/SubmitRetailerAction';

class IrrigationSetting extends Component {
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
            errors: {},
            shopTypeDatas: []
        }
    }

    componentDidMount() {
        this.getShop();
        console.log(this.props.location.state)
        if (this.props.location && this.props.location.state) {
            this.setState({
                name: this.props.location.state.name, shopName: this.props.location.state.shopAddress.name, shopAddress: this.props.location.state.shopAddress.address2,
                shopTime: this.props.location.state.shopAddress.shopOpeningTime, shopType: this.props.location.state.shopAddress.shopType, userId: this.props.location.state.id
            })
        }
        this.getStateList();
        if (this.props.location && this.props.location.state && this.props.location.state.irrigationCostId) {
            this.setState({ irrigationCostId: this.props.location.state.irrigationCostId }, () => {
                this.getEditData();
            })
        }
    }
    getShop = () => {
        getShopType().then(resp => {
            if (resp && resp.datas) {
                this.setState({ shopTypeDatas: resp.datas })
            }
        })
    }
    componentWillReceiveProps(newProps) {
        if (parseInt(newProps.status) == 200) {
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            toastr.success(newProps.message);
            this.props.history.goBack();
        }
        if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.specificData && newProps.IrrigationSettingData.specificData[0]) {
            let respData = newProps.IrrigationSettingData.specificData[0];
            this.setState({ amount: respData.amount, areaSize: respData.areasize, stateId: respData.stateId, cityId: respData.cityId }, () => {
                this.getCityList();
            })
        }

        if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.createdStatus == "200") {
            store.dispatch({ type: "IRRIGATION_SETTING_CREATE_SUCCESS", createdStatus: "" });
            this.listPath();
        }

        if (newProps.IrrigationSettingData && newProps.IrrigationSettingData.updatedStatus == "200") {
            store.dispatch({ type: "IRRIGATION_SETTING_UPDATE_SUCCESS", updatedStatus: "" });
            this.listPath();
        }

    }


    getEditData = () => {
        // irrigationCostId
        let obj = {
            "irrigationCostId": this.props.location.state.irrigationCostId
        }
        this.props.getIrrigationSettingList(obj);
    }

    getStateList() {
        getLocation({}).then(resp => {
            this.setState({ stateData: resp && resp.data })
        })
    }

    handleInputChange = (e) => {

        e.target.value < 0 ? this.setState({ [e.target.name]: '' }) : this.setState({ [e.target.name]: e.target.value })
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

        if (this.state.name && this.state.shopName && this.state.shopAddress && this.state.shopTime && this.state.shopType != 0) {

            const formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("shopName", this.state.shopName);
            formData.append("shopAddress", this.state.shopAddress);
            formData.append("shopTime", this.state.shopTime);
            formData.append("shopType", this.state.shopType);

            formData.append("userId", this.state.userId);
            let updateRetailer = false;
            if (this.state.userId) {
                updateRetailer = true;
            }
            this.props.SubmitRetailer(formData, updateRetailer);
            this.props.history.goBack();

        }
        // if (this.state.cityId && this.state.amount && this.state.areaSize) {


        //     let obj = {
        //         "irrigationCostId": this.state.irrigationCostId,
        //         "stateId": this.state.stateId,
        //         "cityId": this.state.cityId,
        //         "amount": this.state.amount,
        //         "areasize": this.state.areaSize
        //     }
        //     let isUpdate = false;
        //     if (this.state.irrigationCostId) {
        //         isUpdate = true;
        //     }
        //     this.props.submitIrrigationSetting(obj, isUpdate);

        //     // this.props.submitPrice(obj, isUpdate);
        // }
    }



    render() {
        const { errors } = this.state;

        const stateDropDown = this.state.stateData && this.state.stateData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const shopTypeData = this.state.shopTypeDatas && this.state.shopTypeDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.type}</option>
        });

        // const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
        //     return <option key={index}
        //         value={item.id}> {item.name}</option>
        // });

        return (
            <div className="irrigation-setting">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">Edit Shop Details</h4>
                    </div>
                </div>
                <div className="main-wrapper p-3">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                            <div className="form-group col-md-6">
                                <label>Retailer Name</label>
                                <input
                                    type="text"
                                    placeholder="retailer name"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                    required
                                />
                                {this.state.submitted && !this.state.name && <div className="mandatory">Retailer Name  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Shop Name</label>
                                <input
                                    type="text"
                                    placeholder="shop name"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="shopName"
                                    onChange={this.handleInputChange}
                                    value={this.state.shopName}
                                    required
                                />
                                {this.state.submitted && !this.state.shopName && <div className="mandatory">Shop Name  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Shop Address</label>
                                <input
                                    type="text"
                                    placeholder="shop address"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="shopAddress"
                                    onChange={this.handleInputChange}
                                    value={this.state.shopAddress}
                                    required
                                />
                                {this.state.submitted && !this.state.shopAddress && <div className="mandatory">Shop Address  {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Shop Open time</label>
                                <input
                                    type="text"
                                    placeholder="shop open time"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="shopTime"
                                    onChange={this.handleInputChange}
                                    value={this.state.shopTime}
                                    required
                                />
                                {this.state.submitted && !this.state.shopTime && <div className="mandatory">Shop open time   {window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Shop Type</label>
                                <select required name="shopType" className="form-control" value={this.state.shopType} onChange={this.handleInputChange} disabled={this.state.irrigationCostId}>
                                    <option value="0">Select Shop Type </option>
                                    {shopTypeData}
                                </select>
                                {this.state.submitted && !this.state.shopType && <div className="mandatory">Shop Type {window.strings['ISREQUIRED']}</div>}
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

const mapStateToProps = (state) => ({
    IrrigationSettingData: state.irrigationSetting ? state.irrigationSetting : {}
})

export default connect(mapStateToProps, { submitIrrigationSetting, getIrrigationSettingList, getShopType, SubmitRetailer })(IrrigationSetting)
