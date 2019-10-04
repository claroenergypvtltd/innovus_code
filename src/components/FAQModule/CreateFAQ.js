import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../assets/css/login.scss';
import { Form, Row } from 'react-bootstrap';
import { path } from '../../constants';
import { SubmitFaq } from '../../actions/faqAction';
import { FAQ_CREATE_SUCCESS } from '../../constants/actionTypes'
import Store from '../../store/store';



class CreateFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.faqData && nextProps.faqData.createdStatus == "200") {
            Store.dispatch({ type: FAQ_CREATE_SUCCESS, resp: "" })
            this.props.history.goBack();
        }

    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        this.setState({ submitted: true })

        if (this.state.title && this.state.description) {

            const formData = new FormData();
            formData.append("title", "FAQ");
            formData.append("question", this.state.title);
            formData.append("answer", this.state.description)
            this.props.SubmitFaq(formData, this.state.title);
        }
    }

    listPath = (e) => {
        this.props.history.push(path.faq.list);
    }


    render() {
        return (
            <div>

                <h2>{window.strings.FAQ.ADD_FAQ}</h2>
                <div className="col-md-12 content">
                    <div className="col-md-8 ">
                        <h3 >{window.strings.FAQ.FAQ_DETAILS}</h3><hr />
                        <Form className="form-adjust"  >
                            <Form.Group >
                                <Form.Label>{window.strings.FAQ.QUESTION_TITLE}</Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} name="title" />
                                {this.state.submitted && !this.state.title && <div className="mandatory">{window.strings.FAQ.TITLE}</div>}
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>{window.strings.CATEGORY.DESCRIPTION}</Form.Label>
                                <Form.Control as="textarea" rows="5" onChange={this.handleChange} name="description" />
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


export default connect(mapStateToProps, { SubmitFaq })(CreateFAQ)