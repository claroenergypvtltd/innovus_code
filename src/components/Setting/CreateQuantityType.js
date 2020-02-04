import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import { SubmitQuantityType } from '../../actions/appSettingAction';
import { FAQ_CREATE_SUCCESS, FAQ_UPDATE_SUCCESS } from '../../constants/actionTypes'
import classnames from 'classnames';

class CreateQuantityType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityName: '',
            submitted: false,
            errors: {}
        }
    }

    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.instructionId) {
            this.getSpecificFaq();
        }
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getSpecificFaq() {

        if (this.props.location && this.props.location.state && this.props.location.state.instructionId) {
            let fId = this.props.location.state.instructionId;
            this.setState({ instructionId: fId });
            this.props.getSpecificFaq(this.props.location.state.instructionId);
        }
    }

    listPath = (e) => {
        this.props.history.push(path.appSetting.fetchQuantity);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })

        if (this.state.quantityName) {
            let obj = {
                quantityName: this.state.quantityName
            }
            SubmitQuantityType(obj).then(resp => {
                if (resp && resp.status == "200") {
                    this.listPath();
                }
            });
        }
    }


    render() {
        const { errors } = this.state;

        return (
            <div>
                <h4 className="user-title">{!this.state.instructionId ? window.strings.APPSETTING.CREATE_TYPE : window.strings.APPSETTING.EDIT_TYPE}</h4>
                <div className="col-md-12 content form-adjust">
                    <div className="col-md-10">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group col-md-6">

                                <label>{window.strings.APPSETTING.QUANTITY_NAME + '*'}</label>

                                <input
                                    type="text"
                                    placeholder="quantityName"
                                    className={classnames('form-control', {
                                        'is-invalid': errors.name
                                    })}
                                    name="quantityName"
                                    onChange={this.handleChange}
                                    value={this.state.quantityName}
                                    required
                                />
                                {this.state.submitted && !this.state.quantityName && <div className="mandatory">{window.strings['APPSETTING']['QUANTITY_NAME'] + window.strings['ISREQUIRED']}</div>}
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

const mapStateToProps = () => {

}
export default connect(mapStateToProps, {})(CreateQuantityType)

