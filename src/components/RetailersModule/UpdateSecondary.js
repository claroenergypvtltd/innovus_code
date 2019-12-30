import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/login.scss';
import { Form, Row } from 'react-bootstrap';
import { path } from '../../constants';
import { SubmitFaq, getSpecificFaq } from '../../actions/faqAction';
import { FAQ_CREATE_SUCCESS, FAQ_UPDATE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import '../../assets/css/login.scss'
import classnames from 'classnames';


class UpdateSecondary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            instructionId: '',
            agentName: '',
            mobileNumber: '',
            errors: {}
        }
    }

    componentDidMount() {

        // if (this.props.location && this.props.location.state && this.props.location.state.instructionId) {
        //     this.getSpecificFaq();
        // }
    }




    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.agentName && this.state.mobileNumber) {

            const formData = new FormData();

            formData.append("agentName", this.state.agentName);
            formData.append("mobileNumber", this.state.mobileNumber);
            formData.append("instructionId", this.state.instructionId)
            this.props.SubmitFaq(formData, this.state.instructionId);
        }
    }


    getSpecificFaq() {

        if (this.props.location && this.props.location.state && this.props.location.state.instructionId) {
            let fId = this.props.location.state.instructionId;
            this.setState({ instructionId: fId });
            this.props.getSpecificFaq(this.props.location.state.instructionId);
        }
    }

    // listPath = (e) => {
    //     this.props.history.push(path.faq.list);   
    // }


    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="col-md-12 content form-adjust">
                    <div className="col-md-10">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group col-md-12">
                                <label>{window.strings.USERMANAGEMENT.AGENT_NAME}</label>
                                <input
                                    type="text"
                                    placeholder="Agent Name"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.agentName
                                    })}
                                    name="agentName"
                                    onChange={this.handleChange}
                                    value={this.state.agentName}
                                    required
                                />
                                {this.state.submitted && !this.state.agentName && <div className="mandatory">{window.strings['USERMANAGEMENT']['AGENT_NAME']}</div>}
                            </div>
                            <div className="form-group col-md-12 pt-2">
                                <label>{window.strings.USERMANAGEMENT.PHONE_NUMBER}</label>
                                <input type="number"
                                    placeholder="Phone Number"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.mobileNumber
                                    })}
                                    rows="5"
                                    name="mobileNumber"
                                    onChange={this.handleChange}
                                    value={this.state.mobileNumber}
                                    required
                                />
                                {this.state.submitted && !this.state.mobileNumber && <div className="mandatory">{window.strings['USERMANAGEMENT']['MOBILE_NUMBER'] + window.strings['ISREQUIRED']}</div>}
                            </div>

                        </form>
                    </div>
                    <div className="col-md-12 bottom-section">
                        <button type="button" className="btn btn-default mb-2" onClick={this.listPath}>{window.strings.CANCEL}</button>
                        <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    faqData: state.faq
})

export default connect(mapStateToProps, { SubmitFaq, getSpecificFaq })(UpdateSecondary)