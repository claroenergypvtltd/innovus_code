import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';

class CreateContactInfo extends Component {

    constructor() {

        super();
        this.state = {
            submitted: false,
            email: '',
            phoneNumber: '',
            area: '',
            city: '',
            state: '',
            postCode: '',
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        })

    }

    componentDidMount() {
    }



    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }



    render() {
        const { errors } = this.state;
        console.log("err", errors);
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>Contact Information</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['EMAIL']}</label>

                                            <input
                                                type="email"
                                                placeholder={window.strings['FARMERS']['EMAIL']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.email
                                                })}
                                                name="email"
                                                onChange={this.handleInputChange}
                                                value={this.state.email}
                                                required

                                            />

                                            {this.state.submitted && !this.state.email && <div className="mandatory">{window.strings['FARMERS']['EMAIL'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['PHON_NO']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['PHON_NO']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.phoneNumber
                                                })}
                                                name="phoneNumber"
                                                onChange={this.handleInputChange}
                                                value={this.state.phoneNumber}
                                                required

                                            />
                                            {this.state.submitted && !this.state.phoneNumber && <div className="mandatory">{window.strings['FARMERS']['PHON_NO'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['AREA']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['AREA']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.area
                                                })}
                                                name="area"
                                                onChange={this.handleInputChange}
                                                value={this.state.area}
                                                required

                                            />
                                            {this.state.submitted && !this.state.area && <div className="mandatory">{window.strings['FARMERS']['AREA'] + window.strings['ISREQUIRED']}</div>}
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

                                            <label>{window.strings['FARMERS']['POST_CODE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['POST_CODE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.postCode
                                                })}
                                                name="postCode"
                                                onChange={this.handleInputChange}
                                                value={this.state.postCode}
                                                required

                                            />
                                            {this.state.submitted && !this.state.postCode && <div className="mandatory">{window.strings['FARMERS']['POST_CODE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



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


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CreateContactInfo)