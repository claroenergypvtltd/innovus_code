import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';

class CreatePersonalInfo extends Component {

    constructor() {

        super();
        this.state = {
            submitted: false,
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            image: '',
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
                        <h3>Personal Information</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['FIRST_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['FIRST_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.firstName
                                                })}
                                                name="firstName"
                                                onChange={this.handleInputChange}
                                                value={this.state.firstName}
                                                required

                                            />

                                            {this.state.submitted && !this.state.firstName && <div className="mandatory">{window.strings['FARMERS']['FIRST_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['LAST_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['LAST_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.lastName
                                                })}
                                                name="lastName"
                                                onChange={this.handleInputChange}
                                                value={this.state.lastName}
                                                required

                                            />
                                            {this.state.submitted && !this.state.lastName && <div className="mandatory">{window.strings['FARMERS']['LAST_NAME'] + window.strings['ISREQUIRED']}</div>}
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

                                            <label>{window.strings['FARMERS']['IMAGE']}</label>

                                            <input
                                                type="file"
                                                placeholder={window.strings['FARMERS']['IMAGE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.handleInputChange}
                                                value={this.state.image}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
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


export default connect(mapStateToProps)(CreatePersonalInfo)