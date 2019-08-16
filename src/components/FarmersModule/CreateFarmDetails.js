import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitFarmDetails } from '../../actions/FarmersAction'

class CreateFarmDetails extends Component {

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            name: '',
            address1: '',
            address2: '',
            taluk: '',
            village: '',
            city: '',
            state: '',
            errors: {},
            getContactData: this.props.getContactData
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {

            const formData = new FormData();

            formData.append("name", this.state.name);
            formData.append("address1", this.state.address1);
            formData.append("address2", this.state.address2);
            formData.append("taluk", this.state.taluk);
            formData.append("village", this.state.village);
            formData.append("city", this.state.city);
            formData.append("state", this.state.state);
            formData.append("userId", this.state.getContactData.id);
            formData.append("location", "[{9.86,9.99},{9.86,9.99},{9.86,9.99},{9.86,9.99}]");

            this.props.dispatch(SubmitFarmDetails(formData)).then(resp => {
                if (resp && resp.data) {
                    this.props.childData(3); //4 th tab
                }
            })




        })



    }

    componentDidMount() {
    }



    componentWillReceiveProps(nextProps) {

        // if (nextProps.auth.isAuthenticated) {
        //     this.props.history.push('/');
        // }
        // if (nextProps.errors) {
        //     this.setState({
        //         errors: nextProps.errors
        //     });
        // }
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


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['TOTAL_AREA']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['TOTAL_AREA']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.totalArea
                                                })}
                                                name="totalArea"
                                                onChange={this.handleInputChange}
                                                value={this.state.totalArea}
                                                required

                                            />
                                            {this.state.submitted && !this.state.totalArea && <div className="mandatory">{window.strings['FARMERS']['TOTAL_AREA'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <h3>Map</h3>

                                        <h3>Image Upload</h3>

                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="submit" className="btn btn-primary">Next Step</button>
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
        getContactData: state && state.farmer && state.farmer.contactDatas ? state.farmer.contactDatas : []
    };
}


export default connect(mapStateToProps)(CreateFarmDetails)