import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/login.scss'
import classnames from 'classnames';
import { getVersionControl, SubmitSetting } from '../../actions/appSettingAction'
import { toastr } from '../../services';
import { path } from '../../constants';

class AppSetting extends React.Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            submitted: false,

        }
    }
    componentDidMount() {
        getVersionControl().then(resp => {
            if (resp && resp.data && resp.data[0]) {
                this.setState({ supportVersion: resp.data[0].supportedVersion, currentVersion: resp.data[0].currentVersion })
            }
        });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        this.setState({ submitted: true })
        if (this.state.currentVersion && this.state.supportVersion) {
            if (this.state.supportVersion <= this.state.currentVersion) {
                let obj = {
                    supportedVersion: this.state.supportVersion,
                    currentVersion: this.state.currentVersion,
                    isActive: 1
                }
                SubmitSetting(obj).then(resp => {
                    if (resp && resp.status == 200) {
                        toastr.success(resp.message);
                    }
                });
            }
            else {
                toastr.error("Supported Version should be Lesser than or equal to Current Version")
            }
        }
    }
    redirect = () => {
        this.props.history.push(path.dashboard.list)
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <h4 className="user-title">{window.strings.APPSETTING.APPVERSIONCONTROL}</h4>
                <div className="col-md-12 content form-adjust">
                    <div className="col-md-10">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group col-md-6">
                                <label>{window.strings.APPSETTING.SUPPORTEDVERSION}</label>
                                <input
                                    type="text"
                                    placeholder="Supported Version"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.name
                                    })}
                                    name="supportVersion"
                                    onChange={this.handleChange}
                                    value={this.state.supportVersion}
                                />
                                {this.state.submitted && !this.state.supportVersion && <div className="mandatory">{window.strings.APPSETTING.SUPPORTEDVERSION + window.strings['ISREQUIRED']}</div>}
                            </div>

                            <div className="form-group col-md-6">

                                <label>{window.strings.APPSETTING.CURRENTVERSION}</label>
                                <input
                                    type="text"
                                    placeholder="Current Version"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.name
                                    })}
                                    name="currentVersion"
                                    onChange={this.handleChange}
                                    value={this.state.currentVersion}
                                />

                                {this.state.submitted && !this.state.currentVersion && <div className="mandatory">{window.strings.APPSETTING.CURRENTVERSION + window.strings['ISREQUIRED']}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 bottom-section">
                        <button type="button" className="btn btn-default mb-2" onClick={this.redirect} >{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    setting: state.Lists
})

export default connect(mapStateToProps, { getVersionControl, SubmitSetting })(AppSetting)