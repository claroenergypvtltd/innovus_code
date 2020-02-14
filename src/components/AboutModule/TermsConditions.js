import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import RichTextEditor from "react-rte";
import classnames from 'classnames';


export default class TermsConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: RichTextEditor.createEmptyValue()
        }

    }
    onChange = (description) => {
        let test = description.toString("html");
        if (description.toString("html")) {
            this.setState({ toString: true })
        }
        this.setState({ description: description });
    };

    render() {
        return (
            <div className="policy">
                <h4 className="user-title">{window.strings.ABOUT.TERMSCONDITIONS}</h4>
                <div className="main-wrapper">
                    <div className="col-md-6">
                        <div className="container">
                            <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                <div className="form-group pt-3 col-md-12">
                                    <label>{window.strings.USERMANAGEMENT.NAME}</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className={classnames('form-control form-control-lg', {
                                        })}
                                        name="name"
                                        disabled
                                    />

                                    {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                </div>
                                <div className="form-group pt-3 col-md-12">
                                    <label>{window.strings.CATEGORY.DESCRIPTION}</label>
                                    <RichTextEditor value={this.state.description} onChange={this.onChange} />
                                </div>
                            </form>
                        </div>
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