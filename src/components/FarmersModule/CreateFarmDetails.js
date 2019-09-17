import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitFarmDetails } from '../../actions/FarmersAction'
import { fetchFarmList, getFarmDetailData } from '../../actions/UserAction';
import { link } from 'fs';

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
                this.props.dispatch(getFarmDetailData(this.props.location.state.farmerEditId)).then(resp => {
                    if (resp) {
                        this.setState({
                            id: resp.id, userId: resp.userId, name: resp.name, address1: resp.address1, address2: resp.address2,
                            taluk: resp.taulk, village: resp.village, city: resp.city, state: resp.state
                        })
                    }
                });
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

            if (this.state.id) {
                this.props.dispatch(SubmitFarmDetails(formData, true)).then(resp => {
                    if (resp && resp.status == "200") {
                        this.backHandle();
                    }
                })
            } else {
                this.props.dispatch(SubmitFarmDetails(formData)).then(resp => {
                    if (resp && resp.status == "200") {
                        this.backHandle();
                    }
                })
            }

        })
    }

    render() {
        const { errors } = this.state;
        console.log("err", errors);
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['FARM_DETAILS']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['FARM_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['FARM_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['FARMERS']['FARM_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_1']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_1']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address1
                                                })}
                                                name="address1"
                                                onChange={this.handleInputChange}
                                                value={this.state.address1}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address1 && <div className="mandatory">{window.strings['FARMERS']['ADDR_1'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_2']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_2']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address2
                                                })}
                                                name="address2"
                                                onChange={this.handleInputChange}
                                                value={this.state.address2}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address2 && <div className="mandatory">{window.strings['FARMERS']['ADDR_2'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['TALUK']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['TALUK']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.taluk
                                                })}
                                                name="taluk"
                                                onChange={this.handleInputChange}
                                                value={this.state.taluk}
                                                required

                                            />
                                            {this.state.submitted && !this.state.taluk && <div className="mandatory">{window.strings['FARMERS']['TALUK'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['VILLAGE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['VILLAGE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.village
                                                })}
                                                name="village"
                                                onChange={this.handleInputChange}
                                                value={this.state.village}
                                                required

                                            />
                                            {this.state.submitted && !this.state.village && <div className="mandatory">{window.strings['FARMERS']['VILLAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['CITY']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['CITY']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.city
                                                })}
                                                name="city"
                                                onChange={this.handleInputChange}
                                                value={this.state.city}
                                                required

                                            />
                                            {this.state.submitted && !this.state.city && <div className="mandatory">{window.strings['FARMERS']['CITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['STATE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['STATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.state
                                                })}
                                                name="state"
                                                onChange={this.handleInputChange}
                                                value={this.state.state}
                                                required

                                            />
                                            {this.state.submitted && !this.state.state && <div className="mandatory">{window.strings['FARMERS']['STATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <h3>Map</h3>

                                        <h3>Image Upload</h3>

                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="button" className="btn btn-warning" onClick={this.backHandle}>{window.strings.CANCEL}</button>
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


function mapStateToProps() {
}


export default connect(mapStateToProps)(CreateFarmDetails)