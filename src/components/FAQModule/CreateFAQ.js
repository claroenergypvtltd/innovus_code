import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/login.scss';
import { Form, Row } from 'react-bootstrap';
import { path } from '../../constants';
import { SubmitFaq, getSpecificFaq } from '../../actions/faqAction';
import { FAQ_CREATE_SUCCESS, FAQ_UPDATE_SUCCESS } from '../../constants/actionTypes'
import store from '../../store/store';
import '../../assets/css/login.scss'



class CreateFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            instructionId: '',
            title: '',
            description: ''
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
        if (nextProps.faqData && nextProps.faqData.specificData && nextProps.faqData.specificData[0]) {
            let Data = nextProps.faqData.specificData[0];
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
        return (
            <div>

                <h2>{!this.state.instructionId ? window.strings.FAQ.ADD_FAQ : window.strings.FAQ.EDIT_FAQ}</h2>

                <div className="col-md-12 content form-adjust">
                    <div className="col-md-8  ">
                        <h3 >{window.strings.FAQ.FAQ_DETAILS}</h3><hr />
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Group >
                                <Form.Label>{window.strings.FAQ.QUESTION_TITLE}</Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} name="title" value={this.state.title} />
                                {this.state.submitted && !this.state.title && <div className="mandatory">{window.strings.FAQ.TITLE}</div>}
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>{window.strings.CATEGORY.DESCRIPTION}</Form.Label>
                                <Form.Control as="textarea" rows="5" onChange={this.handleChange} name="description" value={this.state.description} />
                                {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings.FAQ.DESCRIPTION_REQUIRED}</div>}<br />
                            </Form.Group>

                            <div className="col-md-12 bottom-section">
                                <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                            </div>

                        </Form>
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