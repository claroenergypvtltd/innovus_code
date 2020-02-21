import React, { Component } from 'react'
import { path } from '../../constants';
import RichTextEditor from "react-rte";
import { SubmitEcom, getEcom } from '../../actions/appSettingAction'
import { toastr } from "../../services/"

export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: '',
            title: '',
            description: RichTextEditor.createEmptyValue()
        }
    }

    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.heading) {
            this.setState({ heading: this.props.location.state.heading, title: this.props.location.state.title }, () => {
                this.getEcom();
            })
        }
    }

    onChange = (description) => {
        let test = description.toString("html");
        if (description.toString("html")) {
            this.setState({ toString: true })
        }
        this.setState({ description: description });
    };

    getEcom = () => {
        getEcom(this.state.heading).then(resp => {
            if (resp && resp.data && resp.data.body) {
                let dataStr = RichTextEditor.createValueFromString(resp.data.body, "html");
                this.setState({ description: dataStr })
            }
        })
    }

    handleSubmit = () => {
        this.setState({ submitted: true })
        if (this.state.description && this.state.description._cache && this.state.description._cache.html) {
            const formData = new FormData();
            formData.append("type", this.state.heading);
            formData.append("fileName", this.state.heading);
            formData.append("file", this.state.description._cache.html);
            SubmitEcom(formData).then(resp => {
                if (resp) {
                    toastr.success(resp.message);
                    this.listPath();
                }
            })
        }
    }

    listPath = () => {
        this.props.history.push(path.appSetting.list)
    }

    render() {
        return (
            <div className="policy">
                <h4 className="user-title">{this.state.title}</h4>
                <div className="main-wrapper">
                    <div className="col-md-7">
                        <div className="container">
                            <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                <div className="form-group pt-3 col-md-12">
                                    <label>{window.strings.CATEGORY.DESCRIPTION}</label>
                                    <RichTextEditor value={this.state.description} onChange={this.onChange} />
                                    {this.state.submitted && !RichTextEditor.createValueFromString(this.state.description._cache.html, "html") && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
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