import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitFarmDetails } from '../../actions/FarmersAction'
import { fetchFarmList, getFarmDetailData } from '../../actions/UserAction';
import { link } from 'fs';
import { ADD_FARMDETAILS, UPDATE_FARMDETAILS } from '../../constants/actionTypes';
import store from '../../store/store'

class CreateFarmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            id: '',
            name: '',
            address1: '',
            address2: '',
            taluk: '',
            village: '',
            city: '',
            state: '',
            errors: {},
            userId: ''
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.farmerIdData) {
            this.setState({ userId: this.props.location.state.farmerIdData })
        }
        if (this.props.location && this.props.location.state && this.props.location.state.farmerEditId) {
            this.setState({ userId: this.props.location.state.farmerEditId }, () => {
                this.props.dispatch(getFarmDetailData(this.props.location.state.farmerEditId))
            })
        }
    }


    componentWillReceiveProps(newProps) {
        if (newProps.farmerData.addFarmStatus == "200") {
            store.dispatch({ type: ADD_FARMDETAILS, farm: "" });
            this.backHandle();
        }

        if (newProps.farmerData.updateFarmStatus == "200") {
            store.dispatch({ type: UPDATE_FARMDETAILS, farm: "" });
            this.backHandle();
        }

        if (newProps.userData && newProps.userData.farmDetails) {
            let resp = newProps.userData.farmDetails;
            this.setState({
                id: resp.id, userId: resp.userId, name: resp.name, address1: resp.address1, address2: resp.address2,
                taluk: resp.taulk, village: resp.village, city: resp.city, state: resp.state
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    backHandle = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            const formData = new FormData();

            formData.append("id", this.state.id);
            formData.append("name", this.state.name);
            formData.append("address1", this.state.address1);
            formData.append("address2", this.state.address2);
            formData.append("taluk", this.state.taluk);
            formData.append("village", this.state.village);
            formData.append("city", this.state.city);
            formData.append("state", this.state.state);
            formData.append("userId", this.state.userId);
            formData.append("location", "[{9.86,9.99},{9.86,9.99},{9.86,9.99},{9.86,9.99}]");

            let farmParam = false;
            if (this.state.id) {
                farmParam = true
            }

            this.props.dispatch(SubmitFarmDetails(formData, farmParam))
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{window.strings['FARMERS']['FARM_DETAILS']}</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-8">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate className="row">
                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['FARM_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['FARM_NAME']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['FARMERS']['FARM_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['ADDR_1']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_1']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.address1
                                                })}
                                                name="address1"
                                                onChange={this.handleInputChange}
                                                value={this.state.address1}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address1 && <div className="mandatory">{window.strings['FARMERS']['ADDR_1'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['ADDR_2']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_2']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.address2
                                                })}
                                                name="address2"
                                                onChange={this.handleInputChange}
                                                value={this.state.address2}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address2 && <div className="mandatory">{window.strings['FARMERS']['ADDR_2'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['TALUK']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['TALUK']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.taluk
                                                })}
                                                name="taluk"
                                                onChange={this.handleInputChange}
                                                value={this.state.taluk}
                                                required

                                            />
                                            {this.state.submitted && !this.state.taluk && <div className="mandatory">{window.strings['FARMERS']['TALUK'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['VILLAGE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['VILLAGE']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.village
                                                })}
                                                name="village"
                                                onChange={this.handleInputChange}
                                                value={this.state.village}
                                                required

                                            />
                                            {this.state.submitted && !this.state.village && <div className="mandatory">{window.strings['FARMERS']['VILLAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['CITY']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['CITY']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.city
                                                })}
                                                name="city"
                                                onChange={this.handleInputChange}
                                                value={this.state.city}
                                                required

                                            />
                                            {this.state.submitted && !this.state.city && <div className="mandatory">{window.strings['FARMERS']['CITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group col-md-6">

                                            <label>{window.strings['FARMERS']['STATE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['STATE']}
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.state
                                                })}
                                                name="state"
                                                onChange={this.handleInputChange}
                                                value={this.state.state}
                                                required

                                            />
                                            {this.state.submitted && !this.state.state && <div className="mandatory">{window.strings['FARMERS']['STATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                    {/* 
                                        <h3>Map</h3>

                                        <h3>Image Upload</h3> */}

                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="bottom-section">
                                                <button type="button" className="btn btn-default" onClick={this.backHandle}>{window.strings.CANCEL}</button>
                                                <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        farmerData: state.farmer,
        userData: state.user ? state.user : {}
    }
}


export default connect(mapStateToProps)(CreateFarmDetails)