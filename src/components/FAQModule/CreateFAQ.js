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


class CreateFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            instructionId: '',
            title: '',
            description: '', errors: {}
        }
    }

    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.instructionId) {
            this.getSpecificFaq();
        }
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.faqData && nextProps.faqData.createdStatus == "200") {
            store.dispatch({ type: FAQ_CREATE_SUCCESS, resp: "" })
            this.props.history.push(path.faq.list);
        }

        if (nextProps.faqData && nextProps.faqData.updatedStatus == "200") {
            store.dispatch({ type: FAQ_UPDATE_SUCCESS, resp: "" })
            this.props.history.push(path.faq.list)
        }
        if (nextProps.faqData && nextProps.faqData.specificData && nextProps.faqData.specificData.datas && nextProps.faqData.specificData.datas[0]) {
            let Data = nextProps.faqData.specificData.datas[0];
            this.setState({ description: Data.description, title: Data.title })
        }

    }


    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.title && this.state.description) {

            const formData = new FormData();

            formData.append("title", this.state.title);
            formData.append("description", this.state.description);
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

    listPath = (e) => {
        this.props.history.push(path.faq.list);
    }


    render() {
        const { errors } = this.state;

        return (
            <div>
                <h4 className="user-title">{!this.state.instructionId ? window.strings.FAQ.ADD_NEW_FAQ : window.strings.FAQ.EDIT_FAQ}</h4>
                <div className="col-md-12 content form-adjust">
                    <div className="col-md-10">
                        <h4 className="color-title line-wrapper mb-2" >{window.strings.FAQ.FAQ_DETAILS}</h4>
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group col-md-12">

                                <label>{window.strings.FAQ.QUESTION_TITLE}</label>

                                <input
                                    type="text"
                                    placeholder="Question title"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.name
                                    })}
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                    required

                                />

                                {this.state.submitted && !this.state.title && <div className="mandatory">{window.strings['FAQ']['TITLE']}</div>}
                            </div>
                            <div className="form-group col-md-12 pt-2">
                                <label>{window.strings.DESCRIPTION}</label>
                                <textarea
                                    placeholder="Description"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.description
                                    })}
                                    rows="5"
                                    name="description"
                                    onChange={this.handleChange}
                                    value={this.state.description}
                                    required
                                ></textarea>
                                {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
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

export default connect(mapStateToProps, { SubmitFaq, getSpecificFaq })(CreateFAQ)