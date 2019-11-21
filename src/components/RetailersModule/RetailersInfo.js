import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import store from '../../store/store';
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
            name: '',
            shopName: '',
            shopAddress: '',
            shopTime: '',
            shopType: '',
            errors: {},
            shopTypeDatas: []
        }
    }

    componentDidMount() {
        this.getShop();
        if (this.props.location && this.props.location.state) {
            this.setState({
                name: this.props.location.state.name, shopName: this.props.location.state.shopAddress.name, shopAddress: this.props.location.state.shopAddress.address2,
                shopTime: this.props.location.state.shopAddress.shopOpeningTime, shopType: this.props.location.state.shopAddress.shopType, userId: this.props.location.state.id
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
            this.props.history.goBack();
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

        this.setState({ [e.target.name]: e.target.value })
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

        }
    }
    render() {
        const { errors } = this.state;

        const shopTypeData = this.state.shopTypeDatas && this.state.shopTypeDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.type}</option>
        });

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
    status: state.retailer.status
})

export default connect(mapStateToProps, { getShopType, SubmitRetailer })(IrrigationSetting)
