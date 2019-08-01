import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import  logo  from '../assets/images/logo.png';
import classnames from 'classnames';
// import {path} from '../constants';
import '../assets/css/login.css';

class Login extends Component {

    constructor() {
        debugger;
        super();
        this.state = {
            submitted: false,
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        debugger;
        e.preventDefault();
        this.setState({
            submitted: true
        })
        console.log(this.state);
        if(this.state.email && this.state.password){
            const user = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.loginUser(user);
        }
    }

    componentDidMount() {
        debugger;
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        console.log("err", errors);
        return(
            <div className="clearfix loginAlign">
                <div className = "col-md-12 clearfix">
                    <div className = "col-md-6 leftWidget clearfix pull-left">
                        <div className="logo-img">
                            <img src={logo} className="img-rounded"  alt="img" />
                            <h3 className="s-text">{window.strings['LOGO_SUB_TEXT']}</h3>
                        </div>
                    </div>
                    <div className="col-md-6 pull-right">
                        <div className="loginForm clearfix">
                            <div className="login-widget">
                                <form onSubmit={this.handleSubmit.bind(this)} noValidate>
                                    <div className="form-group">
                                        <input
                                        type="email"
                                        placeholder="Email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        name="email"
                                        onChange={ this.handleInputChange }
                                        value={ this.state.email }
                                        required

                                        />
                                        { this.state.submitted && !this.state.email && <div className="mandatory">{window.strings['PLACEHOLDER']['EMAIL_ADDRESS']}</div>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                        type="password"
                                        placeholder="Password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })} 
                                        name="password"
                                        onChange={ this.handleInputChange }
                                        value={ this.state.password }
                                        required

                                        />
                                        { this.state.submitted && !this.state.password && <div className="mandatory">{window.strings['PLACEHOLDER']['CUSTOMER_PASSWORD']}</div>}
                                    </div>
                                    <div className="login-btn">
                                        
                                        <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={this.state.loading}>{/*<i className="fa fa-sign-in mr15" aria-hidden="true"></i>*/} {this.state.loading ? window.strings['LOADING'] : window.strings['LOGIN'] }</button>
                                    </div>
                                </form> 
                            </div>        
                        </div>
                    </div>    
                </div>
             </div>
         )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)