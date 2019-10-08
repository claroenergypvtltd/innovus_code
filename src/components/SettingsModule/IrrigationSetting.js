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
import { getLocation, submitIrrigationSetting } from '../../actions/IrrigationSettingAction'

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

            errors: {}
        }
    }

    componentDidMount() {
        this.getStateList();
    }

    getStateList() {


        getLocation({}).then(resp => {

            this.setState({ stateData: resp.data })
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleStateChange = (e) => {

        this.setState({ stateId: e.target.value }, () => {

            let obj = {
                "stateId": this.state.stateId
            }
            getLocation(obj).then(resp => {
                if (resp) {
                    this.setState({ cityData: resp.data })

                }
            })

        })

    }


    listPath = () => {
        this.props.history.goBack();
    }

    // handleCityChange = (e) => {

    //     this.setState({ cityId : e.target.value },() => {

    //     })

    // }



    // getCityList(){

    //     // cityData
    // }

    handleSubmit = (e) => {
        debugger;
        e.preventDefault();

        this.setState({ submitted: true })

        //         {"cityId":"1",
        //         "amount":"200",
        // "areasize":"3"}

        let obj = {
            // "categoryId": this.state.categoryId,
            "cityId": this.state.cityId,
            "amount": this.state.amount,
            "areasize": this.state.areasize
        }

        this.props.submitIrrigationSetting(obj);

        // this.props.submitPrice(obj, isUpdate);

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
            <div className="irrigation-setting">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">Create Irrigation Settings</h4>
                    </div>
                </div>
                <div className="main-wrapper p-3">
                    <div className="col-md-8 add-price">
                        <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                            <div className="form-group col-md-6">
                                <label>State</label>
                                <select required name="stateId" className="form-control" value={this.state.stateId} onChange={this.handleStateChange}>
                                    <option value="0">Select State</option>
                                    {stateDropDown}
                                </select>
                                {this.state.submitted && !this.state.stateId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label>City</label>
                                <select required name="cityId" className="form-control" value={this.state.cityId} onChange={this.handleInputChange}>
                                    <option value="0">Select City </option>
                                    {cityDropDown}
                                </select>
                                {this.state.submitted && !this.state.cityId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Price</label>
                                <input
                                    type="number"
                                    placeholder="amount"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.amount
                                    })}
                                    name="amount"
                                    onChange={this.handleInputChange}
                                    value={this.state.amount}
                                    required
                                />
                                {this.state.submitted && !this.state.amount && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">
                                <label>Area Feet</label>
                                <input type="number"
                                    placeholder="Area Size"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.areaSize
                                    })}
                                    name="areaSize"
                                    onChange={this.handleInputChange}
                                    value={this.state.areaSize}
                                    required

                                />
                                {this.state.submitted && !this.state.areaSize && <div className="mandatory">{window.strings['CROP']['PRICE'] + window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="col-md-12 bottom-section">
                                <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { submitIrrigationSetting })(IrrigationSetting)
